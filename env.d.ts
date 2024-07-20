/// <reference types="vite/client" />

import type { Locale } from '@/shared/lib';

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly APP_API_URL: string;
  readonly APP_DEFAULT_LOCALE: Locale;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
