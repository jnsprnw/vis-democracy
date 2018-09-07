<template>
  <g v-on:mouseleave="makeHoverCountry(false)">
    <VisCountry
      v-for="(country, index) in countries"
      :key="country.cca3"
      :country="country"
      :placement="placements[index]"
      :shape="shapes[index]"
      :point="points.length"
      :highlight="status[activeStatus][index]"
      :active="checkActive(activeCountry, country)" />
  </g>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import _ from 'lodash'
  import VisCountry from '~/components/VisCountry.vue'

  export default {
    props: ['countries', 'placements', 'shapes', 'points'],
    computed: {
      ...mapState([
        'activeStatus',
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
    },
    components: {
      VisCountry
    }
  }
</script>

<style lang="scss">

</style>
