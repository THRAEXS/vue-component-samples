const users = require('./data/users.tmp.json').data
const { pagination } = require('../utils')

module.exports = [
  {
    url: '/api/thraex/user/page',
    type: 'get',
    response: config => {
      const { page, size, params = {}} = config.query
      const { deptId, username } = params
      // console.debug({ deptId, username })

      // Mock select
      const deptUsers = deptId ? users.filter(it => it.deptId === deptId) : users

      const list = username
        ? deptUsers.filter(it =>
          (it.fullName && it.fullName.includes(username)) ||
          (it.username && it.username.includes(username))
        ) : deptUsers

      return {
        code: 20000,
        data: pagination(page, size, list),
        total: list.length
      }
    }
  },
  {
    url: '/api/thraex/user/ids',
    type: 'get',
    response: config => {
      const { ids = [] } = config.query

      return {
        code: 20000,
        data: users.filter(it => ids.includes(it.id))
      }
    }
  }
]
