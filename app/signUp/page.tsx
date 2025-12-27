import { string, z } from "zod";
import { prisma } from "@/prisma";
import bcrypt from "bcryptjs";
const SignUpSchema = z.object({
  name: z.string().min(2, "Name must be at  least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, "passowrd must be at least 8 characteres")
    .regex(/[A-Z]/, "Passowrd must  contain an uppercase letter")
    .regex(/[0-9]/, "password must contain a number"),
});

const SignUp = async (formData: FormData) => {
  "user server";
  const rawFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  // validation with zod
  const validated = SignUpSchema.safeParse(rawFormData);
  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors;
    throw new Error(`${errors}`);
  }
  const { name, email, password } = validated.data;

  // check  for duplication email
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    if (existingUser.emailVerified) {
      throw new Error("Email is already in  use");
    } else {
      throw new Error("Email  not verfied. check your inbox");
    }
  }
  // has password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Generate verification token
  const token = generateId(32); // here crypto.randomUUId()

  await prisma.user.create({
    data: { email, name, password: hashedPassword, emailVerified: null },
  });
};
