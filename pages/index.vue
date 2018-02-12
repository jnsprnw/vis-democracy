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
        <div v-for="country in equal" class="country"><span>Country</span></div>
      </section>
      <section>
        <div v-for="country in equal" class="country"><span>Country</span></div>
      </section>
      <section>
        <div v-for="country in equal" class="country"><span>Country</span></div>
      </section>
      <section>
        <div v-for="country in equal" class="country"><span>Country</span></div>
      </section>
    </div>
  </div>
</template>

<script>
  // import { mapState, mapGetters, mapActions } from 'vuex'
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
    },
    watch: {
    },
    methods: {
    },
    components: {
    },
    mounted () {
    }
  }
</script>

<style lang="scss">

</style>
