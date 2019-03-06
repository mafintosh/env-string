var tape = require('tape')
var env = require('./')

tape('inlines env', function (t) {
  var map = {WORLD: 'world'}

  t.same(env('hello $WORLD', map), 'hello world')
  t.same(env('hello ${WORLD}', map), 'hello world')
  t.same(env('hello $WORLD-world', map), 'hello world-world')
  t.same(env('hello ${WORLD:-verden}', map), 'hello world')
  t.same(env('hello ${VERDEN:-world}', map), 'hello world')
  t.same(env('hello $VERDEN', map), 'hello ')
  t.end()
})

tape('inlines env array', function (t) {
  var maps = [{FOO: 'foo'}, {BAR: 'bar'}]

  t.same(env('hello $FOO $BAR $BAZ', maps), 'hello foo bar ')
  t.end()
})

tape('does not inline escaped', function (t) {
  var map = {WORLD: 'world'}

  t.same(env('hello \\$WORLD', map), 'hello $WORLD')
  // JS/shell sees two backslashes (\\)
  t.same(env('hello \\\\$WORLD', map), 'hello \\\\world')
  t.same(env('hello \\${WORLD}', map), 'hello ${WORLD}')
  t.same(env('hello \\$WORLD-world', map), 'hello $WORLD-world')
  t.same(env('hello \\${WORLD:-verden}', map), 'hello ${WORLD:-verden}')
  t.same(env('hello \\${VERDEN:-world}', map), 'hello ${VERDEN:-world}')
  t.same(env('hello \\$VERDEN', map), 'hello $VERDEN')
  // JS/shell sees 3 backslashes (\\\), 2 should remain (\\)
  t.same(env('hello \\\\\\$VERDEN', map), 'hello \\\\$VERDEN')
  t.same(env('hello \\\\\\\\\\\\\\$VERDEN', map), 'hello \\\\\\\\\\\\$VERDEN')
  t.end()
})
