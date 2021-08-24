// 警情性质
export const alarmPropOptions = [
  {
    label: '报警',
    value: 0
  },
  {
    label: '协助侦查',
    value: 1
  },
  {
    label: '举报',
    value: 2
  },
  {
    label: '咨询',
    value: 3
  }
]

// 警情类别
export const alarmCategoryOptions = [
  {
    label: '其他',
    value: 0
  },
  {
    label: '反诈一哥',
    value: 1
  }
]

// 性别
export const genderOptions = [
  {
    label: '男',
    value: 0
  },
  {
    label: '女',
    value: 1
  }
]

// 年龄段
export const ageOptions = [
  {
    label: '不详',
    value: 0
  },
  {
    label: '0-20',
    value: 1
  },
  {
    label: '21-30',
    value: 2
  },
  {
    label: '31-40',
    value: 3
  },
  {
    label: '41-50',
    value: 4
  },
  {
    label: '50岁以上',
    value: 5
  }
]

// 银行卡账号性质

export const accountTypeOptions = [
  {
    label: '嫌疑人一级账号',
    value: 0
  },
  {
    label: '嫌疑人二级账号',
    value: 1
  },
  {
    label: '受害人账户',
    value: 2
  }
]

// 银行执行操作选项
export const bankOperateOptions = [
  {
    label: '查询',
    value: 0
  },
  {
    label: '锁定',
    value: 1
  },
  {
    label: '冻结',
    value: 2
  },
  {
    label: '挂失',
    value: 3
  },
  {
    label: '管控',
    value: 4
  }
]

// 电话处置操作选项
export const mobieOperateOptions = [
  {
    label: '限制呼入',
    value: 0
  },
  {
    label: '停话服务',
    value: 1
  },
  {
    label: '其它',
    value: 2
  }
]

// 网站处置操作选项
export const websiteOperateOptions = [
  {
    label: '禁用网站',
    value: 0
  },
  {
    label: '限制访问',
    value: 1
  }
]

// 用户角色
export const userRoleOptions = [
  {
    label: '管理员',
    value: 'admin'
  },
  {
    label: '市局接警员',
    value: 'receiver'
  },
  {
    label: '县区局接警员',
    value: 'receiver2'
  },
  {
    label: '银行操作员',
    value: 'operator'
  },
  {
    label: '电话操作员',
    value: 'operator2'
  },
  {
    label: '网站操作员',
    value: 'operator3'
  },
  {
    label: '虚拟账户操作员',
    value: 'operator4'
  }
]

// 机构类型
export const orgTypeOptions = [
  {
    label: '警方',
    value: 0
  },
  {
    label: '银行',
    value: 1
  },
  {
    label: '电话运营商',
    value: 2
  },
  {
    label: '网站运营商',
    value: 3
  },
  {
    label: '支付宝',
    value: 4
  },
  {
    label: '微信',
    value: 5
  },
  {
    label: '其它',
    value: 6
  }
]

// 警情状态

export const alarmStatusOptions = [
  {
    label: '待审核',
    value: 0
  },
  {
    label: '审核通过',
    value: 1
  },
  {
    label: '审核不通过',
    value: 2
  }
]

// 追查状态

export const investigationStatusOptions = [
  {
    label: '待反馈',
    vlaue: 0
  },
  {
    label: '已反馈',
    value: 1
  }
]
