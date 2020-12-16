<template>
  <div>
    <el-button type="primary" @click="visible = true">选择</el-button>

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
