import request from '@/utils/request'

export function put(id, data) {
  return request({
    url: `/virtual/${id}`,
    method: 'put',
    data
  })
}
