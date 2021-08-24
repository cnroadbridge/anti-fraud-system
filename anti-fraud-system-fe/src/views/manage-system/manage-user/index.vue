<template>
  <div>
    <common-container title="用户管理">
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
                    label="用户名"
                    prop="username"
                  >
                    <el-input
                      v-model="params.username"
                      placeholder="请输入用户名"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="用户角色"
                    prop="role"
                  >
                    <el-select
                      v-model="params.role"
                      placeholder="请选择用户角色"
                    >
                      <el-option
                        v-for="userRoleOption in userRoleOptions"
                        :key="userRoleOption.value"
                        :label="userRoleOption.label"
                        :value="userRoleOption.value"
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
          ref="userTable"
          :params="params"
          :columns="columns"
          method="get"
          url="/user"
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

import { put, post } from '@/api/user'
import { userRoleOptions } from '@/utils/constant'

export default {
  name: 'ManageUser',
  components: {
    Detail,
    TableQuery,
    CommonContainer
  },
  data() {
    return {
      isDetailVisible: false,
      userRoleOptions,
      type: 'detail',
      params: {
        username: '',
        role: ''
      },
      info: {
        row: {},
        type: 'detail',
        title: '详情',
        now: Date.now()
      },
      columns: [
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '电话',
          key: 'mobile'
        },
        {
          title: '角色',
          key: 'role',
          formatter: (row, column, cellValue, index) => {
            return this.userRoleOptionsMap[cellValue]
          }
        },
        {
          title: '组织机构',
          key: 'orgName'
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
    userRoleOptionsMap() {
      const res = {}
      for (const userRoleOption of userRoleOptions) {
        const { label, value } = userRoleOption
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
        this.$confirm('确定要删除用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          if (res === 'confirm') {
            put(row.id, { isDelete: 1 }).then(res => {
              if (res.status === 200 && res.message === 'success') {
                this.$message.success('删除用户成功')
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
          this.$message.error('用户信息有误')
        }
      })
    },
    query() {
      this.$refs.userTable.getTableData()
    },
    reset() {
      this.$refs.params.resetFields()
    }
  }
}
</script>

<style>
</style>
