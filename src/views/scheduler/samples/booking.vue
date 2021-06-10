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
        :navline="false"
      />
    </el-card>

    <el-card>
      <br-edit
        ref="brEdit"
        :style="calcStyle"
        :capacity="boardroom.mostNumber"
      />
    </el-card>
    <!-- <el-row :gutter="5">
      <el-col :span="18">
        <el-card>
          <br-edit
            ref="brEdit"
            :has-report="boardroom.report === 1"
            :has-computer="boardroom.computer === 1"
            :style="calcStyle"
          />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <br-view :style="calcStyle" />
        </el-card>
      </el-col>
    </el-row> -->

    <footer>
      <el-button size="small" type="primary" @click="handleSubmit">提交</el-button>
      <el-button size="small" @click="$router.go(-1)">返回</el-button>
    </footer>
  </div>
</template>
<script>
import { getBoardroom, save } from '@/api/boardroom'

export default {
  components: {
    BrTimeline: () => import('./components/timeline'),
    BrEdit: () => import('./components/edit-v2')
    // BrView: () => import('./components/view')
  },
  data() {
    return {
      height: 0,
      occupy: 5 * 2 + 20 * 2 + 10 * 2 + 4,
      units: [],
      boardroom: {}
    }
  },
  computed: {
    calcStyle() {
      return { height: `${this.height}px` }
    }
  },
  beforeCreate1() {
    const { rid } = this.$route.query
    const to = () => this.$router.push('/scheduler/preview')
    !rid && to()
    getBoardroom(rid).then(({ data }) => {
      data ? (this.boardroom = data) : to()
    })
  },
  created() {
    const { rid } = this.$route.query
    const to = () => this.$router.push('/scheduler/preview')
    !rid && to()
    getBoardroom(rid).then(({ data }) => (this.boardroom = data))

    this.handleUnits(this.$route.query.start)
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
    handleUnits(start) {
      const timestamp = Number.parseInt(start)
      const begin = Number.isNaN(timestamp) ? new Date() : new Date(timestamp)
      const [year, month, date] = [begin.getFullYear(), begin.getMonth(), begin.getDate()]
      this.units.push({ key: `${year}-${month + 1}-${date}`, label: `${year}年${month + 1}月${date}日` })
      for (let i = 1; i < 2; i++) {
        const next = new Date(year, month, date + i)
        const [y, m, d] = [next.getFullYear(), next.getMonth() + 1, next.getDate()]
        this.units.push({ key: `${y}-${m}-${d}`, label: `${y}年${m}月${d}日` })
      }
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
        dates: this.$refs.brTimeline.getEvents()
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
