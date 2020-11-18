import storage from 'utils/storage'
export const exec = (menus, routes, errors) => {
  let [mRoutes, layout, children, indexPath, rMenus] = [[], routes[`/layout`], [], '', {}]
  menus.forEach(firstMenu => {
    if (firstMenu.menuPath === '/') {
      firstMenu.children.forEach(secondMenu => {
        if (secondMenu.homePage) {
          if (secondMenu.children && secondMenu.children.length !== 0) {
            indexPath = secondMenu.children[0].menuPath
          } else {
            indexPath = secondMenu.menuPath
          }
        }
        const c = routes[secondMenu.menuPath] || routes['/wrapperView']
        const r = {
          ...menuToRoute(secondMenu, c),
          children: []
        }
        eachMenus(secondMenu, routes, r.children)
        children.push(r)
      })
      rMenus = {
        path: firstMenu.menuPath,
        redirect: indexPath,
        component: layout,
        children,
        name: firstMenu.menuCode,
        meta: {
          title: firstMenu.menuName
        },
        // isDefault: firstMenu.isDefault,
        isNewWindow: false,
        childrenVisible: true
      }
      mRoutes.push(rMenus)
    } else {
      mRoutes.push(menuToRoute(firstMenu, routes[firstMenu.menuPath]))
    }
  })
  errors && errors.length && mRoutes.push(...errors)
  genLastRoutes(rMenus.children)
  console.log(mRoutes, 'routes ----------')
  return mRoutes
}

const menuToRoute = (menu, component) => {
  return {
    path: menu.menuPath,
    name: menu.menuCode,
    icon: menu.menuIcon,
    redirect: menu.redirect,
    detailPage: menu.detailPage,
    meta: {
      title: menu.menuName
    },
    hidden: !menu.isVisible,
    isNewWindow: menu.isNewWindow,
    childrenVisible: menu.childrenVisible,
    component: component,
    id: menu.id,
    security: menu.security
  }
}

const eachMenus = (menu, routes, res) => {
  if (menu.children) {
    menu.children.forEach(nextMenu => {
      const _menu = menuToRoute(nextMenu, routes[nextMenu.menuPath] || routes['/wrapperView'])
      res.push(_menu)
      if (nextMenu.children) {
        _menu.children = []
      }
      eachMenus(nextMenu, routes, _menu.children)
    })
  }
}
const setLastRoute = (menu, lastRoutes) => {
  if (!menu.children) return
  menu.children.forEach(subMenu => {
    if (subMenu.detailPage) {
      !lastRoutes.includes(subMenu.path) && lastRoutes.push(subMenu.path)
    }
    setLastRoute(subMenu, lastRoutes)
  })
}

export const genLastRoutes = menus => {
  // 最后一及路由，用于存储返回上一级路由的标记
  const lastRoutes = storage.get('lastRoutes') || []

  menus.forEach(menu => {
    if (!menu.hidden) {
      setLastRoute(menu, lastRoutes)
    }
  })
  storage.set('lastRoutes', lastRoutes)
}
