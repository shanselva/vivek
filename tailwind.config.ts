import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#21358F',   // Navy
        secondary: '#007AB8',   // Darker Light Blue
        surface:   '#F8F9FA',   // Light background
      },
      fontFamily: {
        sans:    ['var(--font-mulish)', 'sans-serif'],
        display: ['var(--font-mulish)', 'sans-serif'],
      },
      container: {
        center:  true,
        padding: '1.5rem',
        screens: { xl: '1280px' },
      },
    },
  },
  plugins: [],
}
export default config
