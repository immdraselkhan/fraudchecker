import type { Config } from "tailwindcss";
import { shadcnPreset } from "./lib/shadcn/preset";

export default {
  presets: [shadcnPreset],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
} as Config;
