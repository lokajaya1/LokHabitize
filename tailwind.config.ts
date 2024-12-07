import { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        'primary-dark': '#3730a3',
        secondary: '#22C55E',
        'secondary-dark': '#15803D',
        accent: '#E11D48',
        background: '#F3F4F6',
        surface: '#FFFFFF',
        muted: '#9CA3AF',
        warning: '#FBBF24',
        success: '#10B981',
        error: '#EF4444',
        info: '#3B82F6',
        'primary-gradient': 'linear-gradient(90deg, #4F46E5, #22C55E)'
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
        '5xl': '2.5rem'
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
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-in-out',
        bounce: 'bounce 1s infinite'
      }
    }
  },
  plugins: []
}

export default config
