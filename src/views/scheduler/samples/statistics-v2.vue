<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="card-header">
        <el-date-picker
          v-model="now"
          :clearable="false"
          size="mini"
        />
      </div>

      <br-timeline
        render="tree"
        :height="`${height}px`"
        readonly
        :dx="500"
        :now="now"
        :units="units"
        :events="events"
        @view-change="handleViewChange"
      />
    </el-card>
  </div>
</template>
<script>
import { serverTime, getBoardrooms, getEvents } from '@/api/boardroom'

export default {
  components: { BrTimeline: () => import('./components/timeline-v2') },
  data() {
    return {
      props: {
        key: 'id',
        label: 'name',
        children: 'children'
      },
      height: 0,
      occupy: 20 * 2 + 5 * 2 + 1 + 2,
      now: null,
      units: null,
      events: null,
      Link: null
    }
  },
  watch: {
    now(val) {
      console.debug('wath date now...')
      getEvents(this.now.getTime()).then(({ data }) => {
        console.debug('r', data)
        this.events = data.map(({ roomId: section_id, startTime, endTime }) => ({
          section_id, start_date: new Date(startTime), end_date: new Date(endTime)
        }))
      })
    }
  },
  mounted() {
    Promise.all([
      serverTime(),
      getBoardrooms(),
      this.getLink()
    ]).then(([{ data: now }, { data }, link]) => {
      this.Link = link
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
    }).then(() => getEvents(this.now.getTime())).then(({ data }) => {
      console.debug('r', data)
      this.events = data.map(({ roomId: section_id, startTime, endTime }) => ({
        section_id, start_date: new Date(startTime), end_date: new Date(endTime)
      }))
    })
  },
  updated() {
    this.$nextTick(() => {
      const bodyHeight = document.body.clientHeight
      const navHeight = document.querySelector('.navbar').clientHeight
      const headerHeight = document.querySelector('.card-header').clientHeight
      this.height = bodyHeight - navHeight - headerHeight - this.occupy
    })
  },
  methods: {
    async getLink() {
      const vue = await import('vue').then(({ default: v }) => v)
      return vue.extend({
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
    },
    handleViewChange() {
      console.debug('handleViewChange...')

      const els = document.getElementsByClassName('section-room')
      const rooms = []
      els.forEach(({ id, innerText: text }) => rooms.push({ id, text }))
      rooms.forEach(({ id, text }) =>
        new this.Link({
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
</script>
<style lang="scss" scoped>
.el-card {
  ::v-deep .el-card__header {
    padding: 5px;
    text-align: center;
  }
  ::v-deep &__body {
    padding: 0;
  }
}
</style>
