const projects = require('./data/projects.tmp.json').data
const { pagination } = require('../utils')

module.exports = [
  {
    url: '/api/thraex/project/page',
    type: 'get',
    response: config => {
      const { page, size, params = {}} = config.query
      const { projectOrgId, projectName } = params
      // console.debug({ projectOrgId, projectName })

      // Mock select
      const orgProjects = projectOrgId
        ? projects.filter(it => it.projectOrgId === projectOrgId)
        : projects

      const list = projectName
        ? orgProjects.filter(it => it.projectName && it.projectName.includes(projectName))
        : orgProjects

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
      const { ids = [] } = config.query

      return {
        code: 20000,
        data: projects.filter(it => ids.includes(it.id))
      }
    }
  }
]
