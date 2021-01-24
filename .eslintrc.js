module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended', 'p5js'],

  parser: 'babel-eslint',

  env: {
    browser: true,
  },

  plugins: ['prettier'],

  globals: {
    circle: true,
    square: true,
    createCapture: true,
    VIDEO: true,
  },

  rules: {
    'prettier/prettier': [2, { singleQuote: true, trailingComma: 'all' }],
    'import/no-extraneous-dependencies': 0,
    'guard-for-in': 0,
    'no-restricted-syntax': 0,
    'no-param-reassign': 0,
    'no-continue': 0,
    'import/extensions': 0,
    'no-await-in-loop': 0,
  },
};
