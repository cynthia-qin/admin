import request from '@/utils/request'
/**
 * 获取所有的订单数据列表
 * @returns
 */
export const getOrders = (params) => {
  return request({
    url: 'orders',
    params
  })
}
/**
 * 修改订单状态
 * @param {*} data
 * @returns
 */
export const editOrderStatus = (data) => {
  return request({
    url: `orders/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 * 根据ID获取订单详情
 * @param {*} data
 * @returns
 */
export const getOrderStatusById = (id) => {
  return request({
    url: `orders/${id}`
  })
}
