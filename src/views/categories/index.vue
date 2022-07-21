<template>
  <div>
    <el-card>
      <el-button type="primary" style="margin-bottom: 10px" @click="showDialog"
        >添加分类</el-button
      >
      <el-table
        border
        :data="list"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        row-key="cat_id"
      >
        <el-table-column label="#" type="index">
          <template v-slot="{ row }">
            <span>{{ row.index }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类名称" prop="cat_name"></el-table-column>
        <el-table-column label="是否有效" prop="cat_deleted">
          <template v-slot="{ row }">
            <i v-show="!row.cat_deleted" class="el-icon-check state"></i>
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="cat_level">
          <template v-slot="{ row }">
            <el-tag v-if="row.cat_level === 0">一级</el-tag>
            <el-tag v-if="row.cat_level === 1" type="success">二级</el-tag>
            <el-tag v-if="row.cat_level === 2" type="warning">三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="del(row.cat_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pagenum"
        :page-size="page.pagesize"
        :total="page.total"
        :page-sizes="[1, 2, 4, 6, 10]"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </el-card>
    <!-- 添加分类 -->
    <el-dialog :visible="showAddDialog" title="添加商品分类" @close="onCancel">
      <el-form ref="form" label-width="120px" :model="form" :rules="rules">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="form.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            v-model="chooseValue"
            :options="chooseCategories"
            :props="{
              value: 'cat_id',
              label: 'cat_name',
              expandTrigger: 'hover',
              checkStrictly: true,
            }"
            @change="handleChange"
          ></el-cascader>
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
import { getAllCategories, addCategory, delCategory } from '@/api/categories'
export default {
  created () {
    this.getAllCategories()
  },
  data () {
    return {
      page: {
        pagenum: 1,
        pagesize: 10,
        total: 0
      },
      list: [],
      indexList: [],
      form: {
        cat_name: '', // 分类名称
        cat_pid: 0, // 分类父ID
        cat_level: 0 // 分类层级
      },
      rules: {
        cat_name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在2-8个字符之间', trigger: 'blur' }
        ]
      },
      showAddDialog: false, // 添加商品分类弹窗
      chooseCategories: [],
      chooseValue: [] // 级联选择器选中的节点
    }
  },
  methods: {
    async getAllCategories () {
      const res = await getAllCategories(this.page)
      this.list = res.result
      this.page.total = res.total
      this.getTableIndex()
    },
    handleSizeChange (val) {
      this.page.pagesize = val
      this.getAllCategories()
    },
    handleCurrentChange (val) {
      this.page.pagenum = val
      this.getAllCategories()
    },
    getTableIndex () {
      let index = 0
      for (const val of this.list) {
        index += 1
        val.index = index
      }
      // console.log(this.list)
    },
    async showDialog () {
      this.showAddDialog = true
      this.chooseCategories = await getAllCategories({ type: 2 })
    },
    onCancel () {
      this.form = {
        cat_name: '', // 分类名称
        cat_pid: 0, // 分类父ID
        cat_level: 0 // 分类层级
      }
      this.$refs.form.resetFields()
      this.showAddDialog = false
      this.chooseValue = []
    },
    handleChange (val) {
      console.log(val)
      this.form.cat_pid = val[val.length - 1]
      this.form.cat_level = val.length
    },
    async onConfirm () {
      await this.$refs.form.validate()
      await addCategory(this.form)
      this.showAddDialog = false
      this.$message.success('添加商品分类成功')
      this.getAllCategories()
    },
    async del (id) {
      await this.$confirm('确认删除该商品分类嘛？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await delCategory(id)
      this.$message.success('删除成功')
      this.getAllCategories()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
.state {
  color: #fff;
  text-align: center;
  background-color: green;
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
</style>
