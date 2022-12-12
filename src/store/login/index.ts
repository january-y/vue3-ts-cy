import {
  getUserInfoById,
  getUserMenusByRoleId,
  type LoginRequest,
} from './../../service/login/index'
import { accountLoginRequest } from '@/service/login'
import { defineStore } from 'pinia'
import { localCache } from '@/utils/cache'
import router from '@/router/index'
import useMainStore from '../main/main'
// import type { RouteRecordRaw } from 'vue-router'

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

      // 加载所有角色和部门数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 路由
      localCache.setCache('localRoutes', [])
      const localRoutes = localCache.getCache('localRoutes')
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
      let firstMenu: any = null
      for (const menu of this.userMenu) {
        for (const submenu of menu.children) {
          const route = localRoutes.find(
            (item: any) => item.path === submenu.url,
          )
          if (firstMenu === null && route) firstMenu = route
          if (route) router.addRoute('main', route)
        }
      }

      // login
      router.push(firstMenu)
    },
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenus
      }

      localCache.setCache('localRoutes', [])
      const localRoutes = localCache.getCache('localRoutes')
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
        let routeFlag: any = ''
        for (const submenu of menu.children) {
          const route = localRoutes.find(
            (item: any) => item.path === submenu.url,
          )
          // 路由添加重定向
          if (routeFlag === '') {
            router.addRoute(menu.url, {
              path: menu.url,
              redirect: submenu.url,
            })
          }
          routeFlag = menu.url

          if (route) {
            // router.addRoute()
            router.addRoute('main', route)
          }
        }
      }

      // 加载所有角色和部门数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
  },
})

export default useLoginStore
