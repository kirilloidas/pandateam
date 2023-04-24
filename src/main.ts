import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())

app.use(router)

console.log(import.meta.env.BASE_URL)

app.mount('#app')
