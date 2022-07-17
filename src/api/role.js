import request from '@/utils/request'

/**
 * 获取所有的角色列表
 * @returns
 */
export const getRoles = () => {
  return request({
    url: 'roles'
  })
}

/**
 * 获取所有的权限列表
 * @param {值 list 或 tree , list 列表显示权限, tree 树状显示权限} type
 * @returns
 */
export const getPermList = (type) => {
  return request({
    url: `rights/${type}`
  })
}
/**
 *添加角色
 * @param {*} data
 * @returns
 */
export const addRoles = (data) => {
  return request({
    url: 'roles',
    method: 'POST',
    data
  })
}

/**
 * 角色授权
 * @param {roleId:角色ID} data
 * @returns
 */
export const assignRoles = ({ roleId, rids }) => {
  return request({
    url: `roles/${roleId}/rights`,
    method: 'POST',
    data: {
      rids
    }
  })
}

/**
 *根据 ID 查询角色 详情
 * @param {*} id
 * @returns
 */
export const getRoleById = (id) => {
  return request({
    url: `roles/${id}`
  })
}

/**
 * 编辑角色
 * @param {*} data
 * @returns
 */
export const editRole = (data) => {
  return request({
    url: `roles/${data.roleId}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除角色
 * @param {*} data
 * @returns
 */
export const delRole = (id) => {
  return request({
    url: `roles/${id}`,
    method: 'DELETE'
  })
}

/**
 *删除角色指定权限
 * @param {*} param0
 * @returns
 */
export const delRolePerm = ({ roleId, rightId }) => {
  return request({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'DELETE'
  })
}
