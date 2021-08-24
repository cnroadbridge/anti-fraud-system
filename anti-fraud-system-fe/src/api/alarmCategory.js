import request from '@/utils/request'

export function post(data) {
  return request({
    url: '/alarmCategory',
    method: 'post',
    data
  })
}

export function put(id, data) {
  return request({
    url: `/alarmCategory/${id}`,
    method: 'put',
    data
  })
}

export function get(params) {
  return request({
    url: '/alarmCategory',
    method: 'get',
    params
  })
}
