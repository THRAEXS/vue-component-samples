## Org Selector

### 弹框模式

#### 单选

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
        <el-button type="danger" size="mini" @click="selected = null">Clear</el-button>
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

#### 多选

<thx-demo-code>
  <template v-slot:demo>
    <case-2 />
  </template>

``` html

```
</thx-demo-code>

### 级联模式

TODOS

### Attributes

| Attribute | Type | Accepted Values | Default | Description |
| :----: | :----: | :----: | :----: | ---- |
| `value` / `v-model` | `Object` / `Array` | - | - | 选中项绑定值，用于接收和回填，支持`.sync`修饰符。单选:`Object`；多选: `Array` |
| `cascader` | `Boolean` | - | `false` | 是否为级联模式 |
| `level` | `Number` | `[1, 2, 3]` | `2` | 组织机构级别 |

### props

### Methods

| Method | Description | Parameters | Return |
| :----: | :----: | :----: | :----: |

### Events

`cascader`模式下的事件请参考[Cascader Events](https://element.eleme.cn/2.13/#/zh-CN/component/cascader)。

以下为弹框模式下的事件:

| Event Name | Parameters | Description |
| :----: | :----: | ---- |
| `ok` | 单选: `Object`；多选: `Array` | 确定时的回掉 |
| `cancel` | - | Dialog 取消的回掉 |
| `open` | - | Dialog 打开的回掉 |
| `opend` | - | Dialog 打开动画结束时的回掉 |
| `close` | - | Dialog 关闭的回掉 |
| `closed` | - | Dialog 关闭动画结束时的回掉 |
