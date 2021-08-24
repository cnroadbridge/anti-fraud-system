import request from '@/utils/request'

export function post(data) {
  return request({
    url: '/organization',
    method: 'post',
    data
  })
}

export function put(id, data) {
  return request({
    url: `/organization/${id}`,
    method: 'put',
    data
  })
}

export function get(params) {
  return request({
    url: '/organization',
    method: 'get',
    params
  })
}

export function getByType(data) {
  return request({
    url: '/organization/by-type',
    method: 'post',
    data
  })
}
