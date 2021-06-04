<template>
  <div class="app-container booking-form">
    <el-card class="timeline">
      <div slot="header" class="clearfix">
        <label>{{ boardroom.name }}</label>
      </div>

      <br-timeline
        ref="brTimeline"
        height="135px"
        :units="units"
        @view-change="handleViewChange"
      />
    </el-card>

    <el-card>
      <br-edit
        ref="brEdit"
        :style="{ height: `${height}px` }"
        :capacity="boardroom.mostNumber"
      />
    </el-card>

    <footer>
      <el-button size="small" type="primary" @click="handleSubmit">提交</el-button>
      <el-button size="small" @click="$router.go(-1)">返回</el-button>
    </footer>
  </div>
</template>
<script>
import { serverTime, getBoardroom, getBookMarks, save } from '@/api/boardroom'

export default {
  components: {
    BrTimeline: () => import('./components/timeline-v2'),
    BrEdit: () => import('./components/edit-v2')
  },
  data() {
    return {
      height: 0,
      occupy: 5 * 2 + 20 * 2 + 10 * 2 + 4,
      units: [],
      boardroom: {}
    }
  },
  created() {
    const { rid, start } = this.$route.query
    const to = () => this.$router.push('/scheduler/preview')
    !rid && to()

    Promise.all([
      getBoardroom(rid),
      this.assemblyUnits(start)
    ]).then(([{ data }, units]) => {
      // TODO: boardroom does not exist
      this.boardroom = data
      this.units = units
    })
  },
  updated() {
    this.$nextTick(() => {
      const bodyHeight = document.body.clientHeight
      const navHeight = document.querySelector('.navbar').clientHeight

      const form = document.querySelector('.booking-form')
      const top = form.querySelector('.el-card.timeline').clientHeight
      const footer = form.querySelector('footer').clientHeight
      this.height = bodyHeight - navHeight - top - footer - this.occupy
    })
  },
  methods: {
    joinDate(y, m, d, cn) {
      return cn ? `${y}年${m}月${d}日` : `${y}-${m}-${d}`
    },
    async assemblyUnits(start) {
      let timestamp = Number.parseInt(start)
      Number.isNaN(timestamp) && (timestamp = await serverTime().then(({ data: time }) => time))

      const begin = new Date(timestamp)
      const [year, month, date] = [begin.getFullYear(), begin.getMonth(), begin.getDate()]

      const units = [{
        key: this.joinDate(year, month + 1, date),
        label: this.joinDate(year, month + 1, date, true)
      }]
      for (let i = 1; i < 2; i++) {
        const next = new Date(year, month, date + i)
        const [y, m, d] = [next.getFullYear(), next.getMonth() + 1, next.getDate()]
        units.push({ key: this.joinDate(y, m, d), label: this.joinDate(y, m, d, true) })
      }

      return units
    },
    handleViewChange({ now, marks: addMarks }) {
      getBookMarks({
        roomId: this.boardroom.id,
        dates: this.units.map(({ key }) => key)
      }).then(({ data }) => {
        const [year, month, date] = [now.getFullYear(), now.getMonth(), now.getDate()]
        addMarks(data.map(({ startTime, endTime }) => [
          new Date(startTime),
          new Date(endTime)
        ]).map(([start, end]) => ({
          key: this.joinDate(start.getFullYear(), start.getMonth() + 1, start.getDate()),
          start: new Date(year, month, date, start.getHours(), start.getMinutes()),
          end: new Date(year, month, date, end.getHours(), end.getMinutes())
        })))
      })
    },
    handleSubmit() {
      console.debug('submit...')
      const res = this.$refs.brEdit.getFormData()
      const formData = Object.assign(res, { roomId: this.boardroom.id })
      // for (const k in formData) {
      //   console.debug(k, ':', formData[k])
      // }

      const data = {
        book: formData,
        dates: this.$refs.brTimeline.getNewEvents()
      }
      console.debug(data)
      save(data).then(res => console.debug('res:', res))
    }
  }
}
</script>
<style lang="scss" scoped>
.booking-form {
  .el-card {
    margin-bottom: 5px;

    ::v-deep .el-card__header {
      padding: 5px;
    }
    ::v-deep .el-card__body {
      padding: 10px;
    }
    &.timeline {
      ::v-deep .el-card__body {
        padding: 0;
      }
    }
  }

  form, .content {
    overflow-x: hidden;
    overflow-y: scroll;
  }

  footer {
    text-align: center;
  }
}
</style>
