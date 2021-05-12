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
    // this.handleRaceV1()
    // this.getData().then(data => (this.data = data.sort((a, b) => b.value - a.value))).then(() => {
    this.getData().then(data => {
      // for (let i = 0; i < 200; i++) {
      //   data.push({
      //     key: `key-name-${i}`,
      //     name: `Name-${i}-${Math.random() * 1000}`,
      //     value: Math.random() * 40000
      //   })
      // }
      // this.names = new Set(this.data.map(d => d.name))

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
        // }).sort((a, b) => b.value - a.value))
      }
      this.data = mockData;

      /* this.data.push(data.sort((a, b) => b.value - a.value))
      for (let i = 0; i < 20; i++) {
        this.data.push(data.map(it => {
          const { value, ...other } = it
          return { ...other, value: value * (Math.random() * 1000) }
        }).sort((a, b) => b.value - a.value))
      } */

      // this.handleRaceV1()

      // eslint-disable-next-line
      (async function(ag) { for await (const n of ag) { console.debug(n) } })(this.handleRace())
    })
  },
  methods: {
    handleRace: async function * () {
      const svg = d3.select(this.$el.querySelector('svg'))
      svg.attr('viewBox', [0, 0, this.width, this.height])

      const updateBars = this.bars(svg)
      // const updateLabels = this.labelsV1(svg)

      yield svg.node()

      for (const data of this.data) {
        const transition = svg.transition()
          .duration(this.duration)
          .ease(d3.easeLinear)

        this.x.domain([0, data[0].value])

        updateBars(data, transition)
        // updateLabels(data, transition)

        await transition.end()
      }
    },
    handleRaceV1() {
      const svg = d3.select(this.$el.querySelector('svg'))
      svg.attr('viewBox', [0, 0, this.width, this.height])

      // svg.node()

      // const transition = svg.transition()
      //   .duration(this.duration)
      //   .ease(d3.easeLinear)

      // console.debug()
      const d = this.data[0]
      this.x.domain([0, Math.max(...d.map(({ value }) => value))])
      // this.x.domain([0, this.data[0].value])

      this.barsV1(svg)
      this.labelsV1(svg)
      // transition.end()
    },
    bars(svg) {
      let bar = svg.append('g')
        .attr('fill-opacity', 0.6)
        .selectAll('rect')

      return (data, transition) => (bar = bar
        .data(data.slice(0, this.n), d => d.name)
        .join(
          enter => enter.append('rect')
            .attr('fill', this.color)
            .attr('height', this.y.bandwidth())
            .attr('x', this.x(0))
            .attr('y', (_, i) => this.y(i))
            .attr('width', d => this.x(d.value) - this.x(0)),
          update => update,
          exit => exit.transition(transition).remove()
            .attr('y', (_, i) => this.y(i))
            .attr('width', d => this.x(d.value) - this.x(0))
        ).call(bar => bar.transition(transition)
          .attr('y', (_, i) => this.y(i))
          .attr('width', d => this.x(d.value) - this.x(0))
        )
      )
    },
    barsV1(svg) {
      let bar = svg.append('g')
        .attr('fill-opacity', 0.6)
        .selectAll('rect')
        .data(this.data[0], d => d.name)
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
    labelsV1(svg) {
      let label = svg.append('g')
        .style('font', 'bold 12px var(--sans-serif)')
        .style('font-variant-numeric', 'tabular-nums')
        .attr('text-anchor', 'end')
        .selectAll('text')
        .data(this.data[0], d => d.name)
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
              .attr('dy', '1.15em')),
          update => update,
          // exit => exit.call(g => g.select('tspan').tween('text', d => d.value))
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
