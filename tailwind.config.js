module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        tang: ['Tangerine', 'serif'],
        ice: ['Iceberg', 'sans-serif'],
        nosi: ['Nosifer', 'sans-serif'],
      },
      colors: {
        primary: '#FBBF24', // Amber-400
        'primary-light': '#FDE68A', // Amber-300
        secondary: '#1E293B', // Slate-800
        'secondary-light': '#334155', // Slate-700
      },
    },
  },
  plugins: [],
};
