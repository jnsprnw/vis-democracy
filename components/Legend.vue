<template>
  <section>
    <h4>Legend</h4>
    <ul class="texts">
      <li v-for="text in textElements" v-html="text" />
    </ul>
    <svg>
      <rect
        v-for="el in elements"
        :fill="el.color"
        :width="el.width"
        :height="el.height"
        :x="el.x"
        :y="el.y" />
    </svg>
    <ul>
      <li
        v-for="label in labels">{{ label }}</li>
    </ul>
  </section>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import _ from 'lodash'

  export default {
    computed: {
      ...mapState([
        'activeColour',
        'scores'
      ]),
      ...mapGetters([
        'colorScales'
      ]),
      score () {
        const { scores, activeColour } = this
        if (activeColour === 'regimeType') {
          return false
        }
        return scores[activeColour]
      },
      text () {
        const { score } = this
        if (score) {
          return false
        }
        return score.text
      },
      scale () {
        const { colorScales, activeColour } = this
        if (activeColour === 'regimeType') {
          return false
        }
        return colorScales[activeColour]
      },
      elements () {
        const { activeColour, scale, score } = this
        if (activeColour === 'regimeType') {
          return ['Democracy', 'Flawd', 'Hybrid', 'Autho']
        }

        const stepsAmount = 12
        const width = 100 / (stepsAmount + 1)
        const steps = this.getSteps(scale.domain(), stepsAmount)

        const colors = _.map(steps, (i, n) => {
          return {
            width: width + '%',
            height: '12px',
            x: width * (score.revert ? stepsAmount - n : n) + '%',
            y: '0',
            color: scale(i).hex(),
            label: i
          }
        })
        return colors
      },
      labels () {
        const { activeColour, scale, score } = this
        if (activeColour === 'regimeType') {
          return ['Democracy', 'Flawd', 'Hybrid', 'Autho']
        }
        const [min, max] = scale.domain()
        const steps = 2
        const labels = _.times(steps + 1, n => {
          const i = min + n * (max - min) / steps
          return Math.round(i)
        })
        return score.revert ? _.reverse(labels) : labels
      },
      textElements () {
        const { score } = this
        const texts = ['More democratic', 'More authorian']
        return score.revert ? _.reverse(texts) : texts
      }
    },
    methods: {
      evenSteps (min, max, steps) {
        return _.times(steps, n => {
          return min + n * (max - min) / steps
        })
      },
      getSteps (domain, steps) {
        const [min, max] = domain
        let arr
        if (min >= 0) {
          arr = [...this.evenSteps(min, max, steps), max]
        } else {
          arr = [...this.evenSteps(min, 0, steps / 2), ...this.evenSteps(0, max, steps / 2), max]
        }
        return arr
      }
    }
  }
</script>

<style lang="scss" scoped>
  svg {
    height: 12px;
    width: 100%;
  }

  ul {
    list-style: none;
    display: flex;

    &.texts {
      li:first-child::before {
        content: '←';
      }
      li:last-child::after {
        content: '→';
      }
    }

    li {
      flex: 1;
      text-align: center;

      &:first-child {
        text-align: left;
      }

      &:last-child {
        text-align: right;
      }
    }
  }
</style>
