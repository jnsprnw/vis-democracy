import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import * as data from '../data/data.json'
import chroma from 'chroma-js'

Vue.use(Vuex)

function getMinMax (arr, zero = false) {
  if (zero) {
    return [_.min(arr), 0, _.max(arr)]
  }
  return [_.min(arr), _.max(arr)]
}

const store = () => new Vuex.Store({
  state: {
    data: data,
    activeStatus: 'default',
    activeColour: 'regimeType',
    activeTab: 'intro',
    hoverCountry: false,
    activeCountry: false,
    colorRangesRegimeType: {
      'Full democracy': ['#CCC200', '#c2d22f'],
      'Flawed democracy': ['#7dbb45', '#329967'],
      'Hybrid regime': ['#117575', '#415151'],
      'Authoritarian': ['#722b2c', '#a51916']
    },
    groups: {
      'Organisations': {
        'eu': 'Members of the European Union',
        'arab': 'Members of the Arab League',
        'nato': 'Members of the NATO',
        'oecd': 'Members of the OECD',
        'g20': 'Members of the G20'
      },
      'Geographical': {
        'africa': 'Countries on the African continent',
        'americas': 'Countries on the American continent',
        'asia': 'Countries on the Asian continent',
        'europe': 'Countries on the European continent',
        'oceania': 'Countries on the Oceanian continent'
      },
      'Other groups': {
        'name': 'Countries with »Democracy« in their official name',
        'travelban': 'Trump’s »Travelban« countries',
        'blacklist': 'EU’s tax watch-/black-list',
        'atom': 'Countries that (probably) have nuclear weapons',
        'apple': 'Countries that have Apple stores'
      }
    },
    scoresLabels: {
      'regimeType': 'Economist’s categories of democracy 2017',
      'rank': 'Economist’s democracy rank 2017',
      'rank12': 'Economist’s democracy rank 2012',
      'rank06': 'Economist’s democracy rank 2006',
      'rankDiff1712': 'Economist’s democracy rank difference 2017–2012',
      'rankDiff1706': 'Economist’s democracy rank difference 2017–2006',
      'score': 'Economist’s democracy overall score 2017',
      'score12': 'Economist’s democracy overall score 2012',
      'score06': 'Economist’s democracy overall score 2006',
      'scoreDiff1712': 'Economist’s democracy overall score difference 2017–2012',
      'scoreDiff1706': 'Economist’s democracy overall score difference 2017–2006',
      'hdi': 'Human Development Index'
    }
  },
  getters: {
    total (state) {
      let values = {
        'population': 0,
        'gdp': 0,
        'area': 0
      }
      _.each(state.data, country => {
        values['population'] += country['values']['population']
        values['gdp'] += country['values']['gdp']
        values['area'] += country['values']['area']
      })
      return values
    },
    scores (state) {
      return _.keys(_.first(state.data)['scores'])
    },
    regimeTypes (state) {
      return _.uniq(_.map(state.data, 'scores.regimeType'))
    },
    domains (state) {
      // Ranks
      let democracyRank17 = _.map(state.data, 'scores.rank')
      let democracyRank12 = _.map(state.data, 'scores.rank12')
      let democracyRank06 = _.map(state.data, 'scores.rank06')
      let democracyRankDiff1712 = _.map(state.data, 'scores.rankDiff1712')
      let democracyRankDiff1706 = _.map(state.data, 'scores.rankDiff1706')

      // Scores
      let democracyScore17 = _.map(state.data, 'scores.score')
      let democracyScore12 = _.map(state.data, 'scores.score12')
      let democracyScore06 = _.map(state.data, 'scores.score06')
      let democracyScoreDiff1712 = _.map(state.data, 'scores.scoreDiff1712')
      let democracyScoreDiff1706 = _.map(state.data, 'scores.scoreDiff1706')

      console.log(getMinMax(democracyScore12), getMinMax(democracyScore06))

      let democracyTypesGroups = _.groupBy(state.data, 'scores.regimeType')
      let democracyTypes = _.fromPairs(_.map(democracyTypesGroups, (countries, key) => {
        let values = _.map(countries, 'scores.rank')
        return [key, getMinMax(values)]
      }))

      let hdiScores = _.map(state.data, 'scores.hdi')

      let retVal = {
        'rank': getMinMax(democracyRank17),
        'rank12': getMinMax(democracyRank12),
        'rank06': getMinMax(democracyRank06),
        'rankDiff1712': getMinMax(democracyRankDiff1712, true),
        'rankDiff1706': getMinMax(democracyRankDiff1706, true),
        'score': getMinMax(democracyScore17),
        'score12': getMinMax(democracyScore12),
        'score06': getMinMax(democracyScore06),
        'scoreDiff1712': getMinMax(democracyScoreDiff1712, true),
        'scoreDiff1706': getMinMax(democracyScoreDiff1706, true),
        'hdi': getMinMax(hdiScores),
        ...democracyTypes
      }

      return retVal
    },
    countries (state, getters) {
      let numberCountries = state.data.length
      let colorScaleRank = chroma.scale(['#1B70E0', '#D17000', '#EC3A4D']).mode('lab').domain(getters.domains.rank)
      let colorScaleRank12 = chroma.scale(['#1B70E0', '#D17000', '#EC3A4D']).mode('lab').domain(getters.domains.rank12)
      let colorScaleRank06 = chroma.scale(['#1B70E0', '#D17000', '#EC3A4D']).mode('lab').domain(getters.domains.rank06)
      let colorScaleRankDiff1712 = chroma.scale(['#EC3A4D', '#fff', '#1B70E0']).mode('lab').domain(getters.domains.rankDiff1712)
      let colorScaleRankDiff1706 = chroma.scale(['#EC3A4D', '#fff', '#1B70E0']).mode('lab').domain(getters.domains.rankDiff1706)

      let colorScaleScore = chroma.scale(['#EC3A4D', '#D17000', '#1B70E0']).mode('lab').domain(getters.domains.score)
      let colorScaleScore12 = chroma.scale(['#EC3A4D', '#D17000', '#1B70E0']).mode('lab').domain(getters.domains.score12)
      let colorScaleScore06 = chroma.scale(['#EC3A4D', '#D17000', '#1B70E0']).mode('lab').domain(getters.domains.score06)
      let colorScaleScoreDiff1712 = chroma.scale(['#EC3A4D', '#fff', '#1B70E0']).mode('lab').domain(getters.domains.scoreDiff1712)
      let colorScaleScoreDiff1706 = chroma.scale(['#EC3A4D', '#fff', '#1B70E0']).mode('lab').domain(getters.domains.scoreDiff1706)

      let colorScaleHDI = chroma.scale(['#EC3A4D', '#D17000', '#1B70E0']).mode('lab').domain(getters.domains.hdi)

      // let colorScaleDemocracy = chroma.scale(['red', 'green']).mode('lab').domain(getters.domains.democracy)

      const colorScalesRegimeType = _.fromPairs(_.map(getters.regimeTypes, key => {
        return [key, chroma.scale(state.colorRangesRegimeType[key]).mode('lab').domain(getters.domains[key])]
      }))

      let countries = _.map(state.data, (country, index) => {
        let retVal = {
          ...country,
          'colours': {
            'regimeType': colorScalesRegimeType[country.scores.regimeType](country.scores.rank).css(),
            'rank': colorScaleRank(country.scores.rank).css(),
            'rank12': colorScaleRank12(country.scores.rank12).css(),
            'rank06': colorScaleRank06(country.scores.rank06).css(),
            'rankDiff1712': colorScaleRankDiff1712(country.scores.rankDiff1712).css(),
            'rankDiff1706': colorScaleRankDiff1706(country.scores.rankDiff1706).css(),
            'score': colorScaleScore(country.scores.score).css(),
            'score12': colorScaleScore12(country.scores.score12).css(),
            'score06': colorScaleScore06(country.scores.score06).css(),
            'scoreDiff1712': colorScaleScoreDiff1712(country.scores.scoreDiff1712).css(),
            'scoreDiff1706': colorScaleScoreDiff1706(country.scores.scoreDiff1706).css(),
            'hdi': colorScaleHDI(country.scores.hdi).css()
          }
        }

        let { population, gdp, area } = country['values']
        retVal['values'] = {
          'counter': {
            'percent': 100 / numberCountries
          },
          'population': {
            'value': population,
            'percent': 100 / getters.total.population * population,
            'label': population + ' Menschen'
          },
          'gdp': {
            'value': gdp,
            'percent': 100 / getters.total.gdp * gdp,
            'label': gdp + ' GDP'
          },
          'area': {
            'value': area,
            'percent': 100 / getters.total.area * area,
            'label': area + ' Area'
          }
        }
        return retVal
      })

      return Object.freeze(countries)
    },
    organisations (state) {
      return Object.freeze(_.keys(_.first(state.data)['organisations']))
    },
    status (state, getters) {
      let retVal = {}
      retVal[state.activeStatus] = _.fill(Array(state.data.length), false)
      _.each(getters.organisations, organisation => {
        retVal[organisation] = _.map(state.data, country => {
          return country['organisations'][organisation]
        })
      })
      return Object.freeze(retVal)
    }
  },
  mutations: {
    MAKE_ACTIVE_STATUS (state, key) {
      state.activeStatus = key
    },
    MAKE_ACTIVE_TAB (state, key) {
      state.activeTab = key
    },
    MAKE_ACTIVE_COLOUR (state, key) {
      state.activeColour = key
    },
    MAKE_HOVER_COUNTRY (state, country) {
      state.hoverCountry = country
    },
    MAKE_ACTIVE_COUNTRY (state, id) {
      state.activeCountry = id
    }
  },
  actions: {
    makeActiveStatus ({ commit }, key) {
      commit('MAKE_ACTIVE_STATUS', key)
    },
    makeHoverCountry ({ commit }, country) {
      commit('MAKE_HOVER_COUNTRY', country)
    },
    makeActiveCountry ({ commit }, id) {
      commit('MAKE_ACTIVE_COUNTRY', id)
    },
    makeActiveTab ({ commit }, key) {
      commit('MAKE_ACTIVE_TAB', key)
    },
    makeActiveColour ({ commit, state }, key) {
      const value = state.activeColour === key ? 'regimeType' : key
      commit('MAKE_ACTIVE_COLOUR', value)
    },
    addItem ({ commit }, id) {
      commit('ADD_ITEM', id)
    },
    removeItem ({ commit, state }, { index, item }) {
      if (state.reference === item) { // TODO: Leave if ID is still in Array
        let newReferenceID
        let n = 0
        do {
          newReferenceID = state.comparedItems[n]
          n += 1
        } while (state.comparedItems[n - 1] === item && n <= state.comparedItems.length)
        commit('MAKE_REFERENCE', newReferenceID)
      }
      commit('REMOVE_ITEM', index)
    }
  }
})

export default store
