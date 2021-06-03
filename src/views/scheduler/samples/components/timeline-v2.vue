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
    },
    events: {
      type: Array,
      default() {
        return []
      }
    },
    marks: {
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
      }
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
        drag_move: false,
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
      console.debug('watch now...', val, this.scheduler)
      this.scheduler && this.scheduler.setCurrentView(val)
    },
    events(val) {
      console.debug('watch events...', val, this.scheduler)
      this.addEvents(val)
    },
    marks(val) {
      console.debug('watch marks...', val, this.scheduler)
    }
  },
  mounted() {
    Scheduler().then(this.init)
  },
  methods: {
    init(scheduler) {
      this.scheduler = scheduler

      const d2s = this.scheduler.date.date_to_str('%H:%i')
      Object.assign(this.scheduler.templates, {
        tooltip_text: (start, end, event) => `<b>${event.text}</b>`, // tooltip.js
        event_bar_text: (start, end, event) => {
          const { drag_id } = this.scheduler.getState()
          if (drag_id === event.id) {
            const sm = start.getMinutes()
            sm > 0 && sm < 30 && start.setMinutes(0)
            sm > 30 && sm < 60 && start.setMinutes(30)

            const em = end.getMinutes()
            em > 0 && em < 30 && end.setMinutes(30)
            em > 30 && em < 60 && end.setMinutes(60)

            event.text = `${d2s(start)}-${d2s(end)}`
          }

          return event.text
        }
      })
      Object.assign(this.scheduler.config, this.schedulerCfg)

      this.scheduler.showLightbox = () => {}
      this.scheduler.xy.nav_height = 5

      this.scheduler.attachEvent('onViewChange', () => {
        console.debug('onViewChange')
        this.$emit('view-change')
      })

      this.scheduler.createTimelineView(this.timelineCfg)
      this.scheduler.init(this.$refs.scheduler, this.now, 'timeline')

      // this.addMarks()
      this.addEvents(this.events)
    },
    addMarks() {
      // clear...
      /*
        1.getEventsByDate
        2.getEventsByRoomIdAndDates
      */
      const { date } = this.scheduler.getState()
      const [y, m, d] = [date.getFullYear(), date.getMonth(), date.getDate()]
      this.scheduler.addMarkedTimespan({
        start_date: new Date(y, m, d, 12),
        end_date: new Date(y, m, d, 14),
        type: 'dhx_time_block',
        // css: 'doing',
        sections: { timeline: ['room-4', 'room-5', 'room-8', 'room-13'] }
      })
      this.scheduler.updateView()
    },
    addEvents(events = []) {
      console.debug('add events...')
      // this.scheduler && this.scheduler.parse(events, 'json')
      if (this.scheduler) {
        this.scheduler.clearAll()
        this.scheduler.parse(events, 'json')
        this.$emit('view-change')

        // const year = this.now.getFullYear()
        // const month = this.now.getMonth()
        // const day = this.now.getDate()
        // this.scheduler.parse([
        //   { start_date: `${year}-${month + 1}-${day} 09:00:00`, end_date: `${year}-${month + 1}-${day} 12:00:00`, text: 'Event 0', section_id: 'room-0'
        //   },
        //   { start_date: `${year}-${month + 1}-${day} 09:00`, end_date: `${year}-${month + 1}-${day} 12:00`, text: 'Event 1', section_id: 'room-2'
        //   },
        //   { start_date: new Date(year, month, day, 9), end_date: new Date(year, month, day, 12), text: 'Event 2', section_id: 'room-3'
        //   },
        //   { start_date: new Date(year, month, day, 9).getTime(), end_date: new Date(year, month, day, 12).getTime(), text: 'Event 3', section_id: 'room-4'
        //   }
        // ], 'json')
      }
    },
    getEvents() {
      const events = this.scheduler.getEvents()
      const d2s = this.scheduler.date.date_to_str('%H:%i')

      return events.map(e => {
        const { section_id: id, start_date: sd, end_date: ed } = e
        return { start: `${id} ${d2s(sd)}`, end: `${id} ${d2s(ed)}` }
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
        h(tag, { class: 'dhx_cal_date', style: { display: '' }})
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
