<template>
  <div>
    <el-table
      ref="table"
      border
      :data="data"
      :loading="isLoading"
      :highlight-row="isHighlightRow"
      :row-class-name="tableRowClassName"
    >
      <template v-for="column in columns">
        <template v-if="column.key === 'actions'">
          <el-table-column
            :key="column.key"
            align="center"
            :width="column.width"
            :label="column.title"
          >
            <template slot-scope="scope">
              <el-button
                v-for="action in filterOperate(
                  column.actions,
                  scope.row.btnList
                )"
                :key="action.type"
                type="text"
                size="small"
                @click="handleClick(scope.row, action.type, action.title)"
              >{{ action.title }}</el-button>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="column.key === 'NO'">
          <el-table-column
            :key="column.key"
            type="index"
            width="80"
            align="center"
            :label="column.title"
          />
        </template>
        <template v-else>
          <el-table-column
            :key="column.key"
            align="center"
            :prop="column.key"
            :width="column.width"
            :label="column.title"
            :formatter="column.formatter"
            :show-overflow-tooltip="true"
          />
        </template>
      </template>
    </el-table>
    <el-row type="flex" justify="center" style="margin-top: 10px;">
      <el-col :span="24">
        <el-pagination
          v-if="isShowPagination"
          :small="true"
          :total="total"
          :background="true"
          :page-sizes="pageSizeOptions"
          :current-page="pagination.page"
          :page-size="pagination.pageSize"
          @current-change="changePage"
          @size-change="changePageSize"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import request from '@/utils/request'
import { getLength } from '@/utils/tools'

export default {
  name: 'CommonTableQuery',
  props: {
    // 请求表格数据的url地址
    url: { type: String, required: true },
    // 默认分页数
    pageSize: { type: Number, default: 10 },
    // 是否展示序号
    index: { type: Boolean, default: true },
    // 表格的列的结构
    columns: { type: Array, required: true },
    orgId: { type: String, required: false, default: '' },
    // 请求表格数据的方法
    method: { type: String, default: 'post' },
    // 请求表格数据的参数
    params: { type: Object, default: () => ({}) },
    // 是否支持高亮选中
    isHighlightRow: { type: Boolean, default: false },
    // 是否显示分页
    isShowPagination: { type: Boolean, default: true },
    // 是否显示迷你分页
    isPaginationSizeSmall: { type: Boolean, default: false }
  },
  data() {
    return {
      // 表格的行
      data: [],
      // 分页总数
      total: 0,
      // 表格数据是否加载
      isLoading: false,
      // 是否全选
      isSelectAll: false,
      // 渲染后的列数据字段
      renderColumns: [],
      // 分页
      pagination: {
        page: 1,
        pageSize: this.pageSize
      }
    }
  },
  computed: {
    // 是否有数据
    hasData() {
      return getLength(this.data) > 0
    },
    // 分页条数
    pageSizeOptions() {
      return this.isPaginationSizeSmall ? [10, 20, 30] : [10, 20, 30, 50, 100]
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // if (rowIndex === 1) {
      //   return 'warning-row'
      // } else if (rowIndex === 3) {
      //   return 'success-row'
      // }
      if (row.alarmNo && row.alarmNo.startsWith('FZYG')) {
        return 'warning-row'
      }
      return ''
    },
    // 改变分页
    changePage(page) {
      this.pagination.page = page
      this.getTableData()
    },
    // 改变分页大小
    changePageSize(pageSize) {
      this.pagination.pageSize = pageSize
      this.getTableData()
    },
    // 获取表格的数据
    getTableData() {
      if (!this.url) {
        return
      }
      const {
        url,
        params,
        orgId,
        pagination: { page, pageSize },
        isShowPagination,
        method
      } = this
      this.isLoading = true
      this.isSelectAll = false
      const parameter = isShowPagination
        ? { page, pageSize, orgId, ...params }
        : { orgId, ...params }
      request({
        method,
        url,
        [method === 'post' ? 'data' : 'params']: parameter
      })
        .then(res => {
          const {
            data: { list = [], total, page, pageSize }
          } = res || {}
          this.isLoading = false
          this.data = list
          if (this.isShowPagination) {
            this.total = total === null ? 0 : total
            this.pagination = {
              page,
              pageSize
            }
          }
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)
        })
    },
    // 手动挡分页查询
    query(page = 1, pageSize = 10) {
      this.pagination = { page, pageSize }
      this.getTableData()
    },
    handleClick(row, type, title) {
      this.$emit('click-action', row, type, title)
    },
    filterOperate(actions, btnList) {
      return actions.filter(action => btnList.includes(action.type))
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-tooltip__popper {
  max-width: 80%;
}
.el-tooltip__popper,
.el-tooltip__popper.is-dark {
  background: #f5f5f5 !important;
  color: #303133 !important;
}
</style>
