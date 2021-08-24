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
          <h2 class="form-title">用户信息</h2>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname" />
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" />
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="form.mobile" />
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="用户角色" prop="role">
            <el-select
              v-model="form.role"
              :placeholder="showPlaceholder('请选择用户角色')"
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
        <el-col :span="7" :push="1">
          <el-form-item label="所属机构" prop="orgId">
            <el-select
              v-model="form.orgId"
              :placeholder="showPlaceholder('请选择所属机构')"
            >
              <el-option
                v-for="orgOption in orgOptions"
                :key="orgOption.value"
                :label="orgOption.label"
                :value="orgOption.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { userRoleOptions } from '@/utils/constant'
import { get as getOrganizationOptions } from '@/api/organization'

export default {
  name: 'ManageUserDetail',
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
        username: '',
        password: '',
        mobile: '',
        role: '',
        orgId: '',
        nickname: ''
      },
      rules: {
        username: { required: true, message: '请输入用户名', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' },
        mobile: { required: true, message: '请输入手机号', trigger: 'blur' },
        role: { required: true, message: '请选择用户角色', trigger: 'change' },
        orgId: { required: true, message: '请选择所属机构', trigger: 'change' }
      },
      userRoleOptions,
      orgOptions: []
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
    info: {
      handler: function(newInfo) {
        this.$refs.form && this.$refs.form.resetFields()
        const {
          row: { username, password, mobile, role, orgId, nickname },
          type: operate
        } = newInfo
        if (operate !== 'add') {
          this.form = { username, password, mobile, role, orgId, nickname }
        }
      },
      immediate: true
    }
  },
  async created() {
    const {
      data: { list }
    } = await getOrganizationOptions({ page: 1, pageSize: 100 })
    this.orgOptions = list.map(item => {
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
