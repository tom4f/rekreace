// 👇 Add this import at the top
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import type { Plugin } from 'vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_API_BASE_URL;

  return {
    plugins: [
      react(),
      sentryVitePlugin({
        authToken: env.SENTRY_AUTH_TOKEN,
        org: 'frymburkcom',
        project: 'javascript-react',
      }),
    ],
    resolve: {
      alias: {
        src: path.resolve(__dirname, './src'),
        components: path.resolve(__dirname, './src/components'),
        images: path.resolve(__dirname, './src/images'),
        api: path.resolve(__dirname, './src/api'),
        features: path.resolve(__dirname, './src/features'),
        utils: path.resolve(__dirname, './src/utils'),
        pages: path.resolve(__dirname, './src/pages'),
        enums: path.resolve(__dirname, './src/enums'),
        stories: path.resolve(__dirname, './src/stories'),
        css: path.resolve(__dirname, './src/css'),
        store: path.resolve(__dirname, './src/store'),

        // 👇 Buffer & Process polyfills
        buffer: 'buffer',
        process: 'process/browser',
      },
    },

    define: {
      // 👇 Define global variables
      'process.env': {},
      global: 'window',
    },

    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
          NodeModulesPolyfillPlugin(),
        ],
      },
    },

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
    },
    base: '/rekreace',
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: '[local]_[hash:base64:2]',
      },
    },
    build: {
      outDir: 'dist/rekreace',
      rollupOptions: {
        plugins: [visualizer() as Plugin],
      },
      sourcemap: true,
    },
    server: {
      host: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
      proxy: {
        '/davis': { target, changeOrigin: true },
        '/kamera': { target, changeOrigin: true },
        '/rekreace/api': { target, changeOrigin: true },
        '/api': { target, changeOrigin: true },
        '/rekreace/graphs': { target, changeOrigin: true },
        '/rekreace/fotogalerie_ubytovani': { target, changeOrigin: true },
        '/rekreace/get_ip_kamera.php': { target, changeOrigin: true },
      },
    },
  };
});
