<template>
  <div @click="handleFullscreen" v-if="showFullScreenBtn" class="full-screen">
    <el-tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom" effect="light">
      <i :class="value ? 'icon iconfont icontuichuquanping' : 'icon iconfont iconquanping2'" style="color: #fff!important;"></i>
    </el-tooltip>
  </div>
</template>

<script>
import { on, off } from 'utils/dom'
export default {
  name: 'FullScreen',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showFullScreenBtn() {
      // 处理不兼容IE的情况
      return window.navigator.userAgent.indexOf('MSIE') < 0
    }
  },
  created() {
    let isFullscreen =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.fullScreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen
    isFullscreen = !!isFullscreen
    on(document, 'fullscreenchange', this._emit)
    on(document, 'mozfullscreenchange', this._emit)
    on(document, 'webkitfullscreenchange', this._emit)
    on(document, 'msfullscreenchange', this._emit)
    this.$emit('input', isFullscreen)
  },
  beforeDestroy() {
    off(document, 'fullscreenchange', this._emit)
    off(document, 'mozfullscreenchange', this._emit)
    off(document, 'webkitfullscreenchange', this._emit)
    off(document, 'msfullscreenchange', this._emit)
  },
  methods: {
    _emit() {
      this.$emit('input', !this.value)
      this.$emit('change', !this.value)
    },
    handleChange() {
      this.handleFullscreen()
    },
    handleFullscreen() {
      const main = document.body
      if (this.value) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen()
        } else if (main.mozRequestFullscreen) {
          main.mozRequestFullscreen()
        } else if (main.webkitRequestFullscreen) {
          main.webkitRequestFullscreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// .full-screen {
//   padding: 0 8px;
//   .icon {
//     font-size: 20px;
//     cursor: pointer;
//   }
// }
</style>
