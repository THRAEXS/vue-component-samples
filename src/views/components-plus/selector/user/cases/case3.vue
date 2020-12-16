<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="users = null">清除</el-button>

    <div>{{ users }}</div>

    <thx-user-selector
      multiple
      :value.sync="users"
      :visible.sync="visible"
    />
  </div>
</template>
<script>
export default {
  name: 'CaseUserSelector1',
  data() {
    return {
      users: [],
      visible: false
    }
  }
}
</script>
