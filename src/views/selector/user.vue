<template>
  <div class="app-container">
    <thx-card-box title="Case 1 - 用户单选(.sync)">
      <template v-slot:toolbar>
        <el-button type="danger" size="mini" @click="case1.user = null">清除</el-button>
        <el-button type="primary" size="mini" @click="case1.visible = true">选择</el-button>
      </template>
      {{ case1.user || 'Unchecked' }}

      <thx-user-selector
        :value.sync="case1.user"
        :visible.sync="case1.visible"
      />
    </thx-card-box>
  </div>
</template>
<script>
export default {
  name: 'CaseUserSelector',
  data() {
    return {
      case1: {
        visible: false,
        user: null
      }
    }
  }
}
</script>
