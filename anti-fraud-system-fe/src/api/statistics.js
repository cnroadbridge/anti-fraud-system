import request from '@/utils/request'

export function calculate(data) {
  return request({
    url: '/statistics/calculate',
    method: 'post',
    data
  })
}
