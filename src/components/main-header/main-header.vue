<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconChange">
      <el-icon size="26px">
        <component :is="isFold ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">面包屑</div>
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from '../main-header/c-cps/header-info.vue'
const emit = defineEmits(['onFlodChange'])

let isFold = ref(false)
function handleMenuIconChange() {
  isFold.value = !isFold.value
  emit('onFlodChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
