<template>
  <ul :class="['total-box1', orient]">
    <li class="flex-1" v-for="(item, i) in list" :key="i">
      <div class="item flex-d-col">
        <div class="label">
          <i :class="['icon iconfont', item.icon]"></i>
          <span>{{item.label}}</span>
        </div>
        <div class="">
          <span class="value">{{item.value}}</span>
          <span class="unit" v-if="item.unit"> {{item.unit}} </span>
        </div>
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
</style>