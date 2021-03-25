## Org Selector

### 单选

<case-layout>
  <template v-slot:left>
  <thx-demo-code>
    <template v-slot:demo>
      <case-1 />
    </template>

  ``` html
  <template>
    <div>
      <el-row :gutter="5">
        <el-col :span="22">
          <thx-org-selector v-model="selected" />
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="mini"
            @click="selected = null"
          >Clear</el-button>
        </el-col>
      </el-row>

      {{ selected }}
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        selected: null
      }
    }
  }
  </script>
  ```
  </thx-demo-code>
  </template>
  <template v-slot:right>
  <thx-demo-code>
    <template v-slot:demo>
      <case-7 />
    </template>

  ``` html
  <template>
    <div>
      <el-row :gutter="5">
        <el-col :span="22">
          <thx-org-selector v-model="selected" cascader />
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="mini"
            @click="selected = null"
          >Clear</el-button>
        </el-col>
      </el-row>

      {{ selected }}
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        selected: null
      }
    }
  }
  </script>
  ```
  </thx-demo-code>
  </template>
</case-layout>

### 多选

<case-layout>
  <template v-slot:left>
  <thx-demo-code>
    <template v-slot:demo>
      <case-2 />
    </template>

  ``` html
  <template>
    <div>
      <el-row :gutter="5" style="margin-bottom: 10px;">
        <el-col :span="22">
          <thx-org-selector v-model="selected" :props="props" />
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="mini"
            @click="selected = []"
          >Clear</el-button>
        </el-col>
      </el-row>

      <thx-table :data="selected" :max-height="400" size="mini">
        <el-table-column type="index" width="50" align="center" />
        <el-table-column label="Data" align="center">
          <template v-slot:default="scope">
            {{ scope.row }}
          </template>
        </el-table-column>
        <el-table-column width="50">
          <template v-slot:default="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="selected.splice(scope.$index, 1)"
            />
          </template>
        </el-table-column>
      </thx-table>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        selected: [],
        props: {
          multiple: true
        }
      }
    }
  }
  </script>
  ```
  </thx-demo-code>
  </template>
  <template v-slot:right>
  <thx-demo-code>
    <template v-slot:demo>
      <case-8 />
    </template>
  
  ``` html
  <template>
    <div>
      <el-row :gutter="5" style="margin-bottom: 10px;">
        <el-col :span="22">
          <thx-org-selector v-model="selected" :props="props" cascader />
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="mini"
            @click="selected = []"
          >Clear</el-button>
        </el-col>
      </el-row>

      <thx-table :data="selected" :max-height="400" size="mini">
        <el-table-column type="index" width="50" align="center" />
        <el-table-column label="Data" align="center">
          <template v-slot:default="scope">
            {{ scope.row }}
          </template>
        </el-table-column>
        <el-table-column width="50">
          <template v-slot:default="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="selected.splice(scope.$index, 1)"
            />
          </template>
        </el-table-column>
      </thx-table>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        selected: [],
        props: {
          multiple: true
        }
      }
    }
  }
  </script>
  ```
  </thx-demo-code>
  </template>
</case-layout>

### 选择任意一级(单选)

<case-layout>
  <template v-slot:left>
  <thx-demo-code>
    <template v-slot:demo>
      <case-3 />
    </template>

  ``` html
  <template>
    <div>
      <el-row :gutter="5">
        <el-col :span="22">
          <thx-org-selector v-model="selected" :props="props" />
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="mini"
            @click="selected = null"
          >Clear</el-button>
        </el-col>
      </el-row>

      {{ data }}
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        selected: null,
        props: {
          checkStrictly: true
        }
      }
    },
    computed: {
      data() {
        let result = null
        if (this.selected) {
          const { childOrgList, ...data } = this.selected
          result = childOrgList
            ? Object.assign(data, { childOrgList: childOrgList.length })
            : data
        }

        return result
      }
    }
  }
  </script>
  ```
  </thx-demo-code>
  </template>
  <template v-slot:right>
  <thx-demo-code>
    <template v-slot:demo>
      <case-9 />
    </template>

  ``` html
  <template>
    <div>
      <el-row :gutter="5">
        <el-col :span="22">
          <thx-org-selector v-model="selected" :props="props" cascader />
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="mini"
            @click="selected = null"
          >Clear</el-button>
        </el-col>
      </el-row>

      {{ data }}
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        selected: null,
        props: {
          checkStrictly: true
        }
      }
    },
    computed: {
      data() {
        let result = null
        if (this.selected) {
          const { childOrgList, ...data } = this.selected
          result = childOrgList
            ? Object.assign(data, { childOrgList: childOrgList.length })
            : data
        }

        return result
      }
    }
  }
  </script>
  ```
  </thx-demo-code>
  </template>
</case-layout>

### 选择任意一级(多选)

<case-layout>
  <template v-slot:left>
  <thx-demo-code>
    <template v-slot:demo>
      <case-4 />
    </template>

  ``` html
  <template>
    <div>
      <el-row :gutter="5" style="margin-bottom: 10px;">
        <el-col :span="22">
          <thx-org-selector v-model="selected" :props="props" />
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="mini"
            @click="selected = []"
          >Clear</el-button>
        </el-col>
      </el-row>

      <thx-table :data="selected" :max-height="400" size="mini">
        <el-table-column type="index" width="50" align="center" />
        <el-table-column label="Data" align="center">
          <template v-slot:default="scope">
            {{ handleData(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column width="50">
          <template v-slot:default="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="selected.splice(scope.$index, 1)"
            />
          </template>
        </el-table-column>
      </thx-table>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        selected: [],
        props: {
          multiple: true,
          checkStrictly: true
        }
      }
    },
    methods: {
      handleData(row) {
        const { childOrgList, ...data } = row
        return childOrgList
          ? Object.assign(data, { childOrgList: childOrgList.length })
          : data
      }
    }
  }
  </script>
  ```
  </thx-demo-code>
  </template>
  <template v-slot:right>
  <thx-demo-code>
    <template v-slot:demo>
      <case-10 />
    </template>

  ``` html
  <template>
    <div>
      <el-row :gutter="5" style="margin-bottom: 10px;">
        <el-col :span="22">
          <thx-org-selector v-model="selected" :props="props" cascader />
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="mini"
            @click="selected = []"
          >Clear</el-button>
        </el-col>
      </el-row>

      <thx-table :data="selected" :max-height="400" size="mini">
        <el-table-column type="index" width="50" align="center" />
        <el-table-column label="Data" align="center">
          <template v-slot:default="scope">
            {{ handleData(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column width="50">
          <template v-slot:default="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="selected.splice(scope.$index, 1)"
            />
          </template>
        </el-table-column>
      </thx-table>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        selected: [],
        props: {
          multiple: true,
          checkStrictly: true
        }
      }
    },
    methods: {
      handleData(row) {
        const { childOrgList, ...data } = row
        return childOrgList
          ? Object.assign(data, { childOrgList: childOrgList.length })
          : data
      }
    }
  }
  </script>
  ```
  </thx-demo-code>
  </template>
</case-layout>

### 回填(单选)

<case-layout> 
  <template v-slot:left>
  <thx-demo-code>
    <template v-slot:demo>
      <case-5 />
    </template>

  ``` html
  <template>
    <div>
      <el-row :gutter="5">
        <el-col :span="22">
          <thx-org-selector v-model="selected" />
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="mini"
            @click="selected = null"
          >Clear</el-button>
        </el-col>
      </el-row>

      {{ selected }}
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        selected: { id: '58165' }
      }
    }
  }
  </script>
  ```
  </thx-demo-code> 
  </template>
  <template v-slot:right>
  <thx-demo-code>
    <template v-slot:demo>
      <case-11 />
    </template>

  ``` html
  <template>
    <div>
      <el-row :gutter="5">
        <el-col :span="22">
          <thx-org-selector v-model="selected" cascader />
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="mini"
            @click="selected = null"
          >Clear</el-button>
        </el-col>
      </el-row>

      {{ selected }}
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        selected: { id: '58165' }
      }
    }
  }
  </script>
  ```
  </thx-demo-code> 
  </template>
</case-layout> 
  
### 回填(多选)

<case-layout>
  <template v-slot:left>
  <thx-demo-code>
    <template v-slot:demo>
      <case-6 />
    </template>

  ``` html
  <template>
    <div>
      <el-row :gutter="5" style="margin-bottom: 10px;">
        <el-col :span="22">
          <thx-org-selector v-model="selected" :props="props" />
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="mini"
            @click="selected = []"
          >Clear</el-button>
        </el-col>
      </el-row>

      <thx-table :data="selected" :max-height="400" size="mini">
        <el-table-column type="index" width="50" align="center" />
        <el-table-column label="Data" align="center">
          <template v-slot:default="scope">
            {{ scope.row }}
          </template>
        </el-table-column>
        <el-table-column width="50">
          <template v-slot:default="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="selected.splice(scope.$index, 1)"
            />
          </template>
        </el-table-column>
      </thx-table>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        selected: [
          { id: '58168' },
          { id: '58169' },
          { id: '58172' },
          { id: '58162' }
        ],
        props: {
          multiple: true
        }
      }
    }
  }
  </script>
  ```
  </thx-demo-code>
  </template>
  <template v-slot:right>
  <thx-demo-code>
    <template v-slot:demo>
      <case-12 />
    </template>

  ``` html
  <template>
    <div>
      <el-row :gutter="5" style="margin-bottom: 10px;">
        <el-col :span="22">
          <thx-org-selector v-model="selected" :props="props" cascader />
        </el-col>
        <el-col :span="2">
          <el-button
            type="danger"
            size="mini"
            @click="selected = []"
          >Clear</el-button>
        </el-col>
      </el-row>

      <thx-table :data="selected" :max-height="400" size="mini">
        <el-table-column type="index" width="50" align="center" />
        <el-table-column label="Data" align="center">
          <template v-slot:default="scope">
            {{ scope.row }}
          </template>
        </el-table-column>
        <el-table-column width="50">
          <template v-slot:default="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="selected.splice(scope.$index, 1)"
            />
          </template>
        </el-table-column>
      </thx-table>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        selected: [
          { id: '58168' },
          { id: '58169' },
          { id: '58172' },
          { id: '58162' }
        ],
        props: {
          multiple: true
        }
      }
    }
  }
  </script>
  ```
  </thx-demo-code>
  </template>
</case-layout>

### Attributes

| Attribute | Type | Accepted Values | Default | Description |
| :----: | :----: | :----: | :----: | ---- |
| `value` / `v-model` | `Object` / `Array` | - | - | 选中项绑定值，用于接收和回填，支持`.sync`修饰符。单选:`Object`；多选: `Array` |
| `cascader` | `Boolean` | - | `false` | 是否为级联模式 |
| `level` | `Number` | `[1, 2, 3]` | `2` | 组织机构级别 |

### props

| Attribute | Type | Accepted Values | Default | Description |
| :----: | :----: | :----: | :----: | ---- |

### Methods

| Method | Description | Parameters | Return |
| :----: | :----: | :----: | :----: |

### Events

`cascader`模式下的事件请参考[Cascader Events](https://element.eleme.cn/2.13/#/zh-CN/component/cascader)。

change

以下为**弹框模式**下的事件:

| Event Name | Parameters | Description |
| :----: | :----: | ---- |
| `ok` | 单选: `Object`；多选: `Array` | 确定时的回掉 |
| `cancel` | - | Dialog 取消的回掉 |
| `open` | - | Dialog 打开的回掉 |
| `opend` | - | Dialog 打开动画结束时的回掉 |
| `close` | - | Dialog 关闭的回掉 |
| `closed` | - | Dialog 关闭动画结束时的回掉 |
