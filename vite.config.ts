import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';

const resolveCur = (...paths: string[]) => resolve(__dirname, ...paths);

// https://vitejs.dev/config/
export default defineConfig({
	assetsInclude: ['**/*.m4a'],
  resolve: {
    alias: {
      '@': resolveCur('./src'),
      '@common': resolveCur('./src/common'),
    },
  },
	plugins: [react(), eslintPlugin({ cache: false, throwOnError: false })],
});
