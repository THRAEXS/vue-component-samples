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
      duration: 250,
      n,
      x: null,
      y: null,
      color: null,
      names: null
    }
  },
  created() {
    // this.getData().then(data => (this.data = data)).then(() => {
    //   // this.names = new Set(this.data.map(d => d.name))
    // })

    this.x = d3.scaleLinear([0, 1], [this.margin.left, this.width - this.margin.right])
    this.y = d3.scaleBand()
      .domain(d3.range(this.n + 1))
      .rangeRound([this.margin.top, this.margin.top + this.barSize * (this.n + 1 + 0.1)])
      .padding(0.1)

    this.color = (() => {
      const scale = d3.scaleOrdinal(d3.schemeTableau10)
      // if (this.data.some(d => d.category !== undefined)) {
      //   const categoryByName = new Map(this.data.map(d => [d.name, d.category]))
      //   scale.domain(categoryByName.values())
      //   return d => scale(categoryByName.get(d.name))
      // }
      return d => scale(d.name)
    })()

    // this.rank = value => {
    //   const data = Array.from(this.names, name => ({ name, value: value(name) }))
    //   data.sort((a, b) => d3.descending(a.value, b.value))
    //   for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(this.n, i)
    //   return data
    // }
  },
  mounted() {
    // this.handleRace()
    this.getData().then(data => (this.data = data)).then(() => {
      // this.names = new Set(this.data.map(d => d.name))

      this.handleRace()
    })
  },
  methods: {
    handleRace() {
      const svg = d3.select(this.$el.querySelector('svg'))
      svg.attr('viewBox', [0, 0, this.width, this.height])

      // svg.node()

      // const transition = svg.transition()
      //   .duration(this.duration)
      //   .ease(d3.easeLinear)

      // console.debug()
      // this.x.domain([0, Math.max(...this.data.map(({ value }) => value))])
      this.x.domain([0, this.data[0].value])

      this.bars(svg)
      this.labels(svg)
      // transition.end()
    },
    bars(svg) {
      let bar = svg.append('g')
        .attr('fill-opacity', 0.6)
        .selectAll('rect')
        .data(this.data, d => d.name)
        .join(
          enter => enter.append('rect')
            .attr('fill', this.color)
            .attr('height', this.y.bandwidth())
            .attr('x', this.x(0))
            // .attr('y', d => this.y((this.prev.get(d) || d).rank))
            .attr('y', (d, i) => this.y(i))
            // .attr('width', d => this.x((this.prev.get(d) || d).value) - this.x(0)),
            .attr('width', d => {
              // console.debug((d.value) , (0))
              // console.debug(this.x(d.value) , this.x(0))
              return this.x(d.value) - this.x(0)
            }),
          // update => update,
          // exit => exit.transition(transition).remove()
          //   // .attr('y', d => this.y((this.next.get(d) || d).rank))
          //   .attr('y', d => this.y(d.value))
          //   // .attr('width', d => this.x((this.next.get(d) || d).value) - this.x(0))
          //   .attr('width', d => this.x(d.value) - this.x(0))
        )
        // .call(bar => bar.transition(transition)
        //   .attr('y', d => this.y(d.rank))
        //   .attr('width', d => this.x(d.value) - this.x(0)))
    },
    labels(svg) {
      let label = svg.append('g')
        .style('font', 'bold 12px var(--sans-serif)')
        .style('font-variant-numeric', 'tabular-nums')
        .attr('text-anchor', 'end')
        .selectAll('text')
        .data(this.data, d => d.name)
        .join(
          enter => enter.append('text')
            .attr('transform', (d, i) => `translate(${this.x(d.value)},${this.y(i)})`)
            .attr('y', this.y.bandwidth() / 2)
            .attr('x', -6)
            .attr('dy', '-0.25em')
            .text(d => d.name)
            .call(text => text.append('tspan')
              .attr('fill-opacity', 0.7)
              .attr('font-weight', 'normal')
              .attr('x', -6)
              .attr('dy', '1.15em').text('Placeholder'))
        )
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
