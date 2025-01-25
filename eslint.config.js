import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: eslintPluginImport,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'import/no-duplicates': 'warn', // Warn if duplicate imports exist from the same source
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Import organization
      'import/order': [
        'warn',
        {
          groups: [
            ['builtin', 'external'], // Node.js modules and external libraries
            ['internal'], // Internal imports (e.g., src/...)
            ['parent', 'sibling', 'index'], // Relative imports
          ],
          'newlines-between': 'always',
        },
      ],
      // Use simple-import-sort for better control
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  }
);
