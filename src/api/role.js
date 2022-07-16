import request from '@/utils/request'

export const getRoles = () => {
  return request({
    url: 'roles'
  })
}
