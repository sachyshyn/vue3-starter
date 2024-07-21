import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { type PreRenderedAsset } from 'rollup';

export default defineConfig({
  plugins: [vue()],
  envPrefix: 'APP_',
  server: {
    host: true,
    port: 8080
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo: PreRenderedAsset) => {
          if (!assetInfo.name) {
            return 'assets/[name]-[hash][extname]';
          }

          const extType = assetInfo.name.split('.').pop()!;

          if (/css/.test(extType)) {
            return 'assets/styles/[name]-[hash][extname]';
          }

          if (/woff|woff2|eot|ttf|otf/.test(extType)) {
            return 'assets/fonts/[name][extname]';
          }

          if (/png|jpe?g|svg|gif|ico|webp|avif/.test(extType)) {
            return 'assets/images/[name][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    }
  }
});
