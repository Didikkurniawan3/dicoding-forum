import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginCypress from 'eslint-plugin-cypress/flat';
import daStyle from 'eslint-config-dicodingacademy';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.vitest, // ✅ Tambahkan ini
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginCypress.configs.recommended,
  daStyle,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'react/react-in-jsx-scope': 'off', 
    },
  },
];
