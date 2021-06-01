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
          <br-edit :style="calcStyle" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <br-view :style="calcStyle" />
        </el-card>
      </el-col>
    </el-row>

    <footer>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="$router.go(-1)">返回</el-button>
    </footer>
  </div>
</template>
<script>
export default {
  components: {
    BrTimeline: () => import('./components/timeline'),
    BrEdit: () => import('./components/edit'),
    BrView: () => import('./components/view')
  },
  data() {
    return {
      height: 0,
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
    this.boardroom = {
      id: 'id-x',
      name: '第三会议室'
    }

    const now = new Date()
    for (let i = 0; i < 2; i++) {
      const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i)
      const [y, m, d] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      this.units.push({
        key: `${y}-${m}-${d}`,
        label: `${y}年${m}月${d}日`
      })
    }
  },
  updated() {
    this.$nextTick(() => {
      const bodyHeight = document.body.clientHeight
      const navHeight = document.querySelector('.navbar').clientHeight

      const form = document.querySelector('.booking-form')
      const top = form.querySelector('.el-card.timeline').clientHeight
      const footer = form.querySelector('footer').clientHeight
      this.height = bodyHeight - navHeight - top - footer - 5 * 2 - 20 * 2 - 10 * 2 - 4
    })
  },
  methods: {
    handleSubmit() {
      console.debug('submit...')
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
