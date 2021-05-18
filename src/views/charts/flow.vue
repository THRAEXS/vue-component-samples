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
      data: [],
      margin,
      barSize,
      width: 1600,
      height,
      duration: 250,
      n,
      x: null,
      y: null,
      color: null,
      keyframes: []
    }
  },
  created() {
    this.x = d3.scaleLinear([0, 1], [this.margin.left, this.width - this.margin.right])
    this.y = d3.scaleBand()
      .domain(d3.range(this.n + 1))
      .rangeRound([this.margin.top, this.margin.top + this.barSize * (this.n + 1 + 0.1)])
      .padding(0.1)

    this.color = (scale => d => scale(d.name))(d3.scaleOrdinal(d3.schemeTableau10))
  },
  mounted() {
    this.getData().then(this.handleData).then(() => {
      // eslint-disable-next-line
      (async function(ag) { for await (const n of ag) { console.debug(n) } })(this.handleRace())
    })
  },
  methods: {
    handleData(data) {
      this.data = data

      for (let i = 0; i < 20; i++) {
        this.keyframes.push(data
          .map(({ value, ...other }) => ({ ...other, value: Math.abs(value - Math.random() * 10000) }))
          .sort((a, b) => b.value - a.value)
        )
      }

      this.keyframes.push(data.sort((a, b) => b.value - a.value))
    },
    async getData() {
      return (await request({ url: '/api/thraex/flows', method: 'get' })).data
    },
    handleRace: async function * () {
      const svg = d3.select(this.$el.querySelector('svg'))
      svg.attr('viewBox', [0, 0, this.width, this.height])

      const updateBars = this.bars(svg)
      const updateAxis = this.axis(svg)
      // const updateLabels = this.labels(svg)

      yield svg.node()

      for (const data of this.keyframes) {
        const transition = svg.transition()
          .duration(this.duration)
          .ease(d3.easeLinear)

        this.x.domain([0, data[0].value])

        updateBars(data, transition)
        updateAxis(data, transition)
        // updateLabels(data, transition)

        await transition.end()
      }
    },
    bars(svg) {
      let bar = svg.append('g')
        .attr('fill-opacity', 0.6)
        .attr('cursor', 'pointer')
        .selectAll('rect')

      return (data, transition) => (bar = bar
        .data(data.slice(0, this.n), d => d.name)
        .on('click', (_, d) => {
          // console.debug(_)
          // console.debug(d)
          this.$router.push({ name: 'BarChartFlowStep', params: { data: d }})
        })
        .join(
          enter => enter.append('rect')
            .attr('fill', this.color)
            .attr('height', this.y.bandwidth())
            .attr('x', this.x(0))
            // .attr('y', d => this.y((this.prev.get(d) || d).rank))
            .attr('y', (_, i) => this.y(i))
            // .attr('width', d => this.x((this.prev.get(d) || d).value) - this.x(0)),
            .attr('width', d => this.x(d.value) - this.x(0)),
          update => update,
          exit => exit.transition(transition).remove()
            // .attr('y', d => this.y((this.next.get(d) || d).rank))
            .attr('y', (_, i) => this.y(i))
            // .attr('width', d => this.x((this.next.get(d) || d).value) - this.x(0))
            .attr('width', d => this.x(d.value) - this.x(0))
        )
        .call(bar => bar.transition(transition)
          // .attr('y', d => this.y(d.rank))
          .attr('y', (_, i) => this.y(i))
          // .attr('width', d => this.x(d.value) - this.x(0))))
          .attr('width', d => this.x(d.value) - this.x(0))))
    },
    axis(svg) {
      const g = svg.append('g')
        .attr('transform', `translate(0,${this.margin.top})`)

      const axis = d3.axisTop(this.x)
        .ticks(this.width / 160)
        .tickSizeOuter(0)
        .tickSizeInner(-this.barSize * (this.n + this.y.padding()))

      return (_, transition) => {
        g.transition(transition).call(axis)
        g.select('.tick:first-of-type text').remove()
        g.selectAll('.tick:not(:first-of-type) line').attr('stroke', 'white')
        g.select('.domain').remove()
      }
    },
    labels(svg) {
      let label = svg.append('g')
        .style('font', 'bold 12px var(--sans-serif)')
        .style('font-variant-numeric', 'tabular-nums')
        .attr('text-anchor', 'end')
        .selectAll('text')

      return (data, transition) => (label = label
        .data(data.slice(0, this.n), d => d.name)
        .join(
          enter => enter.append('text')
            .attr('transform', d => `translate(${this.x((this.prev.get(d) || d).value)},${this.y((this.prev.get(d) || d).rank)})`)
            .attr('y', this.y.bandwidth() / 2)
            .attr('x', -6)
            .attr('dy', '-0.25em')
            .text(d => d.name)
            .call(text => text.append('tspan')
              .attr('fill-opacity', 0.7)
              .attr('font-weight', 'normal')
              .attr('x', -6)
              .attr('dy', '1.15em')),
          update => update,
          exit => exit.transition(transition).remove()
            .attr('transform', d => `translate(${this.x((this.next.get(d) || d).value)},${this.y((this.next.get(d) || d).rank)})`)
            .call(g => g.select('tspan').tween('text', d => this.textTween(d.value, (this.next.get(d) || d).value)))
        )
        .call(bar => bar.transition(transition)
          .attr('transform', d => `translate(${this.x(d.value)},${this.y(d.rank)})`)
          .call(g => g.select('tspan').tween('text', d => this.textTween((this.prev.get(d) || d).value, d.value)))))
    },
    textTween(a, b) {
      const i = d3.interpolateNumber(a, b)
      const fn = d3.format(',d')
      return function(t) {
        this.textContent = fn(i(t))
      }
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
