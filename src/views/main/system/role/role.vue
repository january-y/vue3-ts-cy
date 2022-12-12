<template>
  <div class="role">
    <page-search :searchConfig="searchConfig"></page-search>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/PageSearch.vue'
import searchConfig from './config/search.config'
</script>

<style lang="less" scoped>
.role {
  color: red;
}
</style>
