<template>
  <div>
    <el-row class="top">
      <el-col :span="24">
        <el-row>
          <el-col :span="12">
            <div
              v-if="title"
              class="title"
            >
              {{ title }}
            </div>
          </el-col>
          <el-col
            :span="12"
            class="btn-group"
          >
            <slot name="topExtra" />
            <el-col />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="24">
        <slot name="tab" />
      </el-col>
    </el-row>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonContainer',
  props: {
    title: { type: String, default: '' }
  }
}
</script>

<style lang="scss" scoped>
.top {
  padding: 15px;
  min-height: 100px;
  background-color: #fff;
  box-shadow: 0 3px 5px -3px rgba(0, 0, 0, 0.1);
}

.title-box {
  height: 100px;
  line-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 30px;
  font-weight: 700;
}
.content {
  margin: 20px 5px 0;
  padding: 20px 10px;
  background: #fff;
}

.btn-group {
  text-align: right;
  padding: 0 10px;
}
</style>
