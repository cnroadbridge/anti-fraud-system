## anti-fraud-system

基于Vue2和Node.js的反欺诈系统设计与实现

## 前端 Vue2 + Element UI + Echarts
* vue: 2.6.10
* element-ui: 2.13.2
* echarts: 4.9.0

## 后端 Node + EggJS
* Node: 14.8.0
* egg: 2.15.1

## 服务器 Nginx
* nginx: 1.17.2

## 数据库 MySQL
* mysql: 8.0.16

### 相关数据库表

* 警情表(t_alarm)

  |            列名             |   数据类型   |
  | :-------------------------: | :----------: |
  |            affix            | varchar(255) |
  |      alarmAuditOption       |  varchar(2)  |
  |        alarmCategory        |     int      |
  |        alarmDescribe        |     text     |
  |           alarmNo           | varchar(255) |
  |          alarmProp          |     int      |
  |         alarmStatus         |     int      |
  |         createTime          |     int      |
  |        crimeAddress         | varchar(255) |
  |          crimeCity          | varchar(255) |
  |          crimeTime          |     int      |
  |         fraudAmount         |    double    |
  |             id              | varchar(255) |
  |      informantAddress       | varchar(255) |
  |        informantAge         |     int      |
  |    informantBankAccount     | varchar(255) |
  |       informantGender       |     int      |
  |       informantIdCard       | varchar(255) |
  |        informantJob         | varchar(255) |
  |       informantMobile       | varchar(255) |
  |        informantName        | varchar(255) |
  |    informantOtherConcact    | varchar(255) |
  |           inputer           | varchar(255) |
  |          isDelete           |     int      |
  |            orgId            | varchar(255) |
  |        rejectReason         |     text     |
  |          reviewer           | varchar(255) |
  |       suspectsAccount       | varchar(255) |
  | suspectsAccountOrganization | varchar(255) |
  |       suspectsMobile        | varchar(255) |
  |    suspectsOtherConcact     | varchar(255) |
  |       suspectsWebSite       | varchar(255) |
  |         updateTime          |     int      |
  |           yiGeId            |     int      |

* 警情类型表(t_alarm_category)

  |    列名    |   数据类型   |
  | :--------: | :----------: |
  | createTime |     int      |
  |     id     |     int      |
  |  isDelete  |     int      |
  |    name    | varchar(255) |
  | updateTime |     int      |

* 组织机构表(t_organization)

|    列名    |   数据类型   |
| :--------: | :----------: |
|    code    | varchar(255) |
| createTime |     int      |
|     id     | varchar(255) |
|  isDelete  |     int      |
|    name    | varchar(255) |
|    type    |     int      |
| updateTime |     int      |

* 用户表(t_user)

  |    列名    |   数据类型   |
  | :--------: | :----------: |
  | createTime |     int      |
  |     id     | varchar(32)  |
  |  isDelete  |     int      |
  |   mobile   | varchar(11)  |
  |  nickname  | varchar(255) |
  |   orgId    | varchar(255) |
  |  password  | varchar(255) |
  |    role    | varchar(255) |
  | updateTime |     int      |
  |  username  | varchar(20)  |

* 银行查控表(t_bank)

  |       列名        |   数据类型   |
  | :---------------: | :----------: |
  |      account      | varchar(255) |
  |    accountType    |     int      |
  |       affix       | varchar(255) |
  |      alarmId      | varchar(255) |
  |      alarmNo      | varchar(255) |
  |      bankId       | varchar(255) |
  |    createTime     |     int      |
  |     crimeTime     |     int      |
  |        id         | varchar(255) |
  |     isDelete      |     int      |
  |      operate      | varchar(255) |
  |      remark       |     text     |
  |      status       |     int      |
  | stopPaymentAmount |    double    |
  |    updateTime     |     int      |

* 电话查控表(t_mobile)

  |       列名        |   数据类型   |
  | :---------------: | :----------: |
  |       affix       | varchar(255) |
  |   alarmDescribe   |     text     |
  |      alarmId      | varchar(255) |
  |      alarmNo      | varchar(255) |
  |    createTime     |     int      |
  |     crimeTime     |     int      |
  |        id         | varchar(255) |
  |  informantMobile  | varchar(255) |
  |     isDelete      |     int      |
  |      operate      | varchar(255) |
  |      remark       |     text     |
  |      status       |     int      |
  | stopPaymentAmount |    double    |
  |  suspectsMobile   | varchar(255) |
  |    updateTime     |     int      |

* 网站查控表(t_website)

  |       列名        |   数据类型   |
  | :---------------: | :----------: |
  |       affix       | varchar(255) |
  |      alarmId      | varchar(255) |
  |      alarmNo      | varchar(255) |
  |    createTime     |     int      |
  |     crimeTime     |     int      |
  |        id         | varchar(255) |
  |     isDelete      |     int      |
  |      operate      | varchar(255) |
  |      remark       |     text     |
  |      status       |     int      |
  | stopPaymentAmount |    double    |
  |    updateTime     |     int      |
  |      website      | varchar(255) |

* 虚拟账号查控表(t_virtual)

  |       列名        |   数据类型   |
  | :---------------: | :----------: |
  |      account      | varchar(255) |
  |       affix       | varchar(255) |
  |      alarmId      | varchar(255) |
  |      alarmNo      | varchar(255) |
  |    createTime     |     int      |
  |     crimeTime     |     int      |
  |        id         | varchar(255) |
  |     isDelete      |     int      |
  |      operate      | varchar(255) |
  |   organization    | varchar(255) |
  |      remark       |     text     |
  |      status       |     int      |
  | stopPaymentAmount |    double    |
  |    updateTime     |     int      |

* 银行卡号表(t_bankcard)

  |    列名    |   数据类型   |
  | :--------: | :----------: |
  |   bankId   | varchar(255) |
  | createTime |     int      |
  |     id     | varchar(255) |
  |  isDelete  |     int      |
  |    name    | varchar(255) |
  |   prefix   | varchar(255) |
  | updateTime |     int      |

* 文件表(t_file)

  |    列名    |   数据类型   |
  | :--------: | :----------: |
  |  createBy  | varchar(255) |
  | createTime |     int      |
  |  filename  | varchar(255) |
  |     id     |     int      |
  |  isDelete  |     int      |
  |    path    | varchar(255) |
  |    size    | varchar(255) |
  |    type    | varchar(255) |
  | updateTime |     int      |

* 天气表(t_weather)

  |    列名     |   数据类型   |
  | :---------: | :----------: |
  |    city     | varchar(255) |
  | createTime  |     int      |
  |    date     | varchar(255) |
  |   fengli    | varchar(255) |
  |  fengxiang  | varchar(255) |
  |   ganmao    | varchar(255) |
  |    high     | varchar(255) |
  |     id      | varchar(255) |
  |     low     | varchar(255) |
  |    type     | varchar(255) |
  | updateTime  |     int      |
  | weatherDate | varchar(255) |
  |    wendu    | varchar(255) |

* ~~反诈一哥表(t_yige)~~

_备注：注释这里就不导出了，详细的可以楼下看sql里的注释。这里面反诈一哥表是接入第三方数据源，利用egg的定时任务分别定时拉取和定时清洗里面的数据处理转换到警情表中。
一些原因，笔者已删除不做分享，为演示eggjs的定时任务，笔者用了一张新表天气表，嘿嘿。_

### 建库脚本
* [anti-fraud.sql](./database/anti-fraud.sql)

## 部署 Docker
* [前端-Dockerfile](./anti-fraud-system-fe/Dockerfile)

* [后端-Dockerfile](./anti-fraud-system-be/Dockerfile)

* [MYSQL-Dockerfile](./database/Dockerfile)

* [docker-compose.yml](./docker-compose.yml)

  


## 参考文献

* [Dockerfile的编写](https://docs.docker.com/compose/compose-file/compose-file-v3/)

* [eggjs官方文档](https://eggjs.github.io/zh/guide/)

* [vue.js官方文档](https://vuejs.org/v2/guide/)

* [vue-element-admin官方文档](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/)