<template>
  <div class="analysis-phishing wrapper" style="padding-bottom:0.1rem;">
    <el-row :gutter="20">    
      <el-col :span="4">
        <div class="ratio111">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="仿冒类型" >
                <div slot="chart">
                  <PieChart :chartData="fakeType" :radius="['45%','65%']" :center="['50%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :legendShow="false" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14" ></PieChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="仿冒网页来源" >
                <div slot="chart">
                <BarChart :chartData="fakeWebSource" :legendShow="false" :barBorderRadius="[20,20,0,0]" :barGradientShow="true"  :barStack="true" :gridTop="30" :axisLabelFontSize="14"></BarChart> 
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="full-block">
              <ChartBox title="仿冒网页类型总数" >
                <div slot="chart">
                <BarChart :chartData="fakeWebType" :legendShow="false" :barBorderRadius="[20,20,0,0]" :barGradientShow="true"  :barStack="true" :gridTop="30" :axisLabelFontSize="14" :rotate="30"></BarChart> 
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="ratio111">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="仿冒网页数量趋势" >
                <div slot="chart">
                  <LineChart :chartData="fakeWebTrend" :smooth="true" legendLeft="center" :gridTop="35" :gridBottom="5" :showLineArea="true" :legendShow="false" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14" :legendFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="国外来源仿冒网页数量趋势" >
                <div slot="chart">
                  <LineChart :chartData="foreignFakeWebTrend" :smooth="true" legendLeft="center" :gridTop="35" :gridBottom="5" :showLineArea="true" :legendShow="false" :colors="['#DD6744']" :areaStartColors="['#DD6744']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14" :legendFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="full-block">
              <ChartBox title="国内来源仿冒网页数量趋势" >
                <div slot="chart">
                  <LineChart :chartData="countryFakeWebTrend" :smooth="true" legendLeft="center" :gridTop="35" :gridBottom="5" :showLineArea="true" :legendShow="false" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14" :legendFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="full-block">
          <!-- <div class="row-h h-2"> -->
            <!-- <div class="wrapper"> -->
              <ChartBox title="仿冒网页来源分布">
                <div slot="chart">
                  <div class="full-block pr">
                    <div class="tabs-box">
                      <ul>
                        <li v-for="(item,index) in tabsList" :key="index" :class="['tab-item',{'active':item.value===activeTab}]" @click="changeTab(item.value)">{{item.label}}</li>
                      </ul>
                    </div>
                    <div style="height:calc(100% - 0.3rem);">
                      <MapLineChart v-if="activeTab==='world'" :chartData="mapData" mapType="world" :mapZoom="1.4" :symbol="['none','none']"></MapLineChart>
                      <VisualMapChart v-if="activeTab==='china'" :mapZoom="1.2" :chartData="mapData" :shadowBlur="0" :pieces="pieces" :layoutCenter="['52%', '50%']" visualMapType="piecewise" :visualMapBottom="20" :visualMapLeft="20" :roam="true" tooltipFormatter="总数" :visualMapFontSize="14"></VisualMapChart>
                    </div>
                  </div>
                </div>
              </ChartBox>
            <!-- </div> -->
          <!-- </div>
          <div class="row-h h-1">
            <div class="full-block">
              <ChartBox title="仿冒网页及深度受害用户趋势" >
                <div slot="chart">
                  <LineChart :chartData="fakeWebTrend" :smooth="true" legendLeft="center" :gridTop="30" :gridBottom="5" :showLineArea="true" :legendShow="true" :colors="['#01A3DF','#DD6744','#8A84F2']" :areaStartColors="['#01A3DF','#DD6744','rgba(145,134,251,1) ']" :areaEndColors="['rgba(251,118,62,0)',' rgba(1,197,250,0) ','rgba(151,1,250,0)']" :axisLabelFontSize="14" :legendFontSize="14"
                          ></LineChart>
                </div>
              </ChartBox>
            </div> -->
          <!-- </div> -->
        </div>
      </el-col>
      <el-col :span="4">
        <div class="ratio111">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="受害用户数量趋势" >
                <div slot="chart">
                  <LineChart :chartData="vitimUserTrend" :smooth="true" legendLeft="center" :gridTop="35" :gridBottom="5" :showLineArea="true" :legendShow="false" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14" :legendFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="深度受害用户数量趋势" >
                <div slot="chart">
                  <LineChart :chartData="deepVitimUserTrend" :smooth="true" legendLeft="center" :gridTop="35" :gridBottom="5" :showLineArea="true" :legendShow="false" :colors="['#DD6744']" :areaStartColors="['#DD6744']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14" :legendFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="full-block">
              <ChartBox title="浅中度受害用户数量趋势" >
                <div slot="chart">
                  <LineChart :chartData="lightVitimUserTrend" :smooth="true" legendLeft="center" :gridTop="35" :gridBottom="5" :showLineArea="true" :legendShow="false" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14" :legendFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="ratio111">
          <div class="row-h h-1">
            <div class="wrapper ">
              <ChartBox title="受害用户分布" >
                <div slot="chart">
                  <PieChart :chartData="affectedUsersRatio" :radius="['45%','65%']" :center="['50%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :legendShow="false" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14" ></PieChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="深度受害用户访问类型" >
                <div slot="chart">
                  <PieChart :chartData="deepVitimPhishingType" :radius="['45%','65%']" :center="['50%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :legendShow="false" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14" ></PieChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="full-block">
              <ChartBox title="浅中度受害用户访问类型" >
                <div slot="chart">
                  <PieChart :chartData="lightVitimPhishingType" :radius="['45%','65%']" :center="['50%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :legendShow="false" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14" ></PieChart>
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
import PieChart from 'components/echarts/pie/pieChart'
import LineChart from 'components/echarts/line/lineChart'
import BarChart from 'components/echarts/bar/barChart'
import MapLineChart from 'components/echarts/map/mapLineChart'
import VisualMapChart from 'components/echarts/map/visualMapChart'
import {getAffectedUsersRatio, getDeepVitimPhishingType, getLightVitimPhishingType, getFakeWebSource, getFakeWebType, getFakeWebTrend, getFakeWebMapData, getFakeType, getForeignFakeWebTrend, getCountryFakeWebTrend, getVitimUserTrend, getDeepVitimUserTrend, getLightVitimUserTrend} from 'api/analysis'
export default {
  name: 'Phishing',
  components: {ChartBox, PieChart, LineChart, BarChart, MapLineChart, VisualMapChart},
  data() {
    return {
      affectedUsersRatio: {},
      deepVitimPhishingType: {},
      lightVitimPhishingType: {},
      fakeWebSource: {},
      fakeWebType: {},
      fakeWebTrend: {},
      mapData: {
        // moveLineData: [
        //   [{ name: '美国' }, { name: '中国', value: 95 }],
        //   [{ name: '英国' }, { name: '中国', value: 90 }],
        //   [{ name: '意大利' }, { name: '中国', value: 80 }],
        //   [{ name: '澳大利亚' }, { name: '中国', value: 70 }]
        // ]
      },
      pieces: [
        {
          min: 1999
        },
        {
          min: 200,
          max: 1999
        },
        {
          min: 100,
          max: 199
        },
        {
          min: 10,
          max: 99
        },
        {
          min: 0,
          max: 9
        }
      ],
      tabsList: [
        {label: '世界', value: 'world'},
        {label: '中国', value: 'china'}
      ],
      activeTab: 'world',
      fakeType: {},
      foreignFakeWebTrend: {},
      countryFakeWebTrend: {},
      vitimUserTrend: {},
      deepVitimUserTrend: {},
      lightVitimUserTrend: {}
    }
  },
  created() {
    this.getFakeType()
    this.getFakeWebMapData()
    this.getAffectedUsersRatio()
    this.getDeepVitimPhishingType()
    this.getLightVitimPhishingType()
    this.getFakeWebSource()
    this.getFakeWebType()
    this.getFakeWebTrend()
    this.getForeignFakeWebTrend()
    this.getCountryFakeWebTrend()
    this.getVitimUserTrend()
    this.getDeepVitimUserTrend()
    this.getLightVitimUserTrend()
  },
  methods: {
    changeTab(value) {
      this.activeTab = value
      this.getFakeWebMapData()
    },
    async getFakeWebMapData() {
      const params = {type: this.activeTab}
      const res = await this.$simpleAsyncTo(getFakeWebMapData(params), '获取地图数据失败')
      if (res) {
        this.mapData = res.returnModel
      }
    },
    async getAffectedUsersRatio() {
      const res = await this.$simpleAsyncTo(getAffectedUsersRatio(), '获取受害用户分布失败')
      if (res) {
        this.affectedUsersRatio = res.returnModel
      }
    },
    async getDeepVitimPhishingType() {
      const res = await this.$simpleAsyncTo(getDeepVitimPhishingType(), '获取深度受害用户所涉仿冒网站类型失败')
      if (res) {
        this.deepVitimPhishingType = res.returnModel
      }
    },
    async getLightVitimPhishingType() {
      const res = await this.$simpleAsyncTo(getLightVitimPhishingType(), '获取浅中度受害用户所涉仿冒网站类型失败')
      if (res) {
        this.lightVitimPhishingType = res.returnModel
      }
    },
    async getFakeWebSource() {
      const res = await this.$simpleAsyncTo(getFakeWebSource(), '获取仿冒网页来源失败')
      if (res) {
        this.fakeWebSource = res.returnModel
      }
    },
    async getFakeWebType() {
      const res = await this.$simpleAsyncTo(getFakeWebType(), '获取仿冒网页类型总数失败')
      if (res) {
        this.fakeWebType = res.returnModel
      }
    },
    async getFakeWebTrend() {
      const res = await this.$simpleAsyncTo(getFakeWebTrend(), '获取仿冒网页及深度受害用户趋势失败')
      if (res) {
        this.fakeWebTrend = res.returnModel
      }
    },
    async getFakeType() {
      const res = await this.$simpleAsyncTo(getFakeType(), '获取仿冒类型失败')
      if (res) {
        this.fakeType = {
          legendData: ['仿冒类型'],
          seriesData: res.returnModel.seriesData
        }
      }
    },
    async getForeignFakeWebTrend() {
      const res = await this.$simpleAsyncTo(getForeignFakeWebTrend(), '获取国外来源仿冒网站数量趋势失败')
      if (res) {
        this.foreignFakeWebTrend = res.returnModel
      }
    },
    async getCountryFakeWebTrend() {
      const res = await this.$simpleAsyncTo(getCountryFakeWebTrend(), '获取国内来源仿冒网站数量趋势失败')
      if (res) {
        this.countryFakeWebTrend = res.returnModel
      }
    },
    async getVitimUserTrend() {
      const res = await this.$simpleAsyncTo(getVitimUserTrend(), '获取受害用户数量趋势失败')
      if (res) {
        this.vitimUserTrend = res.returnModel
      }
    },
    async getDeepVitimUserTrend() {
      const res = await this.$simpleAsyncTo(getDeepVitimUserTrend(), '获取深度受害用户数量趋势失败')
      if (res) {
        this.deepVitimUserTrend = res.returnModel
      }
    },
    async getLightVitimUserTrend() {
      const res = await this.$simpleAsyncTo(getLightVitimUserTrend(), '获取浅中度受害用户数量趋势失败')
      if (res) {
        this.lightVitimUserTrend = res.returnModel
      }
    }
  }
}
</script>
<style lang="less" scoped>
.analysis-phishing{
  .tabs-box{
    width:1rem;
  }
}
</style>

