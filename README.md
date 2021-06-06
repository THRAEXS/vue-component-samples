# vue-component-samples

Some samples of vue components.

## Lib

- [element-widgets](https://github.com/THRAEX-70/element-widgets)

## DhtmlxScheduler v4.1.0

Plugins(`public/static/dhtmlxScheduler`):

- `dhtmlxscheduler.css` -> `scheduler.css`
- `dhtmlxscheduler.js` -> `scheduler.js`
- `dhtmlxscheduler_timeline.js` -> `timeline.js`
- `dhtmlxscheduler_treetimeline.js` -> `treetimeline.js`
- `locale_cn.js`

Unified import: `index.js`
  - Manual refresh of the page occurs'ReferenceError: scheduler is not defined'

ES6 import: `components/scheduler/index.js`

Bugs(fix: reload `scheduler`):
- `scheduler` global sharing
- `scheduler` event repeated rendering
  - fix: `scheduler.clearAll()`

TODO:
- [ ] Time out of bounds
- [ ] Form validate
- [ ] Blocked tips
- [ ] Secret dialog
- [ ] Notice
- [ ] Base info components
- [ ] Event/Marked color
- [X] Condition
- [ ] Style
- [X] Event modify: move/resize
- [ ] Event cancel: icon
- [ ] Remark position
