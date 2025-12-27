"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Chrome } from "lucide-react"; // Social icons
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";
import { CredentialsSignIn, googlSignIn } from "../action/auth-action";

export default function LoginPage() {
  // optional : handle  form errors
  const [state, formAction] = useFormState(CredentialsSignIn, null);
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#242222] selection:bg-indigo-500/30">
      {/* 1. Background Ambient Glows */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000" />

      {/* 2. Entrance Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-md px-4"
      >
        <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl overflow-hidden">
          <CardHeader className="space-y-1 pb-8 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              Welcome back
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Don&apos;t have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-medium text-indigo-400 hover:text-indigo-300"
              >
                Sign up
              </Button>
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6">
            {/* 3. Social Logins with improved styling */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white transition-all duration-200"
              >
                <Github className="mr-2 h-4 w-4" /> Github
              </Button>
              <form action={googlSignIn}>
                <Button
                  variant="outline"
                  className="bg-white/5 border-white/10 hover:bg-white/10 text-white transition-all duration-200"
                >
                  <Chrome className="mr-2 h-4 w-4" /> Google
                </Button>
              </form>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0c0c0c] px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <form action={formAction} className="space-y-4">
              {state?.error && (
                <p className="text-sm text-red-400"> {state.error}</p>
              )}
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="text-white/70 ml-1 text-xs font-semibold uppercase tracking-wider"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-white/5 border-white/10 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 text-white"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-white/70 ml-1 text-xs font-semibold uppercase tracking-wider"
                  >
                    Password
                  </Label>

                  <Button
                    variant="link"
                    className="p-0 h-auto text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="bg-white/5 border-white/10 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 text-white"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-6 shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
              >
                Log In
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col pt-4">
            <p className="mt-4 text-center text-xs text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <span className="underline cursor-pointer">Terms of Service</span>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
