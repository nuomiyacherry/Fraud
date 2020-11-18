<template>
  <ul class='total-list flex-d-col newTotallist'>
    <li class="flex-1 y-center" v-for="(item, i) in list" :key="i">
      <div class="item pr flex-layout newItem">
        <div :class="['icon-bg', item.iconBg,'newIconBg']">
          <i :class="['icon iconfont', item.icon]"></i>
        </div>
        <div class="flex-1 y-center label">
          {{item.label}}
        </div>
        <div class="y-center value">
          {{item.value}}{{item.unit}}
        </div>
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
        default: () => []
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
  .newTotallist {
    .item{
      height: 4vh;
      .icon-bg{
        height: 4vh;
        width: 4vh;
        i{
          line-height:4vh;
        }
      }
    }
    .newIconBg {
      top: 0px!important;
      background: #05154b!important;
      border: 1px solid #2591ff;
      color: #6bb2ff;
      /*width: calc(height)!important;*/
      /*height: 100%!important;*/
      // &.total{
      //   width:3.5vh !important;
      //   height:3.5vh !important;
      // }
      // &.total1{
      //   width:3vh !important;
      //   height:3vh !important;
      // }
    }
    .newItem {
      border: none!important;
      background: linear-gradient(to right, rgba(22, 62, 142, 0.8), rgba(4, 12, 44, 0.4), rgba(0, 0, 0, 0.1))!important;
      box-shadow: none!important;
    }
    .value {
      font-family: 'DS-Digital'!important;
    }
    .label {
      color: #7cabee!important;
      padding-left: 4vh!important;
    }
  }
</style>
