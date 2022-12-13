import { axRequest } from '..'

export function getEntireRoles() {
  return axRequest.post({
    url: '/role/list',
  })
}

export function getEntireDepartments() {
  return axRequest.post({
    url: '/department/list',
  })
}

export function getEntireMenus() {
  return axRequest.post({
    url: '/menu/list',
  })
}
