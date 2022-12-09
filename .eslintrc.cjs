// 'plugin:prettier/recommended 让eslint根据prettier配置检验'
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // 关闭组件命名驼峰
    'vue/multi-word-component-names': 'off',
    // 关闭const提示
    'prefer-const': 'off',
  },
}
