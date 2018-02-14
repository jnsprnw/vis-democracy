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
        v-if="resolution.length && Math.min(...resolution) > 900"
        :class="{ highlight: activeStatus !== 'default' }">
        <g
          v-for="(country, index) in countries"
          :class="{ 'country': true, 'active': status[activeStatus][index] }">
          <path
            v-if="shapes.length"
            :style="{ fill: country.colours[activeColour] }"
            :d="shapes[index]" />
<!--           <circle v-for="point in points[index]"
            r="2"
            :cx="point[0]"
            :cy="point[1]"
          /> -->
          <text
            v-for="placement in placements[index]"
            v-if="points.length && placement[2] > 7"
            alignment-baseline="middle"
            text-anchor="middle"
            v-bind:style="{ fontSize: placement[2] > 10 ? '10px' : '7.5px' }"
            :transform="'rotate(90,' + placement[0] + ',' + placement[1] + ')'"
            :x="placement[0]"
            :y="placement[1]"
          >
            {{ country.label }}
          </text>
        </g>
      </svg>
      <div class="error" v-if="Math.min(...resolution) < 900">
        <div>
          <span>💩</span>
          <strong>Not for mobil</strong>
        </div>
      </div>
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
        shapi: [],
        points: [],
        placements: [],
        rows: 5
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
      ]),
      ysPercent (state, getters) {
        let { rows } = state
        let gutter = 5 // Percent
        let row = (100 - (state.rows - 1) * gutter) / rows

        let i = 0
        return _.map(new Array(rows * 2), (y, n) => {
          if (n === 0) return 0
          i += n % 2 ? row : gutter
          return i / 100
        })
      }
    },
    watch: {
      points: function () {
        this.calcShapes()
        this.calcTextPlacement()
      }
    },
    methods: {
      ...mapActions([
        'makeActiveStatus',
        'makeActiveColour'
      ]),
      getResolution () {
        this.resolution = [this.$refs.vis.clientWidth, this.$refs.vis.clientHeight]
        // console.log(this.resolution)
        this.calcShapes()
        this.calcPoints()
      },
      handleResize () {
        console.log('resized')
        this.getResolution()
      },
      calcPoints () {
        let [width, height] = this.resolution
        let { rows } = this
        let cumulation = _.fill(new Array(rows), 0)

        let ys = _.map(this.ysPercent, y => {
          return height - height * y
        })

        let prevXs = _.fill(new Array(rows * 2), 0)

        this.points = _.map(this.countries, country => {
          let points = []
          let leftsideXs = _.reverse(prevXs)

          _.each(leftsideXs, (x, n) => {
            points.push([x, ys[n]])
          })

          let { counter, population, gdp, area } = country['values']

          cumulation[0] += counter['percent']
          cumulation[1] += population['percent']
          cumulation[2] += gdp['percent']
          cumulation[3] += area['percent']
          cumulation[4] += counter['percent']

          let rightsideXs = _.map(new Array(rows * 2), (x, n) => {
            let index = Math.floor(n / 2)
            return _.round((cumulation[index] / 100) * width, 2)
          })

          _.each(rightsideXs, (x, n) => {
            points.push([x, ys[(rows * 2 - 1) - n]])
          })

          // console.log(_.round(rightsideXs[1] - left[1], 1))
          // console.log(points)

          prevXs = rightsideXs
          return points
        })
      },
      calcTextPlacement () {
        this.placements = _.map(this.points, country => {
          let n = country.length / 4
          let points = _.clone(country)
          let placements = []
          while (n--) {
            let corners = _.flatten([_.pullAt(points, [0, 1]), _.pullAt(points, [points.length - 2, points.length - 1])])
            let xs = _.map(corners, '0')
            let ys = _.map(corners, '1')
            let minx = _.min(xs)
            let maxx = _.max(xs)
            let miny = _.min(ys)
            let maxy = _.max(ys)
            let x = (maxx - minx) / 2 + minx
            let y = (maxy - miny) / 2 + miny
            // console.log(corners, xs, ys, x, y)
            placements[n] = [x, y, _.max(xs) - minx]
          }
          // console.log(placements)
          return placements
        })
      },
      calcShapes () {
        this.shapes = _.map(this.points, country => {
          let curves = []

          let l = country.length - 1
          for (let n = 0; n < l; n++) {
            if (n % 2) {
              let diff = (country[n + 1][1] - country[n][1]) / 3
              let y1 = country[n][1] + diff
              let y2 = country[n + 1][1] - diff
              curves.push('C ' + [country[n][0], y1].join(' ') + ' , ' + [country[n + 1][0], y2].join(' ') + ' , ')
            } else {
              curves.push(country[n].join(' ') + ' L ' + country[n + 1].join(' '))
            }
          }

          console.log('M ' + curves.join(' ') + ' Z')

          return 'M ' + curves.join(' ') + ' Z'
        })

        this.shapi = _.map(this.points, country => {
          let shape = _.map(country, point => {
            return point.join(' ')
          })

          return 'M ' + shape.join(' L ') + ' Z'
        })
      }
    },
    components: {
      'resize-observer': ResizeObserver
    },
    mounted () {
      this.getResolution()
      // console.log(this.countries)
    }
  }
</script>

<style lang="scss">
  .page-vis {
    position: relative;
  }
</style>
