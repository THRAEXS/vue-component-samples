const projects = require('./data/projects.tmp.json').data
const { pagination } = require('../utils')

const labels = ['勘探', '开发', '工程', '海外', '信息', '综合', '天然气']
const types = []
for (let i = 0, len = labels.length; i < len; i++) {
  types.push({
    id: `id-${i}`,
    name: labels[i],
    code: `dict_project_statistics_types_${i}`,
    value: `${i}`
  })
}

function toLabel(values) {
  if (!values) return []

  if (typeof values === 'string') {
    values = [values]
  }

  return types.filter(it => values.includes(it.value)).map(it => it.name)
}

module.exports = [
  {
    url: '/api/thraex/project/page',
    type: 'get',
    response: config => {
      const { page, size, params = {}} = config.query
      console.debug(params)
      const {
        projectOrgId,
        projectName,
        dictProjectStatisticsTypeList: types,
        dictProjectStatusList: status
      } = params

      // Mock select
      const orgProjects = projectOrgId
        ? projects.filter(it => it.projectOrgId === projectOrgId)
        : projects

      const nameProjects = projectName
        ? orgProjects.filter(it => it.projectName && it.projectName.includes(projectName))
        : orgProjects

      const stas = status ? typeof status === 'string' ? [status] : status : []
      const statusProjects = stas.length > 0
        ? nameProjects.filter(it => stas.includes(it.dictProjectStatus))
        : nameProjects

      const labels = toLabel(types)
      const list = labels.length > 0
        ? statusProjects.filter(it => labels.includes(it.dictProjectStatisticsType))
        : statusProjects

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
  },
  {
    url: '/api/thraex/project/types',
    type: 'get',
    response: () => {
      return { code: 20000, data: types }
    }
  }
]
