module.exports = {
  linters: {
    'demo/src/**/*.{js,jsx,ts,tsx}': ['eslint --fix', 'git add'],
    '**/*.{md,json}': ['prettier --write', 'git add'],
  },
  ignore: ['**/*.d.ts'],
}
