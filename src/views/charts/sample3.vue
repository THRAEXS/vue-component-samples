<template>
  <svg style="border: 1px solid red;" width="1280" />
</template>
<script>
import * as d3 from 'd3'

export default {
  mounted() {
    // eslint-disable-next-line
    (async function(ag) { for await (const n of ag) {} })(this.handleDraw())
  },
  methods: {
    handleDraw: async function * () {
      const width = 1280

      const w = Math.min(640, width)
      const r = 32
      const h = r * 3

      const svg = d3.select(this.$el)

      const circle = svg.append('circle')
        .attr('r', r)
        .attr('cx', w + r)
        .attr('cy', h / 2)
        .attr('fill', 'transparent')
        .attr('stroke', 'black')
        .attr('stroke-width', 2)

      yield svg.node()

      await circle.transition()
        .duration(1000)
        .ease(d3.easeBounce)
        .attr('fill', 'yellow')
        .attr('cx', r)
        .end()

      while (true) {
        yield svg.node()

        await circle.transition()
          .duration(2000)
          .attr('fill', `hsl(${Math.random() * 360},100%,50%)`)
          .attr('cx', Math.random() * (w - r * 2) + r)
          .end()
      }
    }
  }
}
</script>
