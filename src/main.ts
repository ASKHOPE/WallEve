import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css' // Keep global styles

const app = createApp(App)

app.use(router)

app.mount('#app')
