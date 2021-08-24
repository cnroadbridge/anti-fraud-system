<template>
  <div>
    <common-container title="统计分析">
      <template slot="content">
        <el-row class="filter-panel">
          <el-col :span="20">
            <el-form
              ref="params"
              :model="params"
              label-suffix=":"
              label-width="130px"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="案发时间" prop="crimeTime">
                    <el-date-picker
                      v-model="params.crimeTime"
                      format="yyyy-MM"
                      value-format="yyyy-MM"
                      type="monthrange"
                      range-separator="至"
                      start-placeholder="开始月份"
                      end-placeholder="结束月份"
                      :picker-options="pickerOptions"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="4" class="text-center">
            <el-button type="primary" @click="query">
              查询
            </el-button>
            <el-button @click="reset">
              重置
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div ref="pieChart" class="chart" />
          </el-col>
          <el-col :span="12">
            <div ref="barChart" class="chart" />
          </el-col>
        </el-row>
      </template>
    </common-container>
  </div>
</template>

<script>
import echarts from 'echarts'

import CommonContainer from '@/views/common/container'

import { calculate } from '@/api/statistics'
import { getCurrentMonthRange } from '@/utils/tools'

export default {
  name: 'AnalysisStatistical',
  components: {
    CommonContainer
  },
  data() {
    return {
      params: {
        crimeTime: []
      },
      pieData: [],
      barData: [],
      totalAmount: 0,
      barChart: null,
      pieChart: null,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  computed: {},
  watch: {
    pieData: {
      handler(newPieData) {
        if (newPieData) {
          this.drawPie(newPieData)
        }
      },
      deep: true
    },
    barData: {
      handler(newBarData) {
        if (newBarData) {
          this.drawBar(newBarData)
        }
      }
    }
  },
  async mounted() {
    const data = getCurrentMonthRange()
    const { data: { pieData, barData, totalAmount } } = await calculate(data)
    this.pieData = pieData
    this.barData = barData
    this.totalAmount = totalAmount
  },
  methods: {
    async query() {
      let [start, end] = this.params.crimeTime
      if (!start && !end) {
        const dateObj = getCurrentMonthRange()
        start = dateObj.start
        end = dateObj.end
      }
      const { data: { pieData, barData, totalAmount } } = await calculate({ start, end })
      this.pieData = pieData
      this.barData = barData
      this.totalAmount = totalAmount
    },
    reset() {
      this.$refs.params.resetFields()
    },
    drawBar(source) {
      const options = {
        title: {
          text: `各月份止付金额之和统计, 合计： ${this.totalAmount}元`
        },
        dataset: {
          source
        },
        xAxis: {
          type: 'category',
          name: '时间'
        },
        yAxis: [
          {
            type: 'value',
            name: '止付金额'
          }
        ],
        series: [
          {
            type: 'bar',
            encode: {
              x: 'name',
              y: 'amount'
            },
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            }
          }
        ]
      }
      if (this.barChart) {
        this.barChart.setOption(options, true)
      } else {
        this.barChart = echarts.init(this.$refs.barChart)
        this.barChart.setOption(options, true)
      }
    },
    drawPie(source) {
      const options = {
        title: {
          text: '各追查类型占比统计'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          y: 'bottom',
          data: ['银行查控', '电话查控', '虚拟账号查控', '网站查控']
        },
        dataset: {
          source
        },
        series: {
          type: 'pie',
          label: {
            position: 'outer',
            alignTo: 'edge',
            margin: 10,
            formatter: '{@name}: {@count} ({d}%)'
          },
          encode: {
            itemName: 'name',
            value: 'count'
          }
        }
      }
      if (this.pieChart) {
        this.pieChart.setOption(options, true)
      } else {
        this.pieChart = echarts.init(this.$refs.pieChart)
        this.pieChart.setOption(options, true)
      }
    }
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 600px;
}
</style>
