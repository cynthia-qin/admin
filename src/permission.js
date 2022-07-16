import router from './router'
import store from '@/store'
// 路由前置守卫
router.beforeEach((to, from, next) => {
  const token = store.state.user.user.token
  if (token) {
    to.path === '/login' ? next('/') : next()
  } else {
    to.path === '/login' ? next() : next('/login')
  }
  next()
})
