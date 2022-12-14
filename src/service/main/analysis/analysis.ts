import { axRequest } from '@/service'

export function getAmountListData() {
  return axRequest.get({
    url: '/goods/amount/list',
  })
}
