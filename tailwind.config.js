/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'red-primary': '#f73859',
        'blue-primary': '#3961fb',
        'orange-primary': '#ff6600',
        'yellow-primary': '#febb02',
        'background-color': '#f5f5f5',
        'background-post-vip': '#fff9f3',
      },
    },
    screens: {
      xs: '0px',
      // => @media (min-width: 0px) { ... }

      sm: '600px',
      // => @media (min-width: 600px) { ... }

      md: '900px',
      // => @media (min-width: 900px) { ... }

      lg: '1200px',
      // => @media (min-width: 1200px) { ... }

      xl: '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
