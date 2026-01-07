"use server";
import { signIn } from "@/auth";

import { AuthError } from "next-auth"; //handle were  is  the error happen
export async function CredentialsSignIn(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "something went wrong" };
      }
    }
    throw error;
  }
}
export async function googlSignIn() {
  await signIn("google", { redirectTo: "/dashboard" });
}
