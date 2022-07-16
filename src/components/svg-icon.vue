<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
