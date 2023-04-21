import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { getHourlyForecast } from './api/services/weather'

const app = createApp(App)

app.use(createPinia())

app.use(router)

// getHourlyForecast(2643743)

getHourlyForecast(2643743)

app.mount('#app')
