<template>
  <div>
    <thx-card-box>Case User Selector 222</thx-card-box>
    <el-button type="primary" @click="click">Select</el-button>
  </div>
</template>
<script>
export default {
  name: 'CaseUserSelector2',
  methods: {
    click() {
      this.$message('Vue in Markdown')
    }
  }
}
</script>
