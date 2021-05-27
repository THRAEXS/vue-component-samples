import request from '@/utils/request'

export function serverTime() {
  return request({
    url: '/api/thraex/server/time',
    method: 'get'
  })
}

export function boardrooms() {
  return request({
    url: '/api/thraex/boardrooms',
    method: 'get'
  })
}
