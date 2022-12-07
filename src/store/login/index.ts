import {
  getUserInfoById,
  getUserMenusByRoleId,
  type LoginRequest,
} from './../../service/login/index'
import { accountLoginRequest } from '@/service/login'
import { defineStore } from 'pinia'
import { localCache } from '@/utils/cache'
import router from '@/router/index'

interface IResult {
  token?: string
  userInfo: any
  userMenu: any
}

const useLoginStore = defineStore('login', {
  state: (): IResult => ({
    token: localCache.getCache('token') ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenu: localCache.getCache('userMenus') ?? [],
  }),
  actions: {
    async loginAccountAction(account: LoginRequest) {
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache('token', this.token)
      // 验证权限
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data
      // 获取菜单
      const userMenuResult = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenu = userMenuResult.data

      localCache.setCache('userInfo', userInfoResult.data)
      localCache.setCache('userMenus', userMenuResult.data)
      // login
      router.push('/main')
    },
  },
})

export default useLoginStore
