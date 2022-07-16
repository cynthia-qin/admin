import request from '@/utils/request'

/**
 * 发起登录请求
 * @param {username:用户名 password:密码} data
 * @returns
 */
export const login = (data) => {
  return request({
    url: 'login',
    method: 'POST',
    data
  })
}

/**
 * 查询用户数据列表
 * @param {pagenum:当前页码 pagesize:每页显示条数} params
 * @returns
 */
export const getUsers = (params) => {
  return request({
    url: 'users',
    params
  })
}

/**
 * 修改用户状态
 * @param {*} param0
 * @returns
 */
export const editState = ({ uId, type }) => {
  return request({
    url: `users/${uId}/state/${type}`,
    method: 'PUT'
  })
}

/**
 * 删除用户
 * @param {*} id
 * @returns
 */
export const delUser = (id) => {
  return request({
    url: `users/${id}`,
    method: 'DELETE'
  })
}

/**
 * 添加用户
 * @param {校验成功的表单数据} data
 * @returns
 */
export const addUser = (data) => {
  return request({
    url: 'users',
    method: 'POST',
    data
  })
}
/**
 * 根据id获取用户信息
 * @param {*} id
 * @returns
 */
export const getUserById = (id) => {
  return request({
    url: `users/${id}`
  })
}

/**
 * 编辑用户
 * @param {*} data
 * @returns
 */
export const editUserById = (data) => {
  return request({
    url: `users/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 * 给用户分配角色
 * @param {id,rid} data
 * @returns
 */
export const assignRoleById = (data) => {
  return request({
    url: `users/${data.id}/role`,
    method: 'PUT',
    data
  })
}
