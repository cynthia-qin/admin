import request from '@/utils/request'
/**
 * 获取所有的分类数据列表
 * 如果不传参默认获取所有列表
 * @param {type:级别,pagenum,pagesize} params
 * @returns
 */
export const getAllCategories = (params) => {
  return request({
    url: 'categories',
    params
  })
}
/**
 * 获取商品参数
 * @param {*} id
 * @param {*} sel
 * @returns
 */
export const getGoodsAttr = (id, sel) => {
  return request({
    url: `categories/${id}/attributes?sel=${sel}`
  })
}
/**
 *上传图片
 * @param {*} file
 * @returns
 */
export const uploadImage = (file) => {
  return request({
    url: 'upload',
    method: 'POST',
    file
  })
}
/**
 * 添加动态参数或者静态属性
 * @param {*} data
 * @returns
 */
export const addCategories = (data) => {
  return request({
    url: `categories/${data.id}/attributes`,
    method: 'POST',
    data
  })
}
/**
 * 删除参数
 * @param {*} id
 * @param {*} attrid
 * @returns
 */
export const delCategories = (id, attrid) => {
  return request({
    url: `categories/${id}/attributes/${attrid}`,
    method: 'DELETE'
  })
}
/**
 * 编辑提交参数
 * @param {*} data
 * @returns
 */
export const editCategories = (data) => {
  return request({
    url: `categories/${data.id}/attributes/${data.attrId}`,
    method: 'PUT',
    data
  })
}
/**
 * 根据ID查询参数
 * @param {*} params
 * @returns
 */
// eslint-disable-next-line camelcase
export const getCategoriesById = ({ id, attrId, attr_sel }) => {
  return request({
    url: `categories/${id}/attributes/${attrId}`,
    params: {
      attr_sel
    }
  })
}

/**
 * 添加商品分类
 * @param {*} data
 * @returns
 */
export const addCategory = (data) => {
  return request({
    url: 'categories',
    method: 'POST',
    data
  })
}
/**
 * 删除商品分类
 * @param {*} id
 * @returns
 */
export const delCategory = (id) => {
  return request({
    url: `categories/${id}`,
    method: 'DELETE'
  })
}
