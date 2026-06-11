/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0e14',
        'bg-card': '#141923',
        'bg-card-hover': '#1a2030',
        'text-primary': '#cdd6f4',
        'text-dim': '#6c7086',
        accent: '#89b4fa',
        accent2: '#a6e3a1',
        accent3: '#f9e2af',
        red: '#f38ba8',
        border: '#1e2433',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
