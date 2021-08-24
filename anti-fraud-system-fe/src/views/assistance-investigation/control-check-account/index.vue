<template>
  <div>
    <common-container title="虚拟账号查控">
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
                  <el-form-item
                    label="警情编号"
                    prop="alarmNo"
                  >
                    <el-input
                      v-model="params.alarmNo"
                      placeholder="请输入警情编号"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col
            :span="4"
            class="text-center"
          >
            <el-button
              type="primary"
              @click="query"
            >
              查询
            </el-button>
            <el-button @click="reset">
              重置
            </el-button>
          </el-col>
        </el-row>
        <table-query
          ref="accountTable"
          :params="params"
          :columns="columns"
          method="get"
          url="/virtual"
          @click-action="onClickAction"
        />
      </template>
    </common-container>
    <el-dialog
      :visible.sync="isDetailVisible"
      width="90%"
      center
      :close-on-click-modal="false"
    >
      <detail
        ref="detail"
        :info="info"
      />
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="isDetailVisible = false">取 消</el-button>
        <el-button
          v-if="info.type !=='detail'"
          type="primary"
          @click="submit"
        >提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Detail from './components/detail'
import TableQuery from '@/views/common/table-query'
import CommonContainer from '@/views/common/container'

import { put } from '@/api/account'
import { transformDate, formatDate } from '@/utils/tools'
import { investigationStatusOptions } from '@/utils/constant'
import { getByType as getOrganizationOptions } from '@/api/organization'

export default {
  name: 'ControlCheckAccount',
  components: {
    Detail,
    TableQuery,
    CommonContainer
  },
  data() {
    return {
      isDetailVisible: false,
      investigationStatusOptions,
      organizationOptions: [],
      organizationOptionsMap: {},
      info: {
        row: {},
        type: 'detail',
        title: '详情',
        now: Date.now()
      },
      params: {
        alarmNo: ''
      },
      columns: [
        {
          title: '警情编号',
          key: 'alarmNo',
          width: '180'
        },
        {
          title: '操作账户',
          key: 'account'
        },
        {
          title: '所属机构',
          key: 'organization',
          formatter: (row, column, cellValue, index) => {
            return this.organizationOptionsMap[cellValue]
          }
        },
        {
          title: '案发时间',
          key: 'crimeTime',
          formatter: (row, column, cellValue, index) => {
            return formatDate('YYYY-MM-DD HH:mm:ss', cellValue * 1000)
          },
          width: '180'
        },
        {
          title: '创建时间',
          key: 'createTime',
          formatter: (row, column, cellValue, index) => {
            return formatDate('YYYY-MM-DD HH:mm:ss', cellValue * 1000)
          },
          width: '180'
        },
        {
          title: '止付金额',
          key: 'stopPaymentAmount'
        },
        {
          title: '处理状态',
          key: 'status',
          formatter: (row, column, cellValue, index) => {
            return this.investigationStatusOptionsArr[cellValue]
          }
        },
        {
          title: '处理结果',
          key: 'remark'
        },
        {
          title: '操作',
          key: 'actions',
          align: 'center',
          actions: [
            {
              title: '追查',
              type: 'check'
            },
            {
              title: '详情',
              type: 'detail'
            }
          ]
        }
      ]
    }
  },
  computed: {
    investigationStatusOptionsArr() {
      return this.investigationStatusOptions.map(item => item.label)
    }
  },
  async created() {
    const { data: { list } } = await getOrganizationOptions({ type: [1, 4, 5, 6], page: 1, pageSize: 100 })
    this.organizationOptions = list.map(item => {
      const { id: value, name: label } = item
      this.organizationOptionsMap[value] = label
      return { label, value }
    })
  },
  methods: {
    onClickAction(row, type, title) {
      this.info = {
        row,
        type,
        title,
        now: Date.now()
      }
      this.isDetailVisible = true
    },
    submit() {
      const { row } = this.info
      this.$refs.detail.form.affix = this.$refs.detail.$refs.tableFile.ids.toString()
      this.$refs.detail.$refs.form.validate((valid) => {
        if (valid) {
          const { crimeTime, ...rest } = this.$refs.detail.form
          const data = { crimeTime: transformDate(crimeTime), ...rest }
          put(row.id, data).then(res => {
            if (res.status === 200 && res.message === 'success') {
              this.$message.success('追查成功')
              this.isDetailVisible = false
              this.query()
            }
          })
        } else {
          this.$message.error('虚拟账号查控信息有误')
        }
      })
    },
    query() {
      this.$refs.accountTable.getTableData()
    },
    reset() {
      this.$refs.params.resetFields()
    }
  }
}
</script>

<style>
</style>
