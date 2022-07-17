<template>
  <div>
    <el-card>
      <el-button
        type="primary"
        @click="addRoleDialog = true"
        style="margin-bottom: 20px"
        >添加角色</el-button
      >
      <el-table :data="roleList" border @expand-change="expandColumn">
        <el-table-column label="#" type="expand" align="center">
          <template slot-scope="props">
            <el-table
              :data="props.row.children"
              :show-header="false"
              style="margin: 0 50px"
              v-if="props.row.children.length > 0"
            >
              <el-table-column prop="authName" width="500px">
                <template v-slot="{ row }">
                  <el-tag>{{ row.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="props">
                  <el-row
                    v-for="item in props.row.children"
                    :key="item.id"
                    type="flex"
                    align="middle"
                    style="height: 60px"
                  >
                    <el-tag type="success">{{ item.authName }}</el-tag>
                    <i
                      class="el-icon-caret-right"
                      style="margin-right: 100px"
                    ></i>
                    <!-- <el-col></el-col> -->
                    <el-tag
                      v-for="item1 in item.children"
                      :key="item1.id"
                      closable
                      style="margin-right: 20px"
                      ref="permTag"
                      @close="delRolePerm(item.children, item1)"
                    >
                      {{ item1.authName }}
                    </el-tag>
                  </el-row>
                  <!-- <el-divider></el-divider> -->
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-row>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="editRole(row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="delRole(row)"
                >删除</el-button
              >
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-setting"
                @click="assignRoles(row)"
                >分配权限</el-button
              >
            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限 -->
    <el-dialog :visible="showPermDialog" title="分配权限" @close="btnCancel">
      <el-tree
        ref="permTree"
        :data="permList"
        :props="{ label: 'authName' }"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="select"
      ></el-tree>
      <template #footer>
        <el-button @click="btnCancel">取消</el-button>
        <el-button type="primary" @click="btnConfirm">确认</el-button>
      </template>
    </el-dialog>
    <!-- 添加角色 -->
    <el-dialog :visible="addRoleDialog" title="添加角色" @close="onCancel">
      <el-form
        ref="addForm"
        label-width="100px"
        :model="addRoleForm"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input type="textarea" v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <el-row type="flex" justify="end">
        <el-col :span="8">
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onConfirm">确认</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, getPermList, addRoles, assignRoles, getRoleById, editRole, delRole, delRolePerm } from '@/api/role'
export default {
  created () {
    this.getRoles()
  },
  data () {
    return {
      roleList: [],
      showPermDialog: false,
      permList: [],
      select: [],
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      },
      addRoleDialog: false,
      roleId: ''
    }
  },
  methods: {
    async getRoles () {
      this.roleList = await getRoles()
    },
    async assignRoles (data) {
      this.roleId = data.id
      this.select = this.getSelect(data.children)
      // this.checked = this.getSelect(data.children)
      this.showPermDialog = true
      this.permList = await getPermList('tree')
    },
    getSelect (array) {
      const list = []
      array.forEach(item => {
        if (item.children.length > 0) {
          item.children.forEach(item1 => {
            if (item1.children.length > 0) {
              item1.children.forEach(obj => {
                list.push(obj.id)
              })
            }
            // else {
            //   list.push(item1.id)
            // }
          })
        }
      })
      return list
    },
    // 分配角色权限
    btnCancel () {
      this.showPermDialog = false
    },
    async btnConfirm () {
      // console.log(this.$refs.permTree.getCheckedKeys())
      // console.log(this.$refs.permTree.getHalfCheckedKeys())
      // 当前选中的子节点和半选的父节点
      const checked = [...this.$refs.permTree.getCheckedKeys(), ...this.$refs.permTree.getHalfCheckedKeys()].join(',')
      // console.log(checked)
      await assignRoles({
        roleId: this.roleId,
        rids: checked || ''
      })
      this.$message.success('分配权限成功')
      this.showPermDialog = false
      this.getRoles()
    },
    // 新增角色
    async onConfirm () {
      try {
        await this.$refs.addForm.validate()
        // console.log(this.addRoleForm)
        if (this.addRoleForm.roleId) {
          // 编辑
          await editRole(this.addRoleForm)
          // 弹出提示消息
          this.$message.success('修改角色成功')
        } else {
          // 新增
          await addRoles(this.addRoleForm)
          // 弹出提示消息
          this.$message.success('新增角色成功')
        }
        // 重新拉取角色列表
        this.getRoles()
        // 关闭弹窗
        this.addRoleDialog = false
      } catch (err) {
        console.log(err)
      }
    },
    onCancel () {
      this.addRoleForm = {
        roleName: '',
        roleDesc: ''
      }
      this.$refs.addForm.resetFields()
      this.addRoleDialog = false
    },
    // 编辑角色
    async editRole (data) {
      this.addRoleForm = await getRoleById(data.id)
      this.addRoleDialog = true
    },
    // 删除角色
    async delRole (data) {
      try {
        await this.$confirm('确定永久删除该角色吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delRole(data.id)
        this.$message.success('删除角色成功')
        // 重新拉取角色列表
        this.getRoles()
      } catch (err) {
        console.log(err)
      }
    },
    async delRolePerm (data, item) {
      try {
        await this.$confirm('此操作将永久删除该用户的权限,是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delRolePerm({ roleId: this.roleId, rightId: item.id })
        this.$message.success('删除成功')
        data.splice(data.indexOf(item), 1)
      } catch (err) {
        console.log(err)
      }
    },
    expandColumn (data) {
      this.roleId = data.id
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
