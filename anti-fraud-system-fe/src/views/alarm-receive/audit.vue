<template>
  <div>
    <common-container title="警情审核">
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
                <el-col :span="8">
                  <el-form-item
                    label="受害人姓名"
                    prop="informantName"
                  >
                    <el-input
                      v-model="params.informantName"
                      placeholder="请输入受害人姓名"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="受害人账号"
                    prop="informantBankAccount"
                  >
                    <el-input
                      v-model="params.informantBankAccount"
                      placeholder="请输入受害人账号"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="受害人电话"
                    prop="informantMobie"
                  >
                    <el-input
                      v-model="params.informantMobie"
                      placeholder="请输入受害人电话"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="嫌疑人电话"
                    prop="suspectsMobile"
                  >
                    <el-input
                      v-model="params.suspectsMobile"
                      placeholder="请输入嫌疑人电话"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="嫌疑人账号"
                    prop="suspectsAccount"
                  >
                    <el-input
                      v-model="params.suspectsAccount"
                      placeholder="请输入嫌疑人账号"
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
          ref="auditTable"
          :params="params"
          :columns="columns"
          method="get"
          url="/alarm"
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

import { put } from '@/api/alarm'
import { transformDate, formatDate } from '@/utils/tools'
import { alarmPropOptions, alarmStatusOptions } from '@/utils/constant'

export default {
  name: 'CaseAudit',
  components: {
    Detail,
    TableQuery,
    CommonContainer
  },
  data() {
    return {
      isDetailVisible: false,
      alarmPropOptions,
      alarmStatusOptions,
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
          title: '警情状态',
          key: 'alarmStatus',
          formatter: (row, column, cellValue, index) => {
            return this.alarmStatusOptionsArr[cellValue]
          }
        },
        {
          title: '操作',
          key: 'actions',
          align: 'center',
          actions: [
            {
              title: '详情',
              type: 'detail'
            },
            {
              title: '审核',
              type: 'audit'
            },
            {
              title: '删除',
              type: 'delete'
            }
          ]
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
    }
  },
  methods: {
    onClickAction(row, type, title) {
      this.info = {
        row,
        type,
        title,
        now: Date.now()
      }
      if (type === 'delete') {
        this.$confirm('确定要删除该条警情吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          if (res === 'confirm') {
            put(row.id, { isDelete: 1 }).then(res => {
              if (res.status === 200 && res.message === 'success') {
                this.$message.success('删除警情成功')
                this.query()
              }
            })
          }
        }).catch((e) => {
          this.$message.error(e)
        })
      } else {
        this.isDetailVisible = true
      }
    },
    async submit() {
      const { row } = this.info
      const isFormValid = await this.$refs.detail.$refs.form.validate()
      const isAuditFormValid = await this.$refs.detail.$refs.auditForm.validate()
      if (isFormValid && isAuditFormValid) {
        const { crimeTime, ...rest } = this.$refs.detail.form
        const data = { crimeTime: transformDate(crimeTime), ...rest, ...this.$refs.detail.auditForm }
        put(row.id, data).then(res => {
          if (res.status === 200 && res.message === 'success') {
            this.$message.success('警情审核成功')
            this.isDetailVisible = false
            this.query()
          }
        })
      } else {
        this.$message.error('请填写完整警情信息')
      }
    },
    query() {
      this.$refs.auditTable.getTableData()
    },
    reset() {
      this.$refs.params.resetFields()
    }
  }
}
</script>

<style>
</style>
