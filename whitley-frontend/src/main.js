import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
/** Element Plus  */
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const app = createApp(App)

app.use(router).use(ElementPlus).mount('#app')
