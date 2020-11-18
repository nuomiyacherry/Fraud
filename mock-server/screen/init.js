function menus() { // eslint-disable-line
  return [
    {
      children: [
        {
          fatherId: Math.floor(Math.random() * 10000 + Math.random() * 10),
          id: Math.floor(Math.random() * 10000 + Math.random() * 10),
          isNewWindow: false,
          isVisible: true,
          menuCode: 'home',
          menuIcon: 'fa fa-edit',
          menuName: '综合态势',
          menuPath: '/home',
          homePage: true,
          orderNum: 1,
          childrenVisible: false
        },
        {
          fatherId: Math.floor(Math.random() * 10000 + Math.random() * 10),
          id: Math.floor(Math.random() * 10000 + Math.random() * 10),
          isNewWindow: false,
          isVisible: true,
          menuCode: 'aggregation',
          menuIcon: 'fa fa-edit',
          menuName: '数据汇聚',
          menuPath: '/aggregation',
          homePage: false,
          orderNum: 2,
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
          orderNum: 3,
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
        // {
        //   'fatherId': Math.floor(Math.random() * 10000 + Math.random() * 10),
        //   'id': Math.floor(Math.random() * 10000 + Math.random() * 10),
        //   'isNewWindow': false,
        //   'isVisible': true,
        //   'menuCode': 'monitor',
        //   'menuIcon': 'fa fa-edit',
        //   'menuName': '监测预警',
        //   'menuPath': '/monitor',
        //   'homePage': false,
        //   'orderNum': 3,
        //   'childrenVisible': false
        // },
        {
          fatherId: Math.floor(Math.random() * 10000 + Math.random() * 10),
          id: Math.floor(Math.random() * 10000 + Math.random() * 10),
          isNewWindow: false,
          isVisible: true,
          menuCode: 'special',
          menuIcon: 'fa fa-edit',
          menuName: '涉缅专题',
          menuPath: '/special',
          homePage: false,
          orderNum: 3,
          childrenVisible: false
        },
        {
          fatherId: Math.floor(Math.random() * 10000 + Math.random() * 10),
          id: Math.floor(Math.random() * 10000 + Math.random() * 10),
          isNewWindow: false,
          isVisible: true,
          menuCode: 'overview',
          menuIcon: 'fa fa-edit',
          menuName: '电诈专题',
          menuPath: '/overview',
          homePage: false,
          orderNum: 3,
          childrenVisible: false
        }
      ],
      fatherId: Math.floor(Math.random() * 10000 + Math.random() * 10),
      id: Math.floor(Math.random() * 10000 + Math.random() * 10),
      isNewWindow: false,
      isVisible: true,
      menuCode: 'index',
      menuIcon: 'fa fa-edit',
      menuName: '防范治理互联网诈骗信息共享和协同联动系统',
      menuPath: '/',
      orderNum: 0,
      treeNodeType: 'Branch'
    }
  ]
}
module.exports.menus = menus
