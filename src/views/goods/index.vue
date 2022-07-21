<template>
  <div>
    <el-card>
      <el-row type="flex" align="middle" style="margin-bottom: 10px">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="page.query">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="10" style="margin-left: 20px">
          <el-button
            type="primary"
            size="small"
            @click="$router.push({ name: 'addGoods' })"
            >添加商品</el-button
          >
        </el-col>
      </el-row>
      <el-scrollbar>
        <el-table :data="goods" border>
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column
            label="商品名称"
            prop="goods_name"
            width="600"
          ></el-table-column>
          <el-table-column label="商品价格" prop="goods_price">
          </el-table-column>
          <el-table-column
            label="商品质量"
            prop="goods_weight"
          ></el-table-column>
          <el-table-column label="创建时间" prop="add_time">
            <template v-slot="{ row }"
              >{{ row.add_time | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
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
      </el-scrollbar>
      <el-pagination
        @size-change="sizeChange"
        @current-change="changeCurrentPage"
        style="margin-top: 20px"
        :current-page="page.pagenum"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="page.pagesize"
        layout="total,sizes,prev,pager,next,jumper"
        :total="page.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getGoodsList, delGoodsById } from '@/api/goods'
export default {
  created () {
    this.getGoodsList()
  },
  data () {
    return {
      page: {
        query: '',
        pagenum: 1,
        pagesize: 10,
        total: 0
      },
      goods: []
    }
  },
  methods: {
    async getGoodsList () {
      const res = await getGoodsList(this.page)
      this.goods = res.goods
      this.page.total = res.total
    },
    sizeChange (val) {
      this.page.pagesize = val
      this.getGoodsList()
    },
    changeCurrentPage (val) {
      this.page.pagenum = val
      this.getGoodsList()
    },
    edit (row) {
      console.log(row)
    },
    async del (row) {
      console.log(row)
      await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await delGoodsById(row.goods_id)
      this.$message.success('删除成功')
      this.getGoodsList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
</style>
