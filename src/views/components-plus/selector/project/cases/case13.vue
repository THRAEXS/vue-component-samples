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
        dictProjectSendStatusList: '0',
        // dictProjectSendStatusList: ['0', '2'],
        projectFrom: 'dict_project_from_jtgfgs_kjglb',
        // projectFrom: 'dict_project_from_zyfgs',
        projectFlag: 0
        // projectFlag: 1
      }
    }
  }
}
</script>
