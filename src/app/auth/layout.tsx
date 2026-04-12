import type { ReactNode } from "react";
import authBackground from "@/assets/auth-background.jpeg";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${authBackground.src})` }}
      />
      {/* Light wash + subtle glass — keeps photo clearly visible */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-[#1b1464]/18 via-[#312e81]/10 to-[#0f172a]/22"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-white/[0.04] backdrop-blur-[3px]"
      />
      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-4 py-8 sm:py-10">
        {children}
      </div>
    </div>
  );
}
