module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:chai-friendly/recommended",
    "plugin:cypress/recommended",
    "plugin:vue/vue3-recommended",
    "standard",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  globals: {
    showOpenFilePicker: "readonly",
    showSaveFilePicker: "readonly",
  },
  rules: {
    semi: ["error", "always"],
    "no-console": [
      "warn",
      {
        allow: ["warn", "error", "info"],
      },
    ],
  },
};
