<template>
  <el-row>
    <el-col v-if="canUpload" :span="24">
      <el-upload
        ref="upload"
        :action="url"
        drag
        :limit="9"
        name="affix"
        :multiple="true"
        :auto-upload="false"
        :with-credentials="true"
        :on-error="onError"
        :file-list="fileList"
        :on-remove="onRemove"
        :on-change="onChange"
        :on-exceed="onExceed"
        :on-success="onSuccess"
        :on-preview="onPreview"
        :before-upload="beforeUpload"
        :before-remove="beforeRemove"
        :on-progress="onProgress"
        :headers="headers"
      >
        <!-- <el-button size="small" type="primary">选择文件</el-button> -->
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>选择文件</em></div>
        <div slot="tip" class="el-upload__tip">
          文件格式不限，一次最多只能上传9个文件，单个文件允许最大100MB
        </div>
      </el-upload>
    </el-col>
    <el-col v-if="canUpload" style="margin: 10px auto;">
      <el-button
        size="small"
        type="primary"
        @click="upload"
      >确认上传</el-button>
    </el-col>
    <el-col :span="24">
      <el-table
        ref="table"
        border
        :data="data"
        style="width: 100%; margin: 20px auto;"
      >
        <template v-for="column in mapColumns">
          <template v-if="column.key === 'actions'">
            <el-table-column
              :key="column.key"
              align="center"
              :label="column.title"
            >
              <template slot-scope="scope">
                <el-button
                  v-for="action in column.actions"
                  :key="action.type"
                  type="text"
                  size="small"
                  @click="handleClick(scope.row, action.type, action.title)"
                >{{ action.title }}</el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="column.key === 'NO'">
            <el-table-column
              :key="column.key"
              type="index"
              width="80"
              align="center"
              :label="column.title"
            />
          </template>
          <template v-else>
            <el-table-column
              :key="column.key"
              :prop="column.key"
              align="center"
              :label="column.title"
            />
          </template>
        </template>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import Cookies from 'js-cookie'
import { getByIds } from '@/api/file'
import { formatDate } from '@/utils/tools'

export default {
  name: 'TableFile',
  props: {
    canUpload: { type: Boolean, default: true },
    canDelete: { type: Boolean, default: true },
    canDownload: { type: Boolean, default: true },
    columns: { type: Array, default: () => [] },
    affix: { type: String, default: '' }
  },
  data() {
    return {
      fileList: [],
      data: [],
      ids: [],
      headers: {
        'x-csrf-token': Cookies.get('csrfToken')
      },
      mapColumns: [],
      url: process.env.VUE_APP_UPLOAD_API
    }
  },
  watch: {
    affix: {
      async handler(newAffix) {
        this.data = []
        this.ids = []
        if (newAffix) {
          this.ids = newAffix.split(',').map(id => Number(id))
          if (this.ids.length > 0) {
            const { data } = await getByIds({ ids: this.ids })
            this.data = data.map(item => {
              const { createTime, ...rest } = item
              return {
                createTime: formatDate(
                  'YYYY-MM-DD HH:mm:ss',
                  createTime * 1000
                ),
                ...rest
              }
            })
          }
        }
      },
      immediate: true
    },
    canDelete: {
      handler(newVal) {
        if (newVal) {
          this.mapColumns = JSON.parse(JSON.stringify(this.columns))
        } else {
          if (this.mapColumns[this.mapColumns.length - 1]) {
            this.mapColumns[this.mapColumns.length - 1].actions = [
              {
                title: '下载',
                type: 'download'
              }
            ]
          }
        }
      },
      immediate: true
    }
  },
  created() {
    this.mapColumns = JSON.parse(JSON.stringify(this.columns))
    if (!this.canDelete) {
      if (this.mapColumns[this.mapColumns.length - 1]) {
        this.mapColumns[this.mapColumns.length - 1].actions = [
          {
            title: '下载',
            type: 'download'
          }
        ]
      }
    }
  },
  methods: {
    beforeUpload(file, fileList) {
      console.log('beforeUpload: ', file, fileList)
    },
    onSuccess(response, file, fileList) {
      const {
        data: { id, createTime, ...rest }
      } = response
      this.data.push({
        id,
        createTime: formatDate('YYYY-MM-DD HH:mm:ss', createTime * 1000),
        ...rest
      })
      this.ids.push(id)
      this.clear()
    },
    onError(err, file, fileList) {
      console.log(err, file, fileList)
    },
    onPreview(file, fileList) {
      console.log('onPreview: ', file, fileList)
    },
    beforeRemove(file, fileList) {
      console.log('beforeRemove: ', file, fileList)
    },
    onExceed(files, fileList) {
      console.log('onExceed: ', files, fileList)
      // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    onRemove(file, fileList) {
      console.log('onRemove: ', file, fileList)
    },
    onChange(file, fileList) {
      console.log('onChange: ', file, fileList)
    },
    onProgress(file, fileList) {
      console.log('onProgress: ', file, fileList)
    },
    upload() {
      this.$refs.upload.submit()
    },
    clear() {
      this.$refs.upload.clearFiles()
      this.fileList = []
    },
    handleClick(row, type, title) {
      this.$emit('click-action', row, type, title)
    },
    deleteData(id) {
      const index = this.ids.indexOf(id)
      this.ids.splice(index, 1)
      this.data.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
</style>
