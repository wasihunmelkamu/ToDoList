import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { THEME_STYLES } from "@/them";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div
          className={`${THEME_STYLES.blobBase} top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-300`}
        />
        <div
          className={`${THEME_STYLES.blobBase} bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-200 animation-delay-2000`}
        />
      </div>

      <main className="relative z-10 text-center max-w-3xl">
        <Badge
          variant="outline"
          className="mb-6 border-indigo-200 text-indigo-600 bg-indigo-50/50"
        >
          Now Powered by Auth.js 5.0
        </Badge>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Welcome to{" "}
          <span className={THEME_STYLES.brandGradientText}>Taskflow</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Experience next-level productivity. Secure task management integrated
          with
          <span className="font-semibold text-slate-800 ml-1">Auth.js</span>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/Login" className="w-full sm:w-auto">
            <Button
              className={`${THEME_STYLES.primaryButton} px-8 py-6 rounded-xl text-lg w-full`}
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
