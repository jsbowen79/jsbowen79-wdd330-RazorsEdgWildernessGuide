import js from "@eslint/js";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  js.configs.recommended,

  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        fetch: "readonly",
        console: "readonly",
        alert: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        requestAnimationFrame: "readonly",
        setTimeout: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
