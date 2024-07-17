function getEnvironmentVariable(key: string) {
  const environmentVariable = import.meta.env[key]

  if (environmentVariable === undefined) {
    throw new Error(`Environment variable "${key}" is not set`)
  }

  return environmentVariable
}

export const APP_API_URL = getEnvironmentVariable('APP_API_URL')
