import request from '@/utils/request'

export function post(data) {
  return request({
    url: '/file',
    method: 'post',
    data
  })
}

export function put(id, data) {
  return request({
    url: `/file/${id}`,
    method: 'put',
    data
  })
}

export function get(params) {
  return request({
    url: '/file',
    method: 'get',
    params
  })
}

export function getByIds(data) {
  return request({
    url: '/file/getall',
    method: 'post',
    data
  })
}
