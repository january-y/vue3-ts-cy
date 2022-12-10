<template>
  <div class="user">
    <user-search @search-handle="searchFn"></user-search>
    <user-content></user-content>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/UserSearch.vue'
import UserContent from './c-cpns/UserContent.vue'

function searchFn(formData: any) {
  console.log(formData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
