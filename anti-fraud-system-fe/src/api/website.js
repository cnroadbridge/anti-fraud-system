import request from '@/utils/request'

export function put(id, data) {
  return request({
    url: `/website/${id}`,
    method: 'put',
    data
  })
}

export function get(params) {
  return request({
    url: '/website',
    method: 'get',
    params
  })
}
