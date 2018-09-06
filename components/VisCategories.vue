<template>
  <g>
    <g
      v-for="(line, n) in categoryPlacement"
      class="categoryPlacements">
      <text
        class="category"
        :x="line.center"
        text-anchor="middle"
        :y="line.ys[1]">
        {{ line.label }}
      </text>
      <line
        class="categories"
        :x1="line.xs[0]"
        :x2="line.xs[1]"
        :y1="line.ys[0]"
        :y2="line.ys[0]" />
    </g>
  </g>
</template>

<script>
  export default {
    props: ['categoryPlacement']
  }
</script>

<style lang="scss">

</style>
