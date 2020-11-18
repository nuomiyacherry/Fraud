<template>
  <div class='special'>
    <el-row class="main-height" :gutter="10">
      <el-col :span="10">
        <div class="ratio12">
          <div class="row-h h-1">
            <div class="wrapper">
            <el-row class="full-block">
              <el-col :span="15">
                <ChartBox title="存活网站数量趋势">
                  <div slot="chart">
                    <barChart :chartData="barData" legendLeft="10%" :barStack="true" :gridTop="55" legendType=""></barChart>
                  </div>
                </ChartBox>
              </el-col>
              <el-col :span="9">
                <ChartBox title="疑似受害者国内分布占比">
                  <div slot="chart">
                      <piechart :chartData="webPieData4" :center="['60%', '50%']" :radius="['45%','65%']" :legendLeft="10"  legendOrient="vertical" :pieAutoPlay="true" :tooltipShow="false" :showPercent="true"></piechart>
                  </div>
                </ChartBox>
              </el-col>
            </el-row>
            </div>
          </div>
          <div class="row-h h-2">
            <div class="wrapper pr p-10">
              <div class="full-block">
                <!-- <img src="../../assets/img/map.gif" height="100%" width="100%" alt=""> -->
                <img src="../../assets/img/map3.gif" height="100%" width="100%" alt="">
                <!-- <div class="map-title">
                  <span>涉缅团伙分布</span>
                  <span class="date">4周前</span>
                </div> -->
              </div>
              <!-- <Corner></Corner> -->
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <h2 class="title">涉缅重点诈骗类型专题分析</h2>
        <div class="ratio111 ratio_left" style="height: calc(100% - 41px)">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="赌博杀猪盘" :titleBlock="true">
                <div slot="chart" class="wrapper_con pr">
                  <el-row class="full-block">
                    <el-col :span="8">
                      <span class="wrapper_title">基本情况</span>
                      <div class="con">
                        <TotalBox :list="gambleList1"></TotalBox>
                      </div>
                    </el-col>
                    <el-col :span="8" class="border">
                      <span class="wrapper_title">网站境内外接入占比</span>
                      <div class="con">
                        <piechart :chartData="webPieData1" :center="['45%', '50%']" :radius="['55%','75%']" :legendRight="10" :pieAutoPlay="true"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :showPercent="true"></piechart>
                      </div>
                    </el-col>
                    <!-- <el-col :span="5" class="border">
                      <span class="wrapper_title">网站备案占比</span>
                      <div class="con">
                        <piechart :chartData="pieData1" :radius="['40%','60%']" :legendShow="false" :seriesLabelShow="true"></piechart>
                      </div>
                    </el-col> -->
                    <el-col :span="8" class="border">
                      <span class="wrapper_title">存活域名数量趋势</span>
                      <div class="con">
                        <lineChart :chartData="lineData1"  :smooth="true" :legendShow="false" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']"></lineChart>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="小额贷款手续费诈骗" :titleBlock="true">
                <div slot="chart" class="wrapper_con pr">
                  <el-row class="full-block">
                    <el-col :span="8">
                      <span class="wrapper_title">基本情况</span>
                      <div class="con">
                        <TotalBox :list="gambleList2"></TotalBox>
                      </div>
                    </el-col>
                    <el-col :span="8" class="border">
                      <span class="wrapper_title">网站境内外接入占比</span>
                      <div class="con">
                        <piechart :chartData="webPieData2" :center="['45%', '50%']" :radius="['55%','75%']" :pieAutoPlay="true" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :showPercent="true"></piechart>
                      </div>
                    </el-col>
                    <!-- <el-col :span="5" class="border">
                      <span class="wrapper_title">网站备案占比</span>
                      <div class="con">
                        <piechart :chartData="pieData2" :radius="['40%','60%']" :legendShow="false" :seriesLabelShow="true"></piechart>
                      </div>
                    </el-col> -->
                    <el-col :span="8" class="border">
                      <span class="wrapper_title">存活域名数量趋势</span>
                      <div class="con">
                          <lineChart :chartData="lineData2" :smooth="true" :legendShow="false" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']"></lineChart>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="虚假彩票合买诈骗" :titleBlock="true">
                <div slot="chart" class="wrapper_con pr">
                  <el-row class="full-block">
                    <el-col :span="8">
                      <span class="wrapper_title">基本情况</span>
                      <div class="con">
                        <TotalBox :list="gambleList3"></TotalBox>
                      </div>
                    </el-col>
                    <el-col :span="8" class="border">
                      <span class="wrapper_title">网站境内外接入占比</span>
                      <div class="con">
                        <piechart :chartData="webPieData3" :center="['45%', '50%']" :radius="['55%','75%']" :pieAutoPlay="true" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :seriesLabelEmphasisShow="true" :showPercent="true"></piechart>
                      </div>
                    </el-col>
                    <!-- <el-col :span="5" class="border">
                      <span class="wrapper_title">网站备案占比</span>
                      <div class="con">
                        <piechart :chartData="pieData3" :radius="['40%','60%']" :legendShow="false" :seriesLabelShow="true"></piechart>
                      </div>
                    </el-col> -->
                    <el-col :span="8" class="border">
                      <span class="wrapper_title">存活域名数量趋势</span>
                      <div class="con">
                        <lineChart :chartData="lineData3" :smooth="true" :legendShow="false" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']"></lineChart>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import sameMixin from './sameMixin'
export default {
  name: 'Special',
  mixins: [sameMixin],
  props: {},
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
.special{
  .title{
    position: relative;
    // line-height: 30px;
    width: 240px;
    // display: inline-block;
    margin-bottom: 10px;
    font-size: 16px;
    margin-left: 10px;
    background: #041A3A;
    padding: 5px 20px;
    border-left: 2px solid #009DCF;
    border-right: 2px solid #009DCF;
    // border-bottom: 1px solid #009DCF;
    color: #1EE9F2;
    &::after{
      content: '';
      position: absolute;
      top: 9px;
      right: -15px;
      border-top:7px solid transparent;
      border-bottom:7px solid transparent;
      border-right:10px solid #FFA400;
    }
  }
  .border{
    border-left: 1px solid #103C51;
  }
  .main-height{
    width: 100%;
    /* height: calc(~'100% - 40px')!important; */
    .wrapper_con{
      .wrapper_title{
        color: #84DAE5;
        position: absolute;
        top: 0;
        font-size: 14px;
        padding: 5px 30px;
        &::after{
          content: '';
          position: absolute;
          width: 4px;
          height: 4px;
          background: #FFA400;
          top: 13px;
          left: 18px;
        }
      }
      .con{
        height: 100%;
        padding: 30px 10px 0px 10px;
        // .item{
        //   padding: 0 0.15rem;
        // }
      }
    }
    .p-10{
      padding: 10px;
    }
    .map{
      border: 1px solid #07596C;
      .map-title{
        position: absolute;
        top: 20px;
        left: 20px;
        height: 40px;
        line-height: 40px;
        padding: 0 25px;
        font-size: 0.16rem;
        color: #0cfbff;
        background: url(~assets/img/special-title.png) no-repeat center center / 100% 100%;
        z-index: 100;
        color: #E3B45F;
        .date{
            color: #7DDCE5;
            padding-left: 5px;
          }
      }
    }
  }
}
</style>
