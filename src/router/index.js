import Vue from 'vue'
import VueRouter from 'vue-router'
import loginCom from '@/views/login'
import HomeCom from '@/views/home'
import Welcome from '@/views/welcome'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // $router.push('/login)
    // $router.push({name:'login})
    { path: '/login', name: 'login', component: loginCom },
    {
      path: '/',
      component: HomeCom,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]
    }
  ]
})
export default router
