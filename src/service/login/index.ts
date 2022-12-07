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

export function getUserInfoById(id: number) {
  return axRequest.get({
    url: `/users/${id}`,
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache('token'),
    // },
  })
}

export function getUserMenusByRoleId(id: number) {
  return axRequest.get({
    url: `/role/${id}/menu`,
  })
}
