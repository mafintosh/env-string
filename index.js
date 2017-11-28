module.exports = replace

function replace (str, env) {
  return str.replace(/\$({)?([a-z0-9_]+)(:-[^}]+)?(})?/gi, replacer(env || {}))
}

function replacer (env) {
  return Array.isArray(env) ? replaceArray : replaceEnv

  function replaceArray (_, start, key, def, end) {
    for (var i = 0; i < env.length; i++) {
      if (env[i][key]) return env[i][key]
    }
    return defaultValue(start, def, end)
  }

  function replaceEnv (_, start, key, def, end) {
    return env[key] || defaultValue(start, def, end)
  }

  function defaultValue (start, def, end) {
    return (start && def && end) ? replace(def.slice(2), env) : ''
  }
}
