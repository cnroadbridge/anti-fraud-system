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
          <h2 class="form-title">机构信息</h2>
        </el-col>
        <el-col
          :span="7"
          :push="1"
        >
          <el-form-item
            label="机构名称"
            prop="name"
          >
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col
          :span="7"
          :push="1"
        >
          <el-form-item
            label="机构代码"
            prop="code"
          >
            <el-input v-model="form.code" />
          </el-form-item>
        </el-col>
        <el-col
          :span="7"
          :push="1"
        >
          <el-form-item
            label="机构类型"
            prop="type"
          >
            <el-select
              v-model="form.type"
              :placeholder="showPlaceholder('请选择机构类型')"
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
  </div>
</template>

<script>

import { orgTypeOptions } from '@/utils/constant'

export default {
  name: 'AffiliationDetail',
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
        name: '',
        code: '',
        type: ''
      },
      rules: {
        name: { required: true, message: '请输入机构名称', trigger: 'blur' },
        code: { required: true, message: '请输入机构代码', trigger: 'blur' },
        type: { required: true, type: 'number', message: '请选择机构类型', trigger: 'change' }
      },
      orgTypeOptions
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
        const { row: { name, code, type }, type: operate } = newInfo
        if (operate !== 'add') {
          this.form = { name, code, type }
        }
      },
      immediate: true
    }
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
