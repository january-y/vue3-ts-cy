import type { LoginRequest } from './../../service/login/index'
import { accountLoginRequest } from '@/service/login'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: '',
  }),
  actions: {
    async loginAccountAction(account: LoginRequest) {
      const loginResult = await accountLoginRequest(account)
      this.id = loginResult.data.data.id
      this.token = loginResult.data.data.token
      this.name = loginResult.data.data.name
      console.log(loginResult.data)
      console.log(loginResult.data.data)
    },
  },
})

export default useLoginStore
