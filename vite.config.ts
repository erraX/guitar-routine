import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	assetsInclude: ['**/*.m4a'],
	plugins: [react(), eslintPlugin({ cache: false, throwOnError: false })],
});
