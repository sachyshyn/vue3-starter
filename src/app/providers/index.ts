import type { App } from 'vue'
import { createRouterProvider } from './router'
import { createStoreProvider } from './store'

export function applyProviders(app: App<Element>) {
  const providers = [createStoreProvider, createRouterProvider]

  providers.forEach((attachProvider) => {
    attachProvider(app)
  })
}
