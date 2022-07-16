<template>
  <div class="login-container">
    <el-card class="login">
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <template #prefix>&nbsp; <SvgIcon name="people" /> </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password">
            <template #prefix>&nbsp; <SvgIcon name="lock" /> </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
        <el-col :span="10">
          <el-button size="small" type="primary" @click="onConfirm"
            >确认</el-button
          >
          <el-button size="small" type="info">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    const validateFn = (rule, val, callback) => {
      val.length > 3 && val.length < 8 ? callback() : callback(new Error('长度为3~8位'))
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' },
          { validator: validateFn, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' },
          { validator: validateFn, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onConfirm () {
      try {
        await this.$refs.loginForm.validate()
        await this.$store.dispatch('user/login', this.loginForm)
        this.$router.push('/')
      } catch (err) {
        this.$message.error('表单数据校验失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="scss">
.login-container {
  height: 100vh;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  .login {
    width: 350px;
    height: 200px;
    :deep(.el-input--prefix .el-input__inner) {
      padding-left: 40px;
    }
  }
}
</style>
