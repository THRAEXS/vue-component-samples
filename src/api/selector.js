import request from '@/utils/request'
import qs from 'qs'

export function getUserPage(params) {
  return request({
    url: '/api/thraex/user/page',
    method: 'GET',
    params,
    paramsSerializer: p => qs.stringify(p)
  })
}

export function getUserByIds(ids) {
  return request({
    url: '/api/thraex/user/ids',
    method: 'GET',
    params: { ids }
  })
}

export function getProjectPage(params) {
  return request({
    url: '/api/thraex/project/page',
    method: 'GET',
    params,
    paramsSerializer: p => qs.stringify(p)
  })
}

export function getProjectByIds(ids) {
  return request({
    url: '/api/thraex/project/ids',
    method: 'GET',
    params: { ids }
  })
}
