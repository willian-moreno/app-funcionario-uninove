module.exports = {
  extends: ['expo', 'prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', {
      printWidth: 100,
      tabWidth: 2,
      singleQuote: true,
      trailingComma: 'all',
      arrowParens: 'always',
      semi: false,
      endOfLine: 'auto',
    }],
  },
}
