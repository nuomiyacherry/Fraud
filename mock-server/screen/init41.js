function menus() {
  // eslint-disable-line
  return [
    {
      children: [
        {
          fatherId: Math.floor(Math.random() * 10000 + Math.random() * 10),
          id: Math.floor(Math.random() * 10000 + Math.random() * 10),
          isNewWindow: false,
          isVisible: true,
          menuCode: 'nav',
          menuIcon: 'fa fa-edit',
          menuName: '导航',
          menuPath: '/nav',
          homePage: true,
          orderNum: 0,
          childrenVisible: false
        },
        {
          fatherId: Math.floor(Math.random() * 10000 + Math.random() * 10),
          id: Math.floor(Math.random() * 10000 + Math.random() * 10),
          isNewWindow: false,
          isVisible: true,
          menuCode: 'home',
          menuIcon: 'fa fa-edit',
          menuName: '综合态势',
          menuPath: '/home',
          homePage: false,
          orderNum: 1,
          childrenVisible: false
        },
        {
          fatherId: Math.floor(Math.random() * 10000 + Math.random() * 10),
          id: Math.floor(Math.random() * 10000 + Math.random() * 10),
          isNewWindow: false,
          isVisible: true,
          menuCode: 'coordination',
          menuIcon: 'fa fa-edit',
          menuName: '监测处置',
          menuPath: '/coordination',
          homePage: false,
          orderNum: 2,
          childrenVisible: false
        },
        {
          fatherId: Math.floor(Math.random() * 10000 + Math.random() * 10),
          id: Math.floor(Math.random() * 10000 + Math.random() * 10),
          isNewWindow: false,
          isVisible: true,
          menuCode: 'analysis',
          menuIcon: 'fa fa-edit',
          menuName: '深度分析',
          menuPath: '/analysis',
          homePage: false,
          orderNum: 3,
          childrenVisible: false
        },
        {
          fatherId: Math.floor(Math.random() * 10000 + Math.random() * 10),
          id: Math.floor(Math.random() * 10000 + Math.random() * 10),
          isNewWindow: false,
          isVisible: true,
          menuCode: 'aggregation',
          menuIcon: 'fa fa-edit',
          menuName: '部省对接',
          menuPath: '/aggregation',
          homePage: false,
          orderNum: 4,
          childrenVisible: false
        }
      ],
      fatherId: Math.floor(Math.random() * 10000 + Math.random() * 10),
      id: Math.floor(Math.random() * 10000 + Math.random() * 10),
      isNewWindow: false,
      isVisible: true,
      menuCode: 'index',
      menuIcon: 'fa fa-edit',
      menuName: '工信部防范治理互联网诈骗信息共享和协同联动系统',
      menuPath: '/',
      orderNum: 0,
      treeNodeType: 'Branch'
    }
  ]
}
module.exports.menus = menus
