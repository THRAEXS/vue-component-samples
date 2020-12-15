export function importAll(modules) {
  const components = {}

  modules.keys().forEach(it => (components[removeSuffix(it)] = modules(it).default))

  return components
}

export function removeSuffix(name) {
  return name.split('/').pop().replace(/\.\w+$/, '')
}
