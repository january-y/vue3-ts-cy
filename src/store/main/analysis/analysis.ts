import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getAmountListData } from '@/service/main/analysis/analysis'

const useAnalysisStore = defineStore(
  'analysis',
  () => {
    const amountList: any = ref([])
    const getAmountListDataAction = async () => {
      const res = await getAmountListData()
      amountList.value = res.data
      console.log(res)
    }

    return { amountList, getAmountListDataAction }
  },
  {
    persist: true,
  },
)

export default useAnalysisStore
