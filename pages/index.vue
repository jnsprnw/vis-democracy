<template>
  <div class="page-body">
    <aside class="page-aside">
      <header>
        <h2><small>Degrees of</small> Democracy</h2>
        <nav>
          <ul class="menu">
            <li :class="{ active: activeTab === 'intro' }" v-on:click="makeActiveTab('intro')"><span>Intro</span></li>
            <li :class="{ active: activeTab === 'story' }" v-on:click="makeActiveTab('story')"><span>Story</span></li>
            <li :class="{ active: activeTab === 'scores' }" v-on:click="makeActiveTab('scores')"><span>Scores</span></li>
            <li :class="{ active: activeTab === 'groups' }" v-on:click="makeActiveTab('groups')"><span>Groups</span></li>
          </ul>
        </nav>
      </header>
      <section class="tab intro" v-if="activeTab === 'intro'">
        <div class="content">
          <p>The Economist’s »<em>Democracy Index</em>« measures and categorizes the state of democracy in 167 countries. According to the index, a <LinkHover path="scores.regimeType" value="Full democracy" label="full democracy" /> has the following features: free and fair elections, political pluralism, respect of civil liberties and human rights, protection of minority rights, a functioning govern&shy;ment with an effective system of checks and balances, equality before the law and an inde&shy;pendent judiciary as well as free and diverse media. Other regimes are missing these features partly or completely.</p>
          <h3>How to read the graphic</h3>
          <p>Each country that is included in the Economist’s index constitutes one slice in the graphic. The countries are ordered by their democracy rank: the further left a country is placed the more democratic it is. The width of the slice illustrates each country's share of world population, land mass, and GDP respectively. <LinkHover path="cca3" value="CHN" label="China" />, for example, is home to ~&#8239;19&#8239;% of the world’s population, covers ~&#8239;7&#8239;% of the planet’s land surface and produces ~&#8239;15&#8239;% of the world's total GDP. The colours indicate the categories <LinkHover path="scores.regimeType" value="Full democracy" label="full democracy" />, <LinkHover path="scores.regimeType" value="Flawed democracy" label="flawed democracy" />, <LinkHover path="scores.regimeType" value="Hybrid regime" label="hybrid regime" /> and <LinkHover path="scores.regimeType" value="Authoritarian regime" label="authoritarian regime" /> according to the index.</p>
          <span v-on:click="makeActiveTab('story')" class="btn center tablet-invisible">Explore</span>
        </div>
      </section>
      <footer class="tab footer" v-if="activeTab === 'intro'">
        <small>This website was created by Jonas Parnow in 2018. <nuxt-link to="imprint" class="link">Click for details and data</nuxt-link></small>
      </footer>
      <section class="tab" v-if="activeTab === 'story'">
        <h3>Population</h3>
        <p>Only a small percentage of the world’s population lives in countries with <LinkHover path="scores.regimeType" value="Full democracy" label="full democracies" />. A large number lives in <LinkHover path="scores.regimeType" value="Flawed democracy" label="flawed democracies" />, like <LinkHover path="cca3" value="IND" label="India" />, or <LinkHover path="scores.regimeType" value="Authoritarian regime" label="authoritarian regimes" />, like <LinkHover path="cca3" value="CHN" label="China" />.</p>
        <p>While the population in <LinkHover path="cca3" value="IND" label="the" />&ensp;<LinkHover path="cca3" value="CHN" label="two" /> most populous countries is almost equal, there are big differences when it comes to average annual birth rates. In <LinkHover path="cca3" value="CHN" label="China" />, like in the <LinkHover path="cca3" value="USA" label="US" />, there are on average 12.49 births per 1,000 habitants, which is a small number compared to 19.55 and 21.14 in <LinkHover path="cca3" value="IND" label="India" /> and <LinkHover path="cca3" value="BGD" label="Bangladesh" /> respectively.</p>
        <h3>Land Mass</h3>
        <p>When scaling countries according to their land mass, it is evident that half of the Earth’s land mass belongs to <LinkHover path="scores.regimeType" value="Full democracy" label="full" /> or <LinkHover path="scores.regimeType" value="Flawed democracy" label="flawed democracies" />, just like half of the population lives under these government systems. But still, 40&#8239;% of the Earth’s land mass is controlled by <LinkHover path="scores.regimeType" value="Authoritarian regime" label="authoritarian regimes" />.</p>
        <p>Although almost equal in terms of population, <LinkHover path="cca3" value="IND" label="India" /> and <LinkHover path="cca3" value="CHN" label="China" /> differ in terms of territory. This indicates a large difference in population density. While in <LinkHover path="cca3" value="CHN" label="China" />on average 142 people live on each square kilometer of land, in <LinkHover path="cca3" value="IND" label="India" />, there are 380 people. For the <LinkHover path="cca3" value="USA" label="United States" /> the number is 32, and in <LinkHover path="cca3" value="BGD" label="Bangladesh" /> it is 1,138 – one of the highest densities in the world.</p>
        <h3>Economy</h3>
        <p>When scaling countries according to their gross domestic product (GDP, nominal), it becomes evident that <LinkHover path="scores.regimeType" value="Full democracy" label="full" /> and <LinkHover path="scores.regimeType" value="Flawed democracy" label="flawed democracies" /> have a bigger share of the world‘s economy than which would correspond to their population or land mass. While democracy might be one indicator of economic productivity, other factors such as historical and geographic conditions and the market system must also be taken into account.</p>
        <p>While the world's economic heavyweights <LinkHover path="cca3" value="USA" label="US" /> and <LinkHover path="cca3" value="CHN" label="China" /> nearly match up to each other in terms of absolute economic output, comparing the numbers per capita would draw a different picture. The GDP per capita (nominal) is $&#8239;60,338 in the <LinkHover path="cca3" value="USA" label="United States" />, but only $&#8239;8,786 in <LinkHover path="cca3" value="CHN" label="China" />, $&#8239;2,085 in <LinkHover path="cca3" value="IND" label="India" />, and a mere $&#8239;1,544 in <LinkHover path="cca3" value="BGD" label="Bangladesh" />.</p>
      </section>
      <section class="tab" v-if="activeTab === 'groups'">
        <p>In order to defend their own interests, wield power, or make peace, countries enter alliances and form coalitions. Other country unions emerge because of their geographical position or their belongingness to an assigned category.</p>
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
        <p>Countries can be measured by a variety of indicators. The default setting colours each country according to rank within its democracy category.</p>
        <div class="list">
          <section v-for="(list, section) in scoresGroups">
            <h4>{{ section }}</h4>
            <ul class="selection">
              <li
                v-for="score in list"
                :class="{ active: activeColour === score.key }"
                v-on:click="makeActiveColour(score.key)"
                >{{ score.label }}</li>
            </ul>
          </section>
        </div>
      </section>
      <Legend v-if="activeTab === 'scores'" />
    </aside>
    <div class="page-content page-vis">
      <Vis />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import Vis from '~/components/Vis.vue'
  import LinkHover from '~/components/LinkHover.vue'
  import Legend from '~/components/Legend.vue'

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
        'activeTab'
      ]),
      ...mapGetters([
        'countries',
        'status',
        'organisations',
        'domains',
        'scoresGroups'
      ])
    },
    methods: {
      ...mapActions([
        'makeActiveStatus',
        'makeActiveColour',
        'makeActiveTab'
      ])
    },
    components: {
      Vis,
      LinkHover,
      Legend
    },
    mounted () {
    }
  }
</script>

<style lang="scss">
  .page-body {
    overflow: hidden;
  }
</style>
