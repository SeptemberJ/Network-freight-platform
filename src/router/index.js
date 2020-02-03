import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import Home from '@/pages/Home'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      meta: {requireAuth: false}
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {requireAuth: false}
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {requireAuth: false}
    },
    {path: '*', redirect: '/Index'}
  ]
})

// 登录控制
// router.beforeEach((to, from, next) => {
//   if (to.name === 'Login') {
//     localStorage.clear('vuex-along')
//     store.dispatch('changeLocationIdx', 0)
//     store.dispatch('changeSiderIdx', '1-1')
//     clearCookie('btwccy_cookie')
//   }
//   if (to.meta.requireAuth) {
//     if (getCookie('btwccy_cookie')) {
//       // 登陆后可以跳转
//       next()
//     } else {
//       localStorage.clear()
//       next({
//         path: '/Login'
//       })
//     }
//   } else {
//     next()
//   }
// })
export default router
