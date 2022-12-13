<template>
  <div class="role">
    <page-search :searchConfig="searchConfig"></page-search>
    <page-content :contentConfig="contentConfig"></page-content>
    <page-modal :modalConfig="modalConfig" :otherInfo="otherInfo">
      <template #menulist>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleElCheck"
        />
      </template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/PageSearch.vue'
import searchConfig from './config/search-config'
import PageContent from '@/components/paeg-content/PageContent.vue'
import contentConfig from './config/content-config'
import PageModal from '@/components/page-modal/PageModal.vue'
import modalConfig from './config/modal-config'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

const otherInfo = ref<any>({})
function handleElCheck(params1: any, params2: any) {
  const menuList = [...params2.checkedKeys, ...params2.halfCheckedKeys]
  otherInfo.value = { ...menuList }
}
</script>

<style lang="less" scoped>
.role {
  color: red;
}
</style>
