<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="i in amountList" :key="i.amount">
        <el-col :span="6">
          <count-card
            :title="i.title"
            :subtitle="i.subtitle"
            :number1="i.number1"
            :number2="i.number2"
            :tips="i.tips"
            :amount="i.amount"
          ></count-card>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import useAnalysisStore from '@/store/main/analysis/analysis'
import countCard from './c-cpns/count-card.vue'
import { storeToRefs } from 'pinia'

const analysisStore = useAnalysisStore()
analysisStore.getAmountListDataAction()
const { amountList } = storeToRefs(analysisStore)
</script>

<style lang="less" scoped>
.dashboard {
}
</style>
