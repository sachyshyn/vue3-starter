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
      // add target 'es2015' for compatibility with older browsers
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo: PreRenderedAsset) => {
            const assetPaths = {
              default: 'assets/[name]-[hash][extname]',
              styles: 'assets/styles/[name]-[hash][extname]',
              fonts: 'assets/fonts/[name][extname]',
              images: 'assets/images/[name][extname]'
            };

            if (!assetInfo.name) {
              return assetPaths.default;
            }

            const extType = assetInfo.name.split('.').pop()!;

            const assetRegexps = {
              styles: /css/,
              fonts: /woff|woff2|eot|ttf|otf/,
              images: /png|jpe?g|svg|gif|ico|webp|avif/
            };

            if (assetRegexps.styles.test(extType)) {
              return assetPaths.styles;
            }

            if (assetRegexps.fonts.test(extType)) {
              return assetPaths.fonts;
            }

            if (assetRegexps.images.test(extType)) {
              return assetPaths.images;
            }

            return assetPaths.default;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js'
        }
      }
    }
  };
});
