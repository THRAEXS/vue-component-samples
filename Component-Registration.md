# 组件注册

> - https://cn.vuejs.org/v2/guide/components-registration.html
> - https://juejin.cn/post/6844903808787546125
> - https://juejin.cn/post/6844904147049775118

## 局部注册

### 定义

`sample-component/index.vue`:

``` html
<template>
  <!-- ... -->
</template>
<script>
export default {
  name: 'SampleComponent',
  // ....
}
</script>
```

Or

`sample-component/index.js`:

``` js
import SampleComponent from './src'

export default SampleComponent
```

### 使用

``` html
<template>
  <sample-component></sample-component>
</template>
<script>
import SampleComponent from 'path-to/sample-component'

export default {
  components: {
    SampleComponent
  },
  // ...
}
</script>
```

## 全局注册

### 定义

`sample-component/index.js`:

``` js
import SampleComponent from './src'

// Required
SampleComponent.install = function(Vue) {
  Vue.component(SampleComponent.name, SampleComponent)
}

export default SampleComponent
```

### 使用

`main.js`:

``` js
import Vue from 'vue'
import SampleComponent from 'path-to/sample-component'

Vue.user(SampleComponent)
```

`other.vue`:
``` html
<template>
  <sample-component></sample-component>
</template>
```

## 组件库

`element-widgets/packages/index.js`:

``` js
import ListSelector from './list-selector'
import TreeSelector from './tree-selector'

const components = [
  ListSelector,
  TreeSelector
]

const install = Vue =>  components.forEach(c => Vue.component(c.name, c))

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// Way 1
export {
  install,
  ListSelector,
  TreeSelector
}

export default { install }

// Or

// Way 2
export default {
  install,
  ListSelector,
  TreeSelector
} 
```

`main.js`:

``` js
import Vue from 'vue'
import ElementWidgets from 'element-widgets'

Vue.use(ElementWidgets)
```

### 关于`export`

**Way 1**与**Way 2**的区别在在于,**Way 1**可以将包括`install`在内的组件单独导出, 然后单独使用: 

- 导出对象大小

``` js
import ElementWidgets from 'element-widgets'

// Way 1: {install: f}
// Way 2: {install: f, TreeSelector, ...}
```

- 组件库全局注册
``` js
// Way 1, Way 2
import ElementWidgets from 'element-widgets'
Vue.use(ElementWidgets)

// Way 1
import { install } from 'element-widgets'
install(Vue)

// Way 2
import ElementWidgets from 'element-widgets'
ElementWidgets.install(Vue)
```

- 按需导入某个组件,并全局注册
``` js
/*Way 1:*/
import { TreeSelector } from 'element-widgets'
Vue.use(TreeSelector)

/*Way 2:*/
import ElementWidgets from 'element-widgets'
Vue.use(ElementWidgets.TreeSelector)
```

### 关于`install`

组件库中的每个组件, 如果需要按需导入, 则必需都提供`install`方法, 有两种方式:

- 1.统一在`element-widgets/packages/index.js`中定义

- 2.每个组件的出口文件(`element-widgets/packages/tree-selector/index.js`)中单独定义

``` js
import { TreeSelector } from 'element-widgets'
Vue.use(TreeSelector) //1: Success 2: Success

import TreeSelector from 'element-widgets/packages/tree-selector'
Vue.use(TreeSelector) //1: Failure, 此时TreeSelector没有install方法 2: Success
```
