import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueTouchRipple from 'vue-touch-ripple'
import 'vue-touch-ripple/dist/vue-touch-ripple.css'
import store from '@/store'
import axios from 'axios'
import genRouters from './router'
import * as menuToRouter from 'utils/menuToRouter'
import * as utils from 'utils/util'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条 样式
import chartColors from 'constants/chartColors'
import chartColors41 from 'constants/chartColors41'
import globalMixin from 'mixins/globalMixin'
import plugins from 'utils/plugins'
import '@/assets/font/font.css'
import animated from 'animate.css'
import { initPro } from '@/api/common'
// import './assets/iconfont/iconfont.js'
/**
 * 后端联调时，没有实现相应的接口，需要将mock拦截打开，展示前台的mock数据，打开下面的注释即可（如果打包联调，在打包前打开注释）
 * 前端开发时不需要打开此代码
 */
// console.log('process.env.VUE_APP_MOCK', process.env.VUE_APP_MOCK)
// if (process.env.VUE_APP_MOCK) {
//   require('../mock-server/interceptor')
// }

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueTouchRipple)
Vue.use(Router)
Vue.mixin(globalMixin)
Vue.use(plugins)
Vue.use(animated)
Vue.prototype.$axios = axios

export const router = new Router({
  mode: 'hash',
  linkActiveClass: 'is-active'
})

router.beforeEach((to, from, next) => {
  utils.title(to.meta.title)
  NProgress.start() // 开启Progress
  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
  window.scrollTo(0, 0)
})

new Vue({
  router,
  store,
  render: h => h(App),
  data() {
    return {
      menuRouts: [],
      oriMenus: [],
      user_name: 'sharpxiajun'
    }
  },
  mounted() {
    this.initMenu()
  },
  methods: {
    async initMenu() {
      // const originMenus = this.$store.state.originMenus
      // if (originMenus.length && originMenus instanceof Array) {
      //   this.setRoutes(originMenus)
      //   return
      // }
      const res = await this.$simpleAsyncTo(initPro(), '获取菜单数据失败')
      // const fun = process.env.VUE_APP_RATIO === 'ratio41' ? require('mock/screen/init41') : require('mock/screen/init')
      if (res) {
        const routes = this.setRoutes(res.returnModel)
        const index = routes.findIndex(item => item.path === '/')
        this.$store.commit('SET_ORIGIN_MENUS', res)
        this.$store.commit('SET_TITLE', routes[index].meta.title)
        this.$store.commit('SET_MENUS', routes[index].children)
        // this.$store.commit('SET_THEME_COLORS', chartColors['skin-bluish'])
        if (process.env.VUE_APP_RATIO === 'ratio41') {
          this.$store.commit('SET_THEME_COLORS', chartColors41['skin-bluish'])
          this.$store.commit('SET_RATIO', true)
        } else {
          this.$store.commit('SET_THEME_COLORS', chartColors['skin-bluish'])
          this.$store.commit('SET_RATIO', false)
        }
      } else {
        alert('菜单初始化错误！！！！')
      }
    },
    setRoutes(menus) {
      let routes = []
      routes = menuToRouter.exec(menus, genRouters)
      router.options.routes = routes
      router.addRoutes(routes, {
        override: true
      })
      return routes
    }
  }
}).$mount('#app')
