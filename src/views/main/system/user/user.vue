<template>
  <div class="user">
    <user-search @search-handle="searchFn"></user-search>
    <user-content></user-content>
    <user-modal></user-modal>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/UserSearch.vue'
import UserContent from './c-cpns/UserContent.vue'
import UserModal from './c-cpns/UserModal.vue'

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
