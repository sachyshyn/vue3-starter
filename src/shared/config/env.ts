import type { Locale } from '../lib';

function getEnvironmentVariable(key: string) {
  const environmentVariable = import.meta.env[key];

  if (environmentVariable === undefined) {
    throw new Error(`Environment variable "${key}" is not set`);
  }

  return environmentVariable;
}

export const APP_API_URL: string = getEnvironmentVariable('APP_API_URL');
export const APP_DEFAULT_LOCALE: Locale = getEnvironmentVariable('APP_DEFAULT_LOCALE');
