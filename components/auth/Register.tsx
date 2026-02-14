"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../Inputs/Inputs";
import { Button } from "../Buttons/Button";
import { useAuth } from "@/zustand/store/auth/authStore";

interface RegisterProps {
  onSwitch: () => void;
}

export const Register = ({ onSwitch }: RegisterProps) => {
  const { registerApi } = useAuth();

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

      const result = await registerApi(
        email.trim(),
        password.trim()
      );

      if (result.success) {
        toast.success(result.message);

        // Clear fields
        setEmail("");
        setPassword("");

        // Redirect to login view
        onSwitch();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Register submit error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-2xl font-semibold text-white">
        Create Account
      </h2>

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
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
        </Button>
      </form>

      <p className="text-sm text-gray-400">
        Already have an account?{" "}
        <span
          onClick={onSwitch}
          className="text-[#10a37f] cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );
};
