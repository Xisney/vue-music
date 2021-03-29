module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-trailing-spaces':'off',
    'indent':'off',
    'spaced-comment':'off',
    'no-trailing-spaces':'off',
    'no-new':'off',
    'key-spacing':'off',
    'comma-dangle':'off',
    'eol-last':'off',
    'quotes':'off',
    'semi':'off',
    'keyword-spacing':'off',
    'space-before-blocks':'off',
    'comma-spacing':'off',
    'space-before-function-paren':'off',
    'space-infix-ops':'off',
    'no-multiple-empty-lines':'off',
    'block-spacing':'off',
    'padded-blocks':'off',
    'arrow-spacing':'off',
    'no-sequences':'off',
    'no-unused-expressions':'off',
    'no-multi-spaces':'off',
    'no-unused-vars':'off',
    'camelcase ':'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'eol-last': 0,
    'space-before-function-paren': 0
  },
};
