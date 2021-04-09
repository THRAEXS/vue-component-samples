<template>
  <div class="svg-box">
    <svg />
  </div>
</template>
<script>
import * as d3 from 'd3'
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
  },
  mounted() {
    const svg = d3.select(this.$el.querySelector('svg'))
    svg.attr('viewBox', [0, 0, 600, 200])
      .append('g')
      .attr('transform', 'translate(0, 10)')

    const data = [99, 71, 78, 25, 36, 92]
    const x = d3.scaleLinear().range([0, 430])
    const y = d3.scaleLinear().range([210, 0])
    d3.axisLeft().scale(x)
    d3.axisTop().scale(y)
    x.domain(d3.extent(data, (d, i) => i))
    y.domain([0, d3.max(data, d => d)])
    const createPath = d3.line()
      .x((d, i) => x(i))
      .y(d => y(d))
    svg.append('path').attr('d', createPath(data))
  }
}
</script>
<style lang="sass">
.svg-box
  border: 1px solid red
  svg
    margin: 25px
    path
      fill: none
      stroke: #76BF8A
      stroke-width: 3px
</style>
