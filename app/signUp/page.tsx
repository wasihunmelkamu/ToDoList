import { z } from "zod";
import crypto from "crypto";
import { prisma } from "@/prisma";
import { sendVerficationEmail } from "../../email";
import bcrypt from "bcryptjs";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import Link from "next/link";
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
  "use server";
  const rawFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  // validation with zod
  const validated = SignUpSchema.safeParse(rawFormData);
  if (!validated.success) {
    const errors = validated.error.flatten().fieldErrors;
    throw new Error("Invalid input");
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
  const token = crypto.randomUUID();

  //Creat user (unverifed)
  await prisma.user.create({
    data: { email, name, password: hashedPassword, emailVerified: null },
  });

  await prisma.verificationToken.create({
    data: { identifier: email, token, expires: new Date(Date.now() + 3600000) },
  });

  // send verification email
  await sendVerficationEmail({ email, token });
  redirect("/check_email");
};
const signUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/SO">
      <Card className=" w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="sapce-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Create an account
          </CardTitle>
          <CardDescription>
            Enter your details below to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={SignUp} className="gird gap-4">
            <div className="gird gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Wasman"
                required
                className="focus-visible:ring-green-400"
              />
            </div>
            <div className="grid-gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="waman@gmail.com"
                required
                className="focus-visible:ring-green-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="focus-visible:ring-green-600"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Must be 8+ characters with an uppercase letter and a number.
              </p>
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600  hover:bg-green-700 text-white mt-2 "
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          {" "}
          <div>
            Already have an account ?{" "}
            <Link
              href="/Login"
              className="text-green-600 font-semibold hover:underline"
            >
              login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
export default signUpPage;
