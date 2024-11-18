import type { Config } from 'tailwindcss'
import { withUt } from 'uploadthing/tw'

const config = withUt({
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#FFFFFF',
          secondary: '#2D2F33',
        },
        dashboard: {
          background: {
            DEFAULT: '#F4F4F6',
          },
        },
        field: {
          background: '#FFFFFF',
          border: {
            DEFAULT: '#D1D5DB',
            focus: '#3B82F6',
          },
        },
        blue: {
          DEFAULT: '#2563EB',
          hover: '#1E40AF',
        },
        gray: {
          DEFAULT: '#D1D5DB',
          hover: '#A1A1AA',
        },
        orange: {
          DEFAULT: '#FB923C',
          hover: '#F97316',
        },
        red: {
          DEFAULT: '#DC2626',
          hover: '#B91C1C',
        },
        text: {
          primary: '#1C1E21',
          secondary: '#6B7280',
          placeholder: '#9CA3AF',
        },
        table: {
          header: '#2D2F33',
          footer: '#F9FAFB',
          hover: '#E5E7EB',
        },
        message: {
          information: '#2563EB',
          success: '#34D399',
          error: '#DC2626',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}) satisfies Config

export default config
