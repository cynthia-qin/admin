<template>
  <el-card style="height: 100vh"
    >数据统计
    <div id="main" style="height: 100vh"></div>
  </el-card>
</template>

<script>
import { getReportOptions } from '@/api/report'
import * as echarts from 'echarts/core'
import { GridComponent, LegendComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, LegendComponent])

export default {
  created () {

  },
  mounted () {
    this.getReportOptions()
  },
  data () {
    return {
      options: {}
    }
  },
  methods: {
    async getReportOptions () {
      this.options = await getReportOptions()
      const chartDom = document.getElementById('main')
      console.log(chartDom)
      const myChart = echarts.init(chartDom)
      this.options.xAxis[0].boundaryGap = false
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '6%',
          containLabel: true
        },
        ...this.options
      }

      console.log(option)
      option && myChart.setOption(option)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='scss'>
// #main {
//   background-color: #6a7985;
// }
</style>
