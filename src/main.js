import Vue from 'vue'
import App from './App.vue'
// 产品级别提示  上线阶段(true)  开发阶段(false)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
