<template>
  <div class="department">
    <page-search :searchConfig="searchConfig"></page-search>
    <page-content :contentConfig="contentConfig"></page-content>
    <page-modal :modalConfig="modalConfigRef"></page-modal>
  </div>
</template>

<script setup lang="ts" name="department">
import { computed } from 'vue'
// import PageSearch from './c-cpns/PageSearch.vue'
// import PageContent from './c-cpns/PageContent.vue'
// import PageModal from './c-cpns/PageModal.vue'
import PageSearch from '@/components/page-search/PageSearch.vue'
import PageContent from '@/components/paeg-content/PageContent.vue'
import PageModal from '@/components/page-modal/PageModal.vue'
import { searchConfig } from './config/search-config'
import { contentConfig } from './config/content-config'
import modalConfig from './config/modal-config'
import useMainStore from '@/store/main/main'

// 对modalConfig操作，添加部门信息
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item: any) => {
    return { label: item.name, value: item.id }
  })

  modalConfig.formItems.forEach((item: any) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })

  return modalConfig
})
</script>

<style scoped></style>
