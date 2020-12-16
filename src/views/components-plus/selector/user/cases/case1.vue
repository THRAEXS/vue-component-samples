<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="user = null">清除</el-button>

    <div>{{ user || 'Unchecked' }}</div>

    <thx-user-selector
      :value.sync="user"
      :visible.sync="visible"
    />
  </div>
</template>
<script>
export default {
  name: 'CaseUserSelector1',
  data() {
    return {
      user: null,
      visible: false
    }
  }
}
</script>
