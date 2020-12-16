### Attributes

| Attribute | Type | Accepted Values | Default | Description |
| :----: | :----: | :----: | :----: | ---- |
| `value` / `v-model` | `Object` / `Array` | - | - | 选中项绑定值，用于回填，支持`.sync`修饰符。单选:`Object`；多选: `Array` |
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

### Method

Todo...

### Events

| Event Name | Parameters | Description |
| :----: | :----: | ---- |
| `ok` | 单选:`Object`；多选: `Array` | 确定时的回掉 |
| `cancel` | - | `Selector`取消的回掉 |
| `close` | - | `Selector`关闭的回掉 |
