module.exports = {
   env: {
      browser: true,
      es2021: true,
   },
   extends: [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'airbnb',
      'prettier',
      'prettier/react',
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
   },
   plugins: ['react', '@typescript-eslint', 'prettier'],
   rules: {
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
      'import/prefer-default-export': 'off',
   },
};
