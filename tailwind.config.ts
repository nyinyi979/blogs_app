import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes:{
        slider:{
          '0%' : {transform: 'scaleX(0)'},
          '100%' : {transform: 'scaleX(1)'}
        }
      },
      animation: {
        slide : 'slider 0.5s ease-in-out'
      },
      margin:{
        '100' : '25rem',
        '101' : '26rem',
        '102' : '27rem',
        '103' : '28rem',
        '104' : '29rem',
        '105' : '30rem'
      }
    }
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar')
  ],
  daisyui:{
    themes:[{
      dark: {  
        "primary": "#1f2937",
                 
        "secondary": "#374151",
                 
        "accent": "#bae6fd",
                 
        "neutral": "#9ca3af",
                 
        "base-100": "#111827",
                 
        "info": "#3abff8",
                 
        "success": "#93c5fd",
                 
        "warning": "#fbbd23",
                 
        "error": "#f87272",
      },
      light: {
          
        "primary": "#c7b5ac",
                 
        "secondary": "#e0cec5 ",
                 
        "accent": "#3f3c38",
                 
        "neutral": "#44403c",
                 
        "base-100": "#e0d9d3",
                 
        "info": "#7dd3fc",
                 
        "success": "#155e75",
                 
        "warning": "#f7a14a",
                 
        "error": "#721919",
      },
    }]
    
  }
}
export default config
