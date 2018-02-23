<template>
  <div class="page-body">
    <aside class="page-aside">
      <h2><small>Degrees of</small> Democracy</h2>
      <nav>
        <ul class="menu">
          <li :class="{ active: activeTab === 'intro' }" v-on:click="makeActiveTab('intro')">Intro</li>
          <li :class="{ active: activeTab === 'story' }" v-on:click="makeActiveTab('story')">Story</li>
          <li :class="{ active: activeTab === 'scores' }" v-on:click="makeActiveTab('scores')">Scores</li>
          <li :class="{ active: activeTab === 'groups' }" v-on:click="makeActiveTab('groups')">Groups</li>
        </ul>
      </nav>
      <section class="tab" v-if="activeTab === 'intro'">
        {{ ysPercent }}
        <p>The Economist’s »<em>Democracy Index</em>« measures and categorizes the state of democracy in 167 countries. A full democracy usually has the following features: free and fair elections; political pluralism; respect of civil liberties and human rights; protection of minority rights; a functioning government with an effective system of checks and balances; equality before the law and an independent judiciary as well as free and diverse media.</p>
        <h3>How to read this graphic</h3>
        <p>The width illustrates the share each country has of the total population, land mass, and GDP respectively.</p>
      </section>
      <section class="tab" v-if="activeTab === 'story'">
        <h3>Population</h3>
        <p>Only a small percentage of the population lives in countries with full democracies. A large number lives in flawed democracies, like India, or authoritarian regimes, like China.</p>
        <p>While the population in the two most populous countries is almost equal, there are big differences when it comes to the average annual birth rates. In China, like in the US, there are on average 12.49 births per 1,000 habitants, which is a small number compared to 19.55 and 21.14 in India and Bangladesh respectively.</p>
        <h3>Land Mass</h3>
        <p>When scaling countries according to their land mass, it is evident that half of the Earth’s land mass belongs to full or flawed democracies, just like half of the population lives under these government systems. But still 40% of the Earth’s land mass is controlled by authoritarian regimes.</p>
        <p>Although almost equal in terms of population, India and China differ in terms of territory. This indicates a large difference in population density. While in China, there are 146 people per square kilometer of land, in India there are 441. For the United States the number is 35, and in Bangladesh it is 1,237 – one of the highest densities in the world.</p>
        <h3>Economy</h3>
        <p>When scaling countries according to their gross domestic product (GDP), it’s clear that full democracies have a bigger share of the world’s economy than corresponding to their population or land mass. While democracy might be one indicator for economic productivity, other factors such as historical and geographic conditions and the market system must also be taken into account.</p>
        <p>While economic heavyweights China and the US match up to each other in absolute numbers, comparing the numbers per capita would draw a different picture. The GDP per capita is $55,800 in the United States, but only $14,100 in China, $6,200 in India, and a mere $3,600 in Bangladesh.</p>
      </section>
      <section class="tab" v-if="activeTab === 'groups'">
        <h3>Groupings</h3>
        <div class="list">
          <section v-for="(list, section) in groups">
            <h4>{{ section }}</h4>
            <ul class="selection">
              <li
                v-for="(organisation, key) in list"
                v-on:mouseover="makeActiveStatus(key)"
                v-on:mouseleave="makeActiveStatus('default')"
                >{{ organisation }}</li>
            </ul>
          </section>
        </div>
      </section>
      <section class="tab" v-if="activeTab === 'scores'">
        <h3>Scores</h3>
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
        v-if="resolution.length && Math.min(...resolution) > 900"
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
      <div class="error" v-if="Math.min(...resolution) < 900">
        <div>
          <strong>Not for mobile</strong>
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
        'activeTab'
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
  .page-vis {
    position: relative;
  }
</style>
