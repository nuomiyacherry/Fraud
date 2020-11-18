<template>
  <div class='aggregation' v-loading="loading">
    <el-row class="main-height" :gutter="20">
      <!-- <el-col :span="6">
        <div class="wrapper">
          <div class="height-10">
            <ChartBox title="数据来源" titleClass="data-source">
              <div slot="chart">
                <DataSource></DataSource>
              </div>
            </ChartBox>
          </div>
        </div>
      </el-col> -->
      <el-col :span="4" style="padding-bottom:0.1rem;">
        <div class="ratio111 cus-bg">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox :hasBg="false" title="建设进展">
                <div slot="chart">
                  <PieChart :chartData="constructProgress" 
                  :radius="['55%','75%']" 
                  :center="['60%', '50%']" 
                  :legendLeft="10" 
                  :legendBottom="0" 
                  legendOrient="vertical" 
                  :seriesLabelEmphasisShow="true" 
                  :pieAutoPlay="true" 
                  :showPercent="true" 
                  :axisLabelFontSize="14"
                  :legendFontSize="14">
                  </PieChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox :hasBg="false" title="未建设情况分布">
                <div slot="chart">
                  <PieChart :chartData="unconstructed" 
                  :radius="['55%','75%']" 
                  :center="['60%', '50%']" 
                  :legendLeft="10"  
                  :legendBottom="0" 
                  legendOrient="vertical" 
                  :seriesLabelEmphasisShow="true" 
                  :pieAutoPlay="true" 
                  :showPercent="true" 
                  :axisLabelFontSize="14"
                  :legendFontSize="14">
                  </PieChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox :hasBg="false" title="公安协同联动情况">
                <div slot="chart">
                  <PieChart :chartData="securityCoordination" 
                  :radius="['55%','75%']" 
                  :center="['60%', '50%']" 
                  :legendLeft="10" 
                  :legendBottom="0" 
                  legendOrient="vertical" 
                  :seriesLabelEmphasisShow="true" 
                  :pieAutoPlay="true" 
                  :showPercent="true" 
                  :axisLabelFontSize="14"
                  :legendFontSize="14">
                  </PieChart>
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="wrapper">
          <div class="height-10 map3d">
            <div class="title">{{mapTitle}}</div>
            <div class="map-box full-block">
              <Map :renderData="curMapData" @mapClick="mapClick"></Map>
              <div class="conner conner-lb" v-if="!showDetail"></div>
              <div class="conner conner-rt" v-if="!showDetail"></div>
            </div>
            <div class="map-detail" v-if="showDetail">
              <i class="el-icon-error return" @click="closeDetail"></i>
              <Detail :detailData="detailData"></Detail>
            </div>
            <!-- <VisualMapChart :pieces="pieces" :chartData="mapData" mapType="china" :roam="true" visualMapType="piecewise" :mapLabelEmphasisShow="true" :shadowBlur="0" tooltipFormatter="ministry" :visualMapBottom="20" :visualMapLeft="20"   mapItemborderColor="#032539"></VisualMapChart> -->
          </div>
        </div>
      </el-col>
      <el-col :span="4" style="padding-bottom:0.1rem;">
        <div class="ratio1111 cus-bg">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox :hasBg="false" title="涉诈域名累计上报排名">
                <div slot="chart">
                  <PictorialBar :chartData="pictorialBarData1"
                    :gridLeft="5"
                    :xAxisValue="true"
                    :showxAxis="false"
                    :yAxisTickShow="false"
                    :yAxisLineShow="false"
                    :legendShow="false"
                    :axisLabelFontSize="14">
                  </PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox :hasBg="false" title="涉诈网址累计上报排名">
                <div slot="chart">
                  <PictorialBar :chartData="pictorialBarData3"
                    :gridLeft="5"
                    :xAxisValue="true"
                    :showxAxis="false"
                    :yAxisTickShow="false"
                    :yAxisLineShow="false"
                    :legendShow="false"
                    :axisLabelFontSize="14">
                  </PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox :hasBg="false" title="涉诈APP累计上报排名">
                <div slot="chart">
                  <PictorialBar :chartData="pictorialBarData4"
                    :gridLeft="5"
                    :xAxisValue="true"
                    :showxAxis="false"
                    :yAxisTickShow="false"
                    :yAxisLineShow="false"
                    :legendShow="false"
                    :axisLabelFontSize="14">
                  </PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox :hasBg="false" title="涉诈短信累计上报排名">
                <div slot="chart">
                  <PictorialBar :chartData="pictorialBarData2"
                    :gridLeft="5"
                    :xAxisValue="true"
                    :showxAxis="false"
                    :yAxisTickShow="false"
                    :yAxisLineShow="false"
                    :legendShow="false"
                    :axisLabelFontSize="14">
                  </PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4" style="padding-bottom:0.1rem;">
        <div class="ratio1111 cus-bg">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox :hasBg="false" title="涉诈域名当月上报排名">
                <div slot="chart">
                  <!-- <BarChart :chartData="fraudDomainTop" :legendShow="false" :barBorderRadius="[20,20,0,0]" :barGradientShow="true"  :barStack="true" :gridTop="30" :axisLabelFontSize="14"></BarChart> -->
                  <PictorialBar :chartData="fraudDomainTop" :colors="['#6DD9A9', '#8AD394', '#B4C66B', '#E3B734', '#FFAE00']" :gridLeft="5" :xAxisValue="true" :showxAxis="false" :yAxisTickShow="false" :yAxisLineShow="false" :legendShow="false" :axisLabelFontSize="14"></PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox :hasBg="false" title="涉诈网址当月上报排名">
                <div slot="chart">
                  <!-- <BarChart :chartData="fraudUrlTop" :legendShow="false" :barBorderRadius="[20,20,0,0]" :barGradientShow="true"  :barStack="true" :gridTop="30" :axisLabelFontSize="14"></BarChart> -->
                  <PictorialBar :chartData="fraudUrlTop" :colors="['#6DD9A9', '#8AD394', '#B4C66B', '#E3B734', '#FFAE00']" :gridLeft="5" :xAxisValue="true" :showxAxis="false" :yAxisTickShow="false" :yAxisLineShow="false" :legendShow="false" :axisLabelFontSize="14"></PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox :hasBg="false" title="涉诈APP当月上报排名">
                <div slot="chart">
                  <!-- <BarChart :chartData="fraudAppTop" :legendShow="false" :barBorderRadius="[20,20,0,0]" :barGradientShow="true"  :barStack="true" :gridTop="30" :axisLabelFontSize="14"></BarChart> -->
                  <PictorialBar :chartData="fraudAppTop" :colors="['#6DD9A9', '#8AD394', '#B4C66B', '#E3B734', '#FFAE00']" :gridLeft="5" :xAxisValue="true" :showxAxis="false" :yAxisTickShow="false" :yAxisLineShow="false" :legendShow="false" :axisLabelFontSize="14"></PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox :hasBg="false" title="涉诈短信当月上报排名">
                <div slot="chart">
                  <!-- <BarChart :chartData="fraudMessageTop" :legendShow="false" :barBorderRadius="[20,20,0,0]" :barGradientShow="true"  :barStack="true" :gridTop="30" :axisLabelFontSize="14"></BarChart> -->
                  <PictorialBar :chartData="fraudMessageTop" :colors="['#6DD9A9', '#8AD394', '#B4C66B', '#E3B734', '#FFAE00']" :gridLeft="5" :xAxisValue="true" :showxAxis="false" :yAxisTickShow="false" :yAxisLineShow="false" :legendShow="false" :axisLabelFontSize="14"></PictorialBar>
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
import Map from './map'
import Detail from './detail'
import DataSource from './dataSource'
// import BarChart from 'components/echarts/bar/barChart'
import PieChart from 'components/echarts/pie/pieChart'
import {
  getDetails,
  getProvSystem,
  getSecurityCoordination
} from 'api/aggregation'
export default {
  name: 'Aggregation',
  mixins: [sameMixin],
  props: {},
  components: {
    // BarChart,
    PieChart,
    Map,
    Detail,
    DataSource
  },
  data() {
    return {
      countryFraud: {},
      provinceFraud: {},
      mapTitle: '部省对接现状',
      curMapData: {
        // center: [108.933051, 35.846597],
        center: [104.106445, 35.846597],
        name: 'china',
        type: 'china',
        data: [],
        pieces: []
      },
      showDetail: false,
      detailData: {},
      provSystem: {},
      securityCoordination: {},
      constructProgress: {},
      unconstructed: {}
    }
  },
  computed: {},
  created() {
    this.getProvSystem()
    this.getSecurityCoordination()
  },
  mounted() {},
  methods: {
    mapClick(params) {
      if (params.data.value[2] !== 0) {
        this.mapTitle = params.name + '系统情况'
        this.curMapData.type = params.name
        this.curMapData.name = params.name
        this.curMapData.center = [params.data.value[0], params.data.value[1]]
        this.showDetail = true
        this.getDetails(params.name)
      } else {
        this.$message({
          message: '该省暂未建设！',
          type: 'warning'
        })
      }
    },
    closeDetail() {
      this.mapTitle = '省平台对接现状'
      this.curMapData.type = 'china'
      this.curMapData.name = 'china'
      this.curMapData.center = [108.933051, 35.846597]
      this.showDetail = false
      this.getProvinceSystemDocking()
      this.detailData = {}
    },
    async getDetails(name) {
      const res = await this.$simpleAsyncTo(
        getDetails(),
        '获取省平台对接详情失败！'
      )
      if (res) {
        const objs = res.returnModel
        for (let key in objs) {
          if (name === key) {
            this.detailData = objs[key]
          }
        }
      }
    },
    async getProvSystem(name) {
      const res = await this.$simpleAsyncTo(
        getProvSystem(),
        '获取省系统建设情况失败！'
      )
      if (res) {
        // this.provSystem = res.returnModel
        this.constructProgress = res.returnModel.constructProgress
        this.unconstructed = res.returnModel.unconstructed
      }
    },
    async getSecurityCoordination(name) {
      const res = await this.$simpleAsyncTo(
        getSecurityCoordination(),
        '获取公安协同联动情况失败！'
      )
      if (res) {
        this.securityCoordination = res.returnModel
      }
    }
  }
}
</script>

<style scoped lang="less">
.aggregation {
  .map3d {
    position: relative;
    .title {
      position: absolute;
      left: 0.1rem;
      top: 0rem;
      height: 0.3rem;
      line-height: 0.3rem;
      padding: 0 0.4rem;
      font-size: 0.13rem;
      color: #0cfbff;
      background: url(~assets/img/aggregation/special-title41.png) no-repeat
        center center / 100% 100%;
      z-index: 100;
    }
    .map-box {
      position: relative;
      height: 100%;
      top: 0;
      .conner {
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        &.conner-lb {
          left: 0px;
          bottom: 0px;
          transform: rotate(180deg);
          background: url(~assets/img/aggregation/map-conner41.png) no-repeat
            center center / 100% 100%;
        }
        &.conner-rt {
          right: 0px;
          top: 0px;
          background: url(~assets/img/aggregation/map-conner41.png) no-repeat
            center center / 100% 100%;
        }
      }
    }
    .map-detail {
      height: calc(~'100% - 0.3rem');
      width: 100%;
      position: absolute;
      top: 0.3rem;
      right: 0;
      z-index: 2;
      padding: 0.1rem;
      border: 1px solid #2493ca;
      .return {
        position: absolute;
        right: -0.2rem;
        top: -0.1rem;
        width: 0.3rem;
        height: 0.3rem;
        color: #52bbce;
        &[class^='el-icon-'] {
          font-size: 0.1rem !important;
        }
      }
    }
  }
  .chart-list {
    background: rgba(70, 196, 255, 0.07);
    height: calc(~'100% - 0.1rem') !important;
  }
  // .data-source {
  //   background: rgba(70, 196, 255, 0.07);
  // }
  // .data-title {
  //   position: absolute;
  //   top: 0px;
  //   left: 0px;
  //   z-index: 1;
  // }
  // .system {
  //   width: 1rem;
  //   height: 1rem;
  //   position: absolute;
  //   top: 0;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   text-align: center;
  //   .bg {
  //     width: 100%;
  //     height: 100%;
  //     background: url(~assets/img/aggregation/ball.png) no-repeat center center /
  //       100% 100%;
  //     animation: rotate 3s linear infinite;
  //   }
  //   .name {
  //     font-size: 0.18rem;
  //     position: absolute;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate(-50%, -50%);
  //     width: 100%;
  //     color: #0cfbff;
  //   }
  //   @keyframes rotate {
  //     from {
  //       transform: rotate(0deg);
  //     }
  //     to {
  //       transform: rotate(359deg);
  //     }
  //   }
  // }
}
</style>