import { getUserListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSystemStore = defineStore(
  'system',
  () => {
    let userList = ref<any>(null)
    let userTotalCount = ref<any>(null)

    const getUserListAction = async (query: any) => {
      const userListData = await getUserListData(query)
      const { list, totalCount } = userListData.data
      // console.log(userListData.data)

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
