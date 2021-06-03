<template>
  <div class="app-container">
    <el-card>
      <br-timeline
        render="tree"
        :height="`${height}px`"
        readonly
        :dx="500"
        :now="now"
        :units="units"
        @complete="handleComplete"
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
      height: 0,
      occupy: 20 * 2 + 2,
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
      const label1 = (k, l) => `<span id="${k}" class="section-room">${l}</span>`
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
  },
  updated() {
    this.$nextTick(() => {
      const bodyHeight = document.body.clientHeight
      const navHeight = document.querySelector('.navbar').clientHeight
      this.height = bodyHeight - navHeight - this.occupy
    })
  },
  methods: {
    async handleComplete() {
      const els = document.getElementsByClassName('section-room')
      if (els.length > 0) {
        const vue = await import('vue').then(({ default: v }) => v)
        const Link = vue.extend({
          props: ['value', 'handler'],
          render(c) {
            return c('el-link', {
              attrs: {
                underline: false
              },
              on: {
                click: () => this.handler(this.value.id)
              }
            }, this.value.text)
          }
        })

        const rooms = []
        els.forEach(({ id, innerText: text }) => rooms.push({ id, text }))
        rooms.forEach(({ id, text }) =>
          new Link({
            propsData: {
              value: { id, text },
              handler: rid => this.$router.push({
                path: '/scheduler/booking',
                query: { rid, start: this.now.getTime() }
              })
            }
          }).$mount(`#${id}`)
        )
      }
    }
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
