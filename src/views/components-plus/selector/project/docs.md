## Project Selector

**当前阶段**用法与[User Selector](/components/plus/selector/user)一致。唯一区别在于 **`props`**。

### TODOS

项目选择器还需要扩展:

- [ ] 查询条件: **业务类型**
- [ ] 所显示的列的数量: **经费**

### 基本用法(`.sync`)

<thx-demo-code>
  <template v-slot:demo>
    <case-1 />
  </template>

``` html
<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="project = null">清除</el-button>

    <div>{{ project || 'Unchecked' }}</div>

    <thx-project-selector
      :value.sync="project"
      :visible.sync="visible"
    />
  </div>
</template>
<script>
export default {
  name: 'CaseProjectSelector1',
  data() {
    return {
      project: null,
      visible: false
    }
  }
}
</script>
```

</thx-demo-code>

### 基本用法(Callback)

<thx-demo-code>
  <template v-slot:demo>
    <case-2 />
  </template>

``` html
<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="project = null">清除</el-button>

    <div>{{ project || 'Unchecked' }}</div>

    <thx-project-selector
      v-model="project"
      :visible.sync="visible"
      @ok="handleOk"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      project: null,
      visible: false
    }
  },
  methods: {
    handleOk(data) {
      this.project = data
    }
  }
}
</script>
```

</thx-demo-code>

### 多选

<thx-demo-code>
  <template v-slot:demo>
    <case-3 />
  </template>
   
``` html
<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="projects = []">清除</el-button>

    <div>{{ projects }}</div>

    <thx-project-selector
      multiple
      :value.sync="projects"
      :visible.sync="visible"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      projects: [],
      visible: false
    }
  }
}
</script>
```
   
</thx-demo-code>

### 回填(单选)

可通过`getByIds('xxx')`方法获取回填对象

<thx-demo-code>
  <template v-slot:demo>
    <case-4 />
  </template>
   
``` html
<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="project = null">清除</el-button>

    <div>{{ project || 'Unchecked' }}</div>

    <thx-project-selector
      :value.sync="project"
      :visible.sync="visible"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      project: { id: '22fdf07032e111ebb276efb62b803ff7' },
      visible: false
    }
  }
}
</script>
```
   
</thx-demo-code>

### 回填(多选)

可通过`getByIds(['xxx', 'yyy'])`方法获取回填对象

<thx-demo-code>
  <template v-slot:demo>
    <case-5 />
  </template>
   
``` html
<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="projects = []">清除</el-button>

    <div>{{ projects }}</div>

    <thx-project-selector
      multiple
      :value.sync="projects"
      :visible.sync="visible"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      projects: [
        { id: '22fdf07032e111ebb276efb62b803ff7' },
        { id: '9830ecc032d811eb9521b1959b2330f5' },
        { id: '11d3b21f2a542c039cf7e411824171d4' },
        { id: 'ee0c1f1a6aa30f03d25ced5d203f9a2c' }
      ],
      visible: false
    }
  }
}
</script>
```
   
</thx-demo-code>

### 查询条件

列表查询条件有**所级单位** / **项目名称** / **业务类型**，默认仅显示**项目名称**。

#### 初始化查询条件

<thx-demo-code>
  <template v-slot:demo>
    <case-6 />
  </template>

``` html
<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="project = null">清除</el-button>

    <div>{{ project || 'Unchecked' }}</div>

    <thx-project-selector
      :value.sync="project"
      :visible.sync="visible"
      :props="props"
    />
  </div>
</template>
<script>
export default {
  name: 'CaseProjectSelector6',
  data() {
    return {
      project: null,
      visible: false,
      props: {
        projectName: '测试'
      }
    }
  }
}
</script>
```

</thx-demo-code>

#### 禁用查询条件

<thx-demo-code>
  <template v-slot:demo>
    <case-7 />
  </template>

``` html
<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="project = null">清除</el-button>

    <div>{{ project || 'Unchecked' }}</div>

    <thx-project-selector
      :value.sync="project"
      :visible.sync="visible"
      :props="props"
    />
  </div>
</template>
<script>
export default {
  name: 'CaseProjectSelector7',
  data() {
    return {
      project: null,
      visible: false,
      props: {
        projectName: { disabled: true }
      }
    }
  }
}
</script>
```

</thx-demo-code>

#### 显示其它查询条件并初始条件值

<thx-demo-code>
  <template v-slot:demo>
    <case-8 />
  </template>

``` html
<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="project = null">清除</el-button>

    <div>{{ project || 'Unchecked' }}</div>

    <thx-project-selector
      :value.sync="project"
      :visible.sync="visible"
      :props="props"
    />
  </div>
</template>
<script>
export default {
  name: 'CaseProjectSelector8',
  data() {
    return {
      project: null,
      visible: false,
      props: {
        projectOrgId: { visible: true, value: '3304' },
        dictProjectStatisticsTypeList: { visible: true, value: ['0', '4'] }
      }
    }
  }
}
</script>
```

</thx-demo-code>

### 在表单中使用

### 通过组件获取数据

### props

| Attribute | Type | Accepted Values | Default | Description |
| :----: | :----: | :----: | :----: | ---- |
| `projectOrgId` | `String` / `Object` | - | `{ disabled: false, visible: false, value: '' }` | 所级单位ID |
| `projectName` | `String` / `Object` | - | `{ disabled: false, visible: true, value: '' }` | 项目名称 |
| `dictProjectStatisticsTypeList` | `String` / `Object` | - | `{ disabled: false, visible: false, value: '' }` | 业务类型 |

如果**只需指定查询条件，仅需提供`String`类型的值。**

- `disabled`: 是否禁用
- `visible`: 是否可见
- `value`: 属性值

### Methods

| Method | Description | Parameters | Return |
| :----: | :----: | :----: | :----: |
| `getByIds` | 根据`id`或`id`**数组**获取数据 | `(ids, full)`，1.数据`id`或`id`**数组** 2.默认`true`，若为`false`则不进行远程查询 | `Object` / `Array` |

### Events

| Event Name | Parameters | Description |
| :----: | :----: | ---- |
| `ok` | 单选:`Object`；多选: `Array` | 确定时的回掉 |
| `cancel` | - | `Selector`取消的回掉 |
| `close` | - | `Selector`关闭的回掉 |
