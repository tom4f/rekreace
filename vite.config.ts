import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

enum ServerUrl {
  LOCALHOST = 'http://localhost:80',
  LIVE = 'https://www.frymburk.com',
}

const dev = process.env.NODE_ENV !== 'production';

const target = dev ? ServerUrl.LOCALHOST : '';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/rekreace/',
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]_[hash:base64:2]',
    },
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
      '/rekreace/aktuality_big_graph.php': {
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
