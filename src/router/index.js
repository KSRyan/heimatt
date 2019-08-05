import Vue from 'vue'
import VueRouter from 'vue-router'
import loginCom from '@/views/login'
import HomeCom from '@/views/home'
import Welcome from '@/views/welcome'
import Content from '@/views/content'
import Notfind from '@/views/notfind'
import persnalSet from '@/views/set'
import store from '@/store'
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
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/content', name: 'content', component: Content },
        { path: '/setting', name: 'setting', component: persnalSet }
      ]
    },
    { path: '*', name: '404', component: Notfind }
  ]
})
// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
