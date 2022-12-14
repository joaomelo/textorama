module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:vue/vue3-recommended", "standard", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  globals: {
    showOpenFilePicker: "readonly",
    showSaveFilePicker: "readonly",
    FileSystemFileHandle: "readonly",
    LaunchParams: "readonly",
    launchQueue: "readonly",
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
