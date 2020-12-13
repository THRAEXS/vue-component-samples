const components = require.context('./packages', true, /\w+\/index.js$/)

const names = []
const modules = {}

components.keys().forEach(it => {
  const { default: module } = components(it)
  names.push(module.name)
  modules[module.name] = (module)
})

const install = Vue => names.forEach(name => Vue.component(name, modules[name]))

export default { install, ...modules }
