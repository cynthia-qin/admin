import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/Home')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/Users')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
