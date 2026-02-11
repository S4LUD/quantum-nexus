// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'dist/**',
      'build/**',
      '.expo-build/**',
      'privacy-policy/dist/**',
      'quantum-nexus-server/dist/**',
      'node_modules/**',
    ],
  },
]);
