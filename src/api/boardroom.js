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

export function save(data) {
  return request({
    url: '/api/thraex/boardrooms',
    method: 'post',
    data
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

export function getOrg() {
  return request({ url: '/api/thraex/org/tree', method: 'GET', params: { level: 3 }})
}

export function getBooksByDate(day) {
  return request({
    url: '/api/thraex/boardrooms/events',
    method: 'get',
    params: { day }
  })
}
