import { axRequest } from '@/service'

export function getUserListData(query: any) {
  return axRequest.post({
    url: '/users/list',
    data: query,
  })
}
