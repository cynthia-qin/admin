<template>
  <div>
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
        style="margin-bottom: 10px"
      >
      </el-alert>
      <span>选择商品分类：</span>
      <el-cascader
        clearable
        :options="list"
        v-model="chooseValue"
        :props="{ value: 'cat_id', label: 'cat_name', expandTrigger: 'hover' }"
        @change="changeChoose"
      ></el-cascader>
      <el-tabs
        v-model="activeName"
        style="margin-top: 10px"
        @tab-click="clickTabPane"
      >
        <el-tab-pane label="动态参数" name="first">
          <tableVue
            :list="asyncCategories"
            :activeName="activeName"
            :id="id"
            @getCategories="getAsyncCategories"
          />
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <tableVue
            :list="staticCategories"
            :activeName="activeName"
            :id="id"
            @getCategories="getStaticCategories"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import tableVue from './components/table.vue'
import { getAllCategories, getGoodsAttr } from '@/api/categories'
export default {
  created () {
    this.getAllCategories()
  },
  data () {
    return {
      list: [], // 所有的商品分类
      activeName: 'first',
      chooseValue: [],
      asyncCategories: [], // 动态参数
      staticCategories: [],
      id: '' // 当前选择的第三级分类Id
    }
  },
  methods: {
    async getAllCategories () {
      this.list = await getAllCategories()
    },
    async getAsyncCategories () {
      // 动态参数
      this.asyncCategories = await getGoodsAttr(this.id, 'many')
    },
    async getStaticCategories () {
      // 静态属性
      this.staticCategories = await getGoodsAttr(this.id, 'only')
    },
    async clickTabPane (tab) {
      // console.log(tab.name)
      this.activeName = tab.name
      console.log(this.chooseValue)
      if (this.chooseValue.length === 0) {
        return this.$message.error('请选择三级分类')
      } else {
        if (this.activeName === 'first') {
          // 动态参数
          this.getAsyncCategories()
        } else {
          this.getStaticCategories()
        }
      }
    },
    async changeChoose (val) {
      console.log(val)
      if (val.length !== 3) {
        this.chooseValue = []
        this.$message.error('请选择三级分类')
      } else {
        this.id = val[2] - 0
        if (this.activeName === 'first') {
          // 动态参数
          this.asyncCategories = await getGoodsAttr(this.id, 'many')
        } else {
          // 静态属性
          this.staticCategories = await getGoodsAttr(this.id, 'only')
        }
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    tableVue
  }
}
</script>

<style scoped lang='scss'>
</style>
