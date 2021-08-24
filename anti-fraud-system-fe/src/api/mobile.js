import request from '@/utils/request'

export function put(id, data) {
  return request({
    url: `/mobile/${id}`,
    method: 'put',
    data
  })
}
