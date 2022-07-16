<template>
  <el-container class="container">
    <el-header class="headers">
      <NavBar />
    </el-header>
    <el-container>
      <el-aside width="null">
        <sideBar />
      </el-aside>
      <el-main class="main">
        <Breadcrumb v-if="currentPath !== '/'" />
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavBar from './components/NavBar.vue'
import sideBar from './components/side-bar.vue'
import Breadcrumb from './components/Breadcrumb.vue'
export default {
  created () {
    this.currentPath = this.$router.currentRoute.fullPath
  },
  data () {
    return {
      currentPath: ''
    }
  },
  methods: {

  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    sideBar,
    NavBar,
    Breadcrumb
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
}
.headers {
  height: 60px;
  background-color: #373d41;
}
.el-aside {
  overflow: hidden;
}
.main {
  background-color: #eaedf1;
}
</style>
