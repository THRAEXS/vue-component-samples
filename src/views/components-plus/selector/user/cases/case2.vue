<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="user = null">清除</el-button>

    <div>{{ user || 'Unchecked' }}</div>

    <thx-user-selector
      v-model="user"
      :visible.sync="visible"
      @ok="handleOk"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: null,
      visible: false
    }
  },
  methods: {
    handleOk(data) {
      this.user = data
    }
  }
}
</script>
