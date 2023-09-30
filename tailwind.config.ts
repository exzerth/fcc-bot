import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        nav: "0px 4px 4px -2px rgba(104, 1, 132, 0.2)",
        contactform: "0px 4px 10px rgba(0, 0, 0, 0.1);",
      },
      colors: {
        headingDark: "#333333",
        textDark: "#50555C",
      },
    },
  },
  plugins: [],
}
export default config
