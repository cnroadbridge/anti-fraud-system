import request from '@/utils/request'

export function post(data) {
  return request({
    url: '/alarm',
    method: 'post',
    data
  })
}

export function put(id, data) {
  return request({
    url: `/alarm/${id}`,
    method: 'put',
    data
  })
}

export function get(params) {
  return request({
    url: '/alarm',
    method: 'get',
    params
  })
}
