<template>
  <div>
    <common-container title="警情类别维护">
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
                    label="警情类别名称"
                    prop="name"
                  >
                    <el-input
                      v-model="params.name"
                      placeholder="请输入卡号前缀"
                    />
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
          ref="alarmCategory"
          :params="params"
          :columns="columns"
          method="get"
          url="/alarmCategory"
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

import { put, post } from '@/api/alarmCategory'
import { formatDate } from '@/utils/tools'

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
        name: ''
      },
      columns: [
        {
          title: '警情类别',
          key: 'name'
        },
        {
          title: '创建时间',
          key: 'createTime',
          formatter: (row, column, cellValue, index) => {
            return formatDate('YYYY-MM-DD HH:mm:ss', cellValue * 1000)
          }
        },
        {
          title: '更新时间',
          key: 'updateTime',
          formatter: (row, column, cellValue, index) => {
            return formatDate('YYYY-MM-DD HH:mm:ss', cellValue * 1000)
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
    // const { data: { list } } = await getBankOptions({ type: 1, page: 1, pageSize: 100 })
    // this.bankOptions = list.map(item => {
    //   const { id: value, name: label } = item
    //   return { label, value }
    // })
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
        this.$confirm('确定要删除警情类别吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          if (res === 'confirm') {
            put(row.id, { isDelete: 1 }).then(res => {
              if (res.status === 200 && res.message === 'success') {
                this.$message.success('删除警情类别成功')
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
                this.$message.success('新增警情类别成功')
                this.isDetailVisible = false
                this.query()
              }
            })
          } else if (type === 'modify') {
            put(row.id, this.$refs.detail.form).then(res => {
              if (res.status === 200 && res.message === 'success') {
                this.$message.success('修改警情类别成功')
                this.isDetailVisible = false
                this.query()
              }
            })
          }
        } else {
          this.$message.error('警情类别信息有误')
        }
      })
    },
    query() {
      this.$refs.alarmCategory.getTableData()
    },
    reset() {
      this.$refs.params.resetFields()
    }
  }
}
</script>

<style>

</style>
