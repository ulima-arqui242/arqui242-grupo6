import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        myfont: ['Chiro', 'Arial', 'sans-serif'],
      },
      colors: {
        lightGray: '#F6F5F2',   // Gris claro
        beige: '#F0EBE3',       // Beige claro
        softPink: '#F3D0D7',    // Rosado suave
        whitePink: '#FFEFEF',   // Blanco con un toque de rosa
      },
    },
  },
  plugins: [],
};
export default config;
