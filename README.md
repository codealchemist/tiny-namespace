# tiny-namespace
Set and get data on a namespace singleton without using global scope at all.

## Install

`npm install --save tiny-namespace`

## Methods

### set(path, data)

Used to set data on a given namespace.
Returns updated namespace.

Usage:

```
const ns = require('tiny-namespace')
ns.set('space.planets.earth', 'yeah!')
```

Will create or extend an existing namespace.

### get(path)

Will return existing data on the requested path or undefined if the path doesn't exist.

Usage:
```
const ns = require('tiny-namespace')
const value = ns.get('space.planets.earth')
```

### has(path)

Returns true if passed path exists.
False otherwise.

Usage:
```
const ns = require('tiny-namespace')
if (ns.has('space.planets')) {
  // Do something if there are planets.
}
```

## Examples

```
const ns = require('tiny-namespace')
const namespace = ns.set('space.planets.earth', {
  animals: ['dolphins', 'dogs', 'cats']
})
```

`namespace` will equal:
```
{
  space: {
    planets: {
      earth: {
        animals: ['dolphins', 'dogs', 'cats']
      }
    }
  }
}
```

You can later do, on another file:
```
const ns = require('tiny-namespace')
const earthAnimals = ns.get('space.planets.earth.animals')
```

`earthAnimals` will equal:
```
['dolphins', 'dogs', 'cats']
```

And if you ask:
`ns.has('space.planets.earth.animals')`

It will return `true`.

## Namespace access

Normally you would use `ns.get`, but there's also a special property that holds a reference to the whole namespace:
`ns.$`

Let's say you add stuff to your namespace, like:
```
const ns = require('tiny-namespace')
ns.set('space.planets.earth', 'cool')
ns.set('music.tango', 'nice')
ns.set('hi', 'there')
```

You can later access `ns.$` and you'll get:
```
{
  space: {
    planets: {
      earth: 'cool'
    }
  },
  music: {
    tango: 'nice
  },
  hi: 'there'
}
```
