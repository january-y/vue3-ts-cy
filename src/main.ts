import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'normalize.css'
import '@/assets/css/index.less'
// message组件不会自动导入样式
import 'element-plus/theme-chalk/el-message.css'
import pinia from './store'
import useLoginStore from '@/store/login/index'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const Mitt = mitt()
// TypeScript注册，必须注册ComponentCustomProperties类型才能获得类型提示
declare module 'vue' {
  export interface ComponentCustomProperties {
    mitt: typeof Mitt
  }
}
app.config.globalProperties.mitt = Mitt

app.use(pinia)
const loginStore = useLoginStore()
loginStore.loadLocalCacheAction()
app.use(router)
app.mount('#app')
