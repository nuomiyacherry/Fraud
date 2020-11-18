import storage from 'utils/storage'
import chartColors from 'constants/chartColors'
import chartColors41 from 'constants/chartColors41'
export default {
  menus: storage.get('menus') || [], // 所有导航
  originMenus: storage.get('originMenus') || [], // 原始从后台请求的菜单
  // nav: storage.nav || [], // 一级导航
  activeMenu: storage.get('activeMenu') || [], // 二级导航
  title: storage.get('title') || '互联网诈骗信息共享和协同联动系统',
  bg: storage.get('bg') || 'bg',
  theme: storage.get('theme') || 'skin-bluish',
  tColors: storage.get('tColors') || process.env.VUE_APP_RATIO === 'ratio41' ? chartColors41['skin-bluish'] : chartColors['skin-bluish'],
  count: storage.get('count') || 0,
  ratio: storage.get('ratio') || false,
  workspaceHeight: storage.get('workspaceHeight') || 0
}
