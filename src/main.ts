import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'normalize.css'
import '@/assets/css/index.less'
// message组件不会自动导入样式
import 'element-plus/theme-chalk/el-message.css'
import pinia from './store'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(pinia)
app.mount('#app')
