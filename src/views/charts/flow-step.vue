<template>
  <div class="app-container">
    <el-card v-for="item in data" :key="item.id">
      <!-- <el-row :gutter="5">
        <el-col :span="24"> -->
          <el-steps :active="item.tasks.length" align-center>
            <el-step
              v-for="task in item.tasks"
              :key="`${item.id}-${task.activityId}`"
              :title="task.taskName"
              :description="task.handleTime"
            />
          </el-steps>
          Diffs: {{ item.diffs }}
          Diffs: {{ item.diffs2 }}
          <!-- Diffs: {{ item.diffs.map(it => moment.duration(it)) }} -->
          <!-- <div class="remark">Scope</div> -->
          <!-- <el-row type="flex" justify="center">
            <el-col align="center" class="remark">Scope</el-col>
            <el-col align="center" class="remark">Scope</el-col>
          </el-row> -->

        <!-- </el-col>
        <el-col :span="12"> -->
          <!-- <div class="el-step__head is-finish">
            <div class="el-step__icon is-text">
              <div class="el-step__icon-inner">1</div>
            </div>
            ->
            <div class="el-step__icon is-text">
              <div class="el-step__icon-inner">2</div>
            </div>
          </div> -->
        <!-- </el-col> -->
      </el-row>
    </el-card>
  </div>
</template>
<script>
import request from '@/utils/request'
import moment from 'moment'

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
    // key = 'DZBDSP'
    // this.getData(key).then(data => (this.data = data.sort((a, b) => b.tasks.length - a.tasks.length)))
    this.getData(key).then(data => {
      this.data = data.sort((a, b) => b.tasks.length - a.tasks.length)
      this.data.forEach(it => {
        it.diffs2 = it.diffs.map(d => {
          const dura = moment.duration(d)
          return {
            days: dura.days(),
            hours: dura.hours(),
            minutes: dura.minutes(),
            seconds: dura.seconds()
          }
        })
        // const { days, hours, minutes, seconds } = it.diffs2
        // console.debug(days, hours, minutes, seconds)
        // it.diffs2.forEach(({ days, hours, minutes, seconds }) =>
        //   console.debug(days, hours, minutes, seconds))
      })
    })
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
  // border: 1px solid red
// .el-step__description
//   text-align: center
.remark
  // border: 1px solid blue
  // position: absolute
</style>
