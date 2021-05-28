import request from '@/utils/request'

export function serverTime() {
  return request({
    url: '/api/thraex/server/time',
    method: 'get'
  })
}

export function getBoardrooms() {
  return request({
    url: '/api/thraex/boardrooms',
    method: 'get'
  })
}

export function getEvents(date) {
  return request({
    url: '/api/thraex/boardrooms/events',
    method: 'get',
    params: { date }
  })
}
