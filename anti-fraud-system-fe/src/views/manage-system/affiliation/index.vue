<template>
  <div>
    <common-container title="所属机构">
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
                    label="机构名称"
                    prop="name"
                  >
                    <el-input
                      v-model="params.name"
                      placeholder="请输入机构名称"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="机构代码"
                    prop="code"
                  >
                    <el-input
                      v-model="params.code"
                      placeholder="请输入机构代码"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="机构类型"
                    prop="type"
                  >
                    <el-select
                      v-model="params.type"
                      placeholder="请选择机构类型"
                    >
                      <el-option
                        v-for="orgTypeOption in orgTypeOptions"
                        :key="orgTypeOption.value"
                        :label="orgTypeOption.label"
                        :value="orgTypeOption.value"
                      />
                    </el-select>
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
          ref="organizationTable"
          :params="params"
          :columns="columns"
          method="get"
          url="/organization"
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

import { put, post } from '@/api/organization'
import { orgTypeOptions } from '@/utils/constant'

export default {
  name: 'Affiliation',
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
      orgTypeOptions,
      params: {
        name: '',
        code: '',
        type: ''
      },
      columns: [
        {
          title: '机构名称',
          key: 'name'
        },
        {
          title: '机构代码',
          key: 'code'
        },
        {
          title: '机构类型',
          key: 'type',
          formatter: (row, column, cellValue, index) => {
            return this.orgTypeOptionsMap[cellValue]
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
  computed: {
    orgTypeOptionsMap() {
      const res = {}
      for (const orgTypeOption of orgTypeOptions) {
        const { label, value } = orgTypeOption
        res[value] = label
      }
      return res
    }
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
        this.$confirm('确定要删除机构吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          if (res === 'confirm') {
            put(row.id, { isDelete: 1 }).then(res => {
              if (res.status === 200 && res.message === 'success') {
                this.$message.success('删除机构成功')
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
                this.$message.success('新增机构成功')
                this.isDetailVisible = false
                this.query()
              }
            })
          } else if (type === 'modify') {
            put(row.id, this.$refs.detail.form).then(res => {
              if (res.status === 200 && res.message === 'success') {
                this.$message.success('修改机构成功')
                this.isDetailVisible = false
                this.query()
              }
            })
          }
        } else {
          this.$message.error('机构信息有误')
        }
      })
    },
    query() {
      this.$refs.organizationTable.getTableData()
    },
    reset() {
      this.$refs.params.resetFields()
    }
  }
}
</script>

<style>
</style>
