# vue-component-samples

Some samples of vue components.

## Lib

- [element-widgets](https://github.com/THRAEX-70/element-widgets)

## Boardroom

### DhtmlxScheduler v4.1.0

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

### TODO

- [X] Time out of bounds
- [X] Form validate
- [ ] Form modify
- [ ] Submit dialog
- [ ] Blocked tips
- [ ] Org filter
- [X] Secret dialog
- [ ] Notice
- [X] Legends
- [ ] Base info components
- [ ] `boardroom` does not exist for booking
- [X] Event/Marked color
- [X] Condition
- [X] Event modify: move/resize
- [X] Event cancel: icon
- [ ] Opt: event cancel icon
- [X] Remark position
- [ ] Style

### Files

**Moved from `views/scheduler/samples/` to `views/boardroom/`**

- [X] static/dhtmlxScheduler
- [X] components/scheduler

- [ ] booking.vue
  - [ ] `handleSubmit`
- [X] statistics.vue

- [X] edit.vue
- [X] item.vue
- [X] rules.js
- [ ] timeline.vue
  - [ ] style: remove `scoped` and add 5 `../`
- [X] view.vue
