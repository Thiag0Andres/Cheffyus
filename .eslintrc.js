module.exports = {
   env: {
      browser: true,
      es2021: true,
   },
   extends: [
      'plugin:react/recommended',
      'airbnb',
      'prettier',
      'prettier/react',
   ],
   parser: ['@typescript-eslint/parser', 'babel-eslint'],
   parserOptions: {
      ecmaFeatures: {
         jsx: true,
         tsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
   },
   plugins: ['react', '@typescript-eslint', 'prettier'],
   rules: {
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
      'react/tsx-filename-extension': ['warn', { extensions: ['.tsx', '.ts'] }],
      'import/prefer-default-export': 'off',
   },
};
