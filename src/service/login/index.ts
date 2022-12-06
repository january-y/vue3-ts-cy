import { axRequest } from '..'

export interface LoginRequest {
  name: string
  password: string
}
export function accountLoginRequest(account: LoginRequest) {
  return axRequest.post({
    url: '/login',
    data: account,
  })
}
