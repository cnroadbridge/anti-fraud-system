<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="isDetail"
      label-suffix=":"
      label-width="130px"
    >
      <el-row>
        <el-col :span="24">
          <h2 class="form-title">卡号信息</h2>
        </el-col>
        <el-col
          :span="7"
          :push="1"
        >
          <el-form-item
            label="卡号前缀"
            prop="prefix"
          >
            <el-input
              v-model="form.prefix"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="7"
          :push="1"
        >
          <el-form-item
            label="卡号名称"
            prop="name"
          >
            <el-input
              v-model="form.name"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="7"
          :push="1"
        >
          <el-form-item label="所属银行" prop="bankId">
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
  </div>
</template>

<script>
import { get as getBankOptions } from '@/api/organization'

export default {
  name: 'BankCardDetail',
  props: {
    type: { type: String, default: 'detail' },
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
        prefix: '',
        name: '',
        bankId: ''
      },
      bankOptions: [],
      rules: {
        name: { required: true, message: '请输入银行卡名称', trigger: 'blur' },
        prefix: { required: true, message: '请输入银行卡前缀', trigger: 'blur' },
        bankId: { required: true, message: '请选择所属银行', trigger: 'change' }
      }
    }
  },
  computed: {
    isModify() {
      return this.info.type === 'modify'
    },
    isDetail() {
      return this.info.type === 'detail'
    },
    isAdd() {
      return this.info.type === 'add'
    }
  },
  watch: {
    'info': {
      handler: function (newInfo) {
        this.$refs.form && this.$refs.form.resetFields()
        const { row: { name, prefix, bankId }, type: operate } = newInfo
        if (operate !== 'add') {
          this.form = { name, prefix, bankId }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  padding: 10px 20px;
}
</style>
