<template>
  <thx-tree-selector
    v-model="selected"
    :props="props"
    :data="data"
  />
</template>
<script>
import request from '@/utils/request'

export default {
  name: 'ThxOrgSelector',
  data() {
    return {
      props: {
        value: 'id',
        label: 'name'
        // multiple: true,
        // checkStrictly: false,
        // emitPath: false
      },
      data: [],
      selected: null
    }
  },
  created() {
    this.requestTree().then(res => {
      console.debug(res)
    })
  },
  methods: {
    requestTree(lev = 2) {
      return request({ url: '/api/thraex/org/tree', method: 'GET', params: { level: lev + 1 }})
    }
  }
}
</script>
