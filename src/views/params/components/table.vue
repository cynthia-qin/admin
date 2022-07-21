<template>
  <div>
    <el-button
      @click="showDialog = true"
      type="primary"
      :disabled="list.length === 0"
      >{{ activeName === "first" ? "添加参数" : "添加属性" }}</el-button
    >
    <el-table :data="list" border>
      <el-table-column width="50px" type="expand">
        <template v-slot="{ row }">
          <el-row style="margin-left: 50px">
            <el-tag
              :key="index"
              v-for="(tag, index) in row.attr_vals.trim().split(' ')"
              v-show="row.attr_vals !== ''"
              closable
              :disable-transitions="false"
              style="margin-right: 10px"
              @close="delTag(row, index)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-focus
              style="width: unset"
              v-if="inputVisible"
              v-model="inputValue"
              size="small"
              @blur="addTag"
              @keyup.enter="addTag"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput(row)"
              >+ New Tag</el-button
            >
          </el-row>
        </template>
      </el-table-column>
      <el-table-column width="50px" label="#" type="index"></el-table-column>
      <el-table-column label="分类名称" prop="attr_name"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="edit(row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="del(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加参数 -->
    <el-dialog
      :visible.sync="showDialog"
      :title="'添加' + title"
      @close="onCancel"
    >
      <el-form ref="myForm" label-width="80px" :model="form" :rules="rules">
        <el-form-item :label="title" prop="attr_name">
          <el-input v-model="form.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onConfirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { addCategories, delCategories, editCategories, getCategoriesById } from '@/api/categories'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    activeName: {
      type: String,
      required: true
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  created () { },
  data () {
    return {
      inputValue: '',
      inputVisible: false,
      showDialog: false,
      form: {
        attr_name: '',
        attr_sel: 'many'
      },
      rules: {
        attr_name: [{
          required: true, message: '参数名不能为空', trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    onCancel () {
      this.form = {
        attr_name: ''
      }
      this.$refs.myForm.resetFields()
      this.showDialog = false
    },
    async onConfirm () {
      try {
        await this.$refs.myForm.validate()
        if (this.activeName === 'first') {
          console.log(this.form)
          if (this.form.attr_id) {
            // 编辑
            await editCategories({ ...this.form, id: this.id, attrId: this.form.attr_id - 0 })
            this.$message.success('修改成功')
          } else {
            // 新增
            await addCategories({
              id: this.id,
              ...this.form
            })
            this.$message.success('创建成功')
          }
        } else {
          this.form.attr_sel = 'only'
          if (this.form.attr_id) {
            // 编辑
            await editCategories({ ...this.form, id: this.id, attrId: this.form.attr_id - 0 })
            this.$message.success('修改成功')
          } else {
            // 新增
            await addCategories({
              id: this.id,
              ...this.form
            })
            this.$message.success('创建成功')
          }
        }
        this.showDialog = false
        this.$emit('getCategories')
      } catch (err) {
        // console.log(err[0].message)
        this.$message.error('表单数据校验失败')
      }
    },
    async del (row) {
      await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await delCategories(this.id, row.attr_id)
      this.$message.success('删除成功')
      this.$emit('getCategories')
    },
    showInput (row) {
      this.inputVisible = true
      // console.log(this.$refs.myInput)
      // this.$refs.myInput.focus()
      // console.log(row)
      this.form = row
      // const addTag = row
    },
    async addTag () {
      this.inputVisible = false
      if (this.inputValue === '') return
      // console.log(this.inputValue)
      const arr = this.form.attr_vals.split(' ')
      arr.push(this.inputValue)
      this.form.attr_vals = arr.join(' ')
      // console.log(this.form)
      await editCategories({ ...this.form, id: this.id, attrId: this.form.attr_id - 0 })
      this.$message.success('创建成功')
      this.inputValue = ''
    },
    async delTag (row, index) {
      // console.log(row, index)
      this.form = row
      const arr = row.attr_vals.split(' ')
      arr.splice(index, 1)
      // console.log(arr)
      this.form.attr_vals = arr.join(' ')
      await editCategories({ ...this.form, id: this.id, attrId: this.form.attr_id - 0 })
      this.$message.success('删除成功')
    },
    async edit (row) {
      // console.log(row)
      // this.form = row
      this.form = await getCategoriesById({ id: this.id, attrId: row.attr_id - 0, attr_sel: row.attr_sel })
      this.showDialog = true
    }
  },
  computed: {
    title () {
      return this.activeName === 'first' ? '动态参数' : '静态属性'
    }
  },
  watch: {},
  filters: {},
  components: {},
  directives: {
    focus: {
      inserted (el) {
        // console.log(el.children[0])
        el.children[0].focus()
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.el-table {
  margin-top: 20px;
}
</style>
