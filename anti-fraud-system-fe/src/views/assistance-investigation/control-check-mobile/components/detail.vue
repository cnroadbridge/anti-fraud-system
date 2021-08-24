<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="true"
      label-suffix=":"
      label-width="130px"
    >
      <el-row>
        <el-col :span="24">
          <h2 class="form-title">警情信息</h2>
        </el-col>
        <el-col
          :span="7"
          :push="1"
        >
          <el-form-item
            label="警情编号"
            prop="alarmNo"
          >
            <el-input v-model="form.alarmNo" />
          </el-form-item>
        </el-col>
        <el-col
          :span="7"
          :push="1"
        >
          <el-form-item label="嫌疑人电话" prop="suspectsMobile">
            <el-input v-model="form.suspectsMobile" />
          </el-form-item>
        </el-col>
        <el-col
          :span="7"
          :push="1"
        >
          <el-form-item
            label="案发时间"
            prop="crimeTime"
          >
            <el-date-picker
              v-model="form.crimeTime"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="21"
          :push="1"
        >
          <el-form-item label="警情简述" prop="alarmDescribe">
            <el-input
              v-model="form.alarmDescribe"
              type="textarea"
              :rows="6"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form
      ref="operateForm"
      :model="form"
      :rules="rules"
      label-suffix=":"
      label-width="130px"
    >
      <el-row>
        <el-col :span="24">
          <h2 class="form-title">电话追查</h2>
        </el-col>
        <el-col
          :span="7"
          :push="1"
        >
          <el-form-item
            label="止付金额"
            prop="stopPaymentAmount"
          >
            <el-input
              v-model="form.stopPaymentAmount"
              :disabled="isDetail"
              :placeholder="showPlaceholder('请选择止付金额')"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="21"
          :push="1"
        >
          <el-form-item
            label="执行操作"
            prop="operate"
          >
            <el-radio-group v-model="form.operate" :disabled="isDetail">
              <el-radio
                v-for="mobieOperateOption in mobieOperateOptions"
                :key="mobieOperateOption.value"
                :label="mobieOperateOption.label"
              />
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col
          :span="21"
          :push="1"
        >
          <el-form-item
            label="备注"
            prop="remark"
          >
            <el-input
              v-model="form.remark"
              type="textarea"
              :rows="6"
              :disabled="isDetail"
              :placeholder="showPlaceholder('请输入备注')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <table-file
            ref="tableFile"
            :can-upload="isCheck"
            :can-delete="isCheck"
            :columns="columns"
            :affix="form.affix"
            @click-action="onClickAction"
          />
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mobieOperateOptions } from '@/utils/constant'

import { put } from '@/api/file'
import { downloadFile } from '@/utils/tools'
import TableFile from '@/views/common/table-file.vue'

export default {
  name: 'MobileDetail',
  components: {
    TableFile
  },
  props: {
    info: {
      type: Object,
      default: () => ({
        row: {},
        type: 'detail',
        title: '详情',
        now: Date.now()
      })
    }
  },
  data() {
    return {
      mobieOperateOptions,
      form: {
        alarmNo: '',
        suspectsMobile: '',
        crimeTime: '',
        alarmDescribe: '',
        stopPaymentAmount: '',
        operate: '',
        remark: '',
        affix: ''
      },
      rules: {},
      columns: [
        {
          title: '编号',
          key: 'NO'
        },
        {
          title: '文件名称',
          key: 'filename'
        },
        {
          title: '添加时间',
          key: 'createTime'
        },
        {
          title: '添加者',
          key: 'createBy'
        },
        {
          title: '操作',
          key: 'actions',
          align: 'center',
          actions: [
            {
              title: '下载',
              type: 'download'
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
    isCheck() {
      return this.info.type === 'check'
    },
    isDetail() {
      return this.info.type === 'detail'
    }
  },
  watch: {
    'info': {
      handler: function (newInfo) {
        this.form = {
          alarmNo: '',
          suspectsMobile: '',
          crimeTime: '',
          alarmDescribe: '',
          stopPaymentAmount: '',
          operate: '',
          remark: '',
          affix: ''
        }
        this.$nextTick(() => {
          this.$refs.form && this.$refs.form.clearValidate()
          this.$refs.operateForm && this.$refs.operateForm.clearValidate()
        })
        const { row: { alarmNo, crimeTime, suspectsMobile, stopPaymentAmount, alarmDescribe, operate, remark, affix } } = newInfo
        this.form = {
          alarmNo, crimeTime: crimeTime * 1000, suspectsMobile, stopPaymentAmount, alarmDescribe, operate, remark, affix
        }
      },
      immediate: true
    }
  },
  methods: {
    showPlaceholder(text) {
      return this.isDetail ? '' : text
    },
    onClickAction(row, type, title) {
      if (type === 'delete') {
        this.$confirm('确定要删除该文件吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          if (res === 'confirm') {
            put(row.id, { isDelete: 1 }).then(res => {
              if (res.status === 200 && res.message === 'success') {
                this.$message.success('删除文件成功')
                this.$refs.tableFile.deleteData(row.id)
              }
            })
          }
        }).catch((e) => {
          this.$message.error(e)
        })
      } else if (type === 'download') {
        const { path, filename } = row
        downloadFile(filename, `${process.env.VUE_APP_BASE_API}/${path}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  padding: 10px 20px;
}
</style>
