<template>
  <div>
    <thx-card-box>Case User Selector 111</thx-card-box>
    <el-button type="primary" @click="click">Select</el-button>
  </div>
</template>
<script>
export default {
  name: 'CaseUserSelector1',
  methods: {
    click() {
      this.$message('Vue in Markdown')
    }
  }
}
</script>
