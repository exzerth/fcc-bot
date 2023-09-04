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
        lighterYellow: "#f2c84c1a",
        textDark: "#0A0708",
        headingDark: "#0E050F",
        primaryPurple: "#420255",
        secPurple: "#680184",
        tinyPurple: "#9388A2",
        lighterPurple: "#6801841a",
        primaryGray: "#444444",
        secGray: "#B1B1B1",
        textWhite: "#F2F2F2",
        primaryYellow: "#F2C94C",
        btnPurple: "#680184",
      },
    },
  },
  plugins: [],
}
export default config
