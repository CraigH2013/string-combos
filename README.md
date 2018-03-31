# string-combos
Easily create a combination of strings

## Install

```bash
$ npm install string-combos
```

## Usage

```js
const combos = require('string-combos')

combos('Alice is ' + combos('cool', 'great'))
// => [ 'Alice is cool', 'Alice is great' ]

combos(combos('alice', 'bob') + '-' + combos('charlie', 'dan'))
// => [ 'alice-charlie', 'bob-charlie', 'alice-dan', 'bob-dan' ]

combos(`Alice ${combos('and', 'or')} Bob`)
// => [ 'Alice and Bob', 'Alice or Bob' ]

```
