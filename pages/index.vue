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
    <div class="page-content page-vis">
      <section>
        <div v-for="(country, index) in countries" :class="{ 'country': true, 'active': status[activeStatus][index] }" :style="{ width: country.values.counter.percent + '%', backgroundColor: country.colours[activeColour] }"><span>{{ country.label }}</span></div>
      </section>
      <section>
        <div v-for="(country, index) in countries" :class="{ 'country': true, 'active': status[activeStatus][index] }" :style="{ width: country.values.population.percent + '%', backgroundColor: country.colours[activeColour] }"><span>{{ country.label }}</span></div>
      </section>
      <section>
        <div v-for="(country, index) in countries" :class="{ 'country': true, 'active': status[activeStatus][index] }" :style="{ width: country.values.gdp.percent + '%', backgroundColor: country.colours[activeColour] }"><span>{{ country.label }}</span></div>
      </section>
      <section>
        <div v-for="(country, index) in countries" :class="{ 'country': true, 'active': status[activeStatus][index] }" :style="{ width: country.values.area.percent + '%', backgroundColor: country.colours[activeColour] }"><span>{{ country.label }}</span></div>
      </section>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  // import _ from 'lodash'

  export default {
    data: function () {
      return {}
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
      ])
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
