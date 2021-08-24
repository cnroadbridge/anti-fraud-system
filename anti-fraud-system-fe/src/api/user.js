import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'post',
    data: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function post(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function put(id, data) {
  return request({
    url: `/user/${id}`,
    method: 'put',
    data
  })
}
