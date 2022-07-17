<template>
  <el-breadcrumb
    separator-class="el-icon-arrow-right"
    v-if="$route.path !== '/'"
  >
    <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item, index) in pathList" :key="index">{{
      item
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  created () {
    // console.log(this.$route)
    this.$route.matched.forEach(item => this.pathList.push(item.meta.title))
  },
  data () {
    return {
      pathList: []
    }
  },
  methods: {},
  computed: {
    // $route () {
    //   return this.$route.matched
    // }
  },
  watch: {
    $route (newVal) {
      this.pathList = []
      newVal.matched.forEach(item => this.pathList.push(item.meta.title))
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
