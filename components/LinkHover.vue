<template>
  <span v-on:mouseover="makeActiveCountry([path, value])" v-on:mouseleave="makeActiveCountry(false)" :class="classNames">{{ label }}</span>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    props: ['path', 'value', 'label'],
    computed: {
      classNames () {
        const { value } = this
        let cls = 'link-hover'
        if (value === 'Full democracy') {
          cls += ' full-democracy'
        } else if (value === 'Flawed democracy') {
          cls += ' flawed-democracy'
        } else if (value === 'Hybrid regime') {
          cls += ' hybrid-regime'
        } else if (value === 'Authoritarian') {
          cls += ' authoritarian'
        }
        console.log(this.value)
        return cls
      }
    },
    methods: {
      ...mapActions([
        'makeActiveCountry'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .link-hover {
    border-bottom: 1px dashed #EC3A4D;

    &:hover, &:focus {
      border-bottom-style: solid;
      color: #EC3A4D;
    }

    &.full-democracy {
      font-weight: bold;
      color: darken(#c2d22f, 10%);
      border-color: #c2d22f;
    }

    &.flawed-democracy {
      font-weight: bold;
      color: #329967;
      border-color: #7dbb45;
    }

    &.hybrid-regime {
      font-weight: bold;
      color: #117575;
      border-color: #117575;
    }

    &.authoritarian {
      font-weight: bold;
      color: #a51916;
      border-color: #a51916;
    }
  }
</style>