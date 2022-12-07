import type { LoginRequest } from './../../service/login/index'
import { accountLoginRequest } from '@/service/login'
import { defineStore } from 'pinia'
import { localCache } from '@/utils/cache'
import router from '@/router/index'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: localCache.getCache('token') ?? '',
  }),
  actions: {
    async loginAccountAction(account: LoginRequest) {
      const loginResult = await accountLoginRequest(account)
      this.id = loginResult.data.id
      this.token = loginResult.data.token
      this.name = loginResult.data.name
      // 本地存储token
      // localStorage.setItem('token', this.token)
      localCache.setCache('token', this.token)
      // login
      router.push('/main')
    },
  },
})

export default useLoginStore
