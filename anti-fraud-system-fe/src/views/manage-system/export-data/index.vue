<template>
  <div>
    <common-container title="数据导出">
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
                  <el-form-item label="警情编号" prop="alarmNo">
                    <el-input
                      v-model="params.alarmNo"
                      placeholder="请输入警情编号"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="受害人姓名" prop="informantName">
                    <el-input
                      v-model="params.informantName"
                      placeholder="请输入受害人姓名"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="受害人账号" prop="informantBankAccount">
                    <el-input
                      v-model="params.informantBankAccount"
                      placeholder="请输入受害人账号"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="受害人电话" prop="informantMobie">
                    <el-input
                      v-model="params.informantMobie"
                      placeholder="请输入受害人电话"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="嫌疑人电话" prop="suspectsMobile">
                    <el-input
                      v-model="params.suspectsMobile"
                      placeholder="请输入嫌疑人电话"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="嫌疑人账号" prop="suspectsAccount">
                    <el-input
                      v-model="params.suspectsAccount"
                      placeholder="请输入嫌疑人账号"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="4" class="text-center">
            <el-row>
              <el-col>
                <el-button type="primary" @click="query">
                  查询
                </el-button>
                <el-button @click="reset">
                  重置
                </el-button>
                <el-col style="margin-top: 15px;">
                  <el-button
                    type="primary"
                    @click="downloadExcel"
                  >导出</el-button></el-col>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <table-query
          ref="inputTable"
          :params="params"
          :columns="columns"
          method="get"
          url="/alarm"
          @click-action="onClickAction"
        />
      </template>
    </common-container>
  </div>
</template>

<script>
import TableQuery from '@/views/common/table-query'
import CommonContainer from '@/views/common/container'

import { mapGetters } from 'vuex'
import { formatDate } from '@/utils/tools'
import { alarmPropOptions, alarmStatusOptions } from '@/utils/constant'

export default {
  name: 'ExportData',
  components: {
    TableQuery,
    CommonContainer
  },
  data() {
    return {
      isDetailVisible: false,
      alarmPropOptions,
      alarmStatusOptions,
      filename: '警情数据',
      autoWidth: true,
      bookType: 'xlsx',
      info: {
        row: {},
        type: 'detail',
        title: '详情',
        now: Date.now()
      },
      params: {
        alarmNo: '',
        informantName: '',
        informantMobie: '',
        suspectsMobile: '',
        suspectsAccount: '',
        informantBankAccount: ''
      },
      columns: [
        {
          title: '警情编号',
          key: 'alarmNo',
          width: '180'
        },
        {
          title: '警情性质',
          key: 'alarmProp',
          formatter: (row, column, cellValue, index) => {
            return this.alarmPropOptionsArr[cellValue]
          }
        },
        {
          title: '受害人姓名',
          key: 'informantName'
        },
        {
          title: '受害人账号',
          key: 'informantBankAccount'
        },
        {
          title: '嫌疑人账号',
          key: 'suspectsAccount'
        },
        {
          title: '嫌疑人电话',
          key: 'suspectsMobile'
        },
        {
          title: '涉案总金额',
          key: 'fraudAmount'
        },
        {
          title: '案发时间',
          key: 'crimeTime',
          formatter: (row, column, cellValue, index) => {
            return formatDate('YYYY-MM-DD HH:mm:ss', cellValue * 1000)
          }
        },
        {
          title: '警情状态',
          key: 'alarmStatus',
          formatter: (row, column, cellValue, index) => {
            return this.alarmStatusOptionsArr[cellValue]
          }
        }
      ]
    }
  },
  computed: {
    alarmPropOptionsArr() {
      return this.alarmPropOptions.map(item => item.label)
    },
    alarmStatusOptionsArr() {
      return this.alarmStatusOptions.map(item => item.label)
    },
    ...mapGetters(['name', 'orgId'])
  },
  methods: {
    onClickAction(row, type, title) {
      this.info = {
        row,
        type,
        title,
        now: Date.now()
      }
    },
    query() {
      this.$refs.inputTable.getTableData()
    },
    reset() {
      this.$refs.params.resetFields()
    },
    downloadExcel() {
      this.$confirm('将导出为excel文件，确认导出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.export2Excel()
        })
        .catch(() => {})
    },
    // 数据写入excel
    export2Excel() {
      import('@/excel/export2Excel').then(excel => {
        const tHeader = [
          '警情编号',
          '警情性质',
          '受害人姓名',
          '受害人账号',
          '嫌疑人账号',
          '嫌疑人电话',
          '涉案总金额',
          '案发时间',
          '警情状态'
        ] // 导出的excel的表头字段
        const filterVal = [
          'alarmNo',
          'alarmProp',
          'informantName',
          'informantBankAccount',
          'suspectsAccount',
          'suspectsMobile',
          'fraudAmount',
          'crimeTime',
          'alarmStatus'
        ] // 对象属性，对应于tHeader
        const list = this.$refs.inputTable.data
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    // 格式转换，直接复制即可
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'crimeTime') {
            return formatDate('YYYY-MM-DD HH:mm:ss', v[j] * 1000)
          } else if (j === 'alarmProp') {
            return this.alarmPropOptionsArr[v[j]]
          } else if (j === 'alarmStatus') {
            return this.alarmStatusOptionsArr[v[j]]
          } else {
            return v[j]
          }
        })
      )
    }
  }
}
</script>

<style></style>
