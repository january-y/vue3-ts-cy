import { axRequest } from '@/service'

export function getUserListData(query: any) {
  return axRequest.post({
    url: '/users/list',
    data: query,
  })
}

export function deleteUserById(id: number) {
  return axRequest.delete({
    url: `/users/${id}`,
  })
}
