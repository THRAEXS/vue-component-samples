import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function all() {
  return request({
    url: '/api/thraex/user/all',
    method: 'GET'
  })
}

export function page(params) {
  return request({
    url: '/api/thraex/user/page',
    method: 'GET',
    params,
    paramsSerializer: p => qs.stringify(p)
  })
}
