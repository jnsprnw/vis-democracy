<template>
  <div class="page-body">
    <aside class="page-aside">
      <h2>Democracy Index</h2>
      <section>
        <strong>Legend</strong>
      </section>
      <section>
        <strong>Story</strong>
      </section>
      <section>
        <strong>Groups</strong>
        <ul>
          <li
            v-for="organisation in organisations"
            v-on:mouseover="makeActiveStatus(organisation)"
            v-on:mouseleave="makeActiveStatus('default')"
            >{{ organisation }}</li>
        </ul>
      </section>
      <section>
        <strong>Colours</strong>
        <ul>
          <li
            v-for="score in scores"
            v-on:mouseover="makeActiveColour(score)"
            v-on:mouseleave="makeActiveColour('default')"
            >{{ score }}</li>
        </ul>
      </section>
    </aside>
    <div class="page-content page-vis" ref="vis">
      <svg
        v-if="resolution.length && shapes.length && points.length"
        :class="{ highlight: activeStatus !== 'default' }">
        <g
          v-for="(country, index) in countries"
          :class="{ 'country': true, 'active': status[activeStatus][index] }">
          <path
            :style="{ fill: country.colours[activeColour] }"
            :d="shapes[index]" />
          <circle v-for="point in points[index]"
            r="2"
            :cx="point[0]"
            :cy="point[1]"
          />
        </g>
      </svg>
      <resize-observer @notify="handleResize" />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import { ResizeObserver } from 'vue-resize'
  import _ from 'lodash'

  export default {
    data: function () {
      return {
        resolution: [],
        shapes: [],
        points: []
      }
    },
    computed: {
      ...mapState([
        'activeStatus',
        'activeColour'
      ]),
      ...mapGetters([
        'countries',
        'status',
        'organisations',
        'domains',
        'scores'
      ])
      // activeTypes (state, getters) {
      //   return _.isUndefined(this.$store.state.activeType) ? _.fill(Array(this.$store.getters.types.length), false) : this.$store.state.activeType
      // }
    },
    watch: {
    },
    methods: {
      ...mapActions([
        'makeActiveStatus',
        'makeActiveColour'
      ]),
      getResolution () {
        this.resolution = [this.$refs.vis.clientWidth, this.$refs.vis.clientHeight]
        console.log(this.resolution)
        this.calcShapes()
        this.calcPoints()
      },
      handleResize () {
        console.log('resized')
        this.getResolution()
      },
      calcShapes () {
        let [width, height] = this.resolution
        let rows = 5
        let cumulation = _.fill(Array(rows), 0)

        // let fixedYs = [0, 20, 20 + 1 * (20 / 3), ]

        let ys = _.map(new Array(rows * 2), (y, n) => {
          return height - (height * n / (rows * 2 - 1))
        })

        // console.log(ys, width, height)

        let prevXs = _.fill(Array(10), 0)

        this.shapes = _.map(this.countries, country => {
          let shape = []

          let left = _.reverse(prevXs)

          _.each(left, (x, n) => {
            shape.push([x, ys[n]].join(' '))
          })

          let { counter, population, gdp, area } = country['values']

          // _.each(country['values'], (value, key, n) => {
          //   // let { percent } = value
          //   cumulation[n] += value['percent']
          //   // return percent
          // })

          // console.log(cumulation)

          let counterPer = counter['percent']
          let populationPer = population['percent']
          let gdpPer = gdp['percent']
          let areaPer = area['percent']

          cumulation[0] += counterPer
          cumulation[1] += populationPer
          cumulation[2] += gdpPer
          cumulation[3] += areaPer
          cumulation[4] += counterPer

          let right = _.map(new Array(rows * 2), (x, n) => {
            let index = Math.floor(n / 2)
            return _.round((cumulation[index] / 100) * width, 2)
          })

          // console.log(right)

          _.each(right, (x, n) => {
            shape.push([x, ys[(rows * 2 - 1) - n]].join(' '))
          })

          // console.log(shape.join(' '))
          // console.log(_.round(right[0] - left[0], 1))

          prevXs = right

          return 'M ' + shape.join(' L ') + ' Z'
        })
      },
      calcPoints () {
        let [width, height] = this.resolution
        let rows = 5
        let cumulation = _.fill(Array(rows), 0)

        let ys = _.map(new Array(rows * 2), (y, n) => {
          return height - (height * n / (rows * 2 - 1))
        })

        let prevXs = _.fill(Array(rows * 2), 0)

        this.points = _.map(this.countries, country => {
          let shape = []
          let left = _.reverse(prevXs)

          _.each(left, (x, n) => {
            shape.push([x, ys[n]])
          })

          let { counter, population, gdp, area } = country['values']

          cumulation[0] += counter['percent']
          cumulation[1] += population['percent']
          cumulation[2] += gdp['percent']
          cumulation[3] += area['percent']
          cumulation[4] += counter['percent']

          let right = _.map(new Array(rows * 2), (x, n) => {
            let index = Math.floor(n / 2)
            return _.round((cumulation[index] / 100) * width, 2)
          })

          _.each(right, (x, n) => {
            shape.push([x, ys[(rows * 2 - 1) - n]])
          })

          // console.log(_.round(right[1] - left[1], 1))

          console.log(shape)

          prevXs = right
          return shape
        })
      }
    },
    components: {
      'resize-observer': ResizeObserver
    },
    mounted () {
      this.getResolution()
      console.log(this.countries)
    }
  }
</script>

<style lang="scss">
  .page-vis {
    position: relative;
  }
</style>
