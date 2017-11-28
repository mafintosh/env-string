# env-string

Inlines env vars in a string that contains $NAME expressions

```
npm install env-string
```

[![Build Status](https://travis-ci.org/mafintosh/env-string.svg?branch=master)](https://travis-ci.org/mafintosh/env-string)

## Usage

``` js
var env = require('env-string')
var map = {WORLD: 'world'}

// supports $NAME
console.log(env('hello $WORLD', map)) // 'hello world'

// supports ${NAME}
console.log(env('hello ${WORLD}', map)) // 'hello world'

// supports $NAME-something-else
console.log(env('hello $WORLD-world', map)) // 'hello world-world'

// supports ${NAME:-default-value}
console.log(env('hello ${VERDEN:-world}', map)) // 'hello world'

// vars default to ''
console.log(env('hello $VERDEN', map)) // 'hello '
```

## License

MIT
