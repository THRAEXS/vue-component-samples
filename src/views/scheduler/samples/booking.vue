<template>
  <div class="app-container">
    <el-card>
      <timeline
        height="300px"
        :units="units"
      />
    </el-card>
    <el-card style="margin-top: 10px;">
      Form...
    </el-card>
  </div>
</template>
<script>
export default {
  components: { timeline: () => import('./timeline') },
  data() {
    return {
      units: []
    }
  },
  created() {
    const now = new Date()
    for (let i = 0; i < 2; i++) {
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i)
      const [y, m, d] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      this.units.push({
        key: `${y}-${m}-${d}`,
        label: `${y}年${m}月${d}日`
      })
    }
  }
}
</script>
