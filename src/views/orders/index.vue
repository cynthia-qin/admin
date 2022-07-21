<template>
  <div>
    <el-card>
      <el-row type="flex" align="middle" style="margin-bottom: 10px">
        <el-col :span="10">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="orders" border>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="order_pay">
          <template v-slot="{ row }">
            <el-button v-if="row.order_pay === '0'" size="mini" type="danger"
              >未支付</el-button
            >
            <el-button v-else size="mini" type="success">已支付</el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template v-slot="{ row }"
            >{{ row.create_time | formatDate }}
          </template></el-table-column
        >
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editOrder(row.order_id)"
              >修改订单详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="total,sizes,prev,pager,next,jumper"
        :current-page="paramsObj.pagenum"
        :page-size="paramsObj.pagesize"
        :page-sizes="[1, 5, 10, 15, 20]"
        :total="total"
      ></el-pagination>
      <!-- 修改订单详情 -->
      <el-dialog :visible.sync="showDialog" title="修改订单详情">
        <el-form label-width="120px">
          <el-form-item label="订单价格">
            <el-input v-model="orderForm.order_price"></el-input>
          </el-form-item>
          <el-form-item label="订单支付状态">
            <el-input v-model="orderForm.pay_status"></el-input>
          </el-form-item>
          <el-form-item label="订单是否发货">
            <el-input v-model="orderForm.is_send">{{ 123 }}</el-input>
          </el-form-item>
          <el-form-item label="订单数量">
            <el-input v-model="orderForm.order_number"></el-input>
          </el-form-item>
          <el-form-item label="修改地址">
            <el-cascader :options="cityOptions"></el-cascader>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary">确认</el-button>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getOrders, getOrderStatusById } from '@/api/orders'
import cityOptions from '@/js/city_data2017_element'
export default {
  created () {
    this.getOrders()
  },
  data () {
    return {
      paramsObj: {
        query: '', // 查询参数
        pagenum: 1, // 当前页码
        pagesize: 10 // 每页显示条数
      },
      total: 0,
      orders: [], // 所有的订单列表
      orderForm: {
        is_send: '', // 订单是否发货
        pay_status: '', // 订单支付状态
        order_number: '', // 订单数量
        order_price: '' // 订单价格
      },
      showDialog: false,
      cityOptions: cityOptions
    }
  },
  methods: {
    async getOrders () {
      const { total, goods } = await getOrders(this.paramsObj)
      // console.log(res)
      this.total = total
      this.orders = goods
    },
    async editOrder (id) {
      this.orderForm = await getOrderStatusById(id)
      this.showDialog = true
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
