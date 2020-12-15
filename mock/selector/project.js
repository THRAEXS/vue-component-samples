const projects = require('./data/projects.tmp.json').data
const { pagination } = require('../utils')

module.exports = [
  {
    url: '/api/thraex/project/page',
    type: 'get',
    response: config => {
      const { page, size, params: { projectOrgId, projectName }} = config.query
      // console.debug({ projectOrgId, projectName })

      // Mock select
      const list = projectName
        ? projects.filter(it => it.projectName && it.projectName.includes(projectName))
        : projects

      list.forEach(it => (it.unionOrgName = '院内参加单位, '.repeat(10)))

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
    response: config => {
      const { ids } = config.query

      return {
        code: 20000,
        data: projects.filter(it => ids.includes(it.id))
      }
    }
  }
]
