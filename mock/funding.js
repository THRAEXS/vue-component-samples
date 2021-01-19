const data = {
  dicts: [],
  fundsNames: [],
  orgs: [
    { orgCode: 'P200', orgName: '中国天然气集团科学技术研究院有限公司' },
    { orgCode: 'C000', orgName: '邢台宗教管理局' },
    { orgCode: 'C500', orgName: '西北宗教管理局' },
    { orgCode: 'C100', orgName: '西南宗教管理局' }
  ],
  year: []
}

const dicts = {}
for (let i = 0; i < 100; i++) {
  const key = 1000 + i
  dicts[`${key}`] = `科目名称科目名称科目名称-${i + 1}`
}
data.dicts.push(dicts)

const fundTypes = ['总部费用', '投资计划', '地区公司自筹']
fundTypes.forEach((fundsName, ind) => data.fundsNames.push({ fundsCode: `${2429 + ind}`, fundsName }))

for (let i = 0; i < 6; i++) {
  data.year.push(2017 + i)
}

const deepClone = data => JSON.parse(JSON.stringify(data))

function getFinalData() {
  const { dicts: [dicts], fundsNames: fundTypes, orgs, year: years } = data

  const fundType = {}
  fundTypes.forEach(({ fundsCode, fundsName }, ind) => (
    fundType[fundsName] = { funding: (ind + 1) * 100, spending: (ind + 1) * 100 / 2, id: '', fundsCharacter: fundsCode }
  ))

  const newOrgs = {}
  orgs.forEach(({ orgCode: code, orgName: name }) => (
    newOrgs[name] = { code, name, fundType: deepClone(fundType) }
  ))

  const newYears = {}
  years.forEach(it => {
    const curOrgs = deepClone(newOrgs)
    Object.values(curOrgs).forEach(o => (o.year = it))
    newYears[it] = curOrgs
  })

  const rows = Object.entries(dicts).map(([code, name]) => ({
    code,
    name,
    years: deepClone(newYears),
    fundingTotal: 10,
    spendingTotal: 20
  }))

  return {
    headers: { fundTypes, orgs, years },
    data: rows
  }
}

const finalData = getFinalData()

module.exports = [
  {
    url: '/api/thraex/funding/final',
    type: 'get',
    response: () => {
      return { code: 20000, data: finalData }
    }
  },
  {
    url: '/api/thraex/funding',
    type: 'get',
    response: () => {
      return { code: 20000, data }
    }
  }
]
