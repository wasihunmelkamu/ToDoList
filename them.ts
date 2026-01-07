// lib/theme.ts
export const THEME_STYLES = {
  // Animated backgrounds
  blobBase: "absolute rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob",
  
  // Glassmorphism for Dark Mode
  glassCard: "backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl",
  
  // Primary Button Consistency
  primaryButton: "w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-6 shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] rounded-xl",
  
  // Input consistency
  inputField: "bg-white/5 border-white/10 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200 text-white",
  
  // Label consistency
  inputLabel: "text-white/70 ml-1 text-xs font-semibold uppercase tracking-wider"
};