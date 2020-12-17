## Project Selector

**当前阶段**用法与`<thx-user-selector />`一致。唯一区别在于 **`props`**。

### TODOS

项目选择器还需要扩展:

- [ ] 查询条件: **业务类型**
- [ ] 所显示的列的数量: **经费**


### props

| Attribute | Type | Accepted Values | Default | Description |
| :----: | :----: | :----: | :----: | ---- |
| `projectOrgId` | `String` / `Object` | - | `{ disabled: false, visible: true, value: '' }` | 所级单位ID |
| `projectName` | `String` / `Object` | - | `{ disabled: false, visible: true, value: '' }` | 项目名称 |

如果**只需指定查询条件，仅需提供`String`类型的值。**

- `disabled`: 是否禁用
- `visible`: 是否可见。若不可见，则值无效
- `value`: 属性值
