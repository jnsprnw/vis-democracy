<template>
  <g
    :class="{ 'country': true, 'highlight': highlight, 'active': active }"
    v-on:mouseover="makeHoverCountry({ country: country, placement: placement })">
    <path
      v-if="shape"
      :style="{ fill: country.colours[activeColour] }"
      :d="shape" />
    <text
      v-for="(placement, n) in placement"
      v-if="point && placement[2] > 7 && placement[3] > 60"
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
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    props: ['country', 'placement', 'shape', 'point', 'highlight', 'active'],
    computed: {
      ...mapState([
        'activeColour'
      ])
    },
    methods: {
      ...mapActions([
        'makeHoverCountry'
      ])
    }
  }
</script>

<style lang="scss">

</style>
