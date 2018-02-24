<template>
  <div class="wrapper" ref="vis">
    <svg class="vis-legend">
        <text
          v-for="item in legendPlacements"
          :y="item.y"
          :x="item.x"
          alignment-baseline="middle"
          text-anchor="middle"
          :transform="'rotate(90,' + item.x + ',' + item.y + ')'"
        >{{ item.label }}</text>
      </svg>
      <svg
        v-if="resolution.length && Math.min(...resolution) > 500"
        :class="{ highlight: activeStatus !== 'default', 'vis-graphic': true }">
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
            v-if="points.length && placement[2] > 7 && placement[3] > 40"
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
      <resize-observer @notify="handleResize" />
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
        legendPlacements: [],
        rows: 5,
        gutter: 7
      }
    },
    computed: {
      ...mapState([
        'activeStatus',
        'activeColour',
        'groups',
        'activeTab',
        'scoresLabels'
      ]),
      ...mapGetters([
        'countries',
        'status',
        'organisations',
        'domains',
        'scores'
      ]),
      gutters () {
        const { rows, gutter } = this
        return (rows - 1) * gutter
      },
      row () {
        const { rows, gutters } = this
        return (100 - gutters) / (rows - 0.8)
      },
      footer () {
        const { row, gutters } = this
        return 100 - gutters - row * 4
      },
      ysPercent (state) {
        const { rows, gutter, row, footer } = this
        console.log(rows, gutter, row, footer)

        let i = 0
        return _.map(new Array(rows * 2), (_, n) => {
          if (n === 0) return 0
          if (n === 9) return 1
          if (n === 1) {
            i += footer
          } else {
            if (n % 2) {
              i += row
            } else {
              i += gutter
            }
          }
          // i += n % 2 ? row : gutter
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
        'makeActiveColour',
        'makeActiveTab'
      ]),
      getResolution () {
        this.resolution = [this.$refs.vis.clientWidth, this.$refs.vis.clientHeight]
        // console.log(this.resolution)
        this.calcShapes()
        this.calcPoints()
        this.calcLegendPlacement()
      },
      handleResize () {
        console.log('resized')
        this.getResolution()
      },
      calcLegendPlacement () {
        let labels = ['Scaled by', '▲ Population', '▲ Land Mass', '▲ Economy']
        let [width, height] = this.resolution
        let { gutter, row } = this
        this.legendPlacements = _.map(labels, (label, n) => {
          return {
            'label': label,
            'x': width * 0.03 / 2,
            'y': height * (((n + 0.5) * row + n * gutter) / 100)
          }
        })
      },
      calcPoints () {
        let [width, height] = this.resolution
        let { rows } = this
        let cumulation = _.fill(new Array(rows), 0)

        let ys = _.map(this.ysPercent, y => {
          return height - height * y
        })

        let prevXs = _.fill(new Array(rows * 2), 0)

        let points = _.map(this.countries, country => {
          let points = []
          let leftsideXs = _.reverse(prevXs)

          _.each(leftsideXs, (x, n) => {
            points.push([x, ys[n]])
          })

          let { counter, population, gdp, area } = country['values']

          cumulation[0] += counter['percent']
          cumulation[1] += population['percent']
          cumulation[2] += area['percent']
          cumulation[3] += gdp['percent']
          cumulation[4] += counter['percent']

          let rightsideXs = _.map(new Array(rows * 2), (x, n) => {
            let index = Math.floor(n / 2)
            return _.round((cumulation[index] / 100) * (width * 0.97), 2)
          })

          _.each(rightsideXs, (x, n) => {
            points.push([x, ys[(rows * 2 - 1) - n]])
          })

          // console.log(_.round(rightsideXs[1] - left[1], 1))
          // console.log(points)

          prevXs = rightsideXs
          return points
        })

        this.points = Object.freeze(points)
      },
      calcTextPlacement () {
        let placements = _.map(this.points, country => {
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
            let x = _.round((maxx - minx) / 2 + minx, 1)
            let y = _.round((maxy - miny) / 2 + miny, 1)
            // console.log(corners, xs, ys, x, y)
            placements[n] = [x, y, maxx - minx, maxy - miny]
          }
          // console.log(placements)
          return placements
        })

        this.placements = Object.freeze(placements)
      },
      calcShapes () {
        let shapes = _.map(this.points, country => {
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

          // console.log('M ' + curves.join(' ') + ' Z')

          return 'M ' + curves.join(' ') + ' Z'
        })

        this.shapes = Object.freeze(shapes)

        // this.shapi = _.map(this.points, country => {
        //   let shape = _.map(country, point => {
        //     return point.join(' ')
        //   })

        //   return 'M ' + shape.join(' L ') + ' Z'
        // })
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
  .wrapper {
    position: relative;
  }
</style>
