import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // this project is its own workspace root (a stray lockfile exists in the
    // user home directory — don't let Next infer that as the root)
    root: __dirname,
  },
};

export default nextConfig;
