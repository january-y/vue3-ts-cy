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

export { mapPathToMenu, mapPathToBread }
