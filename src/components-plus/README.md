## Components Plus

### Bugs

- [ ] Router duplicate keys
- [ ] Menu: 路由地址**可为空串**
- [ ] Menu: 修改在本页, 新增Dialog?
- [ ] Menu: radio / switch默认值
- [ ] Menu: 左侧tree scroll
- [ ] Menu: sort
- [ ] Menu: alert(0)
- [ ] Org: `/org/select`参数名`miniUnit` -> `level`

### Todos

- [ ] Documentation
- [ ] Org Selector
- [ ] Condition component

### Dev

- 公共文件修改后别提交并推送。 e.g.: `vue.config.js`

- VS Code 安装 `ESLint` / `Vetur`, Tab size: `2`

- 提交代码前**务必**执行`npm run lint`进行代码格式检查，若有`warning`/`error`，请及时解决

- 自动修复: `npm run lint -- --fix`。`eslint`会自动修复一些简单的错误。

- 后端提供的API**不符合RESTFul风格**请拒绝使用

- 解决Console `warning` / `error`

- Docs

### Component Dev

> **`components-plus`下所有的组件会在`main.js`中全局注册，使用时无需单独导入注册。**

组件包根路径: `src/components-plus`

开始新的组件开发前，请按以下步骤:

- 复制一份`component-template`:
``` sh
$ cd src/components-plus/packages
$ cp -r component-template other-component
```
- 修改`other-component/src/index.vue`:`{ name: ThxOtherComponent }`。`name`前缀**必须为Thx**

### Attentions

以下组件为**临时过渡**性的，后续会被替换:

- `org-cascader`
- `demo-code`
