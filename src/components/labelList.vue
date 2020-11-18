<template>
  <ul class='label-list'>
    <li v-for="(item, i) in labelList" :key="i" :style="{}">
      <div class="item pr flex-layout">
        <div class="icon-bg">
          <i :class="['icon iconfont', item.icon]"></i>
        </div>
        <div class="flex-1 label">{{item.label}}</div>
        <div v-if="item.value" class="flex-1 value">{{item.value}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TotalList',
  props: {
    list: {
      type: Array,
      default: () => ([])
    },
    cols: {
      type: Number,
      default: 2
    }
  },
  components: {},
  watch: {
    list: {
      handler(val) {
        this.labelList = val
      }
    }
  },
  created() {
    this.labelList = this.list
  },
  data () {
    return {
      labelList: []
    }
  },
  computed: {},
  methods: {}
}
</script>
<style lang='less' scoped>
</style>