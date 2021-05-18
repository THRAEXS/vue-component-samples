const source = require('./flows.tmp.json').data

// eslint-disable-next-line
const tmp = require('../../bars.tmp/data')

const data = collation(source)

function log() {
  // Boolean(process.argv[2]) && console.log(...arguments)
}

function collation(data) {
  const result = []
  log('A total of %d process models.', data.length, '\n')

  data.forEach((it, ind) => {
    const { defKey: key, defName: name, processInsts: instances } = it
    const ilen = instances.length
    log('------------------------------------------------------------------------')
    log('Key: %s, Name: %s, Instances:', key, name, ilen)

    const taskCount = instances.reduce((a, b) => a + b.data.length, 0)
    log('Task total: ', taskCount)

    if (ilen > 0) {
      let [countTotal, valueTotal] = [0, 0]
      instances.forEach(({ processInstId: id, data: tasks }) => {
        const count = tasks.length
        if (count > 1) {
          log('**********************************************************************')
          log('Instance id: %s, tasks: ', id, count)

          const timestamps = tasks.map(({ handleTime }) => Date.parse(handleTime))
          log('Timestamps:', timestamps)
          const start = timestamps.slice(0, timestamps.length - 1)
          const end = timestamps.slice(1)
          const diff = end.map((e, i) => (e - start[i]) / 1000)
          log('Diff:', diff)
          const value = diff.reduce((a, b) => a + b) / count
          log('Value:', value)

          // result.push({ id, key, name, value })
          countTotal += 1
          valueTotal += value
        } else {
          log('The number of instance(%s) tasks is:', id, count)
        }
      })

      log('Instance num:', ilen, countTotal)
      log('Value total:', valueTotal)
      log('Value:', valueTotal / ilen, valueTotal / countTotal)
      result.push({ key, name, value: valueTotal / countTotal })
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
    url: '/api/thraex/flows/step',
    type: 'get',
    response: config => {
      const { key } = config.query
      const model = source.find(it => it.defKey === key) || {}
      const { processInsts: instance } = model
      const data = instance
        ? instance.map(({ processInstId: id, data: tasks }) => ({ id, tasks })) : []

      return { code: 20000, data }
    }
  },
  {
    url: '/api/thraex/flows',
    type: 'get',
    response: () => ({ code: 20000, data })
  }
]
