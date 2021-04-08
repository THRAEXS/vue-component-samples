<template>
  <div class="svg-box">
    <svg :viewBox="viewBox">
    </svg>
  </div>
</template>
<script>
// import * as d3 from 'd3'
import chartData from '../../../bars.tmp/data'

export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    chartData.forEach(it => (it.date = new Date(it.date)))
    this.data = chartData
  }
}
</script>
