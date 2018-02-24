<template>
  <div class="wrapper imprint">
    <h2><small>Degrees of</small> Democracy</h2>
    <nuxt-link to="/" class="btn">Back to the graphic</nuxt-link>
    <h3>Imprint</h3>
    <h4>About the graphic</h4>
    <p>This graphic was created by <a href="http://jonasparnow.de">Jonas Parnow</a> first as a print graphic in the magazine <a href="http://ingraphics.info">InGraphics</a> Vol. 9 at the <a href="http://infographics.group">Infographics Group</a> in 2017. The graphic was created under the Creative Direction of Jan Schochow and the Art Direction of Klaas Neumann. The interactive, extended version was created in 2018 with updated data and additional aspects soley by Jonas Parnow.</p>
    <p>Jonas Parnow is a designer for information and data. Find out more about him and see other projects at <a href="http://visualising.systems">visualising.systems</a>.
    <p>The source code of this website can be found on <a href="#">Github</a>.
    <h4>About the data</h4>
    <p>The data is based mostly on the Economist’s Democracy Index 2017. Please note that this list only contains 167 countries. Most notably countries like … are missing. Find out more about their methodology here. Additional data is gathered from various sources like the World Bank.</p>
    <table>
      <thead>
        <tr>
          <th>
            index
          </th>
          <th>
            CCA3
          </th>
          <th>
            Country
          </th>
          <th>
            Region
          </th>
          <th>
            Category
          </th>
          <th>
            HDI
          </th>
          <th>
            Democracy
          </th>
          <th>
            EU
          </th>
          <th>
            Arab
          </th>
          <th>
            Nato
          </th>
          <th>
            OECD
          </th>
          <th>
            G20
          </th>
          <th>
            Americas
          </th>
          <th>
            Asia
          </th>
          <th>
            Europe
          </th>
          <th>
            Oceania
          </th>
          <th>
            Name
          </th>
          <th>
            Travelban
          </th>
          <th>
            Blacklist
          </th>
          <th>
            Atom
          </th>
          <th>
            Apple
          </th>
        </tr>
        <tr class="source">
          <th>
            
          </th>
          <th>
            ISO 8929-XX
          </th>
          <th>
            Economist’s report
          </th>
          <th>
            Region
          </th>
          <th>
            Economist’s report
          </th>
          <th>
            HDI
          </th>
          <th>
            Democracy
          </th>
          <th>
            EU
          </th>
          <th>
            Arab
          </th>
          <th>
            Nato
          </th>
          <th>
            OECD
          </th>
          <th>
            G20
          </th>
          <th>
            Americas
          </th>
          <th>
            Asia
          </th>
          <th>
            Europe
          </th>
          <th>
            Oceania
          </th>
          <th>
            Name
          </th>
          <th>
            Travelban
          </th>
          <th>
            Blacklist
          </th>
          <th>
            Atom
          </th>
          <th>
            Apple
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(country, index) in countries">
          <td>
            {{ index }}
          </td>
          <td>
            {{ country.cca3 }}
          </td>
          <td>
            {{ country.label }}
          </td>
          <td>
            {{ country.region }}
          </td>
          <td>
            {{ country.scores.degree }}
          </td>
          <td>
            {{ country.scores.hdi }}
          </td>
          <td>
            {{ country.scores.democracy }}
          </td>
          <td>
            {{ country.organisations.eu }}
          </td>
          <td>
            {{ country.organisations.arab }}
          </td>
          <td>
            {{ country.organisations.nato }}
          </td>
          <td>
            {{ country.organisations.oecd }}
          </td>
          <td>
            {{ country.organisations.g20 }}
          </td>
          <td>
            {{ country.organisations.americas }}
          </td>
          <td>
            {{ country.organisations.asia }}
          </td>
          <td>
            {{ country.organisations.europe }}
          </td>
          <td>
            {{ country.organisations.oceania }}
          </td>
          <td>
            {{ country.organisations.name }}
          </td>
          <td>
            {{ country.organisations.travelban }}
          </td>
          <td>
            {{ country.organisations.blacklist }}
          </td>
          <td>
            {{ country.organisations.atom }}
          </td>
          <td>
            {{ country.organisations.apple }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'

  export default {
    data: function () {
      return {
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
      ])
    },
    watch: {
    },
    methods: {
      ...mapActions([
        'makeActiveStatus',
        'makeActiveColour',
        'makeActiveTab'
      ])
    },
    components: {
    },
    mounted () {
    }
  }
</script>

<style lang="scss">
  .wrapper {
    position: relative;
  }
</style>
