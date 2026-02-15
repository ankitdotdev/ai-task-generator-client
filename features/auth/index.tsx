"use client";

import { useState } from "react";
import { Register } from "./components/Register";
import { Login } from "./components/Login";

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen flex bg-[#0f172a]">
      {/* Left Image Section (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#0f172a] to-[#1f2937] items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-[#10a37f]">Task Generator</h1>
          <p className="text-gray-400 max-w-sm">
            Organize your workflow intelligently and generate tasks
            effortlessly.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        {isLogin ? (
          <Login onSwitch={() => setIsLogin(false)} />
        ) : (
          <Register onSwitch={() => setIsLogin(true)} />
        )}
      </div>
    </main>
  );
}
