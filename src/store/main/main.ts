import { getEntireDepartments, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useMainStore = defineStore(
  'main',
  () => {
    let entireRoles: any = ref('')
    let entireDepartments: any = ref('')

    //保存数据
    const fetchEntireDataAction = async () => {
      const roleResults = await getEntireRoles()
      const departmentResults = await getEntireDepartments()
      entireRoles.value = roleResults.data.list
      entireDepartments.value = departmentResults.data.list
      console.log(entireRoles.value, entireDepartments.value)
    }

    return { entireDepartments, entireRoles, fetchEntireDataAction }
  },
  {
    persist: true,
  },
)

export default useMainStore
