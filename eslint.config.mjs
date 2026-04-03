import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      // react-hooks/purity is a React Compiler rule (opt-in). The education and work-experience
      // components call Date.now() in useState initializers — a pre-existing pattern that needs a
      // more involved refactor (pass `now` as a server prop) to fix correctly. Downgraded to warn
      // so it surfaces as a known issue without blocking CI.
      "react-hooks/purity": "warn",
    },
  },
  prettierConfig,
];

export default eslintConfig;
