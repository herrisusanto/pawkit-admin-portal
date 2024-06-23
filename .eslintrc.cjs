module.exports = {
  env: {
    node: true,
  },
  extends: [
    "universe/native",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/order": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
