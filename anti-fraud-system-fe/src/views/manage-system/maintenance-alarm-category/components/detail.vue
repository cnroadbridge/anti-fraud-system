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
          <h2 class="form-title">警情类别信息</h2>
        </el-col>
        <el-col
          :span="7"
          :push="1"
        >
          <el-form-item
            label="警情类别名称"
            prop="name"
          >
            <el-input
              v-model="form.name"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'AlarmCategoryDetail',
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
        name: ''
      },
      rules: {
        name: { required: true, message: '请输入警情类别名称', trigger: 'blur' }
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
        const { row: { name }, type: operate } = newInfo
        if (operate !== 'add') {
          this.form = { name }
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
