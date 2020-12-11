const projects = require('./data/projects.tmp.json').data
const { pagination } = require('../utils')

module.exports = [
  {
    url: '/api/thraex/project/page',
    type: 'get',
    response: config => {
      const { page, size } = config.query

      const list = [...projects]

      return {
        code: 20000,
        data: pagination(page, size, list),
        total: list.length
      }
    }
  },
  {
    url: '/api/thraex/project/ids',
    type: 'get',
    response: () => ({ code: 20000, data: projects })
  }
]
