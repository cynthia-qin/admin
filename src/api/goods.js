import request from '@/utils/request'

/**
 *获取所有的商品列表
 * @param {*} params
 * @returns
 */
export const getGoodsList = (params) => {
  return request({
    url: 'goods',
    params
  })
}

/**
 * 添加商品
 * @param {*} data
 * @returns
 */
export const addGoods = (data) => {
  return request({
    url: 'goods',
    method: 'POST',
    data
  })
}
/**
 * 根据ID获取商品信息
 * @param {*} id
 * @returns
 */
export const geGoodsById = (id) => {
  return request({
    url: `goods/${id}`
  })
}
/**
 * 根据ID获取商品信息
 * @param {*} id
 * @returns
 */
export const delGoodsById = (id) => {
  return request({
    url: `goods/${id}`,
    method: 'DELETE'
  })
}
