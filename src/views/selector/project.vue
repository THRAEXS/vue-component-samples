<template>
  <div class="app-container">
    <!-- <thx-card-box>
      <thx-tree-selection
        :data="data"
        :props="props"
      />
    </thx-card-box> -->

    <thx-component-template />
    <thx-user-selector />
    <thx-project-selector />

    <!-- <btn type="danger">Btn</btn> -->

    <!-- <sample /> -->
  </div>
</template>
<script>
// import ThxTreeSelector from 'element-widgets/packages/tree-selector'
// import Btn from 'element-ui/packages/button'

// import Sample from '../../components/sample'

// import Widgets from 'element-widgets'
// import {
//   install,
//   CardBox,
//   DialogBox,
//   ListSelector,
//   Pagination,
//   PaginationSelection,
//   PaginationTable,
//   Table,
//   TreeSelector
// } from 'element-widgets'

// import { TreeSelector } from 'element-widgets'
// import TreeSelector from 'element-widgets/packages/tree-selector'

export default {
  components: {
    // ThxTreeSelector: TreeSelector
    // Btn,
    // Sample,
    // ThxTreeSelector
  },
  data() {
    return {
      props: {
        label: 'name'
      },
      data: [
        { id: '1', name: 'node-1' },
        { id: '2', name: 'node-2' }
      ]
    }
  },
  created() {
    // console.debug(TreeSelector)
    // console.debug(Vue)
    // console.debug(this.$use)s
    // console.debug(Widgets)
    // console.debug(install)
    // console.debug(CardBox)
    // console.debug(DialogBox)
    // console.debug(ListSelector)
    // console.debug(Pagination)
    // console.debug(PaginationSelection)
    // console.debug(PaginationTable)
    // console.debug(Table)
    // console.debug(TreeSelector)
    // console.log(Selector)
  }
}
</script>
