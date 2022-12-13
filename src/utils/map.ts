function mapPathToMenu(path: string, userMenus: any) {
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu
      }
    }
  }
}

interface IBreads {
  name?: string
  path?: string
}

function mapPathToBread(path: string, userMenus: any[]) {
  const breads: IBreads[] = []

  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        // 顶层菜单
        breads.push({ name: menu.name, path: menu.url })
        // 匹配菜单
        breads.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }

  return breads
}

/**
 * 从菜单映射到按钮的权限
 * @param menuList 菜单的列表
 * @returns 权限的数组(字符串数组)
 */
function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []

  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)

  return permissions
}

export { mapPathToMenu, mapPathToBread, mapMenusToPermissions }
