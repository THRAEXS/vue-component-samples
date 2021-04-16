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
    const n = 12
    const margin = { top: 16, right: 6, bottom: 6, left: 0 }
    const barSize = 48
    const height = margin.top + barSize * n + margin.bottom

    return {
      data: [],
      margin,
      barSize,
      width: 1200,
      height,
      duration: 250,
      n,
      k: 10,
      x: null,
      y: null,
      color: null,
      formatDate: null,
      formatNumber: null,
      keyframes: []
    }
  },
  created() {
    chartData.forEach(it => (it.date = new Date(it.date)))
    this.data = chartData

    this.x = d3.scaleLinear([0, 1], [this.margin.left, this.width - this.margin.right])
    this.y = d3.scaleBand()
      .domain(d3.range(this.n + 1))
      .rangeRound([this.margin.top, this.margin.top + this.barSize * (this.n + 1 + 0.1)])
      .padding(0.1)

    this.color = (() => {
      const scale = d3.scaleOrdinal(d3.schemeTableau10)
      if (this.data.some(d => d.category !== undefined)) {
        const categoryByName = new Map(this.data.map(d => [d.name, d.category]))
        scale.domain(categoryByName.values())
        return d => scale(categoryByName.get(d.name))
      }
      return d => scale(d.name)
    })()

    this.formatDate = d3.utcFormat('%Y')
    this.formatNumber = d3.format(',d')
  },
  mounted() {
    // eslint-disable-next-line
    (async function(ag) {
      for await (const n of ag) {
        console.debug(n)
      }
    })(this.handleRace())
  },
  methods: {
    handleRace: async function * () {
      const svg = d3.select(this.$el.querySelector('svg'))
      svg.attr('viewBox', [0, 0, this.width, this.height])

      const updateBars = this.bars(svg)
      const updateAxis = this.axis(svg)
      const updateLabels = this.labels(svg)
      const updateTicker = this.ticker(svg)

      yield svg.node()

      for (const keyframe of this.keyframes) {
        const transition = svg.transition()
          .duration(this.duration)
          .ease(d3.easeLinear)

        this.x.domain([0, keyframe[1][0].value])

        updateBars(keyframe, transition)
        updateAxis(keyframe, transition)
        updateLabels(keyframe, transition)
        updateTicker(keyframe, transition)

        // this.invalidation

        await transition.end()
      }
    },
    bars() {

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
    labels() {

    },
    ticker(svg) {
      const now = svg.append('text')
        .style('font', `bold ${this.barSize}px var(--sans-serif)`)
        .style('font-variant-numeric', 'tabular-nums')
        .attr('text-anchor', 'end')
        .attr('x', this.width - 6)
        .attr('y', this.margin.top + this.barSize * (this.n - 0.45))
        .attr('dy', '0.32em')
        .text(this.formatDate(this.keyframes[0][0]))

      return ([date], transition) => {
        transition.end().then(() => now.text(this.formatDate(date)))
      }
    },
    textTween(a, b) {

    },
    handleLine() {
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
}
</script>
<style lang="sass">
.svg-box
  border: 1px solid red
  svg
    margin: 25px
    // path
    //   fill: none
    //   stroke: #76BF8A
    //   stroke-width: 3px
</style>
