"use client";

import { useState } from "react";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import Image from "next/image";

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen flex bg-[#0f172a]">
      {/* Left Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/taskbg.png"
            alt="Task Management Illustration"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>

        {/* Stronger Gradient Overlay - Makes content pop */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/75 z-10" />

        {/* Content Overlay */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full px-12 text-center">
          {/* Logo/Icon - More prominent */}
          <div className="mb-10">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-teal-500/60 mx-auto border-2 border-white/40 ring-4 ring-teal-400/20">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
          </div>

          {/* Title - Very prominent */}
          <h1 className="text-6xl font-black mb-6 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] tracking-tight">
            Task Generator
          </h1>

          {/* Subtitle - Clear and bold */}
          <p className="text-gray-100 text-xl mb-14 max-w-lg leading-relaxed font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] px-4">
            Organize your workflow intelligently and generate tasks
            effortlessly with AI-powered assistance.
          </p>

          {/* Features - Highly visible */}
          <div className="space-y-5 max-w-lg w-full">
            <Feature
              icon="⚡"
              title="Lightning Fast"
              description="Generate comprehensive specs in seconds"
            />
            <Feature
              icon="🎯"
              title="AI-Powered"
              description="Smart task breakdown and risk analysis"
            />
            <Feature
              icon="📊"
              title="Organized"
              description="Keep all your projects in one place"
            />
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="w-full max-w-md">
          {isLogin ? (
            <Login onSwitch={() => setIsLogin(false)} />
          ) : (
            <Register onSwitch={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </main>
  );
}

// Feature Component - Strong emphasis
const Feature = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="flex items-start gap-5 text-left backdrop-blur-xl bg-slate-900/80 rounded-2xl p-5 border-2 border-slate-600/80 hover:border-teal-400/80 hover:bg-slate-900/90 transition-all shadow-2xl hover:shadow-teal-500/20 hover:scale-[1.02] transform duration-300">
    <div className="text-4xl flex-shrink-0 drop-shadow-lg">{icon}</div>
    <div>
      <h3 className="text-white font-bold text-lg mb-2 drop-shadow-lg">
        {title}
      </h3>
      <p className="text-gray-100 text-sm font-medium leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);