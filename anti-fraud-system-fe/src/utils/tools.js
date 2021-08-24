import dayjs from 'dayjs'
import _ from 'lodash'

// 比较两个值是否相等
export const isEqual = function(foo, bar) {
  return _.isEqual(foo, bar)
}

// 获取数组、对象、字符串的长度
export const getLength = function(data) {
  return _.size(data)
}

// 判断数组长度是否相等
export const compareArrayLength = function(foo, bar) {
  return getLength(foo) === getLength(bar)
}

// 计算年份段
export const calculateYearOptions = function(start = 2021) {
  const end = dayjs().year() + 1
  const res = []
  let key = 0
  for (let i = start; i <= end; i++) {
    res.unshift({
      key: key,
      value: i.toString()
    })
    key++
  }
  return res
}

// 获取浏览器Storage的方法
export const getStorageItem = function(storage, key) {
  storage.getItem(key)
}

// 深拷贝
export const deepClone = function(source) {
  return _.cloneDeep(source)
}

export const formatDate = function(
  template = 'YYYY-MM-DD HH:mm:ss',
  date = Date.now()
) {
  if (!date) {
    return ''
  }
  return dayjs(date).format(template)
}

export const transformDate = function(date) {
  return dayjs(date).unix()
}

// 获取文件格式

export const getFileSuffix = function(filename) {
  return filename.substring(filename.lastIndexOf('.') + 1)
}

export const downloadFile = (filename, link) => {
  const DownloadLink = document.createElement('a')
  DownloadLink.style = 'display: none' // 创建一个隐藏的a标签
  DownloadLink.target = '_blank'
  DownloadLink.download = filename
  DownloadLink.href = link
  document.body.appendChild(DownloadLink)
  DownloadLink.click() // 触发a标签的click事件
  document.body.removeChild(DownloadLink)
}

export const getCurrentMonthRange = () => {
  const end = dayjs().format('YYYY-MM')
  const start = `${dayjs().year()}-01`
  return {
    start,
    end
  }
}

export const generateAlarmNo = () => {
  const timestamp = dayjs().unix()
  return `HZGA${timestamp}`
}

export const getNo = function() {
  return Math.random()
    .toString()
    .substr(2, 3)
}
