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
import { Github, Chrome } from "lucide-react";
import { useFormState } from "react-dom";
import { CredentialsSignIn, googlSignIn } from "../action/auth-action";
import Link from "next/link";
import { THEME_STYLES } from "@/them";

export default function LoginPage() {
  // Restoring your logic exactly as it was
  const [state, formAction] = useFormState(CredentialsSignIn, null);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0f172a] selection:bg-indigo-500/30">
      {/* 1. Background Ambient Glows (Consistent with Home) */}
      <div
        className={`${THEME_STYLES.blobBase} top-0 -left-4 w-72 h-72 bg-purple-500`}
      />
      <div
        className={`${THEME_STYLES.blobBase} top-0 -right-4 w-72 h-72 bg-blue-500 animation-delay-2000`}
      />
      <div
        className={`${THEME_STYLES.blobBase} -bottom-8 left-20 w-72 h-72 bg-indigo-500 animation-delay-4000`}
      />

      {/* 2. Entrance Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-md px-4"
      >
        <Card className={THEME_STYLES.glassCard}>
          <CardHeader className="space-y-1 pb-8 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-white">
              Welcome back
            </CardTitle>
            <CardDescription className="text-slate-400 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup">
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Sign up
                </Button>
              </Link>
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6">
            {/* 3. Social Logins */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 hover:bg-white/10 text-white transition-all duration-200"
              >
                <Github className="mr-2 h-4 w-4" /> Github
              </Button>

              {/* Note: Kept your specific form action for Google */}
              <form action={googlSignIn}>
                <Button
                  variant="outline"
                  type="submit"
                  className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-white transition-all duration-200"
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
                <span className="bg-[#0f172a] px-2 text-slate-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* 4. Credentials Form with useFormState */}
            <form action={formAction} className="space-y-4">
              {state?.error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-400 text-center font-medium">
                    {" "}
                    {state.error}
                  </p>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email" className={THEME_STYLES.inputLabel}>
                  Email
                </Label>
                <Input
                  id="email"
                  name="email" // Ensure name is present for formAction
                  type="email"
                  placeholder="name@example.com"
                  className={THEME_STYLES.inputField}
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className={THEME_STYLES.inputLabel}>
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
                  name="password" // Ensure name is present for formAction
                  type="password"
                  className={THEME_STYLES.inputField}
                  required
                />
              </div>

              <Button type="submit" className={THEME_STYLES.primaryButton}>
                Log In
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col pt-4">
            <p className="mt-4 text-center text-xs text-slate-500">
              By clicking continue, you agree to our{" "}
              <span className="underline cursor-pointer hover:text-slate-300 transition-colors">
                Terms of Service
              </span>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
