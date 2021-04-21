<template>
  <div class="svg-box">
    <svg />
  </div>
</template>
<script>
import * as d3 from 'd3'
import request from '@/utils/request'

export default {
  data() {
    const n = 12
    const margin = { top: 16, right: 6, bottom: 6, left: 0 }
    const barSize = 48
    const height = margin.top + barSize * n + margin.bottom

    return {
      data: null,
      margin,
      barSize,
      width: 1600,
      height,
      n,
      x: null,
      y: null,
      names: null
    }
  },
  created() {
    this.getData().then(data => (this.data = data)).then(() => {
      this.names = new Set(this.data.map(d => d.name))
    })

    // this.x = d3.scaleLinear([0, 1], [this.margin.left, this.width - this.margin.right])
    // this.y = d3.scaleBand()
    //   .domain(d3.range(this.n + 1))
    //   .rangeRound([this.margin.top, this.margin.top + this.barSize * (this.n + 1 + 0.1)])
    //   .padding(0.1)

    // this.rank = value => {
    //   const data = Array.from(this.names, name => ({ name, value: value(name) }))
    //   data.sort((a, b) => d3.descending(a.value, b.value))
    //   for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(this.n, i)
    //   return data
    // }
  },
  mounted() {
    this.handleRace()
  },
  methods: {
    handleRace() {
      const svg = d3.select(this.$el.querySelector('svg'))
      svg.attr('viewBox', [0, 0, this.width, this.height])

      this.bars(svg)
    },
    bars(svg) {
      let bar = svg.append('g')
        .attr('fill-opacity', 0.6)
        .selectAll('rect')
    },
    async getData() {
      return (await request({ url: '/api/thraex/flows', method: 'get' })).data
    }
  }
}
</script>
<style lang="sass">
.svg-box
  margin: 20px
  svg
    margin: 10px
</style>
