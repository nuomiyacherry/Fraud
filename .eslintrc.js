module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  env: {
    node: true,
    browser: true,
    es6: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: ['plugin:vue/essential', '@vue/standard'],
  // required to lint *.vue files
  plugins: ['html', 'vue'],
  // add your custom rules here
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 0,
    'no-unused-vars': 'error',
    'linebreak-style': ['error', 'unix'],
    quotes: 'off',
    semi: ['error', 'never'],
    curly: 'off',
    'default-case': 'off',
    'no-else-return': 'off',
    'no-empty-function': 'off',
    'no-implicit-coercion': 'off',
    'no-invalid-this': 'off',
    'no-loop-func': 'off',
    'no-multi-spaces': 'off',
    indent: 'off', //缩进风格
    'space-before-function-paren': 'off',
    'no-new-func': 'off',
    'no-useless-return': 'off',
    'global-require': 'off',
    'no-path-concat': 'off',
    'no-sync': 'off',
    'array-bracket-spacing': 'off',
    'block-spacing': ['error', 'never'],
    'object-curly-spacing': 'off',
    'brace-style': ['error', '1tbs'],
    camelcase: 'off',
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'lines-around-comment': 'off',
    'linebreak-style': [0, 'error', 'windows'],
    'newline-before-return': 'off',
    'no-multi-assign': 'off',
    'max-params': [1, 9],
    'one-var': 'off',
    'new-cap': ['error', { newIsCap: true, capIsNew: false }],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'no-shadow-restricted-names': 'error',
    'no-undef-init': 'off',
    'keyword-spacing': 'off',
    'no-trailing-spaces': 'off',
    'space-in-parens': 'off',
    'eol-last': 'off',
    'spaced-comment': 'off',
    'space-before-blocks': ['error', 'always']
  }
}
