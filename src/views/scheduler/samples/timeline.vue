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
    // scheduler style
    height: {
      type: String,
      default: '600px'
    },
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

    now: Date,
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
        y_unit: this.units,
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
      const { readonly, editOnCreate: edit_on_create, xmlDate: xml_date } = this.$props
      return { readonly, edit_on_create, xml_date }
    },
    timelineCfg() {
      const { dx, render } = this.$props
      return Object.assign({}, this.defaultConfig, { dx, render })
    }
  },
  mounted() {
    Scheduler().then(this.init)
  },
  methods: {
    init(scheduler) {
      this.scheduler = scheduler

      Object.assign(this.scheduler.config, this.schedulerCfg)
      this.scheduler.createTimelineView(this.timelineCfg)
      this.scheduler.init(this.$refs.scheduler, this.now, 'timeline')
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
  border: 1px solid red;
}
</style>
