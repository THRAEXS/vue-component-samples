/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {Number} page
 * @param {Number} size
 * @param {Array} list
 */
function pagination(page, size, list) {
  if (typeof page === 'string') page = Number.parseInt(page)
  if (typeof size === 'string') size = Number.parseInt(size)

  const total = list.length
  const offset = (page - 1) * size
  const begin = offset + size

  return begin >= total ? list.slice(offset, total) : list.slice(offset, begin)
}

module.exports = {
  param2Obj,
  pagination
}
