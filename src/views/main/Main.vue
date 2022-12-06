<template>
  <div class="main">
    <h2>main</h2>
    <h2>{{ counterStore.counter }}--{{ counterStore.doubleCounter }}</h2>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()
</script>

<style lang="less" scoped>
.main {
  color: skyblue;
}
</style>
