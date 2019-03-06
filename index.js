module.exports = replace

function replace (str, env) {
  return str.replace(/(\\*)\$({)?([a-z0-9_]+)(:-[^}]+)?(})?/gi, replacer(env || {}))
}

function replacer (env) {
  return Array.isArray(env) ? replaceArray : replaceEnv

  function replaceArray (input, escapes, start, key, def, end) {
    if (isEscaped(escapes)) {
      // Only cut off 1 backslash so the shell that the output will probably be sent to can resolve the remaining ones
      // (this way users don't have to triple-escape their stuff)
      return input.slice(1)
    }

    for (var i = 0; i < env.length; i++) {
      if (env[i][key]) return env[i][key]
    }
    return escapes + defaultValue(start, def, end)
  }

  function replaceEnv (input, escapes, start, key, def, end) {
    if (isEscaped(escapes)) {
      return input.slice(1)
    }

    return escapes + (env[key] || defaultValue(start, def, end))
  }

  function defaultValue (start, def, end) {
    return (start && def && end) ? replace(def.slice(2), env) : ''
  }
}

function isEscaped (escapes) {
  return escapes.length % 2 === 1
}
