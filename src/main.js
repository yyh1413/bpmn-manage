import './assets/main.css'
import '@/styles/tailwind.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vue-global-api'
import store from './store'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)

app.mount('#app')
