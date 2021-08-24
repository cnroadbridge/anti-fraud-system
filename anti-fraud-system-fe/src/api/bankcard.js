import request from '@/utils/request'

export function post(data) {
  return request({
    url: '/bankcard',
    method: 'post',
    data
  })
}

export function put(id, data) {
  return request({
    url: `/bankcard/${id}`,
    method: 'put',
    data
  })
}

export function get(params) {
  return request({
    url: '/bankcard',
    method: 'get',
    params
  })
}
