<template>
  <div class="wrapper imprint">
    <h2><small>Degrees of</small> Democracy</h2>
    <nuxt-link to="/" class="btn">Back to the graphic</nuxt-link>
    <h3>About the graphic</h3>
    <p>This graphic was created by <a href="http://jonasparnow.com">Jonas Parnow</a> and Annick Ehmann first as a print graphic in the magazine <a href="http://ingraphics.info">InGraphics Vol. 10</a> at the <a href="http://infographics.group">Infographics Group</a> in 2017. The graphic was created under the Creative Direction of Jan Schochow and the Art Direction of Klaas Neumann. It recieved a SND Award of Excellence in 2018. The interactive, extended version was created in 2018 with updated data and additional aspects solely by <a href="http://jonasparnow.com">Jonas Parnow</a>.</p>
    <p>The idea of the graphic is to give a different perspective on countries. Usually, we compare countries on a <a href="https://infographics.economist.com/2018/DemocracyIndex/">map</a>. This is reasonable as their geographical position and shape is often a <a href="https://www.arte.tv/en/videos/RC-014036/mapping-the-world/">dominant cultural and economic driver</a>. On the other hand, arbitrary shapes are hard to compare, map projections are always trade offs and the impact of globalisation and digital communication demand <a href="http://passim.paulheinicker.com/">post-spacial perspectives</a>.</p>
    <p>Jonas Parnow is a designer for information and data. Find out more about him at <a href="http://jonasparnow.com">jonasparnow.com</a> and see other projects at <a href="http://visualising.systems">visualising.systems</a>.
    <p>The source code of this website can be found on <a href="https://github.com/z3to/vis-democracy">Github</a>. I’m happy for any pull-request enhancing the performance of the graphic.
    <h3>About the data</h3>
    <p>The data is mostly based on The Economist <a href="https://www.eiu.com/topic/democracy-index">Intelligence Unit’s Democracy Index 2017</a>. Please note that this list only contains 167 countries. Most notably countries like Greenland, Somalia, South Sudan and Western Sahara are missing. Because of this the percentage values are only relative to the included countries. Most dramatically, the land mass of Antartica is missing. Find out more about their methodology and the data in their <a href="https://www.eiu.com/public/topical_report.aspx?campaignid=DemocracyIndex2017">free report</a>. Additional data is gathered from various sources. Find the data below or on <a href="https://github.com/z3to/vis-democracy/blob/master/data/data.json">Github</a>.</p>
    <ul>
      <li><sup>[1]</sup> Palestine’s population and landmass is combined from the Gaza Strip and the West Bank respectively.</li>
      <li><sup>[2]</sup> Taiwan’s GDP is taken from <a href="https://en.wikipedia.org/wiki/Economy_of_Taiwan">Wikipedia</a></li>
      <li><sup>[3]</sup> More on Syria’s GDP on <a href="https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)#cite_note-26">Wikipedia</a></li>
      <li><sup>[4]</sup> Cuba’s, Laos’, North Korea’s and Palestine’s GDP is from 2016 per the United Nations. More on <a href="https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)#cite_note-21">Wikipedia</a></li>
      <li><sup>[5]</sup> More on Taiwan’s HDI index on <a href="https://en.wikipedia.org/wiki/List_of_countries_by_Human_Development_Index#cite_note-15">Wikipedia</a></li>
      <li><sup>[6]</sup> More on North Korea’s HDI index on <a href="https://en.wikipedia.org/wiki/List_of_countries_by_Human_Development_Index#cite_note-UN_Escap-9">Wikipedia</a></li>
      <li><sup>[7]</sup> Eritrea is technically listed as an observer instead of member.</li>
    </ul>
    <table>
      <thead>
        <tr>
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
            Regime Type
          </th>
          <th>
            Rank '17
          </th>
          <th>
            Rank '12
          </th>
          <th>
            Rank '06
          </th>
          <th>
            Score '17'
          </th>
          <th>
            Score '12
          </th>
          <th>
            Score '06
          </th>
          <th>
            Population
          </th>
          <th>
            Land mass
          </th>
          <th>
            Gross domestic product
          </th>
          <th>
            HDI
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
            Democratic Name
          </th>
          <th>
            US Travelban
          </th>
          <th>
            EU’s Blacklist
          </th>
          <th>
            Nuclear weapons
          </th>
          <th>
            Apple Store
          </th>
        </tr>
        <tr class="source">
          <th>
            <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3">ISO 3166-1</a>
          </th>
          <th>
          </th>
          <th>
          </th>
          <th>
          </th>
          <th>
            2018, <a href="https://www.eiu.com/public/topical_report.aspx?campaignid=DemocracyIndex2017">source</a>
          </th>
          <th>
            2013, <a href="http://na-abk.marketo.com/rs/eiu2/images/Democracy-Index-2012.pdf">source</a>
          </th>
          <th>
            2007, <a href="https://www.economist.com/media/pdf/DEMOCRACY_INDEX_2007_v3.pdf">source</a>
          </th>
          <th>
            2018, <a href="https://www.eiu.com/public/topical_report.aspx?campaignid=DemocracyIndex2017">source</a>
          </th>
          <th>
            2013, <a href="http://na-abk.marketo.com/rs/eiu2/images/Democracy-Index-2012.pdf">source</a>
          </th>
          <th>
            2007, <a href="https://www.economist.com/media/pdf/DEMOCRACY_INDEX_2007_v3.pdf">source</a>
          </th>
          <th>
            2017, <a href="https://www.cia.gov/library/publications/the-world-factbook/rankorder/2119rank.html">source</a> <sup>[1]</sup>
          </th>
          <th>
            in square km, 2017, <a href="https://www.cia.gov/library/publications/the-world-factbook/rankorder/2147rank.html">source</a> <sup>[1]</sup>
          </th>
          <th>
            in Billions US Dollar, 2016, <a href="http://www.imf.org/external/pubs/ft/weo/2017/02/weodata/weorept.aspx?sy=2017&ey=2017&scsm=1&ssd=1&sic=1&sort=country&ds=.&br=1&pr1.x=90&pr1.y=11&c=512%2C946%2C914%2C137%2C612%2C546%2C614%2C962%2C311%2C674%2C213%2C676%2C911%2C548%2C193%2C556%2C122%2C678%2C912%2C181%2C313%2C867%2C419%2C682%2C513%2C684%2C316%2C273%2C913%2C868%2C124%2C921%2C339%2C948%2C638%2C943%2C514%2C686%2C218%2C688%2C963%2C518%2C616%2C728%2C223%2C836%2C516%2C558%2C918%2C138%2C748%2C196%2C618%2C278%2C624%2C692%2C522%2C694%2C622%2C142%2C156%2C449%2C626%2C564%2C628%2C565%2C228%2C283%2C924%2C853%2C233%2C288%2C632%2C293%2C636%2C566%2C634%2C964%2C238%2C182%2C662%2C359%2C960%2C453%2C423%2C968%2C935%2C922%2C128%2C714%2C611%2C862%2C321%2C135%2C243%2C716%2C248%2C456%2C469%2C722%2C253%2C942%2C642%2C718%2C643%2C724%2C939%2C576%2C644%2C936%2C819%2C961%2C172%2C813%2C132%2C726%2C646%2C199%2C648%2C733%2C915%2C184%2C134%2C524%2C652%2C361%2C174%2C362%2C328%2C364%2C258%2C732%2C656%2C366%2C654%2C734%2C336%2C144%2C263%2C146%2C268%2C463%2C532%2C528%2C944%2C923%2C176%2C738%2C534%2C578%2C536%2C537%2C429%2C742%2C433%2C866%2C178%2C369%2C436%2C744%2C136%2C186%2C343%2C925%2C158%2C869%2C439%2C746%2C916%2C926%2C664%2C466%2C826%2C112%2C542%2C111%2C967%2C298%2C443%2C927%2C917%2C846%2C544%2C299%2C941%2C582%2C446%2C474%2C666%2C754%2C668%2C698%2C672&s=NGDPD&grp=0&a=">source</a> <sup>[2] [3] [4]</sup>
          </th>
          <th>
            2015, <a href="http://hdr.undp.org/en/data">source</a> <sup>[5]</sup> <sup>[6]</sup>
          </th>
          <th>
            EU
          </th>
          <th>
            2018, <a href="http://www.nationsonline.org/oneworld/arab_league.htm">source</a> <sup>[7]</sup>
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
            2018, <a href="https://www.eiu.com/public/topical_report.aspx?campaignid=DemocracyIndex2017">source</a>
          </th>
          <th>
            2018, <a href="https://www.eiu.com/public/topical_report.aspx?campaignid=DemocracyIndex2017">source</a>
          </th>
          <th>
            2018, <a href="https://www.eiu.com/public/topical_report.aspx?campaignid=DemocracyIndex2017">source</a>
          </th>
          <th>
            2018, <a href="https://www.eiu.com/public/topical_report.aspx?campaignid=DemocracyIndex2017">source</a>
          </th>
          <th>
            2015, <a href="https://petervojtek.github.io/diy/2015/05/19/countries-with-democracy-in-name.html">source</a>
          </th>
          <th>
            Travelban
          </th>
          <th>
            Blacklist
          </th>
          <th>
            2018, <a href="https://en.wikipedia.org/wiki/List_of_states_with_nuclear_weapons">source</a>
          </th>
          <th>
            2017, <a href="https://www.thebalance.com/apple-retail-stores-global-locations-2892925">source</a>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(country, index) in countries">
          <td>
            {{ country.cca3 }}
          </td>
          <td>
            <strong>{{ country.label }}</strong>
          </td>
          <td>
            {{ country.region }}
          </td>
          <td>
            {{ country.scores.regimeType.replace('democracy', 'demo.') }}
          </td>
          <td class="right">
            {{ country.scores.rank }}
          </td>
          <td class="right">
            {{ country.scores.rank12 }}
          </td>
          <td class="right">
            {{ country.scores.rank06 }}
          </td>
          <td class="right">
            {{ country.scores.score.toFixed(2) }}
          </td>
          <td class="right">
            {{ country.scores.score12.toFixed(2) }}
          </td>
          <td class="right">
            {{ country.scores.score06.toFixed(2) }}
          </td>
          <td class="right">
            {{ fn(country.values.population.value) }}
          </td>
          <td class="right">
            {{ fn(country.values.area.value) }}
          </td>
          <td class="right">
            {{ fn(country.values.gdp.value) }}
          </td>
          <td class="right">
            {{ (country.scores.hdi || 0).toFixed(3) }}
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
      ]),
      fn (n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
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
