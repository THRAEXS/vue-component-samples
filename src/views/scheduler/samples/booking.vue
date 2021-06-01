<template>
  <div class="app-container booking-form">
    <el-card class="timeline">
      <div slot="header" class="clearfix">
        <label>{{ boardroom.name }}</label>
      </div>

      <br-timeline
        height="135px"
        :units="units"
        :navline="false"
      />
    </el-card>

    <el-row :gutter="5">
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
    </el-row>

    <footer>
      <el-button size="small" type="primary" @click="handleSubmit">提交</el-button>
      <el-button size="small" @click="$router.go(-1)">返回</el-button>
    </footer>
  </div>
</template>
<script>
import { getBoardroom } from '@/api/boardroom'

export default {
  components: {
    BrTimeline: () => import('./components/timeline'),
    BrEdit: () => import('./components/edit'),
    BrView: () => import('./components/view')
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
  created() {
    /*
      TODO:
      1. room id
      2. timestamp param
    */
    const { rid, start } = this.$route.query
    getBoardroom(rid).then(({ data }) => (this.boardroom = data))

    const begin = new Date(Number.parseInt(start))
    const [year, month, date] = [begin.getFullYear(), begin.getMonth(), begin.getDate()]
    this.units.push({ key: `${year}-${month + 1}-${date}`, label: `${year}年${month + 1}月${date}日` })
    for (let i = 1; i < 2; i++) {
      const next = new Date(year, month, date + i)
      const [y, m, d] = [next.getFullYear(), next.getMonth() + 1, next.getDate()]
      this.units.push({ key: `${y}-${m}-${d}`, label: `${y}年${m}月${d}日` })
    }
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
    handleSubmit() {
      console.debug('submit...')
      const res = this.$refs.brEdit.getFormData()
      for (const k in res) {
        console.debug(k, ':', res[k])
      }
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
    // border: 1px solid red;
    overflow: auto;
  }

  footer {
    text-align: center;
    // border: 1px solid red;
  }
}
</style>
