<template>
  <div>
    <common-container title="银行卡维护">
      <template slot="topExtra">
        <el-button
          type="primary"
          @click="add"
        >
          新增
        </el-button>
      </template>
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
                    label="卡号前缀"
                    prop="prefix"
                  >
                    <el-input
                      v-model="params.prefix"
                      placeholder="请输入卡号前缀"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="卡号名称"
                    prop="name"
                  >
                    <el-input
                      v-model="params.name"
                      placeholder="请输入卡号名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col
                  :span="8"
                >
                  <el-form-item label="所属银行" prop="bankId">
                    <el-select
                      v-model="params.bankId"
                      placeholder="请选择所属银行"
                    >
                      <el-option
                        v-for="bankOption in bankOptions"
                        :key="bankOption.value"
                        :label="bankOption.label"
                        :value="bankOption.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
          <el-col :span="4" class="text-center">
            <el-button
              type="primary"
              @click="query"
            >
              查询
            </el-button>
            <el-button
              @click="reset"
            >
              重置
            </el-button>
          </el-col>
        </el-row>
        <table-query
          ref="bankcardTable"
          :params="params"
          :columns="columns"
          method="get"
          url="/bankcard"
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
      <detail ref="detail" :info="info" />
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

import { get as getBankOptions } from '@/api/organization'
import { put, post } from '@/api/bankcard'

export default {
  name: 'MaintenanceCardBank',
  components: {
    Detail,
    TableQuery,
    CommonContainer
  },
  data() {
    return {
      isDetailVisible: false,
      info: {
        row: {},
        type: 'detail',
        title: '详情',
        now: Date.now()
      },
      bankOptions: [],
      params: {
        prefix: '',
        bankId: '',
        name: ''
      },
      columns: [
        {
          title: '卡号前缀',
          key: 'prefix'
        },
        {
          title: '卡号名称',
          key: 'name'
        },
        {
          title: '所属银行',
          key: 'bankName'
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
              title: '修改',
              type: 'modify'
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
  async created() {
    const { data: { list } } = await getBankOptions({ type: 1, page: 1, pageSize: 100 })
    this.bankOptions = list.map(item => {
      const { id: value, name: label } = item
      return { label, value }
    })
  },
  methods: {
    add() {
      this.onClickAction({}, 'add', '新增')
    },
    onClickAction(row, type, title) {
      this.info = {
        row,
        type,
        title,
        now: Date.now()
      }
      if (type === 'delete') {
        this.$confirm('确定要删除银行卡号吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          if (res === 'confirm') {
            put(row.id, { isDelete: 1 }).then(res => {
              if (res.status === 200 && res.message === 'success') {
                this.$message.success('删除银行卡号成功')
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
    submit() {
      const { type, row } = this.info
      this.$refs.detail.$refs.form.validate((valid) => {
        if (valid) {
          if (type === 'add') {
            post(this.$refs.detail.form).then(res => {
              if (res.status === 200 && res.message === 'success') {
                this.$message.success('新增银行卡成功')
                this.isDetailVisible = false
                this.query()
              }
            })
          } else if (type === 'modify') {
            put(row.id, this.$refs.detail.form).then(res => {
              if (res.status === 200 && res.message === 'success') {
                this.$message.success('修改银行卡成功')
                this.isDetailVisible = false
                this.query()
              }
            })
          }
        } else {
          this.$message.error('银行卡信息有误')
        }
      })
    },
    query() {
      this.$refs.bankcardTable.getTableData()
    },
    reset() {
      this.$refs.params.resetFields()
    }
  }
}
</script>

<style>

</style>
