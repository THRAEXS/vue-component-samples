import request from '@/utils/request'

export function getFunding() {
  return request({
    url: '/api/thraex/funding',
    method: 'get'
  })
}

export function getFundingFinal() {
  return request({
    url: '/api/thraex/funding/final',
    method: 'get'
  })
}
