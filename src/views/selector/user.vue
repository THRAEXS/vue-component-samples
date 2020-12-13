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

    <thx-card-box title="Case 2 - 用户单选(Callback)">
      <template v-slot:toolbar>
        <el-button type="danger" size="mini" @click="case2.user = null">清除</el-button>
        <el-button type="primary" size="mini" @click="case2.visible = true">选择</el-button>
      </template>
      {{ case2.user || 'Unchecked' }}

      <thx-user-selector
        v-model="case2.user"
        :visible.sync="case2.visible"
        @ok="handleOkCase2"
      />
    </thx-card-box>

    <thx-card-box title="Case 3 - 用户单选(有初始值)">
      <template v-slot:toolbar>
        <el-button type="danger" size="mini" @click="case3.user = null">清除</el-button>
        <el-button type="primary" size="mini" @click="case3.visible = true">选择</el-button>
      </template>
      {{ case3.user || 'Unchecked' }}

      <thx-user-selector
        :value.sync="case3.user"
        :visible.sync="case3.visible"
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
      },
      case2: {
        visible: false,
        user: null
      },
      case3: {
        visible: false,
        user: { id: '0028de89-2440-4b57-9b74-52ae6db387c8' }
      }
    }
  },
  methods: {
    handleOkCase2(data) {
      this.case2.user = data
    }
  }
}
</script>
<style scoped>
.el-card {
  margin-top: 10px;
}
</style>
