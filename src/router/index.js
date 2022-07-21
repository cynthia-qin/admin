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
      }
    ]
  },
  {
    path: '/users',
    name: 'users',
    component: Layout,
    meta: {
      title: '用户管理'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/Users'),
        meta: {
          title: '用户列表'
        }
      }
    ]
  },
  {
    path: '/rights',
    name: 'rights',
    component: Layout,
    meta: {
      title: '权限管理'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/rights'),
        meta: {
          title: '权限列表'
        }
      }
    ]
  },
  {
    path: '/roles',
    name: 'roles',
    component: Layout,
    meta: {
      title: '权限管理'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/roles'),
        meta: {
          title: '角色列表'
        }
      }
    ]
  },
  {
    path: '/goods',
    name: 'goods',
    component: Layout,
    meta: {
      title: '商品管理'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/goods'),
        meta: {
          title: '商品列表'
        }
      },
      {
        path: 'add',
        name: 'addGoods',
        component: () => import('@/views/addGoods'),
        meta: {
          title: '添加商品'
        }
      }
    ]
  },
  {
    path: '/params',
    name: 'params',
    component: Layout,
    meta: {
      title: '商品管理'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/params'),
        meta: {
          title: '分类参数'
        }
      }
    ]
  },
  {
    path: '/categories',
    name: 'categories',
    component: Layout,
    meta: {
      title: '商品管理'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/categories'),
        meta: {
          title: '商品分类'
        }
      }
    ]
  },
  {
    path: '/orders',
    name: 'orders',
    component: Layout,
    meta: {
      title: '订单管理'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/orders'),
        meta: {
          title: '订单列表'
        }
      }
    ]
  },
  {
    path: '/reports',
    name: 'reports',
    component: Layout,
    meta: {
      title: '数据统计'
    },
    children: [
      {
        path: '',
        component: () => import('@/views/reports'),
        meta: {
          title: '数据报表'
        }
      }
    ]
  }
]

const router = new VueRouter({
  // base: '/hm-admin/',
  routes
})

export default router
