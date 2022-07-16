<template>
  <div class="side-container">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-button
      type="danger"
      @click="isCollapse = !isCollapse"
      :style="{ width: isCollapse ? '' : '100%' }"
      >| | |</el-button
    >
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :collapse-transition="false"
      background-color="#373d41"
      text-color="#fff"
      unique-opened
      :default-active="activePath"
      router
    >
      <el-submenu v-for="menu in List" :key="menu.id" :index="menu.order + ''">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ menu.authName }}</span>
        </template>
        <el-menu-item
          v-for="(item, index) in menu.children"
          :key="index"
          :index="'/' + menu.path"
          @click="saveActivePath('/' + menu.path)"
        >
          <SvgIcon name="component" style="margin-right: 5px" />
          <span>{{ item.authName }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { getMenus } from '@/api/home'
export default {
  props: {
    // list: {
    //   type: Array,
    //   required: true
    // }
  },
  created () {
    this.getMenus()
    this.activePath = JSON.parse(window.localStorage.getItem('activePath'))
  },
  data () {
    return {
      isCollapse: true,
      List: [],
      activePath: ''
    }
  },
  methods: {
    async getMenus () {
      this.List = await getMenus()
    },
    saveActivePath (activePath) {
      window.localStorage.setItem('activePath', JSON.stringify(activePath))
      this.activePath = activePath
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="scss">
.side-container {
  height: 100vh;
}
.el-menu {
  height: 100vh;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  // min-height: 400px;
}
</style>
