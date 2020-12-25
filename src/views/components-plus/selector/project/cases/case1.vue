<template>
  <div>
    <el-button type="primary" @click="visible = true">选择</el-button>

    <thx-project-selector
      :value.sync="project"
      :visible.sync="visible"
    />
  </div>
</template>
<script>
export default {
  name: 'CaseProjectSelector1',
  data() {
    return {
      project: null,
      visible: false
    }
  }
}
</script>
