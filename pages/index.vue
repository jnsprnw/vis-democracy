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
          <p>The Economist’s »<em>Democracy Index</em>« measures and categorizes the state of democracy in 167 countries. A full democracy usually has the following features: free and fair elections; political pluralism; respect of civil liberties and human rights; protection of minority rights; a functioning government with an effective system of checks and balances; equality before the law and an independent judiciary as well as free and diverse media.</p>
          <h3>How to read this graphic</h3>
          <p>Each country that is included in the Economist’s index has one slice in the graphic. The width illustrates the share each country has of the cummulative population, land mass, and GDP respectively. The colour indicates the categories full democracies, flawed democracies, hybrid regime and authoritarian.</p>
          <span v-on:click="makeActiveTab('story')" class="btn">Start</span>
        </div>
      </section>
      <footer class="tab footer" v-if="activeTab === 'intro'">
        <p>This graphic was created by Jonas Parnow in 2018. The last update was 24.2.2018. <nuxt-link to="imprint" class="link">Find out more</nuxt-link>.</p>
      </footer>
      <section class="tab" v-if="activeTab === 'story'">
        <h3>Population</h3>
        <p>Only a small percentage of the population lives in countries with full democracies. A large number lives in flawed democracies, like India, or authoritarian regimes, like China.</p>
        <p>While the population in the two most populous countries is almost equal, there are big differences when it comes to the average annual birth rates. In China, like in the US, there are on average 12.49 births per 1,000 habitants, which is a small number compared to 19.55 and 21.14 in India and Bangladesh respectively.</p>
        <h3>Land Mass</h3>
        <p>When scaling countries according to their land mass, it is evident that half of the Earth’s land mass belongs to full or flawed democracies, just like half of the population lives under these government systems. But still 40% of the Earth’s land mass is controlled by authoritarian regimes.</p>
        <p>Although almost equal in terms of population, India and China differ in terms of territory. This indicates a large difference in population density. While in China, there are 146 people per square kilometer of land, in India there are 441. For the United States the number is 35, and in Bangladesh it is 1,237 – one of the highest densities in the world.</p>
        <h3>Economy</h3>
        <p>When scaling countries according to their gross domestic product (GDP), it’s clear that full democracies have a bigger share of the world’s economy than corresponding to their population or land mass. While democracy might be one indicator for economic productivity, other factors such as historical and geographic conditions and the market system must also be taken into account.</p>
        <p>While economic heavyweights China and the US match up to each other in absolute numbers, comparing the numbers per capita would draw a different picture. The GDP per capita is $55,800 in the United States, but only $14,100 in China, $6,200 in India, and a mere $3,600 in Bangladesh.</p>
      </section>
      <section class="tab" v-if="activeTab === 'groups'">
        <p>Länder gehen Bündnisse und Koalitionen ein, um Interessen zu vertreten, Macht auszuüben oder Frieden zu schließen. Andere Gruppierungen resultieren aus der geografischen Position oder Kategorien, denen sie zugeordnet werden.</p>
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
        <ul class="selection">
          <li
            v-for="(label, score) in scoresLabels"
            :class="{ active: activeColour === score }"
            v-on:click="makeActiveColour(score)"
            >{{ label }}</li>
        </ul>
      </section>
    </aside>
    <div class="page-content page-vis">
      <Vis />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import Vis from '~/components/Vis.vue'

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
      Vis
    },
    mounted () {
    }
  }
</script>

<style lang="scss">

</style>
