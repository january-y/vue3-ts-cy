import { deleteUserById, getUserListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSystemStore = defineStore(
  'system',
  () => {
    let userList = ref<any>(null)
    let userTotalCount = ref<any>(null)

    // 拿数据
    const getUserListAction = async (query: any) => {
      const userListData = await getUserListData(query)
      const { list, totalCount } = userListData.data
      // console.log(userListData.data)

      userList.value = list
      userTotalCount.value = totalCount
    }

    const deleteUserByIdAction = async (id: number) => {
      const result = await deleteUserById(id)
      console.log(result)
      // 刷新数据
      getUserListAction({ offset: 1, size: 10 })
    }

    return { userList, userTotalCount, getUserListAction, deleteUserByIdAction }
  },
  {
    persist: true,
  },
)

export default useSystemStore
