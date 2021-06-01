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

export function getBoardroom(id = '') {
  return request({
    url: `/api/thraex/boardrooms/id/${id}`,
    method: 'get'
  })
}

export function getFormInfo() {
  return request({
    url: `/api/thraex/boardrooms/info`,
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
