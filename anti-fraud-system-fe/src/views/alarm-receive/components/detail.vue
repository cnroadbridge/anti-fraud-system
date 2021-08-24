<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-suffix=":"
      label-width="130px"
    >
      <el-row>
        <el-col :span="24">
          <h2 class="form-title">基本信息</h2>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="警情编号" prop="alarmNo">
            <el-input
              v-model="form.alarmNo"
              :disabled="true"
              :placeholder="showPlaceholder('请输入警情编号')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="警情性质" prop="alarmProp">
            <el-select
              v-model="form.alarmProp"
              :disabled="disabled"
              :placeholder="showPlaceholder('请选择警情性质')"
            >
              <el-option
                v-for="alarmPropOption in alarmPropOptions"
                :key="alarmPropOption.value"
                :label="alarmPropOption.label"
                :value="alarmPropOption.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="警情类别" prop="alarmCategory">
            <el-select
              v-model="form.alarmCategory"
              :disabled="disabled"
              :placeholder="showPlaceholder('请选择警情类别')"
            >
              <el-option
                v-for="alarmCategoryOption in alarmCategoryOptions"
                :key="alarmCategoryOption.value"
                :label="alarmCategoryOption.label"
                :value="alarmCategoryOption.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14" :push="1">
          <el-form-item label="案发地点">
            <el-cascader
              v-model="selectedOptions"
              :disabled="disabled"
              size="large"
              :options="regionData"
              :placeholder="showPlaceholder('请输入案发地点')"
              @change="handleChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="案发时间" prop="crimeTime">
            <el-date-picker
              v-model="form.crimeTime"
              :disabled="disabled"
              type="datetime"
              :placeholder="showPlaceholder('请选择案发时间')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="14" :push="1">
          <el-form-item label="详细地址" prop="crimeAddress">
            <el-input
              v-model="form.crimeAddress"
              :disabled="disabled"
              :placeholder="showPlaceholder('请输入详细地址')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <h2 class="form-title">报案人(受害人)信息</h2>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="姓名" prop="informantName">
            <el-input
              v-model="form.informantName"
              :disabled="disabled"
              :placeholder="showPlaceholder('请输入姓名')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="身份证号" prop="informantIdCard">
            <el-input
              v-model="form.informantIdCard"
              :disabled="disabled"
              :placeholder="showPlaceholder('请输入身份证号')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="性别" prop="informantGender">
            <el-select
              v-model="form.informantGender"
              :disabled="disabled"
              :placeholder="showPlaceholder('请选择性别')"
            >
              <el-option
                v-for="genderOption in genderOptions"
                :key="genderOption.value"
                :label="genderOption.label"
                :value="genderOption.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="年龄段" prop="informantAge">
            <el-select
              v-model="form.informantAge"
              :disabled="disabled"
              :placeholder="showPlaceholder('请选择性别')"
            >
              <el-option
                v-for="ageOption in ageOptions"
                :key="ageOption.value"
                :label="ageOption.label"
                :value="ageOption.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="联系电话" prop="informantMobile">
            <el-input
              v-model="form.informantMobile"
              :disabled="disabled"
              :placeholder="showPlaceholder('请输入联系电话')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="职业" prop="informantJobs">
            <el-input
              v-model="form.informantJob"
              :disabled="disabled"
              :placeholder="showPlaceholder('请输入职业')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="14" :push="1">
          <el-form-item label="银行账号" prop="informantBankAccount">
            <el-input
              v-model="form.informantBankAccount"
              :disabled="disabled"
              :placeholder="
                showPlaceholder('注: 如有多个账号, 请以英文逗号分隔')
              "
            />
          </el-form-item>
        </el-col>
        <el-col :span="14" :push="1">
          <el-form-item label="现住址" prop="informantAddress">
            <el-input
              v-model="form.informantAddress"
              :disabled="disabled"
              :placeholder="showPlaceholder('请输入现住址')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="14" :push="1">
          <el-form-item label="其他联系方式" prop="informantOtherConcact">
            <el-input
              v-model="form.informantOtherConcact"
              :disabled="disabled"
              :placeholder="showPlaceholder('如: QQ、微信、陌陌等网络账号')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <h2 class="form-title">嫌疑人信息</h2>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="所属机构" prop="suspectsAccountOrganization">
            <el-select
              v-model="form.suspectsAccountOrganization"
              :disabled="disabled"
              :placeholder="showPlaceholder('请选择所属机构')"
            >
              <el-option
                v-for="organizationOption in organizationOptions"
                :key="organizationOption.value"
                :label="organizationOption.label"
                :value="organizationOption.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="14" :push="1">
          <el-form-item label="涉案账号" prop="suspectsAccount">
            <el-input
              v-model="form.suspectsAccount"
              :disabled="disabled"
              :placeholder="
                showPlaceholder('注: 如有多个账号, 请以英文逗号分隔')
              "
            />
          </el-form-item>
        </el-col>
        <el-col :span="21" :push="1">
          <el-form-item>
            <el-radio-group v-model="suspectsRadioOption">
              <el-radio-button label="涉案电话" />
              <el-radio-button label="涉案网址" />
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col
          v-show="suspectsRadioOption === '涉案电话'"
          :span="21"
          :push="1"
        >
          <el-form-item label="涉案电话" prop="suspectsMobile">
            <el-input
              v-model="form.suspectsMobile"
              :disabled="disabled"
              :placeholder="
                showPlaceholder('注: 如果多个电话, 请以英文逗号分隔')
              "
            />
          </el-form-item>
        </el-col>
        <el-col
          v-show="suspectsRadioOption === '涉案网址'"
          :span="21"
          :push="1"
        >
          <el-form-item label="涉案网址" prop="suspectsWebSite">
            <el-input
              v-model="form.suspectsWebSite"
              :disabled="disabled"
              :placeholder="
                showPlaceholder('注: 如果多个网址, 请以英文逗号分隔')
              "
            />
          </el-form-item>
        </el-col>
        <el-col :span="21" :push="1">
          <el-form-item label="其他联系方式" prop="suspectsOtherConcact">
            <el-input
              v-model="form.suspectsOtherConcact"
              :disabled="disabled"
              :placeholder="showPlaceholder('如: QQ、微信、陌陌等网络账号')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <h2 class="form-title">警情信息</h2>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="涉案金额" prop="fraudAmount">
            <el-input
              v-model="form.fraudAmount"
              :disabled="disabled"
              :placeholder="showPlaceholder('请输入涉案金额')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="录入人" prop="inputer">
            <el-input
              v-model="form.inputer"
              :disabled="disabled"
              :placeholder="showPlaceholder('请输入录入人')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="21" :push="1">
          <el-form-item label="警情简述" prop="alarmDescribe">
            <el-input
              v-model="form.alarmDescribe"
              :disabled="disabled"
              type="textarea"
              :rows="6"
              :placeholder="showPlaceholder('请输入警情简述')"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="24">
        <h2 class="form-title">附件材料</h2>
      </el-col>
      <el-col :span="24">
        <table-file
          ref="tableFile"
          :can-upload="enableFileTable"
          :can-delete="enableFileTable"
          :columns="columns"
          :affix="form.affix"
          @click-action="onClickAction"
        />
      </el-col>
    </el-row>
    <el-form
      v-if="isAduit"
      ref="auditForm"
      :model="auditForm"
      :rules="auditRules"
      label-suffix=":"
      label-width="130px"
    >
      <el-row>
        <el-col :span="24">
          <h2 class="form-title">审核</h2>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item label="警情审核" prop="alarmAuditOption">
            <el-radio-group
              v-model="auditForm.alarmAuditOption"
              :disabled="disabledAudit"
            >
              <el-radio label="通过" />
              <el-radio label="拒绝" />
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col
          v-if="auditForm.alarmAuditOption === '拒绝'"
          :span="21"
          :push="1"
        >
          <el-form-item label="拒绝原因" prop="rejectReason">
            <el-input
              v-model="auditForm.rejectReason"
              :disabled="disabledAudit"
              type="textarea"
              :rows="6"
              :placeholder="disabledAudit ? '' : '请输入拒绝原因'"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  provinceAndCityData,
  regionData,
  CodeToText,
  TextToCode
} from 'element-china-area-data'
import {
  alarmPropOptions,
  // alarmCategoryOptions,
  genderOptions,
  ageOptions
} from '@/utils/constant'

import { put } from '@/api/file'
import { downloadFile, generateAlarmNo, getNo } from '@/utils/tools'
import { getByType as getOrganizationOptions } from '@/api/organization'
import { get as getAlarmCategory } from '@/api/alarmCategory'

import TableFile from '@/views/common/table-file.vue'

export default {
  name: 'AlarmDetail',
  components: {
    TableFile
  },
  props: {
    username: { type: String, default: '' },
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
        alarmNo: '', // 警情编号
        alarmProp: '', // 警情性质
        alarmCategory: '', // 警情类别
        crimeCity: '', // 案发地点
        crimeAddress: '', // 详细地址
        crimeTime: '', // 案发时间
        informantName: '', // 报案人姓名
        informantIdCard: '', // 报案人身份证号
        informantGender: '', // 报案人性别
        informantAge: '', // 报案人年龄
        informantMobile: '', // 报案人电话
        informantJob: '', // 报案人职业
        informantBankAccount: '', // 报案人银行账号
        informantAddress: '', // 报案人住址
        informantOtherConcact: '', // 报案人其他联系方式
        suspectsMobile: '', // 嫌疑人涉案电话
        suspectsWebSite: '', // 嫌疑人涉案网址
        suspectsAccountOrganization: '', // 嫌疑人账号所属机构
        suspectsAccount: '', // 嫌疑人账号
        suspectsOtherConcact: '', // 嫌疑人其他联系信息
        fraudAmount: '', // 涉案金额
        alarmDescribe: '', // 警情简述
        inputer: '', // 录入者
        affix: '' // 附件
      },
      rules: {
        alarmNo: { required: true, message: '请输入警情编号', trigger: 'blur' },
        alarmProp: {
          required: true,
          type: 'number',
          message: '请选择警情性质',
          trigger: 'change'
        },
        alarmCategory: {
          required: true,
          type: 'number',
          message: '请选择警情类别',
          trigger: 'change'
        },
        crimeTime: {
          required: true,
          message: '请选择案发时间',
          trigger: 'change'
        },
        informantName: {
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        },
        informantIdCard: {
          required: true,
          message: '请输入身份证号',
          trigger: 'blur'
        },
        informantGender: {
          required: true,
          type: 'number',
          message: '请选择性别',
          trigger: 'change'
        },
        suspectsAccountOrganization: {
          required: true,
          message: '请选择所属机构',
          trigger: 'change'
        },
        suspectsAccount: {
          required: true,
          message: '请输入涉案账号',
          trigger: 'blur'
        }
      },
      auditForm: {
        alarmAuditOption: '',
        rejectReason: ''
      },
      auditRules: {
        alarmAuditOption: {
          required: true,
          message: '请选择警情审核',
          trigger: 'blur'
        },
        rejectReason: {
          required: true,
          message: '请输入拒绝原因',
          trigger: 'blur'
        }
      },
      ageOptions,
      rawAlarmCategoryOptions: [],
      genderOptions,
      alarmPropOptions,
      organizationOptions: [],
      regionData,
      provinceAndCityData,
      selectedOptions: [],
      suspectsRadioOption: '涉案电话',
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
    isAduit() {
      let flag = false
      const {
        row: { alarmStatus },
        type
      } = this.info
      if (type === 'audit') {
        flag = true
      }
      if ([1, 2].includes(alarmStatus) && type !== 'modify') {
        flag = true
      }
      return flag
    },
    disabled() {
      return ['detail', 'audit'].includes(this.info.type)
    },
    disabledAudit() {
      return this.info.type !== 'audit'
    },
    isAdd() {
      return this.info.type === 'add'
    },
    isModify() {
      return this.info.type === 'modify'
    },
    enableFileTable() {
      return this.isAdd || this.isModify
    },
    alarmCategoryOptions() {
      if (this.disabled) {
        return this.rawAlarmCategoryOptions
      }
      // 过滤掉反诈一哥
      return this.rawAlarmCategoryOptions.filter(item => item.value !== 1)
    }
  },
  watch: {
    info: {
      handler: function(newInfo) {
        this.form = {
          alarmNo: '',
          alarmProp: '',
          alarmCategory: '',
          crimeCity: '',
          crimeAddress: '',
          crimeTime: '',
          informantName: '',
          informantIdCard: '',
          informantGender: '',
          informantAge: '',
          informantMobile: '',
          informantJob: '',
          informantBankAccount: '',
          informantAddress: '',
          informantOtherConcact: '',
          suspectsMobile: '',
          suspectsWebSite: '',
          suspectsAccountOrganization: '',
          suspectsAccount: '',
          suspectsOtherConcact: '',
          fraudAmount: '',
          alarmDescribe: '',
          inputer: '',
          affix: ''
        }
        this.auditForm = {
          alarmAuditOption: '',
          rejectReason: ''
        }
        this.selectedOptions = []
        this.$nextTick(() => {
          this.$refs.form && this.$refs.form.clearValidate()
          this.$refs.auditForm && this.$refs.auditForm.clearValidate()
        })
        const {
          row: {
            alarmNo,
            alarmProp,
            alarmCategory,
            crimeCity,
            crimeAddress,
            crimeTime,
            informantName,
            informantIdCard,
            informantGender,
            informantAge,
            informantMobile,
            informantJob,
            informantBankAccount,
            informantAddress,
            informantOtherConcact,
            suspectsMobile,
            suspectsWebSite,
            suspectsAccountOrganization,
            suspectsAccount,
            suspectsOtherConcact,
            fraudAmount,
            alarmDescribe,
            inputer,
            affix,
            alarmAuditOption,
            rejectReason
          },
          type: operate
        } = newInfo
        if (operate !== 'add') {
          this.form = {
            alarmNo,
            alarmProp,
            alarmCategory,
            crimeCity,
            crimeAddress,
            crimeTime: crimeTime * 1000,
            informantName,
            informantIdCard,
            informantGender,
            informantAge,
            informantMobile,
            informantJob,
            informantBankAccount,
            informantAddress,
            informantOtherConcact,
            suspectsMobile,
            suspectsWebSite,
            suspectsAccountOrganization,
            suspectsAccount,
            suspectsOtherConcact,
            fraudAmount,
            alarmDescribe,
            inputer,
            affix
          }
          this.auditForm = {
            alarmAuditOption,
            rejectReason
          }
          this.formatCity(crimeCity)
        } else {
          this.form.alarmNo = generateAlarmNo() + getNo()
          this.form.inputer = this.username
        }
      },
      immediate: true
    }
  },
  async created() {
    const {
      data: { list }
    } = await getOrganizationOptions({
      type: [1, 4, 5, 6],
      page: 1,
      pageSize: 100
    })
    this.organizationOptions = list.map(item => {
      const { id: value, name: label } = item
      return { label, value }
    })
    const { data: { list: alarmCategoryList } } = await getAlarmCategory({ page: 1, pageSize: 100 })
    this.rawAlarmCategoryOptions = alarmCategoryList.map(item => {
      const { id: value, name: label } = item
      return { label, value }
    })
  },
  methods: {
    formatCity(str) {
      const [province, city, area] = str.split('-')
      var provinceCode = TextToCode[province].code
      var cityCode = TextToCode[province][city].code
      var areaCode = TextToCode[province][city][area].code
      this.selectedOptions = [provinceCode, cityCode, areaCode]
    },
    handleChange() {
      const [provinceCode, cityCode, areaCode] = this.selectedOptions
      const province = CodeToText[provinceCode]
      const city = CodeToText[cityCode]
      const area = CodeToText[areaCode]
      this.form.crimeCity = `${province}-${city}-${area}`
    },
    onClickAction(row, type, title) {
      if (type === 'delete') {
        this.$confirm('确定要删除该文件吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(res => {
            if (res === 'confirm') {
              put(row.id, { isDelete: 1 }).then(res => {
                if (res.status === 200 && res.message === 'success') {
                  this.$message.success('删除文件成功')
                  this.$refs.tableFile.deleteData(row.id)
                }
              })
            }
          })
          .catch(e => {
            this.$message.error(e)
          })
      } else if (type === 'download') {
        const { path, filename } = row
        downloadFile(filename, `${process.env.VUE_APP_BASE_API}/${path}`)
      }
    },
    showPlaceholder(text) {
      return this.disabled ? '' : text
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  padding: 10px 20px;
}
</style>
