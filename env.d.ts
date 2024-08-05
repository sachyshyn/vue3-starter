/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly APP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
