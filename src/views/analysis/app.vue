<template>
  <div class="analysis-app wrapper">
    <el-row :gutter="20">
      <el-col :span="4">
        <!-- <div :class="['pr','cus-bg',{'active':activeValue==='app'}]">
          <div class="cus-title">重点APP分析</div>
          <div class="more" @click="clickCenterBox('app')">更多</div>
          <div class="ratio13 pr wrapper-box">
            <div class="row-h h-1">
              <div class="wrapper">
                <ChartBox title="" :hasBg="false">
                  <div slot="chart">
                    <ul class="full-block total-ul">
                      <li class="pr" v-for="(item,index) in fraudAppTotal" :key="index">
                        <div class="label">{{item.label}}</div>
                        <div class="value">{{item.value}}</div>
                      </li>
                    </ul>
                  </div>
                </ChartBox>
              </div>
            </div>
            <div class="row-h h-3">
              <div class="wrapper">
                <ChartBox title="分类占比" :hasBg="false">
                  <div slot="chart">
                    <PieChart :chartData="fraudAppEventType" :radius="['60%','85%']" :center="['50%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :legendShow="false" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14" ></PieChart>
                  </div>
                </ChartBox>
              </div>
            </div>
          </div>
        </div> -->
        <div class="ratio11">
          <div class="row-h h-1">
            <div class="wrapper cus-bg">
              <!-- <ChartBox title="重点APP分析">
                <div slot="chart"> -->
                  <ul class="total-ul" style="height:0.4rem;padding:0.1rem 0.1rem 0;">
                    <li class="pr" v-for="(item,index) in appBasicTotal" :key="index" style="height:100%;">
                      <div class="label">{{item.label}}</div>
                      <div class="value">{{item.value}}</div>
                    </li>
                  </ul>
                  <div style="height:calc(100% - 0.5rem);margin-top:0.1rem;">
                    <ChartBox title="涉诈APP所属应用商店排名" :hasBg="false">
                      <div slot="chart">
                        <!-- <WordCloudChart :chartData="fraudKeywordsData"></WordCloudChart> -->
                        <PictorialBar :chartData="appMarketRank" :gridLeft="5" :xAxisValue="true" :showxAxis="false" :yAxisTickShow="false" :yAxisLineShow="false" :legendShow="false" :axisLabelFontSize="14"></PictorialBar>
                      </div>
                    </ChartBox>                    
                  </div>  
                <!-- </div>
              </ChartBox> -->
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper cus-bg">
              <ChartBox title="疑似受害者分布" >
                <div slot="chart">
                  <BarChart :chartData="barData1" :legendShow="false" :barBorderRadius="[20,20,0,0]" :barGradientShow="true"  :barStack="true" :gridTop="30" :axisLabelFontSize="14"></BarChart>
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="13" style="padding-bottom:0.1rem;">
        <div class="wrapper cus-bg" style="padding:0.1rem 0.1rem 0;">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="ratio11">
                <div class="row-h h-1">
                  <div class="wrapper">
                    <ChartBox title="分类占比">
                      <div slot="chart">
                        <PieChart :chartData="fraudAppEventType" :radius="['45%','65%']" :center="['50%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :legendShow="false" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14" ></PieChart>
                      </div>
                    </ChartBox>
                  </div>
                </div>
                <div class="row-h h-1">
                  <div class="wrapper">
                    <ChartBox title="涉诈APP发现趋势" >
                      <div slot="chart">
                        <LineChart :chartData="fraudAppDiscoverTrend" :smooth="true" :legendLeft="40" :legendRight="40" :gridTop="30" :gridBottom="5" :showLineArea="true" :legendShow="true" :colors="['#01A3DF','#DD6744','#8A84F2']" :areaStartColors="['#01A3DF','#DD6744','rgba(145,134,251,1) ']" :areaEndColors="['rgba(251,118,62,0)',' rgba(1,197,250,0) ','rgba(151,1,250,0)']" :axisLabelFontSize="14" :legendFontSize="14"
                      ></LineChart>
                      </div>
                    </ChartBox>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="full-block">
                <div class="top-data">
                  <!-- <div class="app-total">
                    <i class="icon iconfont iconAPP"></i>
                    <span class="total-label">涉诈APP发现总数：</span>
                    <span class="total-value">{{fraudAppTotal}}</span>
                  </div> -->
                  <div class="scroll-box">
                    <div class="scroll-title">涉诈舆情预警：</div>
                    <VueSeamless :data='warningList' :class-option="defaultOption" class="seamless-warp warning-list" ref="warningList">
                      <ul ref="scrollUl" class="scroll-ul">
                        <li v-for="(item,index) in warningList" :key="index" ref="scrollLi">
                          <span class="waning-time">{{item.findTime}}</span>
                          <span class="waning-title">{{item.title}}</span>
                        </li>
                      </ul>
                    </VueSeamless>
                  </div>
                </div>   
                <div style="height:calc(100% - 0.5rem);">
                  <ChartBox title="涉诈APP服务端IP地址分布" >
                    <div slot="chart">
                      <ScatterMapChart :chartData="mapData" mapType="china" :mapZoom="1.0" :roam="true" tooltipFormatter="涉诈APP服务端IP地址分布"></ScatterMapChart>
                    </div>
                  </ChartBox>
                </div>        
              </div>
            </el-col>
            <el-col :span="6">
              <div class="ratio11">
                <div class="row-h h-1">
                  <div class="wrapper">
                    <ChartBox title="APP伪装类型占比" >
                      <div slot="chart">
                        <PieChart :chartData="fraudAppMarket" :radius="['45%','65%']" :center="['40%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :legendShow="true" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14"></PieChart>
                      </div>
                    </ChartBox>                   
                  </div>
                </div>
                <div class="row-h h-1">
                  <div class="wrapper">
                    <ChartBox title="APP伪装类型发现趋势" >
                      <div slot="chart">
                        <LineChart :chartData="pretendTypeTrend" :smooth="true" :legendLeft="40" :legendRight="40" :gridTop="30" :gridBottom="5" :showLineArea="true" :legendShow="true" :colors="['#01A3DF','#DD6744','#8A84F2']" :areaStartColors="['#01A3DF','#DD6744','rgba(145,134,251,1) ']" :areaEndColors="['rgba(251,118,62,0)',' rgba(1,197,250,0) ','rgba(151,1,250,0)']" :axisLabelFontSize="14" :legendFontSize="14"
                      ></LineChart>
                      </div>
                    </ChartBox>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          
          <!-- <div class="ratio11" style="height:calc(100% - 0.3rem);">
              <div class="row-h h-1">
                <div class="wrapper">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <ChartBox title="APP伪装类型占比" >
                        <div slot="chart">
                          <PieChart :chartData="fraudAppMarket" :radius="['45%','65%']" :center="['40%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :legendShow="true" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14"></PieChart>
                        </div>
                      </ChartBox>
                    </el-col>
                    <el-col :span="12">
                      <ChartBox title="涉诈APP分类占比" >
                        <div slot="chart">
                          <PieChart :chartData="fraudAppEventType" :radius="['45%','65%']" :center="['40%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :legendShow="true" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14" ></PieChart>
                        </div>
                      </ChartBox>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="row-h h-1">
                <div class="wrapper">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <ChartBox title="涉诈APP高危IP接入分析" >
                        <div slot="chart">
                          <PictorialBar :chartData="highRiskIpAccessData" :gridLeft="5" :xAxisValue="true" :showxAxis="false" :yAxisTickShow="false" :yAxisLineShow="false" :legendShow="false" :axisLabelFontSize="14"></PictorialBar>
                        </div>
                      </ChartBox>
                    </el-col>
                    <el-col :span="12">
                      <ChartBox title="涉诈APP发现趋势" >
                        <div slot="chart">
                          <LineChart :chartData="fraudAppDiscoverTrend" :smooth="true" :legendLeft="40" :legendRight="40" :gridTop="30" :gridBottom="5" :showLineArea="true" :legendShow="true" :colors="['#01A3DF','#DD6744','#8A84F2']" :areaStartColors="['#01A3DF','#DD6744','rgba(145,134,251,1) ']" :areaEndColors="['rgba(251,118,62,0)',' rgba(1,197,250,0) ','rgba(151,1,250,0)']" :axisLabelFontSize="14" :legendFontSize="14"
                        ></LineChart>
                        </div>
                      </ChartBox>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div> -->
        </div>
      </el-col>
      <el-col :span="7" style="padding-bottom:0.1rem;">
        <div class="ratio11">
          <div class="row-h h-1">
            <div class="wrapper ">
              <!-- <div class="cus-title">涉诈APP发现分布统计</div> -->
              <!-- <div class="full-block">
                <VisualMapChart :chartData="mapData" :shadowBlur="0" :pieces="pieces" visualMapType="piecewise" :visualMapBottom="20" :visualMapLeft="20" :roam="true" tooltipFormatter="涉诈APP数量" :visualMapFontSize="14"></VisualMapChart>
              </div> -->
              <!-- <el-row :gutter="20">
                <el-col :span="12">
                  <ChartBox title="疑似受害者分布" >
                    <div slot="chart">
                      <BarChart :chartData="barData1" :legendShow="false" :barBorderRadius="[20,20,0,0]" :barGradientShow="true"  :barStack="true" :gridTop="30" :axisLabelFontSize="14"></BarChart>
                    </div>
                  </ChartBox>
                </el-col>
                <el-col :span="12">
                  <ChartBox title="涉诈APP高危IP接入分析" >
                    <div slot="chart">
                      <PictorialBar :chartData="highRiskIpAccessData" :gridLeft="5" :xAxisValue="true" :showxAxis="false" :yAxisTickShow="false" :yAxisLineShow="false" :legendShow="false" :axisLabelFontSize="14"></PictorialBar>
                    </div>
                  </ChartBox>
                </el-col>
              </el-row> -->
              <ChartBox title="涉诈APP高危IP接入分析" >
                <div slot="chart">
                  <!-- <PictorialBar :chartData="highRiskIpAccessData" :gridLeft="5" :xAxisValue="true" :showxAxis="false" :yAxisTickShow="false" :yAxisLineShow="false" :legendShow="false" :axisLabelFontSize="14"></PictorialBar> -->
                  <el-table height="100%" :data="highRiskIpAccessData" size="mini" stripe>
                    <el-table-column prop="ip" label="IP地址" show-overflow-tooltip align="center" width="220px">
                      
                    </el-table-column>
                    <el-table-column prop="count" label="数量" show-overflow-tooltip align="center">
                      <template slot-scope="scope">
                        <div class="progress-div">
                          <el-progress :percentage="scope.row.percent" :show-text="false" :stroke-width="16"></el-progress>
                          <span class="progress-span">{{scope.row.count}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="province" label="所在省" show-overflow-tooltip align="center" width="150px"></el-table-column>
                    <el-table-column prop="operator" label="运营商" show-overflow-tooltip align="center" width="200px"></el-table-column>
                  </el-table>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <!-- <div class="wrapper" style="height:100%;margin-bottom:0;"> -->
            <div class="full-block">
              <ChartBox title="重点涉诈APP监测分析" >
                <div slot="chart">
                  <el-table height="100%" :data="tableData" size="mini" stripe ref="scrollTable">
                    <el-table-column prop="appName" label="APP名称" show-overflow-tooltip align="center"></el-table-column>
                    <el-table-column prop="srcIp" label="源IP" show-overflow-tooltip align="center"></el-table-column>
                    <el-table-column prop="destIp" label="目的IP" show-overflow-tooltip align="center"></el-table-column>
                    <el-table-column prop="" label="域名" show-overflow-tooltip align="center">
                      <template slot-scope="scope">
                        <a :href="'http://'+scope.row.domain" target="view_window">{{scope.row.domain}}</a>
                      </template>
                    </el-table-column>
                    <el-table-column prop="fraudType" label="疑似诈骗类型" show-overflow-tooltip align="center"></el-table-column>
                  </el-table>
                </div>
              </ChartBox>
              <!-- <div class="full-block" style="padding:0 0.05rem;">
                <el-table height="100%" :data="tableData" size="mini" stripe>
                  <el-table-column prop="appName" label="APP名称" show-overflow-tooltip align="center"></el-table-column>
                  <el-table-column prop="srcIp" label="源IP" show-overflow-tooltip align="center"></el-table-column>
                  <el-table-column prop="destIp" label="目的IP" show-overflow-tooltip align="center"></el-table-column>
                  <el-table-column prop="" label="域名" show-overflow-tooltip align="center">
                    <template slot-scope="scope">
                      <a :href="'http://'+scope.row.domain" target="view_window">{{scope.row.domain}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="fraudType" label="疑似诈骗类型" show-overflow-tooltip align="center"></el-table-column>
                </el-table>
              </div> -->
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartBox from 'components/chartBox'
// import VisualMapChart from 'components/echarts/map/visualMapChart'
import PictorialBar from 'components/echarts/pictorialBar/pictorialBar'
import PieChart from 'components/echarts/pie/pieChart'
import LineChart from 'components/echarts/line/lineChart'
import BarChart from 'components/echarts/bar/barChart'
import ScatterMapChart from 'components/echarts/map/scatterMapChart'
import WordCloudChart from 'components/echarts/wordCloud/wordCloudChart'
import VueSeamless from 'vue-seamless-scroll'
import {
  // getFraudAppDiscoverMapData,
  getFraudAppDiscoverTableList,
  getFraudAppMarket,
  getFraudAppEventType,
  getFraudAppDiscoverTrend,
  getHighRiskIpAccessData,
  getFraudAppTotal,
  getWarningList,
  getBarData1,
  getBarData2,
  getPretendTypeTrend
  // getFraudKeywordsData
} from 'api/analysis'
import {getAppMarketRank} from 'api/home'
import { elTableScroll } from 'utils/tableScroll'
export default {
  name: 'App',
  props: {},
  components: {ChartBox, PictorialBar, PieChart, LineChart, VueSeamless, BarChart, ScatterMapChart, WordCloudChart},//eslint-disable-line
  data() {
    return {
      tableData: [],
      highRiskIpAccessData: [], //{},
      fraudAppDiscoverTrend: {},
      fraudAppMarket: {},
      fraudAppEventType: {},
      // fraudAppTotal: 0,
      warningList: [],
      barData1: {},
      mapData: {},
      tableScroll: null,
      appBasicTotal: [],
      pretendTypeTrend: {},
      // fraudKeywordsData: {}
      appMarketRank: {}
    }
  },
  computed: {
    // 公告滚动自定义
    defaultOption () {
      return {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        // openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0 // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        // waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  created() {
    // this.getFraudAppDiscoverMapData()
    this.getBarData1()
    this.getBarData2()
    this.getFraudAppDiscoverTableList()
    this.getFraudAppTotal()
    // this.getFraudKeywordsData()
    this.getAppMarketRank()
    this.getWarningList()
    this.getFraudAppDiscoverTrend()
    this.getFraudAppMarket()
    this.getFraudAppEventType()
    this.getHighRiskIpAccessData()
    this.getPretendTypeTrend()
  },
  mounted() {
    // this.setScrollStyle()
  },
  destroyed() {
    this.tableScroll && this.tableScroll.destroy()
  },
  methods: {
    // setScrollStyle() {
    //   const box = document.querySelector('.warning-list>div')
    //   console.log('box====', box.style.transform)
    // },
    async getFraudAppTotal() {
      const res = await this.$simpleAsyncTo(getFraudAppTotal(), '获取涉诈App发现总数失败')
      if (res) {
        const mapTemp = []
        mapTemp.push({
          label: '发现总数',
          value: res.returnModel['total']
        })
        mapTemp.push({
          label: '昨日新增',
          value: res.returnModel['yesterday']
        })
        this.appBasicTotal = mapTemp
      }
    },
    async getBarData1() {
      const res = await this.$simpleAsyncTo(
        getBarData1(),
        '获取源IP分布排名失败'
      )
      if (res) {
        this.barData1 = res.returnModel
      }
    },
    async getBarData2() {
      const res = await this.$simpleAsyncTo(
        getBarData2(),
        '获取目的IP分布排名失败'
      )
      if (res) {
        this.mapData = res.returnModel
      }
    },
    async getFraudAppDiscoverTableList() {
      const res = await this.$simpleAsyncTo(
        getFraudAppDiscoverTableList(),
        '获取涉诈APP发现分布统计数据失败'
      )
      if (res) {
        this.tableData = res.returnModel
        this.tableScroll = await elTableScroll(this.$refs.scrollTable)
      }
    },
    // async getFraudAppTotal() {
    //   const res = await this.$simpleAsyncTo(getFraudAppTotal(), '获取涉诈APP发现总数失败'
    //   )
    //   if (res) {
    //     this.fraudAppTotal = res.returnModel.total
    //   }
    // },
    async getWarningList() {
      const res = await this.$simpleAsyncTo(getWarningList(), '获取APP舆情数据失败')
      if(res) {
        this.warningList = res.returnModel
      }
    },
    async getHighRiskIpAccessData() {
      const res = await this.$simpleAsyncTo(
        getHighRiskIpAccessData(),
        '获取涉诈APP发现分布统计数据失败'
      )
      if (res) {
        this.highRiskIpAccessData = res.returnModel
        this.highRiskIpAccessData = this.highRiskIpAccessData.sort((a, b) => {
          return b.count - a.count
        })
        const max = this.highRiskIpAccessData[0].count
        console.log('max===', max)
        this.highRiskIpAccessData.forEach(item => {
          item.percent = ((item.count / max).toFixed(3)) * 100
        })
        console.log('this.highRiskIpAccessData', this.highRiskIpAccessData)
      }
    },
    async getFraudAppMarket() {
      const res = await this.$simpleAsyncTo(
        getFraudAppMarket(),
        '获取涉诈APP接入商城占比失败'
      )
      if (res) {
        this.fraudAppMarket = res.returnModel
      }
    },
    async getFraudAppEventType() {
      const res = await this.$simpleAsyncTo(
        getFraudAppEventType(),
        '获取涉诈APP诈骗事件类型分布失败'
      )
      if (res) {
        this.fraudAppEventType = res.returnModel
      }
    },
    async getFraudAppDiscoverTrend() {
      const res = await this.$simpleAsyncTo(
        getFraudAppDiscoverTrend(),
        '获取近一周涉诈APP发现趋势失败'
      )
      if (res) {
        this.fraudAppDiscoverTrend = res.returnModel
      }
    },
    async getPretendTypeTrend() {
      const res = await this.$simpleAsyncTo(
        getPretendTypeTrend(),
        '获取APP伪装类型发现趋势失败'
      )
      if (res) {
        this.pretendTypeTrend = res.returnModel
      }
    },
    //词云图-涉诈APP新闻高频关键词
    // async getFraudKeywordsData() {
    //   const res = await this.$simpleAsyncTo(getFraudKeywordsData(), '获取涉诈APP新闻高频关键词失败')
    //   if (res) {
    //     this.fraudKeywordsData = res.returnModel
    //   }
    // },
    async getAppMarketRank() {
      const res = await this.$simpleAsyncTo(
        getAppMarketRank(),
        '获取应用商店涉诈APP总量排名失败'
      )
      if (res) {
        this.appMarketRank = res.returnModel
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
