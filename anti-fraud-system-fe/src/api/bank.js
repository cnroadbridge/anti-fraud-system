import request from '@/utils/request'

export function put(id, data) {
  return request({
    url: `/bank/${id}`,
    method: 'put',
    data
  })
}
