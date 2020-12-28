<template>
  <div>
    <el-button type="primary" size="mini" @click="visible = true">选择</el-button>
    <el-button type="danger" size="mini" @click="users = []">清除</el-button>

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
  data() {
    return {
      users: [
        { id: '0028de89-2440-4b57-9b74-52ae6db387c8' },
        { id: '009dcb58-e718-4e9d-b1d3-487a6ff49014' },
        { id: '00c5792a-77d3-49fd-a152-2b58521afa9e' },
        { id: '013f695b-f29f-4aac-92b5-849ae8ec7dad' }
      ],
      visible: false
    }
  }
}
</script>
