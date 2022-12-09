import { axRequest } from '@/service'

export function getUserListData() {
  return axRequest.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10,
    },
  })
}
