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

#### 显示所有查询条件并初始条件值

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

#### 其他查询条件

`props`中的查询

### 在表单中使用

配合`<thx-input-carrier />`进行单选，**多选尚在开发中**

<thx-demo-code>
  <template v-slot:demo>
    <case-10 />
  </template>

``` html
<template>
  <thx-card-box>
    <el-form :model="form" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="招标名称">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="招标主题">
            <el-input v-model="form.subject" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="招标区域">
            <el-input v-model="form.region" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="招标项目">
            <thx-input-carrier
              v-model="selector.project.projectName"
              readonly
              label="选择"
              @click="selector.visible = true"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template v-slot:footer>
      <el-button type="primary" size="mini" @click="handleSave">立即创建</el-button>
    </template>

    <thx-project-selector
      :value.sync="selector.project"
      :visible.sync="selector.visible"
    />
  </thx-card-box>
</template>
<script>
export default {
  data() {
    return {
      form: {
        id: null,
        name: null,
        subject: null,
        region: null,
        contact: null
      },
      selector: {
        visible: false,
        project: {}
      }
    }
  },
  watch: {
    'selector.project'() {
      this.form.contact = this.selector.project.id
    }
  },
  methods: {
    handleSave() {
      this.$message(JSON.stringify(this.form))
    }
  }
}
</script>
```

</thx-demo-code>

### 通过组件获取数据

将组件当作API接口来用。单个`id`返回`Object`, `id`数组返回`Array`。

<thx-demo-code>
  <template v-slot:demo>
    <case-11 />
  </template>

``` html
<template>
  <div>
    <label>
      e.g.: 22fdf07032e111ebb276efb62b803ff7, 9830ecc032d811eb9521b1959b2330f5
    </label>

    <thx-input-carrier
      v-model="id"
      label="Get"
      clearable
      @click="handleSearch"
    />

    <div>{{ project || 'No data' }}</div>

    <thx-project-selector ref="thxSelector" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      project: null
    }
  },
  methods: {
    handleSearch() {
      this.$refs.thxSelector.getByIds(this.id).then(data => (this.project = data))
    }
  }
}
</script>
```
  
</thx-demo-code>

### Attributes

| Attribute | Type | Accepted Values | Default | Description |
| :----: | :----: | :----: | :----: | ---- |
| `value` / `v-model` | `Object` / `Array` | - | - | 选中项绑定值，用于接收和回填，支持`.sync`修饰符。单选:`Object`；多选: `Array` |
| `visible` | `Boolean` | - | `false` | 是否显示`Selector`，支持`.sync`修饰符 |
| `multiple` | `Boolean` | - | `false` | 是否多选 |
| `top` | `String` | - | `13vh` | `Dialog` CSS中的`margin-top`值 |
| `width` | `String` | - | `70%` | `Dialog`的宽度 |
| `height` | `String` / `Number` | - | `530` | `Table`的高度，默认为自动高度。如果`height`为`number`类型，单位 `px`；如果`height`为`String`类型，则这个高度会设置为`Table`的`style.height`的值，`Table`的高度会受控于外部样式。 |
| `props` | `Object` | - | - | 查询条件。配置选项，具体看下表 |

### props

| Attribute | Type | Accepted Values | Default | Description |
| :----: | :----: | :----: | :----: | ---- |
| `projectOrgId` | `String` / `Object` | - | `{ disabled: false, visible: false, value: '' }` | 所级单位ID |
| `projectName` | `String` / `Object` | - | `{ disabled: false, visible: true, value: '' }` | 项目名称 |
| `dictProjectStatisticsTypeList` | `String` / `Object` | - | `{ disabled: false, visible: false, value: '' }` | 业务类型 |

如果**只需指定查询条件值，仅需提供`String`类型的值。**

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
| `ok` | 单选: `Object`；多选: `Array` | 确定时的回掉 |
| `cancel` | - | `Selector`取消的回掉 |
| `close` | - | `Selector`关闭的回掉 |
