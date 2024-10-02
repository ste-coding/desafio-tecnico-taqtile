import globals from 'globals';
import pluginJs from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unicornPlugin from 'eslint-plugin-unicorn';

export default [
  {
    ignores: ['dist/'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      unicorn: unicornPlugin,
    },
    rules: {
      camelcase: 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase'],
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
      ],

      curly: ['error', 'all'],

      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],

      'prettier/prettier': 'error',
    },
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
];
