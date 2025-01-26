const { defineConfig } = await import(
  process.env.NODE_ENV === 'test' ? 'vitest/config' : 'vite'
);
import react from '@vitejs/plugin-react-swc';
import path from 'path';

enum ServerUrl {
  LOCALHOST = 'http://localhost:80',
  LIVE = 'https://www.frymburk.com',
}

const dev = process.env.NODE_ENV !== 'production';

const target = dev ? ServerUrl.LOCALHOST : '';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, './src/components'),
      images: path.resolve(__dirname, './src/images'),
      api: path.resolve(__dirname, './src/api'),
      features: path.resolve(__dirname, './src/features'),
      utils: path.resolve(__dirname, './src/utils'),
      pages: path.resolve(__dirname, './src/pages'),
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
  },
  server: {
    proxy: {
      '/davis': {
        target,
        changeOrigin: true,
      },
      '/kamera': {
        target,
        changeOrigin: true,
      },
      '/rekreace/api': {
        target,
        changeOrigin: true,
      },
      '/api': {
        target,
        changeOrigin: true,
      },
      '/rekreace/graphs': {
        target,
        changeOrigin: true,
      },
      '/rekreace/fotogalerie_ubytovani': {
        target,
        changeOrigin: true,
      },
      '/rekreace/get_ip_kamera.php': {
        target,
        changeOrigin: true,
      },
    },
  },
});
