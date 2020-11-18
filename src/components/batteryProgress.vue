<template>
  <div class='battery-progress'>
    <div class="item" v-for="(item, i) in list" :key="i">
      <div class="title">
        <span class="name" @click="clickHandle(item)">{{(i + 1) + ' ' + item.name}}</span>
        <span :class="['value', (i + 1) <= 3 ? 'value' + (i + 1)  : '']">{{item.value}}</span>
      </div>
      <div class="bg">
        <BatteryBarProgress :chartData="{...item, maxData: list[0].value}" :colors="colors[i]" :tooltipShow="false"></BatteryBarProgress>
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'
import BatteryBarProgress from 'components/echarts/pictorialBar/batteryBarProgress'
const chartColors = storage.get('tColors')
export default {
  name: 'BatteryProgress',
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    BatteryBarProgress
  },
  data() {
    return {
      colors: chartColors.pictorialBar.batteryColors
    }
  },
  computed: {},
  created() {},
  mounted() {
  },
  methods: {
    clickHandle(item) {
      if(item.namereplace != '' && item.namereplace != undefined && item.namereplace != null) {
        this.$emit('tableHeaderClick', item.namereplace)
      }else{
        console.log("替换信息调试" + item.namereplace)
       this.$emit('tableHeaderClick', item.name)
      }  
    }
  }
}
</script>

<style scoped lang="less">
.battery-progress {
  height: 100%;
  overflow: auto;
  .item {
    margin-bottom: 10px;
    .title {
      color: #aabce7;
      display: flex;
      .name {
        flex:1;
        font-size: 16px;
        &:hover {
          color: #fff;
          cursor: pointer;
        }
      }
      .value{
        text-align: right;
        width: 80px;
        padding-right: 10px;
        font-size: 20px;
        // font-size: 24px;
        font-weight: 600;
        // font-family: 'DS-Digital';
        &.value1{
          color: #ff7f58;
        }
        &.value2{
          color:#ede867;
        }
        &.value3{
          color: #019afd;
        }
      }
    }
    .bg {
      width: calc(~'100% - 20px');
      margin: 5px 10px;
      height: 20px;
    }
  }
}
</style>
