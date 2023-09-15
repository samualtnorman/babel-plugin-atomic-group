# babel-plugin-atomic-group
Atomic groups are a regular expression feature that let you write more performant regular expressions by having less
backtracking. [Read more about them.](https://www.regular-expressions.info/atomic.html)

This plugin transpiles atomic groups in your regular expressions into a capturing group inside a positive lookahead
and a backreference which work identically to how atomic groups work in other languages that support them. [Learn more
about this trick.](https://blog.stevenlevithan.com/archives/mimic-atomic-groups)

## In
```js
let myRegex = /a(?>bc|b)c/
```

## Out
```js
let myRegex = /a(?=(bc|b))\1c/
```
