import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { getCurrentForecast, getCurrentForecastForGroup } from './api/services/weather'

const app = createApp(App)

app.use(createPinia())

app.use(router)

getCurrentForecast(524901)

app.mount('#app')
