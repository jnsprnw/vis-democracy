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
        'asiaAustralia': 'Asia & Australasia',
        'easternEurope': 'Eastern Europe',
        'latinCarribean': 'Latin America & the Caribbean',
        'middleNorth': 'Middle East & North Africa',
        'northAmerica': 'North America',
        'subAfrica': 'Sub-Saharan Africa',
        'westernEurope': 'Western Europe'
      },
      'Other groups': {
        'name': 'Countries with »Democracy« in their official name',
        'travelban': 'Trump’s »Travelban« countries',
        'blacklist': 'EU’s tax watch-/black-list',
        'atom': 'Countries that (probably) have nuclear weapons',
        'apple': 'Countries that have Apple stores'
      }
    },
    scores: {
      'rank': {
        'label': 'Democracy rank 2017',
        'colors': ['#1B70E0', '#D17000', '#EC3A4D'],
        'revert': false,
        'zero': false,
        'type': 'Rank'
      },
      'rank12': {
        'label': 'Democracy rank 2012',
        'colors': ['#1B70E0', '#D17000', '#EC3A4D'],
        'revert': false,
        'zero': false,
        'type': 'Rank'
      },
      'rank06': {
        'label': 'Democracy rank 2006',
        'colors': ['#1B70E0', '#D17000', '#EC3A4D'],
        'revert': false,
        'zero': false,
        'type': 'Rank'
      },
      'rankDiff1712': {
        'label': 'Democracy rank difference 2017–2012',
        'colors': ['#EC3A4D', '#fff', '#1B70E0'],
        'revert': false,
        'zero': true,
        'type': 'Rank'
      },
      'rankDiff1706': {
        'label': 'Democracy rank difference 2017–2006',
        'colors': ['#EC3A4D', '#fff', '#1B70E0'],
        'revert': false,
        'zero': true,
        'type': 'Rank'
      },
      'score': {
        'label': 'Democracy overall score 2017',
        'colors': ['#EC3A4D', '#D17000', '#1B70E0'],
        'revert': true,
        'zero': false,
        'type': 'Score'
      },
      'score12': {
        'label': 'Democracy overall score 2012',
        'colors': ['#EC3A4D', '#D17000', '#1B70E0'],
        'revert': true,
        'zero': false,
        'type': 'Score'
      },
      'score06': {
        'label': 'Democracy overall score 2006',
        'colors': ['#EC3A4D', '#D17000', '#1B70E0'],
        'revert': true,
        'zero': false,
        'type': 'Score'
      },
      'scoreDiff1712': {
        'label': 'Democracy overall score difference 2017–2012',
        'colors': ['#1B70E0', '#fff', '#EC3A4D'],
        'revert': true,
        'zero': true,
        'type': 'Score'
      },
      'scoreDiff1706': {
        'label': 'Democracy overall score difference 2017–2006',
        'colors': ['#1B70E0', '#fff', '#EC3A4D'],
        'revert': true,
        'zero': true,
        'type': 'Score'
      },
      'hdi': {
        'label': 'Human Development Index',
        'colors': ['#EC3A4D', '#D17000', '#1B70E0'],
        'revert': false,
        'zero': false,
        'type': 'Other'
      }
    }
  },
  getters: {
    scoresGroups (state) {
      const { scores } = state
      const scoresArray = _.map(scores, (score, key) => {
        return {
          key,
          ...score
        }
      })
      const ret = {
        'Category': [
          {
            key: 'regimeType',
            label: 'Economist’s categories of democracy 2017'
          }
        ],
        ..._.groupBy(scoresArray, 'type')
      }
      console.log(ret)
      return ret
    },
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
    regimeTypes (state) {
      return _.uniq(_.map(state.data, 'scores.regimeType'))
    },
    domains (state) {
      const { scores, data } = state
      let democracyTypesGroups = _.groupBy(state.data, 'scores.regimeType')
      let democracyTypes = _.fromPairs(_.map(democracyTypesGroups, (countries, key) => {
        let values = _.map(countries, 'scores.rank')
        return [key, getMinMax(values)]
      }))

      const domains = _.fromPairs(_.map(scores, (score, key) => {
        return [key, getMinMax(_.map(data, 'scores.' + key), score.zero)]
      }))

      return {
        ...domains,
        ...democracyTypes
      }
    },
    colorScales (state, getters) {
      const { scores } = state
      const { domains } = getters
      const colorScales = _.fromPairs(_.map(scores, (score, key) => {
        return [key, chroma.scale(score.colors).mode('lab').domain(domains[key])]
      }))

      return colorScales
    },
    countries (state, getters) {
      const { scores } = state
      const { colorScales } = getters
      let numberCountries = state.data.length

      const colorScalesRegimeType = _.fromPairs(_.map(getters.regimeTypes, key => {
        return [key, chroma.scale(state.colorRangesRegimeType[key]).mode('lab').domain(getters.domains[key])]
      }))

      let countries = _.map(state.data, (country, index) => {
        const colours = _.fromPairs(_.map(scores, (score, key) => {
          return [key, colorScales[key](country.scores[key]).css()]
        }))
        let retVal = {
          ...country,
          'colours': {
            'regimeType': colorScalesRegimeType[country.scores.regimeType](country.scores.rank).css(),
            ...colours
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
            'label': population + ' People'
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
      // Creates an object of arrays with true or false wether each country is highlighter for each group.
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
