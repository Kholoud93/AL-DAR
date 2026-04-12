import React from "react";

export default function LoginPage() {
  return (
    <div className="w-full flex items-center justify-center">
      <div
        className="rounded-2xl shadow-2xl p-8 w-full max-w-xl"
        style={{
          background: "linear-gradient(135deg, #3f51b5, #5f86ff)",
        }}
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Login</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white">Email</label>
            <input type="email" className="mt-2 block w-full rounded-lg border-none p-4 text-lg shadow focus:outline-none focus:ring-2 focus:ring-white bg-white text-[#1b1464]" required />
          </div>
          <div>
            <label className="block text-lg font-medium text-white">Password</label>
            <input type="password" className="mt-2 block w-full rounded-lg border-none p-4 text-lg shadow focus:outline-none focus:ring-2 focus:ring-white bg-white text-[#1b1464]" required />
          </div>
          <button type="submit" className="w-full py-3 px-6 rounded-lg font-bold text-lg transition-colors text-white" style={{background: "var(--gradient-cta)"}}>Login</button>
        </form>
        <div className="mt-8 text-center">
          <span className="text-white text-lg">Don't have an account? </span>
          <a
            href="/auth/register"
            className="inline-block ml-2 px-4 py-2 rounded-lg font-semibold text-lg text-white transition-colors"
            style={{background: "var(--gradient-cta)"}}
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
