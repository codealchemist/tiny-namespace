'use strict'
const namespace = {}

/**
 * Set data for passed namespace.
 *
 * @param {string} path Namespace string.
 * @param {mixed} data
 * @param {object} ns Namespace reference.
 */
function set (path, data, ns = namespace) {
  const tokens = path.split('.')
  if (!Array.isArray(tokens)) throw new Error(`Invalid path: ${path}`)
  if (tokens.length === 1) {
    ns[tokens] = data
    return namespace
  }

  const token = tokens.shift()
  if (ns[token] === undefined) ns[token] = {}
  return set(tokens.join('.'), data, ns[token])
}

/**
 * Get data from passed namespace.
 *
 * @param {string} path
 * @param {object} ns Namespace reference.
 * @return {mixed}
 */
function get (path, ns) {
  const tokens = path.split('.')
  if (!Array.isArray(tokens)) throw new Error(`Invalid path: ${path}`)
  ns = ns || namespace

  if (tokens.length === 1) {
    return ns[tokens]
  }

  while (tokens.length) {
    const token = tokens.shift()
    if (ns[token] === undefined) return undefined
    const remainingPath = tokens.join('.')
    ns = ns[token]

    return get(remainingPath, ns)
  }
}

function has (path) {
  const value = get(path)
  return (value !== undefined)
}

module.exports = {get, set, has, $: namespace}
