<script>
import Scheduler from '@/components/scheduler'

export default {
  props: {
    readonly: Boolean,
    editOnCreate: Boolean,
    xmlDate: {
      type: String,
      default: '%Y-%m-%d %H:%i'
    },
    now: Date,
    units: {
      type: Array,
      default() {
        return []
      }
    },
    height: {
      type: String,
      default: '600px'
    },
    config: {
      type: Object,
      default() {
        return {}
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
        dx: 120,
        y_unit: this.units,
        y_property:	'section_id',
        event_dy: 'full',
        render: 'bar',
        second_scale: {
          x_unit: 'hour',
          x_date: '%H点'
        },
        section_autoheight: false,
        folder_dy: 40,
        dy: 40
      }
    }
  },
  computed: {
    timelineView() {
      // ignore second_scale
      return Object.assign({}, this.defaultConfig, this.config)
    }
  },
  mounted() {
    Scheduler().then(this.init)
  },
  methods: {
    init(scheduler) {
      this.scheduler = scheduler

      const { readonly, editOnCreate: edit_on_create, xmlDate: xml_date } = this.$props
      Object.assign(this.scheduler.config, { readonly, edit_on_create, xml_date })

      this.scheduler.createTimelineView(this.timelineView)
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
