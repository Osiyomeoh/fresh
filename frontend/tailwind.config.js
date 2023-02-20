const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'glow-sm': '0px 0px 15px 0px rgba(210, 213, 218, 0.2)',
        'glow-md': '0px 0px 15px 3px rgba(210, 213, 218, 0.2)',
      },
      spacing: {
        128: '32rem',
      },
      keyframes: {
        shake: {
          '10%, 90%': {
            transform: 'translateX(-1px)',
          },
          '20%, 80%': {
            transform: 'translateX(2px)',
          },
          '30%, 50%, 70%': {
            transform: 'translateX(-4px)',
          },
          '40%, 60%': {
            transform: 'translateX(4px)',
          },
        },
        'beat-fade': {
          '50%': {
            transform: 'scale(0.75)',
            opacity: '0.2',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1);',
          },
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1);',
          },
        },
      },
      animation: {
        shake: 'shake 0.48s cubic-bezier(.36,.07,.19,.97) both',
        'beat-fade': 'beat-fade 0.7s 0s infinite linear',
        'beat-fade-odd': 'beat-fade 0.7s 0.35s infinite linear',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        smallTight: ['14px', '15px'],
        sidebar: ['18px', '20px'],
        header: ['38px', '42px'],
        countdown: ['50px', '60px'],
        description: ['16px', '20px'],
      },
      screens: {
        twotab: '900px',
        threetab: '1280px',
      },
      transitionProperty: {
        'max-height': 'max-height',
        spacing: 'margin, padding',
      },
      colors: {
        typography: {
          primary: '#232323',
          secondary: "#818181",
          banner: '#232323',
          h1: '#212121',
          h2: '#6b6f76',
          inputlabel: '#282a30',
          tablelabel: '#282a30',
        },
        'twitter-blue': '#1DA1F2',
        'telegram-blue': '#0088CC',
        'discord-purple': '#5865F2',
        'dark-black': '#07111C',
        'pale-sky': {
          DEFAULT: '#6C727D',
          50: '#CDCFD4',
          100: '#C2C5CA',
          200: '#ACB0B7',
          300: '#969BA4',
          400: '#808692',
          500: '#6C727D',
          600: '#575C64',
          700: '#41454C',
          800: '#2C2F33',
          900: '#17181B',
        },
        'coral-red': {
          DEFAULT: '#D45F5F',
          50: '#E8B9A7',
          100: '#E6B09F',
          200: '#E19E8F',
          300: '#DD8A7F',
          400: '#D9756F',
          500: '#D45F5F',
          600: '#C6353D',
          700: '#9A2936',
          800: '#6E1D2C',
          900: '#41111D',
        },
        gray: {
          DEFAULT: '#8A93A7',
          50: '#F3F4F6',
          100: '#E7E9ED',
          200: '#D0D3DC',
          300: '#B9BECA',
          400: '#A1A8B9',
          500: '#8A93A7',
          600: '#6B768E',
          700: '#535B6E',
          800: '#3B414E',
          900: '#202225',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
