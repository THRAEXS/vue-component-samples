<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="project = null">清除</el-button>

    <div>{{ project || 'Unchecked' }}</div>

    <thx-project-selector
      v-model="project"
      :visible.sync="visible"
      @ok="handleOk"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      project: null,
      visible: false
    }
  },
  methods: {
    handleOk(data) {
      this.project = data
    }
  }
}
</script>
