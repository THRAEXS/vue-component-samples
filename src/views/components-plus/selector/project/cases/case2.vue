<template>
  <div>
    <thx-card-box>Case Project Selector 222</thx-card-box>
    <el-button type="primary" @click="click">Select</el-button>
  </div>
</template>
<script>
export default {
  name: 'CaseProjectSelector2',
  methods: {
    click() {
      this.$message('Vue in Markdown')
    }
  }
}
</script>
