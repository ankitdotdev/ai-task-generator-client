"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/zustand/store/auth/authStore";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Inputs/Inputs";
import { Button } from "@/components/Buttons/Button";

interface LoginProps {
  onSwitch: () => void;
}

export const Login = ({ onSwitch }: LoginProps) => {
  const { loginApi } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const result = await loginApi(email.trim(), password.trim());

      if (result.success) {
        toast.success(result.message);

        setEmail("");
        setPassword("");

        router.push("/task");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Login submit error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-2xl font-semibold text-white">Welcome Back</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="text-sm text-gray-400">
        Don’t have an account?{" "}
        <span
          onClick={onSwitch}
          className="text-[#10a37f] cursor-pointer hover:underline"
        >
          Register
        </span>
      </p>
    </div>
  );
};