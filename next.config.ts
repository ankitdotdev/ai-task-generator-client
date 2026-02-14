import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  env: {
    SERVER_URL: process.env.SERVER_URL || "http://localhost:8000/api/v1",
  },
};

export default nextConfig;
