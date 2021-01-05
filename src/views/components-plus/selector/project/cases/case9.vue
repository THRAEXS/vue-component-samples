<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="project = null">清除</el-button>

    <div>{{ project || 'Unchecked' }}</div>

    <thx-project-selector
      :value.sync="project"
      :visible.sync="visible"
      :props="props"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      project: null,
      visible: false,
      props: {
        // dictProjectStatusList: '11'
        dictProjectStatusList: ['11', '31']
      }
    }
  }
}
</script>
