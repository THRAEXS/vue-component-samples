<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="projects = []">清除</el-button>

    <div>{{ projects }}</div>

    <thx-project-selector
      multiple
      :value.sync="projects"
      :visible.sync="visible"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      projects: [
        { id: '22fdf07032e111ebb276efb62b803ff7' },
        { id: '9830ecc032d811eb9521b1959b2330f5' },
        { id: '11d3b21f2a542c039cf7e411824171d4' },
        { id: 'ee0c1f1a6aa30f03d25ced5d203f9a2c' }
      ],
      visible: false
    }
  }
}
</script>
