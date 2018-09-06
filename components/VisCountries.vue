<template>
  <g v-on:mouseleave="makeHoverCountry(false)">
    <g
      v-for="(country, index) in countries"
      :key="country.cca3"
      :class="{ 'country': true, 'highlight': status[activeStatus][index], 'active': checkActive(activeCountry, country) }"
      v-on:mouseover="makeHoverCountry({ country: country, placement: placements[index] })">
      <path
        v-if="shapes.length"
        :style="{ fill: country.colours[activeColour] }"
        :d="shapes[index]" />
      <text
        v-for="(placement, n) in placements[index]"
        v-if="points.length && placement[2] > 7 && placement[3] > 60"
        dominant-baseline="middle"
        :text-anchor="n === 0 ? 'start' : 'middle'"
        v-bind:style="{ fontSize: placement[2] > 10 ? '10px' : '7.5px' }"
        :transform="'rotate(90,' + placement[0] + ',' + placement[1] + ')'"
        :x="placement[0]"
        :y="placement[1]"
      >
        {{ country.label }}
      </text>
    </g>
  </g>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import _ from 'lodash'

  export default {
    props: ['countries', 'placements', 'shapes', 'points'],
    computed: {
      ...mapState([
        'activeStatus',
        'activeColour',
        'activeCountry'
      ]),
      ...mapGetters([
        'status'
      ])
    },
    methods: {
      ...mapActions([
        'makeHoverCountry'
      ]),
      checkActive (activeCountry, country) {
        if (!activeCountry.length) return false
        return _.get(country, activeCountry[0]) === activeCountry[1]
      }
    }
  }
</script>

<style lang="scss">

</style>
