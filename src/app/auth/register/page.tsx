import React from "react";

export default function RegisterPage() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-[22rem] rounded-xl border border-white/45 bg-slate-950/75 p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] ring-1 ring-white/20 backdrop-blur-2xl sm:max-w-md sm:rounded-2xl sm:p-6">
        <h1 className="mb-5 text-center text-2xl font-bold tracking-tight text-white drop-shadow-md sm:mb-6 sm:text-3xl">
          Register
        </h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="register-name"
              className="mb-1.5 block text-sm font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]"
            >
              Name
            </label>
            <input
              id="register-name"
              type="text"
              className="block h-10 w-full rounded-md border border-white/20 bg-white px-3 text-sm text-[#1b1464] shadow-inner shadow-black/10 focus:outline-none focus:ring-2 focus:ring-white/90"
              required
            />
          </div>
          <div>
            <label
              htmlFor="register-email"
              className="mb-1.5 block text-sm font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]"
            >
              Email
            </label>
            <input
              id="register-email"
              type="email"
              className="block h-10 w-full rounded-md border border-white/20 bg-white px-3 text-sm text-[#1b1464] shadow-inner shadow-black/10 focus:outline-none focus:ring-2 focus:ring-white/90"
              required
            />
          </div>
          <div>
            <label
              htmlFor="register-password"
              className="mb-1.5 block text-sm font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]"
            >
              Password
            </label>
            <input
              id="register-password"
              type="password"
              className="block h-10 w-full rounded-md border border-white/20 bg-white px-3 text-sm text-[#1b1464] shadow-inner shadow-black/10 focus:outline-none focus:ring-2 focus:ring-white/90"
              required
            />
          </div>
          <button
            type="submit"
            className="h-10 w-full rounded-md text-sm font-semibold text-white transition-opacity hover:opacity-95"
            style={{ background: "var(--gradient-cta)" }}
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center sm:mt-7">
          <span className="text-sm font-medium text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            Already have an account?{" "}
          </span>
          <a
            href="/auth/login"
            className="ml-1 inline-flex items-center rounded-md px-3 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-95"
            style={{ background: "var(--gradient-cta)" }}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
