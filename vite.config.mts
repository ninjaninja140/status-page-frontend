import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import vike from 'vike/plugin';
import { defineConfig } from 'vite';
import deno from './deno-support/index.ts';


// https://vitejs.dev/config/
export default defineConfig({
		build: {
			manifest: true,
			target: 'esnext',
			sourcemap: false,
			minify: 'esbuild',
			cssCodeSplit: true,
			chunkSizeWarningLimit: 2000,
		},
		server: { hmr: { clientPort: 3030, port: 3030 }, host: true },
		optimizeDeps: {
			exclude: ['node-stdlib-browser'],
		},
		ssr: {
			noExternal: ['buffer'],
		},
		plugins: [
			deno(),
			vike(),
			react(),
			tailwindcss(),
		],
		css: {
			modules: {
				generateScopedName: '[hash:base64:48]',
			},
		},
		resolve: {
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
	});
