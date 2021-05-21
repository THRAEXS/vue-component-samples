<template>
  <div ref="scheduler" />
</template>
<script>
/* global scheduler */
import 'dhtmlx-scheduler'

export default {
  props: {
    events: {
      type: Array,
      default() {
        return { events: [] }
      }
    }
  },
  mounted() {
    scheduler.skin = 'material'
    scheduler.config.header = [
      'day',
      'week',
      'month',
      'date',
      'prev',
      'today',
      'next'
    ]
    this.$_initSchedulerEvents()
    scheduler.init(this.$refs.scheduler, new Date(2020, 0, 20), 'week')
    scheduler.parse(this.$props.events)
  },
  methods: {
    $_initSchedulerEvents() {
      if (!scheduler.$_eventsInitialized) {
        scheduler.attachEvent('onEventAdded', (id, ev) =>
          this.$emit('event-updated', id, 'inserted', ev))
        scheduler.attachEvent('onEventChanged', (id, ev) =>
          this.$emit('event-updated', id, 'updated', ev))
        scheduler.attachEvent('onEventDeleted', (id, ev) =>
          this.$emit('event-updated', id, 'deleted'))
        scheduler.$_eventsInitialized = true
      }
    }
  }
}
</script>
<style>
@import "~dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
</style>
