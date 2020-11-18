<template>
  <ul class="total-list flex-d-col">
    <li class="flex-1 y-center" v-for="(item, i) in list" :key="i">
      <div class="item pr flex-layout">
        <div :class="['icon-bg', item.iconBg]">
          <i :class="['icon iconfont', item.icon]"></i>
        </div>
        <div class="flex-1 y-center label">{{item.label}}</div>
        <div class="y-center value">
          <strong>{{item.value}}</strong>
          {{item.unit}}
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TotalList",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
.total-list {
  .value {
    strong {
      font-size: 1.5vmax;
      font-family: DS-Digital;
    }
  }
}
</style>
