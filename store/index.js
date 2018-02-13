import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import * as data from '../data/data.json'
// import * as d3 from 'd3-geo'
import chroma from 'chroma-js'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    data: data,
    activeStatus: 'default',
    activeColour: 'default'
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
    domains (state) {
      let rankScores = _.map(state.data, 'scores.rank')
      let hdiScores = _.map(state.data, 'scores.hdi')
      let democracyScore = _.map(state.data, 'scores.democracy')

      let retVal = {
        'rank': [_.min(rankScores), _.max(rankScores)],
        'hdi': [_.min(hdiScores), _.max(hdiScores)],
        'democracy': [_.min(democracyScore), _.max(democracyScore)]
      }

      return retVal
    },
    countries (state, getters) {
      let numberCountries = state.data.length
      let colorScaleRank = chroma.scale(['green', 'red']).mode('lab').domain(getters.domains.rank)
      let colorScaleHDI = chroma.scale(['green', 'red']).mode('lab').domain(getters.domains.hdi)
      let colorScaleDemocracy = chroma.scale(['green', 'red']).mode('lab').domain(getters.domains.democracy)

      return _.map(state.data, (country, index) => {
        let retVal = {
          ...country,
          'colours': {
            'default': colorScaleRank(country.scores.rank).css(),
            'rank': colorScaleRank(country.scores.rank).css(),
            'hdi': colorScaleHDI(country.scores.hdi).css(),
            'democracy': colorScaleDemocracy(country.scores.democracy).css()
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
    },
    organisations (state) {
      return _.keys(_.first(state.data)['organisations'])
    },
    status (state, getters) {
      let retVal = {}
      retVal[state.activeStatus] = _.fill(Array(state.data.length), false)
      _.each(getters.organisations, organisation => {
        retVal[organisation] = _.map(state.data, country => {
          return country['organisations'][organisation]
        })
      })
      return retVal
    },
    shapes (state) {

    }
    // activeModel (state, getters) {
    //   return _.fill(Array(getters.models.length), false)
    // },
    // types (state) {
    //   return _.uniq(_.flatten(_.map(state.data, 'types')))
    // },
    // activeType (state, getters) {
    //   return _.fill(Array(getters.types.length), false)
    // },
    // propertyKeys (state) {
    //   return _.uniq(_.flatten(_.map(state.data, datum => {
    //     return _.keys(datum['properties'])
    //   })))
    // },
    // activeProperty (state, getters) {
    //   return _.fromPairs(_.map(getters.propertyKeys, key => {
    //     return [key, false]
    //   }))
    // },
    // properties (state, getters) {
    //   return _.fromPairs(_.map(getters.propertyKeys, key => {
    //     let retVal = _.uniq(_.flatten(_.map(state.data, datum => {
    //       return datum['properties'][key]
    //     })))
    //     return [key, retVal]
    //   }))
    // },
    // modelsAccess (state, getters) {
    //   return _.fromPairs(_.map(getters.models, model => {
    //     let retVal = {
    //       'types': _.map(getters.types, type => {
    //         return _.indexOf(model['types'], type) >= 0
    //       }),
    //       'properties': _.fromPairs(_.map(getters.propertyKeys, propertyKey => {
    //         let retVal

    //         if (_.has(model['properties'], propertyKey)) {
    //           retVal = _.map(getters.properties[propertyKey], value => {
    //             return _.indexOf(model['properties'][propertyKey], value) >= 0
    //           })
    //         } else {
    //           retVal = _.fill(Array(getters.properties[propertyKey].length), false)
    //         }

    //         return [propertyKey, retVal]
    //       }))
    //     }
    //     return [model.id, retVal]
    //   }))
    // },
    // typesAccess (state, getters) {
    //   return _.fromPairs(_.map(getters.types, type => {
    //     let retVal = {
    //       'models': _.map(getters.models, model => {
    //         return _.indexOf(model['types'], type) >= 0
    //       }),
    //       'properties': _.fromPairs(_.map(getters.propertyKeys, propertyKey => {
    //         let retVal = _.fill(Array(getters.properties[propertyKey].length), false)
    //         return [propertyKey, retVal]
    //       }))
    //     }
    //     return [type, retVal]
    //   }))
    // },
    // propertiesAccess (state, getters) {
    //   return _.fromPairs(_.map(getters.properties, (property, key) => {
    //     let pairs = _.map(property, datum => {
    //       let retWal = {
    //         'models': _.map(getters.models, model => {
    //           return _.indexOf(model['properties'][key], datum) >= 0
    //         }),
    //         'types': _.fill(Array(getters.types.length), false)
    //       }
    //       return [datum, retWal]
    //     })
    //     return [key, _.fromPairs(pairs)]
    //   }))
    // }
    // activeTodos (state) {
    //   return state.todos.filter(todo => !todo.completed)
    // },
    // completedTodos (state) {
    //   return state.todos.filter(todo => todo.completed)
    // }
  },
  mutations: {
    MAKE_ACTIVE_STATUS (state, key) {
      // console.log('SET_ACTIVE_MODEL')
      state.activeStatus = key
    },
    MAKE_ACTIVE_COLOUR (state, key) {
      // console.log('SET_ACTIVE_MODEL')
      state.activeColour = key
    },
    ADD_ITEM (state, itemID) {
      // console.log('SET_ACTIVE_MODEL')
      state.comparedItems.push(itemID)
    },
    REMOVE_ITEM (state, index) {
      // console.log('SET_ACTIVE_TYPE')
      let arr = state.comparedItems
      arr.splice(index, 1)
      state.comparedItems = arr
    }
  },
  actions: {
    makeActiveStatus ({ commit }, key) {
      commit('MAKE_ACTIVE_STATUS', key)
    },
    makeActiveColour ({ commit }, key) {
      commit('MAKE_ACTIVE_COLOUR', key)
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
