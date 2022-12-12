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

export function newUserData(userInfo: any) {
  return axRequest.post({
    url: '/users',
    data: userInfo,
  })
}

export function editUserData(id: number, userData: any) {
  return axRequest.patch({
    url: `/users/${id}`,
    data: userData,
  })
}

export function getPageListData(pageName: string, queryInfo: any) {
  return axRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo,
  })
}

export function deletePageById(pageName: string, id: number) {
  return axRequest.delete({
    url: `/${pageName}/${id}`,
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return axRequest.post({
    url: `/${pageName}`,
    data: pageInfo,
  })
}

export function editPageData(pageName: string, id: number, pageData: any) {
  return axRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageData,
  })
}
