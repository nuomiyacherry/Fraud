<template>
  <div class='data-source'>
    <div class="board"></div>
    <div class="line"></div>
    <div class="system">
      <div class="bg"></div>
      <span class="name">部系统</span>
    </div>
    <ul class="bg">
      <li :class="['item', item.str]" v-for="item in textList" :key="item.label">
        <span class="icon"></span>
        <span class="text">{{item.label}}</span>
      </li>
    </ul>
    <ul class="list discover">
      <li :class="['item', item.str]" v-for="item in discoverList" :key="item.label">
        <div class="label">{{item.label}}</div>
        <div class="value">{{item.value}}</div>
      </li>
    </ul>
    <ul class="list report">
      <li :class="['item', item.str]" v-for="item in reportList" :key="item.label">
        <div class="label">{{item.label}}</div>
        <div class="value">{{item.value}}</div>
      </li>
    </ul>
    <ul class="list base">
      <li :class="['item', item.str]" v-for="item in baseList" :key="item.label">
        <div class="label">{{item.label}}</div>
        <div class="value">{{item.value}}</div>
      </li>
    </ul>
    <ul class="list province">
      <li :class="['item', item.str]" v-for="item in provinceList" :key="item.label">
        <div class="label">{{item.label}}</div>
        <div class="value">{{item.value}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getDataSource } from 'api/aggregation'
import {toThousands} from "constants/utils"
export default {
  name: 'DataSource',
  props: {},
  components: {},
  data() {
    return {
      textList: [
        {label: '自主发现', str: 'discover'},
        {label: '各省上报', str: 'province'},
        {label: '12321举报', str: 'report'},
        {label: '基础企业', str: 'base'}
      ],
      discoverList: [
        {label: '涉诈微信QQ', value: '', str: 'account'},
        {label: '涉诈APP', value: '', str: 'app'},
        {label: '涉诈域名', value: '', str: 'domain'}
        ],
      reportList: [
        {label: '涉诈域名', value: '', str: 'domain'},
        {label: '涉诈微信QQ', value: '', str: 'account'}
        ],
      baseList: [ 
        {label: '涉诈微信QQ', value: '', str: 'account'},
        {label: '涉诈短信', value: '', str: 'message'}],
      provinceList: [
        {label: '涉诈微信QQ', value: '', str: 'account'},
        {label: '涉诈APP', value: '', str: 'app'},
        {label: '涉诈域名', value: '', str: 'domain'},
        {label: '涉诈网址', value: '', str: 'website'},
        {label: '涉诈短信', value: '', str: 'message'}
      ]
    }
  },
  computed: {},
  created() {
    this.getDataSource()
  },
  mounted() {
  },
  methods: {
    async getDataSource() {
      const res = await this.$simpleAsyncTo(
        getDataSource(),
        '获取数据来源失败！'
      )
      if (res) {
        this.discoverList.forEach(item => {
          item.value = toThousands(res.returnModel.discover[item.str])
        })
        this.reportList.forEach(item => {
          item.value = toThousands(res.returnModel.report[item.str])
        })
        this.baseList.forEach(item => {
          item.value = toThousands(res.returnModel.base[item.str])
        })
        this.provinceList.forEach(item => {
          item.value = toThousands(res.returnModel.province[item.str])
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.data-source {
  height: 100%;
  width: 100%;
  position: relative;
  .system {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    .bg {
      width: 100%;
      height: 100%;
      background: url(~assets/img/aggregation/ball.png) no-repeat center center /
        100% 100%;
      animation: rotate 3s linear infinite;
    }
    .name {
      font-size: 0.16rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      color: #0cfbff;
    }
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }
  }
  .board {
    width: 2.49rem;
    height: 0.17rem;
    position: absolute;
    top: 0.9rem;
    left: 0.4rem;
    background: url(~assets/img/aggregation/board.png) no-repeat center center /
      100% 100%;
  }
  .line {
    width: 2.9rem;
    height: 2.93rem;
    position: absolute;
    top: 0.9rem;
    left: 50%;
    transform: translateX(-50%);
    background: url(~assets/img/aggregation/line.png) no-repeat center center /
      100% 100%;
  }
  .list,
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .bg {
    .item {
      position: absolute;
      width: 0.93rem;
      height: 0.25rem;
      background: url(~assets/img/aggregation/large.png) no-repeat center center /
      100% 100%;
      .icon {
        width: 0.2rem;
        height: 0.2rem;
        position: absolute;
        top:0.025rem;
        left: 0.03rem;
      }
      .text {
        position: absolute;
        left: 0.3rem;
        line-height: 0.23rem;
        font-size: 0.11rem;
        color: #0cfbff;
      }
      &.discover {
        top: 0.7rem;
        left: 0.4rem;
        .icon {
          background: url(~assets/img/aggregation/discover.png) no-repeat center center /
          100% 100%;
        }
      }
      &.province {
        top: 0.7rem;
        right: 0.4rem;
        .icon {
          background: url(~assets/img/aggregation/province.png) no-repeat center center /
          100% 100%;
        }
      }
      &.report {
        top: 3.8rem;
        left: 0.4rem;
        .icon {
          background: url(~assets/img/aggregation/report.png) no-repeat center center /
          100% 100%;
        }
      }
      &.base {
        top: 3.8rem;
        left: 50%;
        transform: translateX(-50%);
        .icon {
          background: url(~assets/img/aggregation/base.png) no-repeat center center /
          100% 100%;
        }
      }
    }
  }
  .list {
    li {
      position: absolute;
      width: 0.91rem;
      height: 0.26rem;
      text-align: center;
      background: url(~assets/img/aggregation/small.png) no-repeat center center /
          100% 100%;
      .label {
        font-size: 0.08rem;
        color: #0cfbff;
        line-height: 0.12rem;
      }
      .value {
        font-size: 0.1rem;
        color: #db7221;
        line-height: 0.14rem;
      }
    }
    &.discover,
    &.report{
      li {
        left: 0.4rem;
      }
    }
    &.report{
      .domain{
        top: 2.75rem;
      }
      .account{
        top: 3.26rem;
      }
    }
    &.base{
      li {
        left: 50%;
        transform: translateX(-50%);
      }
      .account{
        top: 2.75rem;
      }
      .message{
        top: 3.26rem;
      }
    }
    &.province{
      li {
        right: 0.4rem;
      }
    }
    &.discover,
    &.province {
      .account{
        top: 1.21rem;
      }
      .app{
        top: 1.73rem;
      }
      .domain{
        top: 2.24rem;
      }
      .website{
        top: 2.75rem;
      }
      .message{
        top: 3.26rem;
      }
    }
  }
}
</style>
