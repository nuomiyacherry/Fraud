<template>
  <div class="rankList">
    <ul class="rankData">
      <li v-for="(item, index) in rankData" :key="index" class="itemList">
        <div class="leftImg">
          <i class="icon iconfont icondaohang3"></i>
        </div>
        <div class="rightContent">
          <div class="listText">
            <div class="textLeft">{{item.name}}</div>
            <div class="textRight">{{item.value}}</div>
          </div>
          <el-progress :percentage="MaxRankValue(item.value)" :stroke-width="4" :show-text="false"></el-progress>
          <!-- <div class="bottomLine">
            <div class="" :style="{width: MaxRankValue(item.value)}"></div>
          </div> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'rankList',
  props: {
    rankData: {
      type: Array,
      default: () => [
        { name: 'test1', value: 12 },
        { name: 'test2', value: 45 },
        { name: 'test3', value: 35 },
        { name: 'test3', value: 35 },
        { name: 'test1', value: 12 },
        { name: 'test2', value: 45 },
        { name: 'test3', value: 35 },
        { name: 'test3', value: 35 }
      ]
    }
  },
  created() {
    // this.linePercent()
  },
  computed: {
    MaxRankValue() {
      return val => {
        const rankDataSort = this.rankData.slice()
        rankDataSort.sort((a, b) => b.value - a.value)
        console.log(parseInt(val/rankDataSort[0].value * 100), '3333')
        return parseInt(val/rankDataSort[0].value * 100)
      }
    }
    // MaxRankValue() {
    //   const rankDataSort = this.rankData
    //   rankDataSort.sort((a, b) => b.value - a.value)
    //   console.log(rankDataSort[0].value)
    //   return `${23/rankDataSort[0].value * 100}%`
    // }
  },
  methods: {
    linePercent() {
      
    }
  },
}
</script>

<style lang="less" scoped>
.rankList {
  height: 100%;
  .rankData {
    height: 100%;
    overflow: auto;
    padding-right: 8px;
    .itemList {
      padding: 5px 0;
      display: flex;
      .leftImg {
        // background: gray;
        border-radius: 100%;
        height: 2.6vh;
        width: 2.6vh;
        line-height: 2.6vh;
        text-align: center;
        i {
          font-size: 1vh;
          line-height: 2.6vh;
          display: block;
        }
      }
      .rightContent {
        flex: 1;
        font-size: 1.4vh;
        padding-left: 5px;
        .listText {
          display: flex;
          // margin-bottom: 2px;
          .textLeft {
            flex: 1;
          }
        }
        .bottomLine {
          position: relative;
          height: 4px;
          width: 100%;
          border-radius: 5px;
          background: #fff;
          margin-top: 2px;
          overflow: hidden;
          &>div {
            height: 4px;
            background: gray;
            border-radius: 5px;
          }
        }
      }
    }
    .el-progress {
      line-height: 0;
    }
  }
}
</style>


