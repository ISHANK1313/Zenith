/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brutal-yellow': '#FFE951',
        'brutal-cyan': '#00F0FF',
        'brutal-pink': '#FF006B',
        'brutal-lime': '#00FF00',
        'brutal-bg': '#FFFFFF',
        'brutal-text': '#000000',
      },
      fontFamily: {
        'sans': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'mono': ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'brutal': '5px 5px 0px 0px #000000',
        'brutal-lg': '8px 8px 0px 0px #000000',
        'brutal-xl': '12px 12px 0px 0px #000000',
      },
    },
  },
  plugins: [],
}