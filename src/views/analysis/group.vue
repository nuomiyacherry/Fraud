<template>
  <div class="analysis-group wrapper">
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="ratio233 pr">
          <div class="row-h h-2">
            <div class="wrapper cus-bg">
              <!-- <div class="cus-title">涉诈团伙分析</div> -->
              <!-- <div class="wrapper-box"> -->
                <ul class="full-block total-ul" style="padding:0.1rem;">
                  <li class="pr" v-for="(item,index) in maptotalList" :key="index">
                    <div class="label">{{item.label}}</div>
                    <div class="value">{{item.value}}</div>
                  </li>
                </ul>
              <!-- </div> -->
            </div>
          </div>
          <div class="row-h h-3">
            <div class="wrapper">
              <ChartBox title="涉诈团伙新增趋势" >
                <div slot="chart">
                  <LineChart :chartData="fraudAddTrend" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#DD6744']" :areaStartColors="['#DD6744']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></LineChart>  
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-3">
            <div class="wrapper">
              <ChartBox title="涉诈团伙活动趋势" >
                <div slot="chart">
                  <LineChart :chartData="fraudActiveTrend" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="19" style="height:calc(100% - 0.1rem);">
        <el-row>
          <el-col :span="12">
            <div class="ratio21 cus-bg">
              <div class="row-h h-2">
                <div class="wrapper">
                  <ChartBox title="诈骗聚合动态分析" :hasBg="false">
                    <div slot="chart">
                      
                      <div class="graph-title">
                        <!-- <div class="cus-title">诈骗聚合动态分析</div> -->
                        <div class="btn-box">
                          <div v-for="(item, ind) in graphBtns" :key="ind" class="btn" :class="[{'active': ind===activeType},'btn-'+ind]"  @click="changeGraph(item.name,item.bg, ind)">
                            {{item.name}}
                          </div>
                        </div>
                      </div>
                      <div class="graph-content">
                        <img :src="graphImg" width="98%" height="98%"/>
                      </div>
                    </div>
                  </ChartBox>
                </div>
              </div>
              <div class="row-h h-1">
                <div class="wrapper">
                  <div class="full-block" style="padding:0 0.05rem;">
                    <el-table height="100%" :data="tableData" size="mini" stripe :class="bg">
                      <el-table-column prop="weChatQQ" label="微信QQ" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="isogeny" label="同源" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="ip" label="嫌疑人IP" :width="tableCellWidth" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="control" label="操控" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="" label="涉诈域名" show-overflow-tooltip>
                        <template slot-scope="scope">
                          <a :href="'http://'+scope.row.swindleDomain" target="view_window">{{scope.row.swindleDomain}}</a>
                        </template>
                      </el-table-column>
                      <el-table-column prop="analysis" label="解析" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="swindleMainframe" label="涉诈主机" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="dataTransmission" label="数据传输" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="appName" label="APP名称" show-overflow-tooltip></el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="wrapper" style="padding:0 0.1rem;">
              <div class="full-block cus-bg">
                <div class="tabs-box" style="padding:0.03rem 0.07rem 0;">
                  <ul>
                    <li v-for="(item,index) in rightTabList" :key="index" :class="['tab-item',{'active':item.value===activeTab}]" @click="changeTab(item.value)">{{item.label}}</li>
                  </ul>
                </div>
                <div class="ratio11" style="height:calc(100% - 0.38rem);">
                  <div class="row-h h-1">
                    <div class="wrapper">
                      <el-row>
                        <el-col :span="8">
                          <ChartBox title="基本情况" :hasBg="false">
                            <div slot="chart">
                              <ul class="full-block basic-info-list flex-d-col">
                                <li class="flex-1 y-center" v-for="(item, i) in basicList" :key="i">
                                  <div class="item flex-layout">
                                    <div class="flex-1 label">{{item.label}}</div>
                                    <div class="value">
                                      <strong>{{item.value}}</strong>
                                      <span class="unit">{{item.unit}}</span>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </ChartBox>
                        </el-col>
                        <el-col :span="16">
                          <ChartBox title="疑似受害者全国分布" :hasBg="false">
                            <div slot="chart">
                              <!-- <VisualMapChart :chartData="victimNationalData" :shadowBlur="0" :pieces="pieces" visualMapType="piecewise" :visualMapBottom="20" :visualMapLeft="20" :roam="true" tooltipFormatter="疑似受害者数量" :visualMapFontSize="14"></VisualMapChart> -->
                              <BarChart :chartData="victimNationalData"  :legendShow="false"  :barBorderRadius="[20,20,0,0]"  :barGradientShow="true"  :barStack="true"  :gridTop="30"  :axisLabelFontSize="14"></BarChart>
                            </div>
                          </ChartBox>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div class="row-h h-1">
                    <div class="full-block">
                      <el-row>
                        <el-col :span="8">
                          <ChartBox title="涉诈域名" :hasBg="false">
                            <div slot="chart">
                              <el-table height="100%" :data="fraudDomainTableData" size="mini" stripe>
                                <el-table-column prop="" label="主机域名" show-overflow-tooltip>
                                  <template slot-scope="scope">
                                    <a :href="'http://'+scope.row.hostDomain" target="view_window">{{scope.row.hostDomain}}</a>
                                  </template>
                                </el-table-column>
                                <el-table-column prop="" label="顶级域名" show-overflow-tooltip>
                                  <template slot-scope="scope">
                                    <a :href="'http://'+scope.row.topDomain" target="view_window">{{scope.row.topDomain}}</a>
                                  </template>
                                </el-table-column>
                              </el-table>
                            </div>
                          </ChartBox>
                        </el-col>
                        <el-col :span="8">
                          <ChartBox title="疑似嫌疑人源IP" :hasBg="false">
                            <div slot="chart">
                              <el-table height="100%" :data="suspectSrcIpTableData" size="mini" stripe>
                                <el-table-column prop="srcIp" label="源IP" show-overflow-tooltip>  
                                </el-table-column>
                                <el-table-column prop="location" label="归属地" show-overflow-tooltip>
                                </el-table-column>
                              </el-table>
                            </div>
                          </ChartBox>
                        </el-col>
                        <el-col :span="8">
                          <ChartBox title="主机IP" :hasBg="false">
                            <div slot="chart">
                              <el-table height="100%" :data="hostIpTableData" size="mini" stripe>
                                <el-table-column prop="hostIp" label="主机IP" show-overflow-tooltip>  
                                </el-table-column>
                                <el-table-column prop="location" label="归属地" show-overflow-tooltip>
                                </el-table-column>
                              </el-table>
                            </div>
                          </ChartBox>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      
    </el-row>
  </div>
</template>

<script>
import ChartBox from 'components/chartBox'
import BarChart from 'components/echarts/bar/barChart'
import LineChart from 'components/echarts/line/lineChart'
// import VisualMapChart from 'components/echarts/map/visualMapChart'
import {fraudRings, getFraudAddTrend, getFraudActiveTrend, tableList, getTabList, getBasicList, getVictimNationalData, getFraudDomainTableList, getSuspectSrcIpTableList, getHostIpTableList} from 'api/analysis'
import { setInterval } from 'timers'
export default {
  name: 'Group',
  props: {},
  components: {ChartBox, BarChart, LineChart},
  data() {
    return {
      graphImg: './dataAnalysis/数据输入点状图.png',
      graphBtns: [
        {name: '数据输入', bg: 'orange'},
        {name: '协同融合', bg: 'blue'},
        {name: '关联分析', bg: 'purple'},
        {name: '省部聚合', bg: 'green'},
        {name: '全国总览', bg: 'yellow'}
      ],
      activeType: 0,
      bg: 'orange',
      tableData: [],
      rightTabList: [],
      activeTab: '',
      basicList: [],
      victimNationalData: {},
      // pieces: [
      //   {
      //     min: 1000000
      //   },
      //   {
      //     min: 50000,
      //     max: 999999
      //   },
      //   {
      //     min: 10000,
      //     max: 99999
      //   },
      //   {
      //     min: 1000,
      //     max: 9999
      //   },
      //   {
      //     min: 0,
      //     max: 999
      //   }
      // ],
      fraudDomainTableData: [],
      suspectSrcIpTableData: [],
      hostIpTableData: [],
      timer: null,
      tableCellWidth: '110',
      maptotalList: [],
      fraudAddTrend: {},
      fraudActiveTrend: {}
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getFraudRings()
    this.getFraudAddTrend()
    this.getFraudActiveTrend()
    this.getTableList()
    this.getTabList()
    this.timer = setInterval(() => {
      this.setAutoChange()
    }, 5000)
    // console.log('document', document.body.clientWidth)
    this.tableCellWidth = document.body.clientWidth === 3840 ? '110' : '220'
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    changeGraph(name, bg, index) {
      this.graphImg = `./dataAnalysis/${name}点状图.png`
      this.activeType = index
      this.bg = bg
      this.getTableList()
    },
    setAutoChange() {
      this.activeType++
      if(this.activeType >= 4) {
        this.activeType = 4
        this.timer && clearInterval(this.timer)
      }
      this.graphImg = `./dataAnalysis/${this.graphBtns[this.activeType].name}点状图.png`
      this.bg = this.graphBtns[this.activeType].bg
      this.getTableList()
    },
    async getTableList() {
      const res = await this.$simpleAsyncTo(tableList({ type: this.activeType }), '获取近一周活跃域名聚合动态分析表格数据失败')
      if (res) {
        this.tableData = res.returnModel
      }
    },
    async getTabList() {
      const res = await this.$simpleAsyncTo(getTabList(), '获取获取右侧顶部tab列表数据失败')
      if (res) {
        this.rightTabList = res.returnModel
        this.activeTab = res.returnModel[0].value
        this.getInit()
      }
    },
    changeTab(value) {
      this.activeTab = value
      this.getInit()
    },
    getInit() {
      this.getBasicList()
      this.getVictimNationalData()
      this.getFraudDomainTableList()
      this.getSuspectSrcIpTableList()
      this.getHostIpTableList()
    },
    async getFraudRings() {
      const res = await this.$simpleAsyncTo(fraudRings(), '获取基本情况数据失败')
      if (res) {
        const mapTemp = []
          mapTemp.push({
            label: '涉诈团伙总数',
            value: res.returnModel['reportNum']
          })
          mapTemp.push({
            label: '昨日新增团伙数',
            value: res.returnModel['blockNum']
          })
          mapTemp.push({
            label: '昨日更新团伙数',
            value: res.returnModel['update']
          })
          mapTemp.push({
            label: '昨日关联团伙数',
            value: res.returnModel['link']
          })
          this.maptotalList = mapTemp
      }
    },
    async getFraudAddTrend() {
      const res = await this.$simpleAsyncTo(getFraudAddTrend(), '获取涉诈团伙新增趋势失败')
      if (res) {
        this.fraudAddTrend = res.returnModel
      }
    },
    async getFraudActiveTrend() {
      const res = await this.$simpleAsyncTo(getFraudActiveTrend(), '获取涉诈团伙活动趋势失败')
      if (res) {
        this.fraudActiveTrend = res.returnModel
      }
    },
    async getBasicList() {
      const res = await this.$simpleAsyncTo(getBasicList({ type: this.activeTab }), '获取基本情况数据失败')
      if (res) {
        this.basicList = res.returnModel
      }
    },
    async getVictimNationalData() {
      const res = await this.$simpleAsyncTo(getVictimNationalData({ type: this.activeTab }), '获取疑似受害者全国分布失败')
      if(res) {
        this.victimNationalData = {
          legendData: ['疑似受害者数量'],
          seriesData: res.returnModel.seriesData,
          categoryData: res.returnModel.categoryData
        }
      }
    },
    async getFraudDomainTableList() {
      const res = await this.$simpleAsyncTo(getFraudDomainTableList({ type: this.activeTab }), '获取涉诈域名表格数据失败')
      if(res) {
        this.fraudDomainTableData = res.returnModel
      }
    },
    async getSuspectSrcIpTableList() {
      const res = await this.$simpleAsyncTo(getSuspectSrcIpTableList({ type: this.activeTab }), '获取疑似嫌疑人源IP表格数据失败')
      if(res) {
        this.suspectSrcIpTableData = res.returnModel
      }
    },
    async getHostIpTableList() {
      const res = await this.$simpleAsyncTo(getHostIpTableList({ type: this.activeTab }), '获取主机IP表格数据失败')
      if(res) {
        this.hostIpTableData = res.returnModel
      }
    }
  }
}
</script>

<style scoped lang="less">
.analysis-group{
  .cus-title{
    top:0.05rem;
    font-size:0.11rem;
  }
  .graph-title {
    .btn-box{
      position: absolute;
      top:0.03rem;
      right:0;
      .btn {
        margin-left: 0.03rem;
        font-size: 0.09rem;
        float: left;
        padding:0 0.05rem;
        height:0.2rem;
        line-height:0.2rem;
        box-sizing: content-box;
        cursor: pointer;
        &.btn-0 {
          background: rgba(221,135,73,0.10);
          border: 2px solid #E0693C;
          box-shadow: inset 0 0 8px 2px #E58865;
          color:#E58865;
          &.active {
            box-shadow:none;
            color:#FFA583;
            background: rgba(221,135,73,0.45);
            border: 2px solid #E0693C;
          }
        }
        &.btn-1 {
          background: rgba(67,120,226,0.10);
          border: 2px solid #58AAFF;
          box-shadow: inset 0 0 8px 2px #6795FF;
          color:#6795FF;
          &.active {
            box-shadow:none;
            color:#5EC7FF;
            background: rgba(67,120,226,0.7);
            border: 2px solid #58AAFF;
          }
        }
        &.btn-2 {
          background: rgba(138,85,255,0.10);
          border: 2px solid #C659FF;
          box-shadow: inset 0 0 8px 2px #BB6BFF;
          color:#BB6FFB;
          &.active {
            box-shadow:none;
            background: rgba(138,85,255,0.6);
            border: 2px solid #C659FF;
            color:#D289FF;
          }
        }
        &.btn-3 {
          background: rgba(90,201,225,0.10);
          border: 2px solid #2FDDE4;
          box-shadow: inset 0 0 8px 2px #1EFCFF;
          color:#31D0D3;
          &.active {
            box-shadow:none;
            background: rgba(90,201,225,0.45);
            border: 2px solid #2FDDE4;
            color:#3CFCFF;
          }
        }
        &.btn-4 {
          background: rgba(181,193,75,0.10);
          border: 2px solid #BFCC46;
          box-shadow: inset 0 0 8px 2px #B4E729;
          color:#A0BD52;
          &.active {
            box-shadow:none;
            background: rgba(181,193,75,0.45);
            border: 2px solid #BFCC46;
            color:#D9FF72;
          }
        }
      }
    }
  }
  .graph-content {
    // position: relative;
    // top: 0.3rem;
    width: 100%;
    height:100%;
    // height: calc(100% - 0.3rem);
    // padding: 1%;
  }
  .basic-info-list{
    li{
      height:20%;
    }
    .item{
      background: rgba(0,135,255,0.10);
      border: 1px solid #01BDF4;
      border-left-width:3px;
      border-right-width:3px;
      justify-content: space-between;
      align-items: center;
      padding:0.13rem 0.05rem;
      height: 60%;
      width: 100%;
      margin: 0 auto;
    }
    .label {
      color:#46C4FF;
      font-size: 0.09rem;
      padding:0;
    }
    .value {
      color: #FFA400;
      font-family: 'DS-Digital';
      font-size:0.15rem;
      padding:0;     
    }
    .unit{
      font-size:0.1rem;
    }
  }
}
</style>
