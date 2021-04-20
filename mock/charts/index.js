const source = require('./flows.tmp.json').data

const tmp = require('../../bars.tmp/data')

const data = collation(source)

function log() {
  Boolean(process.argv[2]) && console.log(...arguments)
}

function collation(data) {
  const result = []
  log('A total of %d process models.', data.length, '\n')

  data.forEach((it, ind) => {
    const { defKey: key, defName: name, processInsts: instances } = it
    const ilen = instances.length
    console.log('------------------------------------------------------------------------')
    console.log('Key: %s, Name: %s, Instances:', key, name, ilen)

    const taskCount = instances.reduce((a, b) => a + b.data.length, 0)
    console.log('Task total: ', taskCount)

    if (ilen > 0) {
      // const subs = []
      // result.push({ key, name, instances })

      instances.forEach(({ processInstId: id, data: tasks }) => {
        const count = tasks.length
        if (count > 1) {
          log('**********************************************************************')
          log('Instance id: %s, tasks: ', id, count)

          const timeStamps = tasks.map(({ handleTime }) => Date.parse(handleTime))
          log(timeStamps)
          const start = timeStamps.slice(0, timeStamps.length - 1)
          const end = timeStamps.slice(1)
          const diff = end.map((e, i) => (e - start[i]) / 1000)
          log(diff)
          const value = diff.reduce((a, b) => a + b) / count

          result.push({
            id,
            key,
            name,
            value
          })
        } else {
          log('The number of instance(%s) tasks is:', id, count)
        }
      })

      // result.push(subs)
    } else {
      console.warn('The number of %s(%s) instances is:', key, name, ilen)
    }

    // insts.forEach(({ processInstId: id, taskTotal, data: tasks }) => {
    //   if (taskTotal > 1) {
    //     console.log('**********************************************************************')
    //     console.log(id, taskTotal)

    //     const times = tasks.map(({ handleTime }) => (handleTime))
    //     console.log(times)
    //     const timeStamps = tasks.map(({ handleTime }) => Date.parse(handleTime))
    //     console.log(timeStamps)
    //     const start = timeStamps.slice(0, timeStamps.length - 1)
    //     const end = timeStamps.slice(1)
    //     const diff = end.map((e, i) => e - start[i])
    //     console.log(diff)
    //     diff.forEach(d => console.log(d / 1000))
    //   }
    // })
  })

  return result
}

module.exports = [
  {
    url: '/api/thraex/flows',
    type: 'get',
    response: () => ({ code: 20000, data })
  }
]
