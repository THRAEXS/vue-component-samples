<script>
import Scheduler from '@/components/scheduler'

export default {
  props: {
    now: Date,
    readonly: Boolean,
    height: {
      type: String,
      default: '600px'
    },
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
        y_property:	'section_id',
        event_dy: 'full',
        second_scale: {
          x_unit: 'hour',
          x_date: '%G点'
        },
        section_autoheight: false,
        folder_dy: 40, // Only valid for tree
        dy: 40
      },
      marks: []
    }
  },
  computed: {
    schedulerCfg() {
      const { readonly } = this.$props
      return {
        readonly,
        edit_on_create: false,
        xml_date: '%Y-%m-%d %H:%i',
        mark_now: false,
        dblclick_create: false
      }
    },
    timelineCfg() {
      const { dx, render, units: y_unit } = this.$props
      return Object.assign({}, this.defaultConfig, { dx, render, y_unit })
    }
  },
  watch: {
    now(val) {
      this.scheduler && this.scheduler.setCurrentView(val)
    }
  },
  mounted() {
    Scheduler().then(this.init)
  },
  methods: {
    init(scheduler) {
      this.scheduler = scheduler

      const d2s = this.scheduler.date.date_to_str('%H:%i')
      const format = (s, e) => `${d2s(s)}-${d2s(e)}`
      Object.assign(this.scheduler.templates, {
        event_bar_text: (start, end) => format(start, end),
        tooltip_text: (start, end) => `<b>${format(start, end)}</b>` // tooltip.js
      })
      Object.assign(this.scheduler.config, this.schedulerCfg)

      this.scheduler.showLightbox = () => {}
      this.scheduler.xy.nav_height = 5

      this.scheduler.attachEvent('onViewChange', this.handleViewChange)
      this.scheduler.attachEvent('onDragEnd', this.adjustTime)

      this.scheduler.createTimelineView(this.timelineCfg)
      this.scheduler.init(this.$refs.scheduler, this.now, 'timeline')
    },
    adjustTime() {
      this.scheduler.getEvents().forEach(({ start_date: sd, end_date: ed }) => {
        const [sm, em] = [sd.getMinutes(), ed.getMinutes()]
        sm > 0 && sm < 30 && sd.setMinutes(0)
        sm > 30 && sm < 60 && sd.setMinutes(30)
        em > 0 && em < 30 && ed.setMinutes(30)
        em > 30 && em < 60 && ed.setMinutes(60)
      })
      this.scheduler.updateView()
    },
    handleViewChange() {
      this.$emit('view-change', {
        now: this.scheduler.getState().date,
        events: this.addEvents,
        marks: this.addMarks
      })
    },
    addMarks(marks = []) {
      this.marks.forEach(m => this.scheduler.deleteMarkedTimespan(m))
      this.marks = []
      if (marks && marks.length > 0) {
        this.marks = marks.map(({ key, start, end }) => ({
          start_date: start,
          end_date: end,
          type: 'dhx_time_block',
          sections: { timeline: key }
        })).map(m => this.scheduler.addMarkedTimespan(m))
        this.scheduler.updateView()
      }
    },
    addEvents(events = []) {
      this.scheduler.clearAll()
      if (events && events.length > 0) {
        this.scheduler.parse(events.map(({ key, start, end }) => ({
          [this.timelineCfg.y_property]: key,
          start_date: start,
          end_date: end
        })), 'json')
      }
    },
    // Currently only valid for booking
    getNewEvents() {
      const events = this.scheduler.getEvents()
      const d2s = this.scheduler.date.date_to_str('%H:%i')

      return events.map(e => {
        const {
          [this.timelineCfg.y_property]: key,
          start_date: sd,
          end_date: ed
        } = e
        return { key, start: `${key} ${d2s(sd)}`, end: `${key} ${d2s(ed)}` }
      }).sort((a, b) => new Date(a.start) - new Date(b.start))
    }
  },
  render(h) {
    const tag = 'div'

    return h(tag, {
      ref: 'scheduler',
      class: 'dhx_cal_container',
      style: { height: this.height }
    }, [
      h(tag, { class: 'dhx_cal_navline' }, [
        h(tag, { class: 'dhx_cal_date', style: { display: 'none' }})
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
}
::v-deep .dhx_cal_event_line {
  text-align: center;
  font-size: 18px;
  line-height: 36px;
}
.doing {
  background-color: red;
  opacity: 0.5;
}
</style>
