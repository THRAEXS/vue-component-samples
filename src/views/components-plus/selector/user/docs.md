## User Selector

### 基本用法(`.sync`)

<thx-demo-code>
  <template v-slot:demo>
    <case-1 />
  </template>
   
``` html
<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="user = null">清除</el-button>

    <div>{{ user || 'Unchecked' }}</div>

    <thx-user-selector
      :value.sync="user"
      :visible.sync="visible"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: null,
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
    <el-button type="danger" size="mini" @click="user = null">清除</el-button>

    <div>{{ user || 'Unchecked' }}</div>

    <thx-user-selector
      v-model="user"
      :visible.sync="visible"
      @ok="handleOk"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: null,
      visible: false
    }
  },
  methods: {
    handleOk(data) {
      this.user = data
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
    <el-button type="danger" size="mini" @click="users = null">清除</el-button>

    <div>{{ users }}</div>

    <thx-user-selector
      multiple
      :value.sync="users"
      :visible.sync="visible"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: [],
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
    <el-button type="danger" size="mini" @click="user = null">清除</el-button>

    <div>{{ user || 'Unchecked' }}</div>

    <thx-user-selector
      :value.sync="user"
      :visible.sync="visible"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: { id: '0028de89-2440-4b57-9b74-52ae6db387c8' },
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
    <el-button type="danger" size="mini" @click="users = null">清除</el-button>

    <div>{{ users }}</div>

    <thx-user-selector
      multiple
      :value.sync="users"
      :visible.sync="visible"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: [
        { id: '0028de89-2440-4b57-9b74-52ae6db387c8' },
        { id: '009dcb58-e718-4e9d-b1d3-487a6ff49014' },
        { id: '00c5792a-77d3-49fd-a152-2b58521afa9e' },
        { id: '013f695b-f29f-4aac-92b5-849ae8ec7dad' }
      ],
      visible: false
    }
  }
}
</script>
```
   
</thx-demo-code>

### 初始化查询条件

<thx-demo-code>
  <template v-slot:demo>
    <case-6 />
  </template>
   
``` html
<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="user = null">清除</el-button>

    <div>{{ user || 'Unchecked' }}</div>

    <thx-user-selector
      :value.sync="user"
      :visible.sync="visible"
      :props="props"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: null,
      visible: false,
      props: {
        deptId: '3304',
        username: '王'
      }
    }
  }
}
</script>
```
   
</thx-demo-code>

### 禁用查询条件

<thx-demo-code>
  <template v-slot:demo>
    <case-7 />
  </template>
   
``` html
<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="user = null">清除</el-button>

    <div>{{ user || 'Unchecked' }}</div>

    <thx-user-selector
      :value.sync="user"
      :visible.sync="visible"
      :props="props"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: null,
      visible: false,
      props: {
        // username: { value: '关新', disabled: true },
        deptId: { value: '3304', disabled: true }
      }
    }
  }
}
</script>
```
   
</thx-demo-code>

### 不启用查询条件

不启用即**值无效**

<thx-demo-code>
  <template v-slot:demo>
    <case-8 />
  </template>
   
``` html
<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="user = null">清除</el-button>

    <div>{{ user || 'Unchecked' }}</div>

    <thx-user-selector
      :value.sync="user"
      :visible.sync="visible"
      :props="props"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: null,
      visible: false,
      props: {
        // username: { visible: false },
        deptId: { visible: false }
      }
    }
  }
}
</script>
```
   
</thx-demo-code>

### 在表单中使用

配合`<thx-input-carrier />`进行单选，**多选尚在开发中**

<thx-demo-code>
  <template v-slot:demo>
    <case-9 />
  </template>
   
``` html
<template>
  <thx-card-box>
    <el-form :model="form" label-width="80px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="活动名称">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动主题">
            <el-input v-model="form.subject" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="活动区域">
            <el-input v-model="form.region" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人">
            <thx-input-carrier
              v-model="selector.user.fullName"
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

    <thx-user-selector
      :value.sync="selector.user"
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
        user: {}
      }
    }
  },
  watch: {
    'selector.user'() {
      this.form.contact = this.selector.user.id
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
    <case-10 />
  </template>
   
``` html
<template>
  <div>
    <label>
      e.g.: 123, 0028de89-2440-4b57-9b74-52ae6db387c8
    </label>

    <thx-input-carrier
      v-model="uid"
      label="Get"
      clearable
      @click="handleSearch"
    />

    <div>{{ user || 'No data' }}</div>

    <thx-user-selector ref="thxSelector" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      uid: '',
      user: null
    }
  },
  methods: {
    handleSearch() {
      this.$refs.thxSelector.getByIds(this.uid).then(data => (this.user = data))
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

<!-- | `height` | `String` / `Number` | - | `530` | `Table`的高度，默认为自动高度。如果`height`为`number`类型，单位 `px`；如果`height`为`String`类型，则这个高度会设置为`Table`的`style.height`的值，`Table`的高度会受控于外部样式。 | 

参考`el-table`中的`height`属性 
-->

### props

| Attribute | Type | Accepted Values | Default | Description |
| :----: | :----: | :----: | :----: | ---- |
| `deptId` | `String` / `Object` | - | `{ disabled: false, visible: true, value: '' }` | 所级单位ID |
| `username` | `String` / `Object` | - | `{ disabled: false, visible: true, value: '' }` | 姓名/拼音/账号 |

如果**只需指定查询条件，仅需提供`String`类型的值。**

- `disabled`: 是否禁用
- `visible`: 是否可见。若不可见，则值无效
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
