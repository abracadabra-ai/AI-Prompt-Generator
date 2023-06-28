import { createApp } from 'vue'
import './reset.css'
import App from './App.vue'
import router from './router/index.js'
import mitt from 'mitt'
import './element-variables.scss'
const app = createApp(App)

app.config.globalProperties.$bus = mitt()

app.use(router).mount('#app')
