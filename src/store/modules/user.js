import { login } from '@/api/user'
import { setUser, getUser, removeUser } from '@/utils/auth'
const state = () => ({
  user: getUser() || {}
})
const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  removeUser (state) {
    state.user = {}
  }
}
const actions = {
  async login (context, data) {
    const res = await login(data)
    context.commit('setUser', res)
    setUser(res)
  },
  async logout (context) {
    context.commit('removeUser')
    removeUser()
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
