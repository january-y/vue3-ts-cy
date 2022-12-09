<template>
  <div class="header-bread">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breads" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login'
import { mapPathToBread } from '@/utils/map'
import { computed } from 'vue'

const route = useRoute()
const loginStore = useLoginStore()
// 计算属性依赖的值改变重新执行，可达到重新渲染
const breads = computed(() => mapPathToBread(route.path, loginStore.userMenu))

// 刷新页面
// watch(
//   () => route.path,
//   () => {
//     router.go(0)
//   },
// )
</script>

<style lang="less" scoped>
.header-bread {
  color: skyblue;
}
</style>
