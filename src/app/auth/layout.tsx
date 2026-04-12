import type { ReactNode } from "react";
import Image from "next/image";
import authBackground from "@/assets/auth-background.jpeg";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden">
      {/* Fixed layer fills the viewport on all devices; image uses cover + tuned focal points */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 min-h-[100dvh] w-full overflow-hidden"
      >
        <Image
          src={authBackground}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          placeholder="blur"
          className="h-full w-full object-cover object-[center_30%] min-[480px]:object-[center_33%] md:object-[center_36%] lg:object-center xl:object-[center_38%]"
        />
      </div>
      {/* Mobile: very light tint + almost no blur so the photo reads clearly; md+: slightly richer wash */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-br from-[#1b1464]/12 via-[#312e81]/6 to-[#0f172a]/16 md:from-[#1b1464]/18 md:via-[#312e81]/10 md:to-[#0f172a]/22"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] bg-white/[0.03] backdrop-blur-0 md:bg-white/[0.04] md:backdrop-blur-[3px]"
      />
      <div className="relative z-10 flex min-h-[100dvh] w-full items-center justify-center px-4 py-8 sm:px-6 sm:py-10 md:px-8">
        <div className="flex w-full min-w-0 max-w-full justify-center">{children}</div>
      </div>
    </div>
  );
}
