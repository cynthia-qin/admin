const USERINFO = 'userinfo'
export const setUser = (data) => {
  return window.localStorage.setItem(USERINFO, JSON.stringify(data))
}
export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USERINFO))
}
export const removeUser = () => {
  return window.localStorage.removeItem(USERINFO)
}
