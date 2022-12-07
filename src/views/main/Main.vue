<template>
  <div class="main">
    <h2>main</h2>
    <button @click="handExitLogin">退出登入</button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()
function handExitLogin() {
  localCache.removeCache('token')
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main {
  color: skyblue;
}
</style>
