<script>
import Scheduler from '@/components/scheduler'
import { serverTime, boardrooms } from '@/api/boardroom'

export default {
  data() {
    return {
      scheduler: null,
      now: new Date(),
      units: [],
      props: {
        key: 'id',
        label: 'name',
        children: 'children'
      }
    }
  },
  created() {
    /* serverTime().then(({ data }) => (this.now = new Date(data)))
    boardrooms().then(({ data }) => {
      this.units = data.map(({
        [this.props.key]: key,
        [this.props.label]: label,
        [this.props.children]: children
      }) => ({
        key,
        label,
        open: true,
        children: children.map(({
          [this.props.key]: key,
          [this.props.label]: label
        }) => ({ key, label }))
      }))
    }) */
  },
  mounted() {
    /*
      1.获取系统时间
      2.获取会议室分类数据(剔除预留和维护中)
      3.渲染scheduler
      4.获取预定时间段
    */
    Promise.all([
      serverTime(),
      boardrooms()
    ]).then(([{ data: now }, { data }]) => {
      this.now = new Date(now)
      this.units = data.map(({
        [this.props.key]: key,
        [this.props.label]: label,
        [this.props.children]: children,
        remark = ''
      }) => ({
        key,
        label: remark ? `${label} <label style="color: red;">(${remark})</label>` : label,
        open: true,
        children: children.map(({
          [this.props.key]: key,
          [this.props.label]: label
        }) => ({ key, label }))
      }))
    }).finally(this.start)
  },
  methods: {
    start() {
      Scheduler().then(this.init)
    },
    init(scheduler) {
      this.scheduler = scheduler
      this.scheduler.config.readonly = true
      // this.scheduler.config.edit_on_create = false
      this.scheduler.config.xml_date = '%Y-%m-%d %H:%i'

      this.scheduler.createTimelineView({
        name:	'timeline',
        x_unit:	'minute',
        x_date:	'%i',
        x_start: 16,
        x_step:	30,
        x_size: 22,
        dx: 500,
        y_unit: this.units,
        y_property:	'section_id',
        event_dy: 'full',
        render: 'tree',
        second_scale: {
          x_unit: 'hour',
          x_date: '%H点'
        },
        section_autoheight: false,
        folder_dy: 40,
        dy: 40
      })

      this.scheduler.init(this.$refs.scheduler, this.now, 'timeline')
      this.scheduler.parse([
        { start_date: '2021-05-27 09:00:00', end_date: '2021-05-27 12:00:00', text: 'Event 0', section_id: 'room-0'
        },
        { start_date: '2021-05-27 09:00', end_date: '2021-05-27 12:00', text: 'Event 1', section_id: 'room-2'
        },
        { start_date: new Date(2021, 4, 27, 9), end_date: new Date(2021, 4, 27, 12), text: 'Event 2', section_id: 'room-3'
        },
        { start_date: new Date(2021, 4, 27, 9).getTime(), end_date: new Date(2021, 4, 27, 12).getTime(), text: 'Event 3', section_id: 'room-4'
        }
      ], 'json')
    },
    initV1(scheduler) {
      console.debug('init...', window.scheduler === scheduler, scheduler)
      scheduler.locale.labels.timeline_tab = 'Timeline'
      scheduler.locale.labels.section_custom = 'Section'
      scheduler.config.details_on_create = true
      scheduler.config.details_on_dblclick = true
      scheduler.config.xml_date = '%Y-%m-%d %H:%i'

      const elements = [
        {
          key: 10, label: 'Web Testing Dep.', open: true, children: [
            { key: 20, label: 'Elizabeth Taylor' },
            { key: 30, label: 'Managers', children: [
              { key: 40, label: 'John Williams' },
              { key: 50, label: 'David Miller' }
            ] },
            { key: 60, label: 'Linda Brown' },
            { key: 70, label: 'George Lucas' }
          ]
        },
        {
          key: 110, label: 'Human Relations Dep.', open: true, children: [
            { key: 80, label: 'Kate Moss' },
            { key: 90, label: 'Dian Fossey' }
          ]
        }
      ]

      scheduler.createTimelineView({
        section_autoheight: false,
        name:	'timeline',
        x_unit:	'minute',
        x_date:	'%H:%i',
        x_step:	30,
        x_size: 24,
        x_start: 16,
        x_length:	48,
        y_unit: elements,
        y_property:	'section_id',
        render: 'tree',
        folder_dy: 20,
        dy: 60
      })

      scheduler.config.lightbox.sections = [
        { name: 'description', height: 130, map_to: 'text', type: 'textarea', focus: true },
        { name: 'custom', height: 23, type: 'timeline', options: null, map_to: 'section_id' },
        { name: 'time', height: 72, type: 'time', map_to: 'auto' }
      ]

      scheduler.init(this.$refs.scheduler, new Date(2020, 5, 30), 'timeline')
      // scheduler.clearAll()
      scheduler.parse([
        { start_date: '2020-06-30 09:00', end_date: '2020-06-30 12:00', text: 'Task A-12458', section_id: 20 },
        { start_date: '2020-06-30 10:00', end_date: '2020-06-30 16:00', text: 'Task A-89411', section_id: 20 },
        { start_date: '2020-06-30 10:00', end_date: '2020-06-30 14:00', text: 'Task A-64168', section_id: 20 },
        { start_date: '2020-06-30 16:00', end_date: '2020-06-30 17:00', text: 'Task A-46598', section_id: 20 },
        { start_date: '2020-06-30 12:00', end_date: '2020-06-30 20:00', text: 'Task B-48865', section_id: 40 },
        { start_date: '2020-06-30 14:00', end_date: '2020-06-30 16:00', text: 'Task B-44864', section_id: 40 },
        { start_date: '2020-06-30 16:30', end_date: '2020-06-30 18:00', text: 'Task B-46558', section_id: 40 },
        { start_date: '2020-06-30 18:30', end_date: '2020-06-30 20:00', text: 'Task B-45564', section_id: 40 },
        { start_date: '2020-06-30 08:00', end_date: '2020-06-30 12:00', text: 'Task C-32421', section_id: 50 },
        { start_date: '2020-06-30 14:30', end_date: '2020-06-30 16:45', text: 'Task C-14244', section_id: 50 },
        { start_date: '2020-06-30 09:20', end_date: '2020-06-30 12:20', text: 'Task D-52688', section_id: 60 },
        { start_date: '2020-06-30 11:40', end_date: '2020-06-30 16:30', text: 'Task D-46588', section_id: 60 },
        { start_date: '2020-06-30 12:00', end_date: '2020-06-30 18:00', text: 'Task D-12458', section_id: 60 }
      ], 'json')
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
  height: 600px;
  /* border: 1px solid red; */
}
</style>
