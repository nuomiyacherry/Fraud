<template>
  <div class="layout" :style="layoutStyle">
    <!-- <header ref="header" class="pr">
      <div :style="[headerStyle]" class="title-bg"></div>
      <h1 class="subtitle">
        <span ref="titleBox">{{title}}</span>
      </h1>
      <h1>
        <span>{{title}}</span>
      </h1>
      <ul class="menus menus-left">
        <li v-for="(item, index) in menus" :key="index" v-if="index < 3" :class="['pr', item.path === $route.path ? 'active' : '']" @click="changeMenu(item)">
          <a href="javascript:">
            {{ item.meta && item.meta.title }}
          </a>
          <Corner :class="['border', item.path === $route.path ? 'bg' : '']"></Corner>
        </li>
      </ul>
      <ul class="menus menus-right">
        <li v-for="(item, index) in menus" :key="index" v-if="index >= 3" :class="['pr', item.path === $route.path ? 'active' : '']" @click="changeMenu(item)">
          <a href="javascript:">
            {{ item.meta && item.meta.title }}
          </a>
          <Corner :class="['border', item.path === $route.path ? 'bg' : '']"></Corner>
        </li>
      </ul>
    </header> -->
    <header ref="header" class="pr clearfix">
      <h1>
        <span>{{title}}</span>
      </h1>
      <ul class="menus">
        <router-link tag="li"  v-for="(menu, index) in menus" :key="index" :class="['menu-item', menu.path === $route.path ? 'active' : '']" :to="menu.path">
          {{menu.meta.title}}
        </router-link>
      </ul>
    </header>
    <section class="container">
      <transition name="el-zoom-in-center">
        <router-view v-if="animated"></router-view>
      </transition>
    </section>
    <div class="back-btn" @click="backHandle"></div>
  </div>
</template>

<script>
import { on, off } from "utils/dom"
import { mapGetters, mapMutations } from "vuex"
import storage from "utils/storage"
import chartColors from 'constants/chartColors'
// import Corner from 'components/corner'
export default {
  name: "Layout",
  // components: {
  //   Corner
  // },
  data() {
    return {
      animation: "animated zoomIn",
      animated: true,
      admin: "Admin",
      breadcrumbs: []
    }
  },
  computed: {
    ...mapGetters(["activeMenu", "menus", "bg", "title"]),
    layoutStyle() {
      const url = require(`assets/img/bg-${this._theme.substring(5)}.png`)
      return {
        'background-image': `url(${url})`
      }
    },
    headerStyle() {
      const url = require(`assets/img/head-${this._theme.substring(5)}.png`)
      return {
        'background-image': `url(${url})`
      }
    }
  },
  created() {
    this.setSkin(this._theme)
    // console.log(this.$route, this.menus, '555555')
  },
  watch: {
    $route: {
      handler(route) {
        this.breadcrumbs = []
        this.genBreadcrumbs(this.$router.options, route, 0)
      },
      deep: true,
      immediate: true
    },
    _theme: {
      immediate: true,
      handler(val) {
        this.setSkin(val)
        this.setThemeColors(chartColors[this._theme])
      }
    }
  },
  mounted() {
    this.setInitHeight()
    on(window, "resize", this.setInitHeight)
  },
  beforeDestroy() {
    off(window, "resize", this.setInitHeight)
  },
  methods: {
    ...mapMutations({
      setActiveMenu: "SET_ACTIVE_MENU",
      setThemeColors: "SET_THEME_COLORS"
    }),
    setInitHeight() {
      const topH = this.$refs.header.clientHeight
      const h = window.innerHeight - topH - 15
      storage.set("workspaceHeight", h)
    },
    setSkin(val) {
      this.$root.$el.parentNode.className = val
    },
    genBreadcrumbs(data, routes, count) {
      let _data = data.children || data.routes
      const matched = this.$route.matched[count]
      if (_data && matched) {
        _data.some(item => {
          const path = matched.path === "" ? "/" : matched.path
          if (item.path === path) {
            count++
            if (item.path !== "/") {
              const _path = item.childrenVisible ? "" : item.path
              this.breadcrumbs.push({
                name: item.meta.title,
                hidden: item.hidden,
                path: _path
              })
            }
            this.genBreadcrumbs(item, routes, count)
            return true
          }
        })
      }
    },
    changeMenu(menu) {
      this.$router.push(menu.path)
    },
    backHandle() {
      // 返回操作
      console.log('back')
    }
  }
}
</script>
<style lang="less" src="assets/theme/skin.less"></style>
<style lang="less">
.layout {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.side-tool {
  position: absolute;
  top: 10px;
  right: 20px;
  z-index: 999;
}
</style>

