import defineConfig from "../eslint.config.js";

export default defineConfig([
  {
    // overrides
    rules: {
      files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
      'import/no-extraneous-dependencies': ['error', {packageDir: ['.', '..']}]
    }
  }
])