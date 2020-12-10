const users = require('./data/users.tmp.json')

module.exports = [
  {
    url: '/api/thraex/user/all',
    type: 'get',
    response: () => ({ code: 20000, data: users })
  },
  {
    url: '/api/thraex/user/page',
    type: 'get',
    response: config => {
      const { page, size } = config.query

      const list = [...users]

      const total = list.length
      const offset = (page - 1) * size
      const begin = offset + size
      const data = begin >= total ? list.slice(offset, total) : list.slice(offset, begin)

      return { code: 20000, data, total }
    }
  }
]
