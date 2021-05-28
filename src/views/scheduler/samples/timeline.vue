<script>
import Scheduler from '@/components/scheduler'

export default {
  props: {
    // scheduler config
    readonly: Boolean,
    editOnCreate: Boolean,
    xmlDate: {
      type: String,
      default: '%Y-%m-%d %H:%i'
    },
    markNow: Boolean,
    // scheduler style
    height: {
      type: String,
      default: '600px'
    },
    now: Date,
    // timeline config
    dx: {
      type: Number,
      default: 120
    },
    render: {
      type: String,
      default: 'bar',
      validator(val) {
        return ['bar', 'tree'].indexOf(val) !== -1
      }
    },
    units: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      scheduler: null,
      defaultConfig: {
        name:	'timeline',
        x_unit:	'minute',
        x_date:	'%i',
        x_start: 14,
        x_step:	30,
        x_size: 32,
        // dx: 120,
        // y_unit: this.units,
        y_property:	'section_id',
        event_dy: 'full',
        // render: 'bar',
        second_scale: {
          x_unit: 'hour',
          x_date: '%H点'
        },
        section_autoheight: false,
        folder_dy: 40, // Only valid for tree
        dy: 40
      }
    }
  },
  computed: {
    schedulerCfg() {
      const {
        readonly,
        editOnCreate: edit_on_create,
        xmlDate: xml_date,
        markNow: mark_now
      } = this.$props
      return {
        readonly,
        edit_on_create,
        xml_date,
        mark_now
      }
    },
    timelineCfg() {
      const { dx, render, units: y_unit } = this.$props
      return Object.assign({}, this.defaultConfig, { dx, render, y_unit })
    }
  },
  mounted() {
    Scheduler().then(this.init)
  },
  methods: {
    init(scheduler) {
      this.scheduler = scheduler

      Object.assign(this.scheduler._click, this.handleButtonEvent(this.scheduler, this.now))
      Object.assign(this.scheduler.config, this.schedulerCfg)
      this.scheduler.createTimelineView(this.timelineCfg)
      this.scheduler.init(this.$refs.scheduler, this.now, 'timeline')

      if (this.now) {
        const [y, m, d] = [this.now.getFullYear(), this.now.getMonth(), this.now.getDate()]
        this.scheduler.addMarkedTimespan({
          start_date: new Date(y, m, d, 12),
          end_date: new Date(y, m, d, 14),
          type: 'dhx_time_block',
          // css: 'doing',
          sections: { timeline: ['room-4', 'room-5', 'room-8'] }
        })
        this.scheduler.updateView()
      }
    },
    handleButtonEvent(scheduler, now = new Date()) {
      return {
        // dhtmlxscheduler.js line: 2196
        dhx_cal_today_button() {
          console.debug('dhx_cal_today_button')
          // console.debug(scheduler)
          console.debug(scheduler.getState())
          console.debug(scheduler._currentDate())
          scheduler.setCurrentView(now)
          // scheduler.setCurrentView(scheduler._currentDate())
          // scheduler.setCurrentView(now)
          // console.debug(scheduler.date)
          // // console.debug(scheduler._mode)
          // const t = scheduler.callEvent('onBeforeTodayDisplayed', [])
          // console.debug(t)
        },
        dhx_cal_prev_button() {
          console.debug('dhx_cal_prev_button')
          const { date } = scheduler.getState()
          console.debug(date)
          const next = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)
          console.debug('prev', next)
          scheduler.setCurrentView(next)
        },
        dhx_cal_next_button() {
          console.debug('dhx_cal_next_button')
          const { date } = scheduler.getState()
          console.debug(date)
          const next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
          console.debug('next', next)
          scheduler.setCurrentView(next)
        }
      }
    }
  },
  render(h) {
    const tag = 'div'

    return h(tag, {
      ref: 'scheduler',
      class: 'dhx_cal_container',
      style: {
        height: this.height
      }
    }, [
      h(tag, { class: 'dhx_cal_navline' }, [
        h(tag, { class: 'dhx_cal_prev_button' }),
        h(tag, { class: 'dhx_cal_next_button' }),
        h(tag, { class: 'dhx_cal_today_button' }),
        h(tag, { class: 'dhx_cal_date' })
      ]),
      h(tag, { class: 'dhx_cal_header' }),
      h(tag, { class: 'dhx_cal_data' })
    ])
  }
}
</script>
<style scoped>
@import '/static/dhtmlxScheduler/scheduler.css';

.dhx_cal_container {
  width: 100%;
  /* border: 1px solid red; */
}
.doing {
  background-color: red;
  opacity: 0.5;
}
</style>
