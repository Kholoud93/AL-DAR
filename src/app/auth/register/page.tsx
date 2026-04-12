import React from "react";

export default function RegisterPage() {
  return (
    <div className="flex w-full items-center justify-center px-4 py-8 sm:py-10">
      <div
        className="w-full max-w-[22rem] rounded-xl p-5 shadow-xl sm:max-w-md sm:rounded-2xl sm:p-6 sm:shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #3f51b5, #5f86ff)",
        }}
      >
        <h1 className="mb-5 text-center text-2xl font-bold text-white sm:mb-6 sm:text-3xl">
          Register
        </h1>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="register-name"
              className="mb-1.5 block text-sm font-medium text-white/90"
            >
              Name
            </label>
            <input
              id="register-name"
              type="text"
              className="block h-10 w-full rounded-md border-0 bg-white px-3 text-sm text-[#1b1464] shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="register-email"
              className="mb-1.5 block text-sm font-medium text-white/90"
            >
              Email
            </label>
            <input
              id="register-email"
              type="email"
              className="block h-10 w-full rounded-md border-0 bg-white px-3 text-sm text-[#1b1464] shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="register-password"
              className="mb-1.5 block text-sm font-medium text-white/90"
            >
              Password
            </label>
            <input
              id="register-password"
              type="password"
              className="block h-10 w-full rounded-md border-0 bg-white px-3 text-sm text-[#1b1464] shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
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
          <span className="text-sm text-white/90">Already have an account? </span>
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
