import Vue from 'vue'
import VueRouter from 'vue-router'
import loginCom from '@/views/login'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // $router.push('/login)
    // $router.push({name:'login})
    { path: '/login', name: 'login', component: loginCom }
  ]
})
export default router
