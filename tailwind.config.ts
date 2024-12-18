import { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        'primary-dark': '#3730A3',
        accent: '#3730a3',
        secondary: '#22C55E',
        'secondary-dark': '#15803D',
        'main-black': '#1E1E1E',
        background: '#F5F5F5',
        surface: '#FFFFFF',
        muted: '#9CA3AF',
        warning: '#FBBF24',
        success: '#10B981',
        error: '#EF4444',
        info: '#3B82F6',
        'primary-gradient': 'linear-gradient(90deg, #4F46E5, #22C55E)',
        foreground: '#1F2937',
        border: '#E5E7EB',
        input: '#E5E7EB',
        ring: '#CBD5E1'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        mono: ['Fira Code', 'monospace']
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        36: '9rem',
        72: '18rem',
        84: '21rem',
        96: '24rem',
        108: '27rem',
        120: '30rem'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem'
      },
      boxShadow: {
        card: '0 2px 6px rgba(0, 0, 0, 0.1)',
        floating: '0 8px 20px rgba(0, 0, 0, 0.15)',
        intense: '0 12px 24px rgba(0, 0, 0, 0.2)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        bounce: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-in-out',
        bounce: 'bounce 1s infinite'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}

export default config
