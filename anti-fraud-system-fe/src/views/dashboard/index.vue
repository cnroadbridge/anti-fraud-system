<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ name }}{{ greeting }}, 欢迎回来 !</div>
    <h2 class="time-box">北京时间： {{ datetime }}</h2>
    <div class="bottom">
      <span>copyright &copy; 2021 ataola</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate } from '@/utils/tools'
export default {
  name: 'Dashboard',
  data() {
    return {
      timer: '',
      datetime: formatDate()
    }
  },
  computed: {
    ...mapGetters(['name', 'roles']),
    greeting() {
      let str = '专员'
      if (this.roles.includes('admin')) {
        str = '管理员'
      } else if (
        this.roles.includes('receiver') ||
        this.roles.includes('receiver2')
      ) {
        str = '警官'
      }
      return str
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.datetime = formatDate()
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    position: relative;
    min-height: 600px;
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.time-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  font-size: 48px;
}

.bottom {
  position: absolute;
  right: 0px;
  bottom: 0px;
  display: block;
  width: 100%;
  text-align: center;
  z-index: 10;
}
.bottom span {
  position: relative;
  display: block;
  left: 0;
  margin-top: 10px;
}
</style>
