<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'App',
  created() {
    request({
      method: 'head',
      url: '/'
    })
  }
}
</script>
