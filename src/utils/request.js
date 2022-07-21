import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTime } from '@/utils/auth'
import router from '@/router'
const request = axios.create({
  baseURL: 'http://liufusong.top:8899/api/private/v1/',
  timeout: 5000
})
// 添加请求拦截器
request.interceptors.request.use((config) => {
  const token = store.state.user.user.token
  if (store.state.user.user && token) {
    const time = Date.now() - getTime() - 0
    const maxTime = 2 * 60 * 60 * 1000
    if (time > maxTime) {
      Message.error('登录过期')
      store.dispatch('user/logout')
      router.push('/login')
    }
    config.headers.Authorization = token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response) => {
  const { data, meta: { msg, status } } = response.data
  if (status === 200 || status === 201) {
    return data
  } else {
    Message.error(msg)
    return Promise.reject(new Error(msg))
  }
}, (err) => {
  return Promise.reject(err)
})
export default request
