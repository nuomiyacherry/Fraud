<template>
  <ul :class="['total-box', orient]">
    <li class="flex-1 y-center" v-for="(item, i) in list" :key="i">
      <div class="item pr flex-layout">
        <template v-if="iconLine">
          <div :class="['icon-bg', item.iconBg]">
            <i :class="['icon iconfont', item.icon]"></i>
          </div>
          <div class="flex-1 y-center label">
            {{item.label}}
          </div>
          <div class="y-center">
            <span class="value">{{item.value}}</span>
            <span class="unit"> {{item.unit}} </span>
          </div>
        </template>
        <template v-else>
          <div :class="['icon-bg', item.iconBg]">
            <i :class="['icon iconfont', item.icon]"></i>
          </div>
          <div class="flex-1">
            <div class="y-center label">
              {{item.label}}
            </div>
            <div class="y-center iconContent">
              <span class="value">{{item.value}}</span>
              <span class="unit"> {{item.unit}} </span>
            </div>
          </div>
        </template>
        <!-- <span class="top-left"></span>
        <span class="bottom-left"></span>
        <span class="top-right"></span>
        <span class="bottom-right"></span> -->
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TotalBox',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    orient: {
      type: String,
      default: ' flex-d-col'
    },
    iconLine: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  data () {
    return {
    }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
<style lang='less' scoped>
  .iconContent {
    margin-left: 10px;
  }
</style>