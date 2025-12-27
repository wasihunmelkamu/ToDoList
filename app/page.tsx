import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-300 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-200 rounded-full blur-[100px]"></div>
      </div>

      <main className="relative z-10 text-center max-w-3xl">
        {/* Badge */}
        <Badge className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wide text-indigo-600 uppercase bg-indigo-50 rounded-full border border-indigo-100">
          Now Powered by Auth.js 5.0
        </Badge>

        {/* Header */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
            Taskflow
          </span>{" "}
          app
        </h1>

        {/* Paragraph */}
        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Experience next-level productivity. Secure task management seamlessly
          integrated with{" "}
          <span className="font-semibold text-slate-800">Auth.js</span> for
          enterprise-grade protection.
        </p>

        {/* Button Component */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/Login">
            <Button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto">
              Get Started Free
            </Button>
          </Link>
        </div>

        {/* Trust Factor */}
        <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 text-sm">
          <svg
            className="w-5 h-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          No credit card required
        </div>
      </main>
    </div>
  );
}
