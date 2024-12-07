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
        primary: '#4F46E5', // Warna utama
        secondary: '#22C55E', // Warna sekunder
        accent: '#E11D48', // Warna aksen
        background: '#F3F4F6', // Warna latar belakang global
        surface: '#FFFFFF', // Warna permukaan komponen
        muted: '#9CA3AF', // Warna teks redup
        warning: '#FBBF24', // Warna peringatan
        success: '#10B981', // Warna sukses
        error: '#EF4444', // Warna kesalahan
        info: '#3B82F6' // Warna informasi
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Font utama
        heading: ['Poppins', 'sans-serif'], // Font untuk heading
        mono: ['Fira Code', 'monospace'] // Font monospace
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        36: '9rem',
        72: '18rem',
        84: '21rem',
        96: '24rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      boxShadow: {
        card: '0 2px 6px rgba(0, 0, 0, 0.1)',
        floating: '0 8px 20px rgba(0, 0, 0, 0.15)'
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
        slideUp: 'slideUp 0.5s ease-in-out'
      }
    }
  },
  plugins: []
}

export default config
