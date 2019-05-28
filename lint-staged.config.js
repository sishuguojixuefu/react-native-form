module.exports = {
  linters: {
    'demo/src/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'git add'],
  },
  ignore: ['**/*.d.ts'],
}
