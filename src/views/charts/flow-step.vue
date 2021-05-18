<template>
  <div class="app-container">
    <el-card v-for="item in data" :key="item.id">
      <!-- <el-row :gutter="5">
        <el-col :span="12"> -->
          <el-steps :active="item.tasks.length" align-center>
            <el-step
              v-for="task in item.tasks"
              :key="`${item.id}-${task.activityId}`"
              :title="task.taskName"
            />
          </el-steps>
        <!-- </el-col>
        <el-col :span="12"> -->
          <!-- hhhh -->
        <!-- </el-col>
      </el-row> -->
      <div style="text-align: center;">
        asdf
      </div>
    </el-card>
  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    let { key } = this.$route.params.data || {}
    // console.debug('created:', this.$route.params)
    // !data && this.$router.push({ name: 'BarChartFlow' })

    key = 'SDTGXSP'
    this.getData(key).then(data => (this.data = data.sort((a, b) => b.tasks.length - a.tasks.length)))
  },
  methods: {
    async getData(key) {
      return (await request({ url: '/api/thraex/flows/step', method: 'get', params: { key }})).data
    }
  }
}
</script>
<style lang="sass">
.el-card
  margin-bottom: 5px
.el-step
  border: 1px solid red
</style>
