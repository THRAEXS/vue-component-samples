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
      x: null,
      y: null,
      color: null
    }
  },
  created() {
    this.x = d3.scaleLinear([0, 1], [this.margin.left, this.width - this.margin.right])
    this.y = d3.scaleBand()
      .domain(d3.range(this.n + 1))
      .rangeRound([this.margin.top, this.margin.top + this.barSize * (this.n + 1 + 0.1)])
      .padding(0.1)

    this.color = (scale => d => scale(d.name))(d3.scaleOrdinal(d3.schemeTableau10))

    // this.mock()

    chartData.forEach(it => (it.date = new Date(it.date)))
    const datevalues = Array.from(d3.rollup(chartData, ([d]) => d.value, d => +d.date, d => d.name))
      .map(([date, data]) => [new Date(date), data])
      .sort(([a], [b]) => d3.ascending(a, b))

    const names = new Set(chartData.map(d => d.name))

    const rank = value => {
      const data = Array.from(names, name => ({ name, value: value(name) }))
      data.sort((a, b) => d3.descending(a.value, b.value))
      for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(this.n, i)
      return data
    }

    const k = 10
    const keyframes = (() => {
      const keyframes = []
      let ka, a, kb, b
      for ([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
        for (let i = 0; i < k; ++i) {
          const t = i / k
          keyframes.push([
            new Date(ka * (1 - t) + kb * t),
            rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
          ])
        }
      }
      keyframes.push([new Date(kb), rank(name => b.get(name) || 0)])
      return keyframes
    })()
    // console.debug(keyframes)
    const dd = []
    for (const [, d] of keyframes) {
      // console.debug(date, d)
      dd.push(d.slice(0, this.n))
    }

    this.data = dd.slice(0, 3)

    this.data.forEach(it => {
      console.debug(it.reduce((a, b) => `${a} => ${b.name}[${b.rank}](${b.value})`, ''))
      it.forEach((t, i) => console.debug(t.rank, i, t.rank === i))
    })
  },
  mounted() {
    // eslint-disable-next-line
    (async function(ag) { for await (const n of ag) {} })(this.handleRace())
  },
  methods: {
    handleRace: async function * () {
      const svg = d3.select(this.$el.querySelector('svg'))
      svg.attr('viewBox', [0, 0, this.width, this.height])

      const updateBars = this.bars(svg)

      yield svg.node()

      for (const data of this.data) {
        const transition = svg.transition()
          .duration(this.duration)
          .ease(d3.easeLinear)

        this.x.domain([0, data[0].value])

        updateBars(data, transition)

        await transition.end()
      }
    },
    bars(svg) {
      let bar = svg.append('g')
        .attr('fill-opacity', 0.6)
        .selectAll('rect')

      return (data, transition) => (bar = bar
        .data(data, d => d.name)
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
    mock() {
      const mockData = []
      const bases = []
      for (let i = 0; i < 20; i++) {
        bases.push({
          key: `KEY-${i}`,
          name: `NAME-${i}`,
          value: Math.random() * 10000
        })
      }

      bases.sort((a, b) => b.value - a.value)
      mockData.push(bases)
      for (let i = 0; i < 10; i++) {
        const prev = mockData[i]

        if (i / 2 === 0) {
          mockData.push(prev.map(it => {
            const { value, ...other } = it
            return { ...other, value: Math.abs(value - (100 * (i + 1))) }
          }).sort((a, b) => b.value - a.value))
        } else {
          mockData.push(prev.map(it => {
            const { value, ...other } = it
            return { ...other, value: Math.abs(value - (100 * (i + 1))) }
          }))
        }
      }
      this.data = mockData
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
