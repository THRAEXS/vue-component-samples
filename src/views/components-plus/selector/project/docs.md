`false`

<case-1 />

**sdf**

- [ ] 1
- [ ] 2
- [X] 3

``` js
export function importAll(modules) {
  const components = {}

  modules.keys().forEach(it => (components[removeSuffix(it)] = modules(it).default))

  return components
}

export function removeSuffix(name) {
  return name.split('/').pop().replace(/\.\w+$/, '')
}
```

| C1 | C2 | C3 |
| -- | -- | -- |
| 1 | 2 | 3 |
| 1 | 2 | 3 |


## Case 1

**Demo**

**Code**

## Case 2

<case-2 />

**Demo**

**Code**

## Case 3

<case-3 />

**Demo**

**Code**

## Attributes desc

<case-1 />
