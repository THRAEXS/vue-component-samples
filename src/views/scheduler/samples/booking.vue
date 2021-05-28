<script>
import Scheduler from '@/components/scheduler'

export default {
  data() {
    return {
      scheduler: null,
      now: new Date(),
      units: []
    }
  },
  mounted() {
    for (let i = 0; i < 3; i++) {
      this.units.push({
        key: `key-${i}`,
        label: `label-${i}`
      })
    }

    Scheduler().then(this.init)
  },
  methods: {
    init(scheduler) {
      this.scheduler = scheduler
      this.scheduler.config.edit_on_create = false

      this.scheduler.createTimelineView({
        name:	'timeline',
        x_unit:	'minute',
        x_date:	'%i',
        x_start: 14,
        x_step:	30,
        x_size: 32,
        dx: 500,
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
      })

      this.scheduler.init(this.$refs.scheduler, this.now, 'timeline')
    }
  },
  render(h) {
    const tag = 'div'

    return h(tag, {
      ref: 'scheduler',
      class: 'dhx_cal_container'
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
  height: 300px;
  border: 1px solid red;
}
</style>
