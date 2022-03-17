/*
 * @Author: jack-pearson
 * @Date: 2021-11-23 11:29:01
 * @LastEditTime: 2022-01-25 14:55:15
 * @LastEditors: jack-pearson
 * @FilePath: /vue3-element-admin/.eslintrc.js
 * @Description:  https://github.com/jack-pearson/vue3-element-admin
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/essential",
    "eslint:recommended",
  ],
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    // http://eslint.cn/docs/rules/
    // https://eslint.vuejs.org/rules/
    "@type-eslint/ban-ts-ignore": "off",
    "@type-eslint/explicit-function-return-type": "off",
    "@type-eslint/no-explicit-any": "off",
    "@type-eslint/no-var-requires": "off",
    "@type-eslint/no-empty-function": "off",
    "@type-eslint/no-use-before-define": "off",
    "@type-eslint/ban-ts-comment": "off",
    "@type-eslint/ban-types": "off",
    "@type-eslint/no-non-null-assertion": "off",
    "@type-eslint/explicit-module-boundary-types": "off",
    "vue/custom-event-name-casing": "off",
    "vue/attributes-order": "off",
    "vue/one-component-per-file": "off",
    "vue/html-closing-bracket-newline": "off",
    "vue/max-attributes-per-line": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/attribute-hyphenation": "off",
    "vue/html-self-closing": "off",
    "vue/no-multiple-template-root": "off",
    "vue/require-default-prop": "off",
    "vue/no-v-model-argument": "off",
    "vue/no-arrow-functions-in-watch": "off",
    "vue/no-template-key": "off",
    "vue/no-v-html": "off",
    "no-debugger": "off",
    "vue/multi-word-component-names": "off",
    "vue/comment-directive": "off",
    "vue/no-parsing-error": "off",
    "vue/no-deprecated-v-on-native-modifier": "off",
    "no-useless-escape": "off",
    "no-sparse-arrays": "off",
    "no-prototype-builtins": "off",
    "no-constant-condition": "off",
    "no-use-before-define": "off",
    "no-restricted-globals": "off",
    "no-restricted-syntax": "off",
    "generator-star-spacing": "off",
    "no-unreachable": "off",
    "no-multiple-template-root": "off",
    "no-unused-vars": "error",
    "no-v-model-argument": "off",
    "no-case-declarations": "off",
  },
  globals: {
    defineProps: "readonly",
  },
};
