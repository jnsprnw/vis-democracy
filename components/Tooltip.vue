<template>
  <div
    ref="tooltip"
    class="tooltip"
    :style="{ left: placements[0] + 'px', top: placements[1] + 'px', opacity: reposition ? 1 : 0.001 }">
    <h5>{{ country.country.label }}</h5>
    <table>
      <tr>
        <td>Population</td>
        <td>{{ value.population }}</td>
        <td>{{ percent.population }}&#8239;%</td>
      </tr>
      <tr>
        <td>Land Mass</td>
        <td>{{ value.area }} m<sup>3</sup></td>
        <td>{{ percent.area }}&#8239;%</td>
      </tr>
      <tr>
        <td>GDP</td>
        <td>{{ value.gdp }} Billion US-Dollar</td>
        <td>{{ percent.gdp }}&#8239;%</td>
      </tr>
      <tr>
        <td>Rank&nbsp;<small>('17,&#8239'12,&#8239'06)</small></td>
        <td colspan="2">{{ country.country.scores.rank }},&#8239{{ country.country.scores.rank12 }},&#8239{{ country.country.scores.rank06 }}</td>
      </tr>
      <tr>
        <td>Score&nbsp;<small>('17,&#8239'12,&#8239'06)</small></td>
        <td colspan="2">{{ country.country.scores.score }},&#8239{{ country.country.scores.score12 }},&#8239{{ country.country.scores.score06 }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  function formatValue (value, n = 0) {
    if (value < 0.01) {
      return '< 0.01'
    } else {
      // https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
      const x = 3 // length of sections
      const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')'
      return value.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,')
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
          population: formatValue(population.value),
          area: formatValue(area.value),
          gdp: formatValue(gdp.value)
        }
      },
      percent () {
        const { population, area, gdp } = this.country.country.values
        return {
          population: formatValue(population.percent, 2),
          area: formatValue(area.percent, 2),
          gdp: formatValue(gdp.percent, 2)
        }
      }
    },
    watch: {
      country: function () {
        this.reposition = false
      }
    },
    methods: {
      getResolution () {
        this.resolution = [this.$refs.tooltip.clientWidth, this.$refs.tooltip.clientHeight]
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
        this.reposition = true
      }
    },
    components: {
    },
    mounted () {
    },
    updated () {
      if (!this.reposition) {
        this.getResolution()
      }
    }
  }
</script>

<style lang="scss">

</style>
