<template>
  <div :class="['chart-box',{'has-bg':hasBg}]">
    <div class="chart-title" v-if="title !== ''">
      <div class="header-title">
        <slot name="header">
          <i class="icon iconfont iconbiaotiicon"></i>
          <!-- <span class="subtitle" :style="{width: titleBlock ? 'calc(100% - 0.6rem)' : 'auto'}">{{title}}</span> -->
          <span :class="['title', titleClass]" :style="{width: titleBlock ? 'calc(100% - 0.6rem)' : 'auto'}">{{title}}</span>
        </slot>
      </div>
    </div>
    <div :class="[title !== '' ? 'chart-wrapper': 'chart-wrapper full-h', noPadding]">
      <slot name="chart"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChartBox",
  props: {
    title: {
      type: String,
      default: ""
    },
    titleBlock: {
      type: Boolean,
      default: false
    },
    hasBg: {
      type: Boolean,
      default: true
    },
    noPadding: {
      type: String,
      default: ''
    },
    titleClass: {
      type: String,
      default: ''
    }
  },
  methods: {}
}
</script>

