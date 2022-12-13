<template>
  <div class="menu">
    <page-content :content-config="contentConfig"></page-content>
  </div>
</template>

<script setup lang="ts" name="menu">
import PageContent from '@/components/paeg-content/PageContent.vue'
import contentConfig from './config/content.config'
</script>

<style scoped>
.menu {
}
</style>
