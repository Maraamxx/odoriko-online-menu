import type { NextConfig } from "next";
const config: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ["172.20.10.4"],
};

export default config;