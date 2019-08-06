import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 产品级别提示  上线阶段(true)  开发阶段(false)
import '@/styles/index.less'
import axios from '@/api'

import myBread from '@/components'
Vue.use(myBread)
Vue.prototype.$https = axios

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
