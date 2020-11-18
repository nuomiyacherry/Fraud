<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <!-- <keep-alive> -->
        <router-view></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
import { on, off } from 'utils/dom'
export default {
  name: 'App',
  mounted() {
    this.$nextTick(() => {
      this.initFontSize()
    })
    on(window, 'resize', this.initFontSize)
  },
  beforeDestroy() {
    off(window, 'resize', this.initFontSize)
  },
  methods: {
    initFontSize() {
      let screenWidth
      let html = document.getElementsByTagName('html')[0]
      if (window.innerWidth) {
        screenWidth = window.innerWidth
      } else if (document.body && document.body.clientWidth) {
        screenWidth = document.body.clientWidth
      }
      html.style.fontSize = (100 * screenWidth) / 1920 + 'px'
    }
  }
}
</script>
<style>
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
  box-sizing: border-box;
}
/* html {
    font-size: 625%;
  } */

* {
  outline: none;
  box-sizing: border-box;
}

body {
  margin: 0px;
  height: 100vh;
  width: 100vw;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

ul,
li,
dl,
dt,
dd,
p,
div,
h1,
h2,
h3,
h4,
h5,
h6 {
  padding: 0;
  margin: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

a,
a:hover {
  text-decoration: none;
}

#app {
  height: 100%;
  width: 100%;
}
</style>
<style src="assets/iconfont/iconfont.css"></style>