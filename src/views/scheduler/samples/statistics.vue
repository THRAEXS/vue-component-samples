<template>
  <div class="app-container">
    <el-card>
      <br-timeline
        render="tree"
        height="800px"
        readonly
        :dx="500"
        :now="now"
        :units="units"
      />
    </el-card>
  </div>
</template>
<script>
import { serverTime, getBoardrooms } from '@/api/boardroom'

export default {
  components: { BrTimeline: () => import('./components/timeline') },
  data() {
    return {
      now: new Date(),
      units: [],
      props: {
        key: 'id',
        label: 'name',
        children: 'children'
      }
    }
  },
  mounted() {
    /*
      1.获取系统时间
      2.获取会议室分类数据(剔除预留和维护中)
      3.渲染scheduler
      4.获取预定时间段
    */
    Promise.all([
      serverTime(),
      getBoardrooms()
    ]).then(([{ data: now }, { data }]) => {
      this.now = new Date(now)

      const label0 = (l, r) => r ? `${l} <label style="color: red;">(${r})</label>` : l
      const label1 = (k, l) => `<a href="/scheduler/booking?id=${k}">${l}</a>`
      this.units = data.map(({
        [this.props.key]: key,
        [this.props.label]: label,
        [this.props.children]: children,
        remark = ''
      }) => ({
        key,
        label: label0(label, remark),
        open: true,
        children: children.map(({
          [this.props.key]: key,
          [this.props.label]: label
        }) => ({ key, label: label1(key, label) }))
      }))
    })
  }
}
</script>
<style lang="scss" scoped>
.el-card {
  ::v-deep &__body {
    padding: 0;
  }
}
</style>
