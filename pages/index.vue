<template>
  <div class="page-body">
    <aside class="page-aside">
      <h2>Democracy Index</h2>
      <section>
        <span>Legend</span>
      </section>
      <section>
        <span>Story</span>
      </section>
      <section>
        <span>Groups</span>
      </section>
    </aside>
    <div class="page-content page-vis">
      <section>
        <div v-for="country in countries" class="country" :style="{ width: country.values.counter.percent + '%' }"><span>{{ country.label }}</span></div>
      </section>
      <section>
        <div v-for="country in countries" class="country" :style="{ width: country.values.population.percent + '%' }"><span>{{ country.label }}</span></div>
      </section>
      <section>
        <div v-for="country in countries" class="country" :style="{ width: country.values.gdp.percent + '%' }"><span>{{ country.label }}</span></div>
      </section>
      <section>
        <div v-for="country in countries" class="country" :style="{ width: country.values.area.percent + '%' }"><span>{{ country.label }}</span></div>
      </section>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // import _ from 'lodash'

  export default {
    data: function () {
      return {
        'equal': new Array(168),
        'GDP': new Array(168),
        'population': new Array(168),
        'area': new Array(168)
      }
    },
    computed: {
      // ...mapState([
      //   'comparedItems',
      //   'reference'
      // ]),
      ...mapGetters([
        'countries'
      ])
      // activeTypes (state, getters) {
      //   return _.isUndefined(this.$store.state.activeType) ? _.fill(Array(this.$store.getters.types.length), false) : this.$store.state.activeType
      // }
    },
    watch: {
    },
    methods: {
    },
    components: {
    },
    mounted () {
      console.log(this.countries)
    }
  }
</script>

<style lang="scss">

</style>
