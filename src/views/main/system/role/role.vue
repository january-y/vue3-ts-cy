<template>
  <div class="role">
    <page-search :searchConfig="searchConfig"></page-search>
    <page-content :contentConfig="contentConfig"></page-content>
    <page-modal :modalConfig="modalConfig"></page-modal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/PageSearch.vue'
import searchConfig from './config/search-config'
import PageContent from '@/components/paeg-content/PageContent.vue'
import contentConfig from './config/content-config'
import PageModal from '@/components/page-modal/PageModal.vue'
import modalConfig from './config/modal-config'
</script>

<style lang="less" scoped>
.role {
  color: red;
}
</style>
