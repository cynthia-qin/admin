<template>
  <div>
    <el-card>
      <el-row type="flex" align="middle">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="query">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchUser"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="10" style="margin-left: 20px">
          <el-button type="primary" size="small" @click="showDialog = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="users" border>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template v-slot="{ row }">
            <el-switch v-model="row.mg_state" @change="editState(row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-row>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="getUserById(row.id)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="delUser(row.id)"
              ></el-button>
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-setting"
                @click="assignRoles(row)"
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="changePageSize"
        @current-change="changePagenum"
        :current-page="page.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="page.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加/编辑用户 -->
    <el-dialog :visible="showDialog" :title="title" @close="btnCancel">
      <el-form
        ref="userForm"
        label-width="120px"
        :model="userForm"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="userForm.username"
            :disabled="title === '编辑用户'"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="title === '添加用户'" label="密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
        <el-col :span="8">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnConfirm"
            >确认</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog
      :visible="showAssignRoleDialog"
      title="分配角色"
      @close="onCancel"
    >
      <el-form label-width="120px">
        <el-form-item label="当前的用户">
          <el-input disabled v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="当前的角色">
          <el-input disabled v-model="userForm.role_name"></el-input>
        </el-form-item>
        <el-form-item label="分配新角色">
          <el-select v-model="chooseRoles">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
        <el-col :span="8">
          <el-button size="small" @click="onCancel">取消</el-button>
          <el-button size="small" type="primary" @click="onConfirm"
            >确认</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getUsers, editState, delUser, addUser, getUserById, editUserById, assignRoleById } from '@/api/user'
import { getRoles } from '@/api/role'
export default {
  created () {
    this.getUsers()
  },
  data () {
    return {
      query: '',
      page: {
        query: '',
        pagenum: 1,
        pagesize: 10,
        total: 0
      },
      users: [],
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在2~7个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在2~7个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: '邮箱格式错误', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号格式不正确', trigger: 'blur' }
        ]
      },
      showDialog: false,
      showAssignRoleDialog: false,
      roles: [],
      chooseRoles: ''
    }
  },
  methods: {
    async getUsers () {
      const { pagenum, total, users } = await getUsers(this.page)
      this.page.pagenum = pagenum
      this.page.total = total
      this.users = users
    },
    changePageSize (val) {
      this.page.pagesize = val
      this.getUsers()
    },
    changePagenum (val) {
      this.page.pagenum = val
      this.getUsers()
    },
    async editState (data) {
      await editState({
        uId: data.id,
        type: data.mg_state
      })
      this.$message.success('修改状态成功')
    },
    async delUser (id) {
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delUser(id)
        this.$message.success('删除用户成功')
        this.getUsers()
      } catch (err) {
        this.$message('已取消删除')
      }
    },
    btnCancel () {
      this.userForm = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      this.$refs.userForm.resetFields()
      this.showDialog = false
    },
    btnConfirm () {
      this.$refs.userForm.validate(async isOk => {
        if (isOk) {
          if (this.userForm.id) {
            await editUserById(this.userForm)
            this.$message.success('修改信息成功')
          } else {
            await addUser(this.userForm)
            this.$message.success('添加用户成功')
          }
          this.getUsers()
          this.showDialog = false
        } else {
          this.$message.error('添加用户数据校验失败')
        }
      })
    },
    async getUserById (id) {
      this.userForm = await getUserById(id)
      this.showDialog = true
    },
    searchUser () {
      this.page.query = this.query
      this.getUsers()
    },
    async assignRoles (data) {
      this.roles = await getRoles()
      this.userForm = data
      this.showAssignRoleDialog = true
    },
    onCancel () {
      this.userForm = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
      this.chooseRoles = ''
      this.showAssignRoleDialog = false
    },
    async onConfirm () {
      if (this.chooseRoles === '') {
        this.$message.error('请选择一个新的角色')
      } else {
        // 给当前用户分配角色
        await assignRoleById({
          id: this.userForm.id,
          rid: this.chooseRoles
        })
        this.$message.success('分配角色成功')
      }
    }
  },
  computed: {
    title () {
      return this.userForm.id ? '编辑用户' : '添加用户'
    }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
</style>
