import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { type PreRenderedAsset } from 'rollup';

export default defineConfig(({ mode }) => {
  const ENV_PREFIX = 'APP_';
  const env = loadEnv(mode, process.cwd(), ENV_PREFIX);
  const DEFAULT_PORT = 3000;

  return {
    plugins: [vue()],
    envPrefix: ENV_PREFIX,
    server: {
      host: true,
      port: env.APP_PORT ? Number(env.APP_PORT) : DEFAULT_PORT
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
  };
});
