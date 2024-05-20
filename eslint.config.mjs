import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }], // Ignore `next` in Express middlewares
      'consistent-return': 'error',
      'prefer-const': 'error',
      'no-console': 'warn'
    }
  }
]
