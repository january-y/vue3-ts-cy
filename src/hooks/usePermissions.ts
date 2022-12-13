import useLoginStore from '@/store/login'

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore

  // !!取反两次，转布尔值
  return !!permissions.find((item: any) => item.includes(permissionID))
}

export default usePermissions
