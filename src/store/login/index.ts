import {
  getUserInfoById,
  getUserMenusByRoleId,
  type LoginRequest,
} from './../../service/login/index'
import { accountLoginRequest } from '@/service/login'
import { defineStore } from 'pinia'
import { localCache } from '@/utils/cache'
import router from '@/router/index'
import type { RouteRecordRaw } from 'vue-router'

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

      // 路由
      const localRoutes: RouteRecordRaw[] = []
      // 获取all路由ts文件
      const files: Record<string, any> = import.meta.glob(
        '../../router/main/**/*.ts',
        {
          eager: true,
        },
      )
      for (const key in files) {
        const module = files[key]
        localRoutes.push(module.default)
      }
      // 根据菜单匹配路由
      for (const menu of this.userMenu) {
        for (const submenu of menu.children) {
          const route = localRoutes.find((item) => item.path === submenu.url)
          if (route) router.addRoute('main', route)
        }
      }

      // login
      router.push('/main')
    },
  },
})

export default useLoginStore
