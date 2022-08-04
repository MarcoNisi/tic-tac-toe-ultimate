module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}'],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        clamped: 'clamp(50%, 800px, 100%)'
      },
      fontSize: {
        '12xl': '12rem'
      }
    },
  },
  plugins: [],
}
