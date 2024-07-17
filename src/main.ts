import '@/shared/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

const app = createApp(App)

app.use(createPinia())
app.use(
  createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: []
  })
)

app.mount('#app')
