// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'no-multi-spaces': 0,
    'space-in-parens': [0, 'always'],
    'no-unused-vars': 0,
    'key-spacing': 0,
    'yoda': 0,

    'semi': [2, 'always'],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'eqeqeq':0,
    'no-useless-escape': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-tabs': 0
  }
};
