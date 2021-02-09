<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.7)"
      :data="data"
      size="mini"
      stripe
      border
      fit
      highlight-current-row
      max-height="500"
    >
      <el-table-column type="index" align="center" width="50" />
      <el-table-column prop="code" label="Code" align="center" />
      <el-table-column prop="name" label="Name" align="center" />
      <el-table-column label="Operation" align="center" width="120" fixed="right">
        <template v-slot="scope">
          <el-button size="mini" type="success" @click="handleLoading(scope.row)">Detail</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      loading: false
    }
  },
  created() {
    for (let i = 0; i < 100; i++) {
      this.data.push({
        id: `id-${i}`,
        code: `Code-${i}`,
        name: `Name-${i}`
      })
    }
  },
  methods: {
    handleLoading() {
      console.debug(arguments)
      this.loading = true
    }
  }
}
</script>
