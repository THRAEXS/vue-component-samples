<template>
  <div class="app-container booking-form">
    <el-card class="timeline">
      <div slot="header" class="clearfix">
        <label>{{ boardroom.name }}</label>
      </div>

      <el-form ref="form" :rules="rules" size="mini">
        <el-form-item prop="dates">
          <br-timeline
            ref="brTimeline"
            :units="units"
            height="135px"
            @view-changed="handleViewChange"
            @drag-end="$refs.form.clearValidate()"
          />
        </el-form-item>
      </el-form>
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
    BrTimeline: () => import('./components/timeline'),
    BrEdit: () => import('./components/edit')
  },
  data() {
    return {
      height: 0,
      occupy: 5 * 2 + 20 * 2 + 10 * 2 + 4,
      units: [],
      boardroom: {},
      rules: {
        dates: {
          validator: (_, value, callback) => callback('请选择日期')
        }
      }
    }
  },
  created() {
    const { rid, start } = this.$route.query
    const to = () => this.$router.push('/boardroom/index')
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
      // const navHeight = document.querySelector('.navbar')?.clientHeight || 0
      const navbar = document.querySelector('.navbar')
      const navHeight = navbar ? navbar.clientHeight : 0

      const form = document.querySelector('.booking-form')
      const top = form.querySelector('.el-card.timeline').clientHeight
      const footer = form.querySelector('footer').clientHeight
      this.height = bodyHeight - navHeight - top - footer - this.occupy
    })
  },
  methods: {
    joinDate(y, m, d, cn) {
      const to = p => {
        const n = p.toString()
        return n.length > 1 ? n : `0${n}`
      }
      return cn ? `${y}年${m}月${d}日` : `${y}-${to(m)}-${to(d)}`
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
        addMarks(data.map(({ startTime, endTime, state }) => [
          new Date(startTime),
          new Date(endTime),
          state
        ]).map(([start, end, state]) => ({
          key: this.joinDate(start.getFullYear(), start.getMonth() + 1, start.getDate()),
          start: new Date(year, month, date, start.getHours(), start.getMinutes()),
          end: new Date(year, month, date, end.getHours(), end.getMinutes()),
          css: state === 20 ? 'thx_event_completed' : 'thx_event_pending'
        })))
      })
    },
    getBookEvents() {
      return new Promise((resolve, reject) => {
        const events = this.$refs.brTimeline.getNewEvents()
        if (events.length > 0) {
          resolve(events)
        } else {
          this.$refs.form.validateField(Object.keys(this.rules))
          reject()
        }
      })
    },
    handleSubmit() {
      Promise.all([
        this.getBookEvents(),
        this.$refs.brEdit.getFormData()
      ]).then(([dates, data]) => {
        save({
          book: Object.assign(data, { roomId: this.boardroom.id }),
          dates
        }).then(res => console.debug('res:', res))
      }).catch(() => console.warn('Please select a date and fill in the form.'))
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
