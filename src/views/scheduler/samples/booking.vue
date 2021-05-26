<template>
  <el-row>
    <el-col style="height: 600px;">
      <div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:100%;'>
		<div class="dhx_cal_navline">
			<div class="dhx_cal_prev_button">&nbsp;</div>
			<div class="dhx_cal_next_button">&nbsp;</div>
			<div class="dhx_cal_today_button"></div>
			<div class="dhx_cal_date"></div>
			<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
			<div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
			<div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>
		</div>
		<div class="dhx_cal_header">
		</div>
		<div class="dhx_cal_data">
		</div>
	</div>
    </el-col>
  </el-row>
</template>
<script>
import Scheduler from '@/components/scheduler'

export default {
  mounted() {
    Scheduler().then(this.init)
  },
  methods: {
    init(scheduler) {
      scheduler.config.xml_date="%Y-%m-%d %H:%i";
		scheduler.init('scheduler_here',new Date(2010,1,10),"week");
    }
  }
}
</script>
<style scoped>
@import '/static/dhtmlxScheduler/scheduler.css';
</style>
