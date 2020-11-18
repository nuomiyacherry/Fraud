<template>
  <div class="analysis-website">
    <!-- <h2 class="title">涉诈网站深度分析</h2> -->
    <el-row class="main-height" :gutter="20">
      <el-col :span="5">
        <div class="ratio111">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="存活网站数量趋势">
                <div slot="chart">
                  <barChart :chartData="barData" legendLeft="10%" :barStack="true" :gridTop="55" legendType="" :axisLabelFontSize="14" :legendFontSize="14"></barChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈网站访问方式排名">
                <div slot="chart">
                  <PictorialBar :chartData="clientVisitedRank" :gridLeft="5" :xAxisValue="true" :showxAxis="false" :yAxisTickShow="false" :yAxisLineShow="false" :legendShow="false" :labelShow="true" :isPercent="true" :axisLabelFontSize="14" ></PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper pr p-10">
              <div class="full-block">
                <!-- <img src="../../assets/img/map.gif" height="100%" width="100%" alt=""> -->
                <img src="../../assets/img/map3.gif" height="100%" width="100%" alt="">
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="ratio111 pr">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="域名平均存活周期趋势">
                <div slot="chart">
                  <lineChart :chartData="domainSurviveTrend" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></lineChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="主机IP平均存活周期趋势">
                <div slot="chart">
                  <lineChart :chartData="hostIpSurviveTrend" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#DD6744']" :areaStartColors="['#DD6744']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></lineChart>  
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="域名境外接入率趋势">
                <div slot="chart">
                  <lineChart :chartData="domainAccessTrend" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></lineChart>
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col>    
      <el-col :span="14">
        <!-- <h2 class="title">涉缅重点诈骗类型专题分析</h2> -->
        <div class="ratio111">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox :title="gambleTitle1" :titleBlock="true">
                <div slot="chart" class="wrapper_con pr">
                  <el-row class="full-block">
                    <el-col :span="6">
                      <span class="wrapper_title">基本情况</span>
                      <div class="con">
                        <TotalBox :list="gambleList1"></TotalBox>
                      </div>
                    </el-col>
                    <el-col :span="6" class="border">
                      <span class="wrapper_title">网站境内外接入占比</span>
                      <div class="con">
                        <piechart :chartData="webPieData1" :center="['45%', '50%']" :radius="['55%','75%']" :legendRight="10" :pieAutoPlay="true"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :showPercent="true"  :legendFontSize="14"></piechart>
                      </div>
                    </el-col>
                    <el-col :span="6" class="border">
                      <span class="wrapper_title">疑似受害者分布占比</span>
                      <div class="con">
                        <piechart :chartData="gambleNatiionalDistributionData" :center="['45%', '50%']" :radius="['55%','75%']" :pieAutoPlay="true" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :seriesLabelEmphasisShow="true" :showPercent="true" :legendFontSize="14"></piechart>
                      </div>
                    </el-col>
                    <el-col :span="6" class="border">
                      <span class="wrapper_title">存活域名数量趋势</span>
                      <div class="con">
                        <lineChart :chartData="lineData1"  :smooth="true" :legendShow="false" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14" :legendFontSize="14"></lineChart>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox :title="gambleTitle2" :titleBlock="true">
                <div slot="chart" class="wrapper_con pr">
                  <el-row class="full-block">
                    <el-col :span="6">
                      <span class="wrapper_title">基本情况</span>
                      <div class="con">
                        <TotalBox :list="gambleList2"></TotalBox>
                      </div>
                    </el-col>
                    <el-col :span="6" class="border">
                      <span class="wrapper_title">网站境内外接入占比</span>
                      <div class="con">
                        <piechart :chartData="webPieData2" :center="['45%', '50%']" :radius="['55%','75%']" :pieAutoPlay="true" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :showPercent="true" :legendFontSize="14"></piechart>
                      </div>
                    </el-col>
                    <el-col :span="6" class="border">
                      <span class="wrapper_title">疑似受害者分布占比</span>
                      <div class="con">
                        <piechart :chartData="loanFraudNatiionalDistributionData" :center="['45%', '50%']" :radius="['55%','75%']" :pieAutoPlay="true" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :seriesLabelEmphasisShow="true" :showPercent="true" :legendFontSize="14"></piechart>
                      </div>
                    </el-col>
                    <el-col :span="6" class="border">
                      <span class="wrapper_title">存活域名数量趋势</span>
                      <div class="con">
                          <lineChart :chartData="lineData2" :smooth="true" :legendShow="false" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14" :legendFontSize="14"></lineChart>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox :title="gambleTitle3" :titleBlock="true">
                <div slot="chart" class="wrapper_con pr">
                  <el-row class="full-block">
                    <el-col :span="6">
                      <span class="wrapper_title">基本情况</span>
                      <div class="con">
                        <TotalBox :list="gambleList3"></TotalBox>
                      </div>
                    </el-col>
                    <el-col :span="6" class="border">
                      <span class="wrapper_title">网站境内外接入占比</span>
                      <div class="con">
                        <piechart :chartData="webPieData3" :center="['45%', '50%']" :radius="['55%','75%']" :pieAutoPlay="true" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :seriesLabelEmphasisShow="true" :showPercent="true" :legendFontSize="14"></piechart>
                      </div>
                    </el-col>
                    <el-col :span="6" class="border">
                      <span class="wrapper_title">疑似受害者分布占比</span>
                      <div class="con">
                        <piechart :chartData="lotteryFraudNatiionalDistributionData" :center="['45%', '50%']" :radius="['55%','75%']" :pieAutoPlay="true" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :seriesLabelEmphasisShow="true" :showPercent="true" :legendFontSize="14"></piechart>
                      </div>
                    </el-col>
                    <el-col :span="6" class="border">
                      <span class="wrapper_title">存活域名数量趋势</span>
                      <div class="con">
                        <lineChart :chartData="lineData3" :smooth="true" :legendShow="false" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14" :legendFontSize="14"></lineChart>
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
import ChartBox from 'components/chartBox'
import lineChart from 'components/echarts/line/lineChart'
import barChart from 'components/echarts/bar/barChart'
import piechart from 'components/echarts/pie/pieChart'
import TotalBox from 'components/totalBox'
import PictorialBar from 'components/echarts/pictorialBar/pictorialBar'
import {
  getDomainSurviveTrend,
  getHostIpSurviveTrend,
  getDomainAccessTrend,
  getClientVisitedRank,
  suspectedVictim,
  liveWebRank,
  baseInfoList,
  gambleWebOutside,
  gambleLiveDomain,
  loanFraudWebOutside,
  loanFraudleLiveDomain,
  lotteryFraudWebOutside,
  lotteryFraudleLiveDomain,
  gambleNatiionalDistribution,
  loanFraudNatiionalDistribution,
  lotteryFraudNatiionalDistribution
} from 'api/analysis'
export default {
  name: 'Special',
  props: {},
  components: {ChartBox, TotalBox, lineChart, piechart, barChart, PictorialBar},
  data() {
    return {
      gambleList1: [],
      gambleList2: [],
      gambleList3: [],
      gambleTitle1: '',
      gambleTitle2: '',
      gambleTitle3: '',
      webPieData1: {},
      webPieData2: {},
      webPieData3: {},
      webPieData4: {},
      lineData1: {

      },
      lineData2: {},
      lineData3: {},
      barData: {},
      clientVisitedRank: {},
      gambleNatiionalDistributionData: {},
      loanFraudNatiionalDistributionData: {},
      lotteryFraudNatiionalDistributionData: {},
      domainSurviveTrend: {},
      hostIpSurviveTrend: {},
      domainAccessTrend: {}
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getDomainSurviveTrend()
    this.getHostIpSurviveTrend()
    this.getDomainAccessTrend()
    this._suspectedVictim()
    this._liveWebRank()
    this._baseInfoList()
    this._gambleWebOutside()
    this._gambleLiveDomain()
    this._loanFraudWebOutside()
    this._loanFraudleLiveDomain()
    this._lotteryFraudWebOutside()
    this._lotteryFraudleLiveDomain()
    this.getClientVisitedRank()
    this.gambleNatiionalDistribution()
    this.loanFraudNatiionalDistribution()
    this.lotteryFraudNatiionalDistribution()
  },
  methods: {
    // 域名平均存活周期趋势
    async getDomainSurviveTrend() {
      const res = await this.$simpleAsyncTo( getDomainSurviveTrend(), '获取域名平均存活周期趋势失败')
      if (res) {
        this.domainSurviveTrend = res.returnModel
      }
    },
    // 主机IP平均存活周期趋势
    async getHostIpSurviveTrend() {
      const res = await this.$simpleAsyncTo( getHostIpSurviveTrend(), '获取主机IP平均存活周期趋势失败')
      if (res) {
        this.hostIpSurviveTrend = res.returnModel
      }
    },
    // 域名境外接入率趋势
    async getDomainAccessTrend() {
      const res = await this.$simpleAsyncTo( getDomainAccessTrend(), '获取域名境外接入率趋势失败')
      if (res) {
        this.domainAccessTrend = res.returnModel
      }
    },
    // 疑似受害者国内分布占比
    // _suspectedVictim() {
    //   suspectedVictim().then(res => {
    //     if (res.errorType === 0) {
    //       this.webPieData4 = {
    //         seriesData: res.returnModel
    //       }
    //     }
    //   })
    // },
    async _suspectedVictim() {
      const res = await this.$simpleAsyncTo( suspectedVictim(), '获取疑似受害者国内分布占比失败')
      if (res) {
        this.webPieData4 = {
          seriesData: res.returnModel
        }
      }
    },
    // 存活网站数量趋势TOP5
    // _liveWebRank() {
    //   liveWebRank().then(res => {
    //     if (res.errorType === 0) {
    //       this.barData = res.returnModel
    //     }
    //   })
    // },
    async _liveWebRank() {
      const res = await this.$simpleAsyncTo(liveWebRank(), '获取存活网站数量趋势失败')
      if (res) {
        this.barData = res.returnModel
      }
    },
    // 基本情况
    // _baseInfoList() {
    //   baseInfoList().then(res => {
    //     if (res.errorType === 0) {
    //       const {gambleList1,gambleList1,gambleList1} = res.returnModel
    //       this.gambleList1 = res.returnModel.gambleList1
    //       this.gambleList2 = res.returnModel.gambleList2
    //       this.gambleList3 = res.returnModel.gambleList3
    //     }
    //   })
    // },
    async _baseInfoList() {
      const res = await this.$simpleAsyncTo(baseInfoList(), '获取基本信息失败')
      if (res) {
        const {gambleList1, gambleList2, gambleList3} = res.returnModel
        this.gambleTitle1 = gambleList1.title
        this.gambleTitle2 = gambleList2.title
        this.gambleTitle3 = gambleList3.title
        this.gambleList1 = gambleList1.data
        this.gambleList2 = gambleList2.data
        this.gambleList3 = gambleList3.data
      }
    },
    // 赌博杀猪盘-网站境内外接入占比
    // _gambleWebOutside() {
    //   gambleWebOutside().then(res => {
    //     if (res.errorType === 0) {
    //       this.webPieData1 = {
    //         pieName: '网站境内外接入占比',
    //         seriesData: res.returnModel
    //       }
    //     }
    //   })
    // },
    async _gambleWebOutside() {
      const res = await this.$simpleAsyncTo(gambleWebOutside(), '获取网站境内外接入占比失败')
      if (res) {
        this.webPieData1 = {
          pieName: '网站境内外接入占比',
          seriesData: res.returnModel
        }
      }
    },
    // 赌博杀猪盘-存活域名数量趋势
    // _gambleLiveDomain() {
    //   gambleLiveDomain().then(res => {
    //     if (res.errorType === 0) {
    //       this.lineData1 = res.returnModel
    //     }
    //   })
    // },
    async _gambleLiveDomain() {
      const res = await this.$simpleAsyncTo(gambleLiveDomain(), '获取存活域名数量趋势失败')
      if (res) {
        this.lineData1 = res.returnModel
      }
    },
    // 小额贷款手续费诈骗-网站境内外接入占比
    // _loanFraudWebOutside() {
    //   loanFraudWebOutside().then(res => {
    //     if (res.errorType === 0) {
    //       this.webPieData2 = {
    //         pieName: '网站境内外接入占比',
    //         seriesData: res.returnModel
    //       }
    //     }
    //   })
    // },
    async _loanFraudWebOutside() {
      const res = await this.$simpleAsyncTo(loanFraudWebOutside(), '获取网站境内外接入占比失败')
      if (res) {
        this.webPieData2 = {
          pieName: '网站境内外接入占比',
          seriesData: res.returnModel
        }
      }
    },
    // 小额贷款手续费诈骗-存活域名数量趋势
    // _loanFraudleLiveDomain() {
    //   loanFraudleLiveDomain().then(res => {
    //     if (res.errorType === 0) {
    //       this.lineData2 = res.returnModel
    //     }
    //   })
    // },
    async _loanFraudleLiveDomain() {
      const res = await this.$simpleAsyncTo(loanFraudleLiveDomain(), '获取存活域名数量趋势失败')
      if (res) {
        this.lineData2 = res.returnModel
      }
    },
    // 虚假彩票合买诈骗-网站境内外接入占比
    // _lotteryFraudWebOutside() {
    //   lotteryFraudWebOutside().then(res => {
    //     if (res.errorType === 0) {
    //       this.webPieData3 = {
    //         pieName: '网站境内外接入占比',
    //         seriesData: res.returnModel
    //       }
    //     }
    //   })
    // },
    async _lotteryFraudWebOutside() {
      const res = await this.$simpleAsyncTo(lotteryFraudWebOutside(), '获取网站境内外接入占比失败')
      if (res) {
        this.webPieData3 = {
          pieName: '网站境内外接入占比',
          seriesData: res.returnModel
        }
      }
    },
    // 虚假彩票合买诈骗-存活域名数量趋势
    // _lotteryFraudleLiveDomain() {
    //   lotteryFraudleLiveDomain().then(res => {
    //     if (res.errorType === 0) {
    //       this.lineData3 = res.returnModel
    //     }
    //   })
    // },
    async _lotteryFraudleLiveDomain() {
      const res = await this.$simpleAsyncTo(lotteryFraudleLiveDomain(), '获取存活域名数量趋势失败')
      if (res) {
        this.lineData3 = res.returnModel
      }
    },
    async getClientVisitedRank() {
      const res = await this.$simpleAsyncTo(
        getClientVisitedRank(),
        '获取专用客户端访问占比排名失败'
      )
      if (res) {
        this.clientVisitedRank = {
          seriesName: '专用客户端访问占比',
          seriesData: res.returnModel.seriesData,
          categoryData: res.returnModel.categoryData
        }
      }
    },
    //涉诈网站分析_赌博杀猪盘_疑似受害者国内分布占比
    async gambleNatiionalDistribution() {
      const res = await this.$simpleAsyncTo(
        gambleNatiionalDistribution(),
        '获取疑似受害者国内分布占比失败'
      )
      if (res) {
        this.gambleNatiionalDistributionData = {
          seriesData: res.returnModel
        }
      }
    },
    // 涉诈网站分析_小贷诈骗_疑似受害者国内分布占比
    async loanFraudNatiionalDistribution() {
      const res = await this.$simpleAsyncTo(
        loanFraudNatiionalDistribution(),
        '获取疑似受害者国内分布占比失败'
      )
      if (res) {
        this.loanFraudNatiionalDistributionData = {
          seriesData: res.returnModel
        }
      }
    },
    // 涉诈网站分析_虚假彩票_疑似受害者国内分布占比
    async lotteryFraudNatiionalDistribution() {
      const res = await this.$simpleAsyncTo(
        lotteryFraudNatiionalDistribution(),
        '获取疑似受害者国内分布占比失败'
      )
      if (res) {
        this.lotteryFraudNatiionalDistributionData = {
          seriesData: res.returnModel
        }
      }
    }

  }
}
</script>

<style scoped lang="less">
.analysis-website{
  .title{
    position: relative;
    // line-height: 30px;
    width:1.3rem; //240px;
    // display: inline-block;
    margin: 0.05rem;//10px;
    font-size: 0.12rem;
    letter-spacing: 1px;
    // margin-left: 10px;
    background: #16638B;
    // padding: 0.025rem 0.1rem;
    height:0.2rem;
    line-height: 0.2rem;
    text-align: center;
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
    border-left: 1px solid #072C42;
  }
  .main-height{
    width: 100%;
    /* height: calc(~'100% - 40px')!important; */
    .wrapper_con{
      .wrapper_title{
        color: #84DAE5;
        position: absolute;
        top: 0;
        font-size: 0.09rem;//14px;
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
      padding-left: 10px;
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
