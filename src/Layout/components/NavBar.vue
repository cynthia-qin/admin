<template>
  <el-row type="flex" justify="between" align="middle">
    <el-col :span="24">
      <el-col :span="24" class="title">
        <img
          src="http://liufusong.top/hm-admin/img/heima.b5a855ee.png"
          alt=""
        />
        <span>鑫鑫产业有限公司</span>
      </el-col>
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-button @click="logout">退出</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
.title {
  line-height: 20px;
  color: #fff;
  font-size: 20px;
  img {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
}
</style>
