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
          <h2 class="form-title">账户信息</h2>
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
          <el-form-item
            label="操作账户"
            prop="account"
          >
            <el-input v-model="form.account" />
          </el-form-item>
        </el-col>
        <el-col
          :span="7"
          :push="1"
        >
          <el-form-item
            label="所属银行"
            prop="bankId"
          >
            <el-select
              v-model="form.bankId"
              :placeholder="showPlaceholder('请选择所属银行')"
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
    <el-form
      ref="operateForm"
      :model="form"
      :rules="rules"
      label-suffix=":"
      label-width="130px"
    >
      <el-row>
        <el-col :span="24">
          <h2 class="form-title">银行追查</h2>
        </el-col>
        <el-col
          :span="7"
          :push="1"
        >
          <el-form-item
            label="账户性质"
            prop="accountType"
          >
            <el-select
              v-model="form.accountType"
              :disabled="isDetail"
              :placeholder="showPlaceholder('请选择账户性质')"
            >
              <el-option
                v-for="accountTypeOption in accountTypeOptions"
                :key="accountTypeOption.value"
                :label="accountTypeOption.label"
                :value="accountTypeOption.value"
              />
            </el-select>
          </el-form-item>
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
          :span="14"
          :push="1"
        >
          <el-form-item
            label="执行操作"
            prop="operate"
          >
            <el-radio-group v-model="form.operate" :disabled="isDetail">
              <el-radio
                v-for="bankOperateOption in bankOperateOptions"
                :key="bankOperateOption.value"
                :label="bankOperateOption.label"
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
import { accountTypeOptions, bankOperateOptions } from '@/utils/constant'
import { get as getBankOptions } from '@/api/organization'

import { put } from '@/api/file'
import { downloadFile } from '@/utils/tools'
import TableFile from '@/views/common/table-file.vue'

export default {
  name: 'BankDetail',
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
      form: {
        alarmNo: '',
        account: '',
        bank: '',
        stopPaymentAmount: '',
        accountType: '',
        operate: '',
        remark: '',
        affix: ''
      },
      bankOptions: [],
      accountTypeOptions,
      bankOperateOptions,
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
          account: '',
          bank: '',
          stopPaymentAmount: '',
          accountType: '',
          operate: '',
          remark: '',
          affix: ''
        }
        this.$nextTick(() => {
          this.$refs.form && this.$refs.form.clearValidate()
          this.$refs.operateForm && this.$refs.operateForm.clearValidate()
        })
        const { row: { alarmNo, account, bankId, stopPaymentAmount, accountType, operate, remark, affix } } = newInfo
        this.form = {
          alarmNo, account, bankId, stopPaymentAmount, accountType, operate, remark, affix
        }
      },
      immediate: true
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
