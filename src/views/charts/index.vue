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
      width: 1600,
      height,
      duration: 250,
      n,
      k: 10,
      x: null,
      y: null,
      color: null,
      formatDate: null,
      formatNumber: null,
      tickFormat: undefined,
      names: null,
      datevalues: null,
      rank: null,
      keyframes: null,
      nameframes: null,
      prev: null,
      next: null
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

    this.names = new Set(this.data.map(d => d.name))

    this.datevalues = Array.from(d3.rollup(this.data, ([d]) => d.value, d => +d.date, d => d.name))
      .map(([date, data]) => [new Date(date), data])
      .sort(([a], [b]) => d3.ascending(a, b))

    this.rank = value => {
      const data = Array.from(this.names, name => ({ name, value: value(name) }))
      data.sort((a, b) => d3.descending(a.value, b.value))
      for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(this.n, i)
      return data
    }

    this.keyframes = (() => {
      const keyframes = []
      let ka, a, kb, b
      for ([[ka, a], [kb, b]] of d3.pairs(this.datevalues)) {
        for (let i = 0; i < this.k; ++i) {
          const t = i / this.k
          keyframes.push([
            new Date(ka * (1 - t) + kb * t),
            this.rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
          ])
        }
      }
      keyframes.push([new Date(kb), this.rank(name => b.get(name) || 0)])
      return keyframes
    })()
    this.nameframes = d3.groups(this.keyframes.flatMap(([, data]) => data), d => d.name)
    this.prev = new Map(this.nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])))
    this.next = new Map(this.nameframes.flatMap(([, data]) => d3.pairs(data)))
  },
  mounted() {
    // eslint-disable-next-line
    (async function(ag) { for await (const n of ag) { console.debug(n) } })(this.handleRace())
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

        // invalidation.then(() => svg.interrupt())

        await transition.end()
      }
    },
    bars(svg) {
      let bar = svg.append('g')
        .attr('fill-opacity', 0.6)
        .selectAll('rect')

      return ([date, data], transition) => (bar = bar
        .data(data.slice(0, this.n), d => d.name)
        .join(
          enter => enter.append('rect')
            .attr('fill', this.color)
            .attr('height', this.y.bandwidth())
            .attr('x', this.x(0))
            .attr('y', d => this.y((this.prev.get(d) || d).rank))
            .attr('width', d => this.x((this.prev.get(d) || d).value) - this.x(0)),
          update => update,
          exit => exit.transition(transition).remove()
            .attr('y', d => this.y((this.next.get(d) || d).rank))
            .attr('width', d => this.x((this.next.get(d) || d).value) - this.x(0))
        )
        .call(bar => bar.transition(transition)
          .attr('y', d => this.y(d.rank))
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

      return ([date, data], transition) => (label = label
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
    ticker(svg) {
      const now = svg.append('text')
        // .style('font', `bold ${this.barSize}px var(--sans-serif)`)
        .style('font-family', 'var(--sans-serif)')
        .style('font-weight', 'bold')
        .style('font-size', `${this.barSize}px`)
        .style('font-variant-numeric', 'tabular-nums')
        .attr('text-anchor', 'end')
        .attr('x', this.width - 6)
        .attr('y', this.margin.top + this.barSize * (this.n - 0.45))
        .attr('dy', '0.32em')
        .text(this.formatDate(this.keyframes[0][0]))

      return ([date], transition) => transition.end().then(() => now.text(this.formatDate(date)))
    },
    textTween(a, b) {
      const i = d3.interpolateNumber(a, b)
      const fn = this.formatNumber
      return function(t) {
        this.textContent = fn(i(t))
      }
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
  margin: 20px
  // border: 1px solid red
  svg
    margin: 10px
    // path
    //   fill: none
    //   stroke: #76BF8A
    //   stroke-width: 3px
</style>
