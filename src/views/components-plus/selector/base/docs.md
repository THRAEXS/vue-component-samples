# Base Pagination Selector

### TODOS

- [ ] `search()` in `mounted()`

### Usage

基于`<thx-base-pagination-selector />`扩展一个**更为具体**的分页选择器, 可以套用以下模版:
``` html
<template>
  <thx-base-pagination-selector
    ref="thxBps"
    v-model="selected"
    :multiple="multiple"
    :visible.sync="selectorVisible"
    :top="top"
    :width="width"
    :height="height"
    :api-page="api.page"
    :api-ids="api.ids"
    :params="params"
    @ok="handleOk"
    @cancel="handleCancel"
    @close="handleClose"
  >
    <template v-slot:condition>
      <!-- 1.添加Conditions -->
    </template>

    <!-- 2.添加<el-table-column /> -->
  </thx-base-pagination-selector>
</template>
<script>
import PaginationSelectorMixin from '~/mixins/pagination-selector'
import ConditionMixin from '~/mixins/condition'

export default {
  name: 'ThxOthertSelector',
  mixins: [PaginationSelectorMixin, ConditionMixin],
  data() {
    return {
      // 3.设置API
      api: {
        page: '/api/xxx/page',
        ids: '/api/xxx/ids'
      },
      // 4.设置查询参数
      params: {
        // ....
      }
    }
  }
}
</script>
```

### Cases

- [User Selector](/components/plus/selector/user)
- [Project Selector](/components/plus/selector/project)

### Attributes

| Attribute | Type | Accepted Values | Default | Description |
| :----: | :----: | :----: | :----: | ---- |
| `api-page` | `String` | - | - | `required`: 通过 **分页参数**(`{ page: 1, size: 10, params: {} }`) 获取分页数据 |
| `api-ids` | `String` | - | - | `required`: 通过数据 **`id`数组** 获取数据列表 |
| `params` | `Object` | - | - | `api-page`接口中的**查询条件字段**对象 |
| `value` / `v-model` | `Object` / `Array` | - | - | 选中项绑定值，用于接收和回填，支持`.sync`修饰符。单选:`Object`；多选: `Array` |
| `visible` | `Boolean` | - | `false` | 是否显示`Selector`，支持`.sync`修饰符 |
| `multiple` | `Boolean` | - | `false` | 是否多选 |
| `top` | `String` | - | `13vh` | `Dialog` CSS中的`margin-top`值 |
| `width` | `String` | - | `70%` | `Dialog`的宽度 |
| `height` | `String` / `Number` | - | `530` | `Table`的高度，默认为自动高度。如果`height`为`number`类型，单位 `px`；如果`height`为`String`类型，则这个高度会设置为`Table`的`style.height`的值，`Table`的高度会受控于外部样式。 |
| `index` | `Object` | `{ label: '', width: 60, fixed: false, visible: true }` | `{ label: '序号' }` | 索引属性 |

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
