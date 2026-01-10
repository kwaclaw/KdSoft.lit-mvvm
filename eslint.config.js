// eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import css from '@eslint/css';

export default defineConfig([
    js.configs.recommended,

    globalIgnores(['dist', 'build', '**/node_modules']),

    // LINT JavaScript files
    {
        files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.serviceworker
            }
        },
        'plugins': {},
        'rules': {
            "arrow-parens": [
              "warn",
              "as-needed"
            ],
            'class-methods-use-this': 'off',
            'comma-dangle': ['error', 'only-multiline'],
            'curly': 'off',
            'eqeqeq': ['error', 'smart'],
            'function-paren-newline': 'off',
            'guard-for-in': 'off',
            'import/extensions': 'off',
            'import/no-absolute-path': 'off',
            'import/no-mutable-exports': 'off',
            'import/no-unresolved': 'off',
            'indent': ['error', 4, {
                'SwitchCase': 1
            }
            ],
            'linebreak-style': ['error', 'windows'],
            'lines-between-class-members': 'off',
            'max-len': ['warn', {
                'code': 132,
                'ignoreComments': true
            }
            ],
            'no-cond-assign': ['error', 'except-parens'],
            'no-continue': 'off',
            'no-else-return': 'off',
            'no-multi-str': 'off',
            'no-nested-ternary': 'off',
            'no-param-reassign': 'off',
            'no-restricted-syntax': [
              'off',
              'ForOfStatement'
            ],
            'no-underscore-dangle': 'off',
            'no-unused-vars': 'warn',
            'nonblock-statement-body-position': ['error', 'any'],
            "object-curly-newline": [
              "error",
              {
                "ObjectPattern": {
                  "multiline": true
                }
              }
            ],
            'prefer-destructuring': 'off',
            'prefer-template': 'off',
            'quotes': ['error', 'single', {
                'allowTemplateLiterals': true
            }
            ],
            'space-before-function-paren': 'off',
            'spaced-comment': 'off',
            'unicode-bom': 'off'
        }
    },
    // Lint CSS files
    {
        files: ['**/*.css'],
        plugins: { css },
        languageOptions: {
            language: 'css/css',
        },
        extends: ['css/recommended'],
    }
]);
