<template>
  <div class="box">
    <h1>{{ title }}</h1>
    <svg><rect x="0" y="0" width="100%" height="100%" v-bind:style="'transform:scaleX(' + 1 / total * amount + ')'" /></svg>
    <ul>
      <li
        v-for="(item, index) in data"
        v-on:mouseover="action({ 'item' : item, 'title': title, 'index': index })"
        v-bind:class="{ active: checkActive(active, index), btn: true }">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    props: ['data', 'title', 'active', 'action'],
    computed: {
      total: function (state) {
        // console.log(this.$props.title, this.$props.data)
        return this.$props.data.length
        // console.log(_.countBy(active))
      },
      amount: function (state) {
        // console.log(this.$props.title, this.$props.active)
        // console.log(_.filter(this.$props.active, n => n).length)
        return _.filter(this.$props.active, n => n).length
        // console.log(_.countBy(active))
      }
    },
    methods: {
      checkActive (arr, index) {
        if (_.isUndefined(arr)) return false
        return arr[index]
      }
    }
  }
</script>

<style>
  
</style>
