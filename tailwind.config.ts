import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Home/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/OurTeam/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/AboutUs/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ContactUs/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#ff0042", // The red color used for the price
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
};
export default config;
