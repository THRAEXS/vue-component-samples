const orgs = {}
for (let i = 1; i < 5; i++) {
  orgs[`level${i}`] = require(`./data/org-level-${i}.tmp.json`).data
}

module.exports = [
  {
    url: '/api/thraex/org/tree',
    type: 'get',
    response: config => {
      const { level = 3 } = config.query

      return {
        code: 20000,
        data: orgs[`level${level}`]
      }
    }
  }
]
