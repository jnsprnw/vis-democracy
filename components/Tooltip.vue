<template>
  <div
    ref="tooltip"
    class="tooltip"
    :style="{ left: placements[0] + 'px', top: placements[1] + 'px', opacity: reposition ? 1 : 0.001 }">
    <h5>{{ country.country.label }}</h5>
    <table>
      <tr>
        <td>Population</td>
        <td>{{ value.population }}&#8239;%</td>
      </tr>
      <tr>
        <td>Land Mass</td>
        <td>{{ value.area }}&#8239;%</td>
      </tr>
      <tr>
        <td>GDP</td>
        <td>{{ value.gdp }}&#8239;%</td>
      </tr>
    </table>
  </div>
</template>

<script>
  function formatValue (value) {
    if (value < 0.01) {
      return '< 0.01'
    } else {
      return (Math.round(value * 100) / 100).toFixed(2)
    }
  }

  export default {
    props: ['country', 'dimensions'],
    data: function () {
      return {
        resolution: [0, 0],
        placements: [0, 0],
        reposition: false
      }
    },
    computed: {
      value () {
        const { population, area, gdp } = this.country.country.values
        return {
          population: formatValue(population.percent),
          area: formatValue(area.percent),
          gdp: formatValue(gdp.percent)
        }
      }
    },
    watch: {
      country: function () { // watch it
        this.reposition = false
        // this.getResolution()
      }
    },
    methods: {
      getResolution () {
        this.resolution = [this.$refs.tooltip.clientWidth, this.$refs.tooltip.clientHeight]
        // const { country } = this
        // console.log(country.country.label, this.$refs.tooltip.innerHTML)
        const { placement } = this.country
        const [width] = this.dimensions
        const total = width * 0.97
        let start = placement[0][0] - this.resolution[0] / 2
        let end = placement[0][0] + this.resolution[0] / 2
        let x = start
        if (start < 0) {
          x = 0
        } else if (end > total) {
          x = x - (end - total)
        }

        this.placements = [x, placement[0][1] - 10]
        // this.$refs.tooltip.offsetLeft
        console.log(end, total, end > total, start, start < 0)
        this.reposition = true
      }
    },
    components: {
    },
    mounted () {
      // this.getResolution()
    },
    updated () {
      const { country } = this
      if (!this.reposition) {
        console.log(country.country.label, this.$refs.tooltip.firstChild.innerHTML, this.reposition)
        this.getResolution()
      }
    }
  }
</script>

<style lang="scss">

</style>
