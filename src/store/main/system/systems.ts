import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  getPageListData,
  getUserListData,
  newPageData,
  newUserData,
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useSystemStore = defineStore(
  'system',
  () => {
    let userList = ref<any>(null)
    let userTotalCount = ref<any>(null)

    // global
    let pageList = ref<any>(null)
    let pageTotalCount = ref<any>(0)

    // 拿数据
    const getUserListAction = async (query: any) => {
      const userListData = await getUserListData(query)
      const { list, totalCount } = userListData.data
      // console.log(userListData.data)

      userList.value = list
      userTotalCount.value = totalCount
    }

    const deleteUserByIdAction = async (id: number) => {
      await deleteUserById(id)
      // 刷新数据
      getUserListAction({ offset: 0, size: 10 })
    }

    const newUserDataAction = async (userInfo: any) => {
      newUserData(userInfo)
      // 刷新数据
      getUserListAction({ offset: 0, size: 10 })
    }

    const editUserDataAction = async (id: number, userData: any) => {
      editUserData(id, userData)
      // 刷新数据
      getUserListAction({ offset: 0, size: 10 })
    }

    const getPageListDataAction = async (pageName?: any, query?: any) => {
      const pageResult = await getPageListData(pageName, query)
      const { list, totalCount } = pageResult.data

      pageTotalCount.value = totalCount
      pageList.value = list
    }

    const deletePageByIdAction = async (pageName: string, id: number) => {
      const res = await deletePageById(pageName, id)
      console.log(res)
      // 刷新数据
      getPageListDataAction('department', { size: 10, offset: 0 })
    }

    const newPageDataAction = async (pageName: string, pageInfo: any) => {
      const result = await newPageData(pageName, pageInfo)
      console.log(result)
      // 刷新数据
      getPageListDataAction('department', { size: 10, offset: 0 })
    }

    const editPageDataAction = async (
      pageName: string,
      id: number,
      pageData: any,
    ) => {
      const res = editPageData(pageName, id, pageData)
      console.log(res)
      // 刷新数据
      getPageListDataAction('department', { size: 10, offset: 0 })
    }

    return {
      userList,
      userTotalCount,
      getUserListAction,
      deleteUserByIdAction,
      newUserDataAction,
      editUserDataAction,
      pageList,
      pageTotalCount,
      getPageListDataAction,
      deletePageByIdAction,
      newPageDataAction,
      editPageDataAction,
    }
  },
  {
    persist: true,
  },
)

export default useSystemStore
