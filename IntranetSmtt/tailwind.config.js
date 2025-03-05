/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.razor",
    "./**/*.html",
    "./wwwroot/index.html",
    "./node_modules/quill/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  
  safelist: [
    { pattern: /^ql-size-(small|large|huge)$/ } // Corrigindo safelist para regex
  ],
}
