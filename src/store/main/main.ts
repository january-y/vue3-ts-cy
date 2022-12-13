import {
  getEntireDepartments,
  getEntireMenus,
  getEntireRoles,
} from '@/service/main/main'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useMainStore = defineStore(
  'main',
  () => {
    let entireRoles: any = ref('')
    let entireDepartments: any = ref('')
    let entireMenus: any = ref()

    //保存数据
    const fetchEntireDataAction = async () => {
      const roleResults = await getEntireRoles()
      const departmentResults = await getEntireDepartments()
      const menuResults = await getEntireMenus()
      entireRoles.value = roleResults.data.list
      entireDepartments.value = departmentResults.data.list
      entireMenus.value = menuResults.data.list
      // console.log(menuResults.data.list)
    }

    return {
      entireDepartments,
      entireRoles,
      entireMenus,
      fetchEntireDataAction,
    }
  },
  {
    persist: true,
  },
)

export default useMainStore
