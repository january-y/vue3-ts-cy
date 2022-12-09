import { getUserListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSystemStore = defineStore(
  'system',
  () => {
    let userList = ref<any>(null)
    let userTotalCount = ref<any>(null)

    const getUserListAction = async () => {
      const userListData = await getUserListData()
      const { list, totalCount } = userListData.data
      userList.value = list
      userTotalCount.value = totalCount
    }

    return { userList, userTotalCount, getUserListAction }
  },
  {
    persist: true,
  },
)

export default useSystemStore
