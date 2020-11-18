<template>
  <div class='analysis'>
    <el-row class="main-height" :gutter="20">
      <el-col :span="3">
        <div class="full-block" style="padding-bottom:0.1rem;">
          <!-- <ChartBox title="大数据综合分析">
            <div slot="chart">
              <img :src="leftImg" width="100%" height="100%"/>
            </div>
          </ChartBox> -->
          <ul class="content-nav">
            <li :class="['nav-item',{'active':activeValue===item.value}]" v-for="(item,index) in navList" :key="index" @click="clickCenterBox(item.value)">
              <div class="nav-info">
                <i :class="['icon','iconfont',item.icon]"></i>
                <span>{{item.label}}</span>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <!-- <el-col :span="0">
        <el-col class="ratio11">
          <div class="row-h h-1">
            <div class="wrapper">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div :class="['pr','cus-bg',{'active':activeValue==='website'}]">
                    <div class="cus-title">重点网站分析</div>
                    <div class="more" @click="clickCenterBox('website')">更多</div>
                    <div class="ratio11 pr wrapper-box">
                      <div class="row-h h-1">
                        <div class="wrapper">
                          <ChartBox title="类型占比" :hasBg="false">
                            <div slot="chart">
                              <PieChart :chartData="fraudWebsiteType" :radius="['60%','85%']" :center="['50%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :legendShow="false" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14" ></PieChart>
                            </div>
                          </ChartBox>
                        </div>
                      </div>
                      <div class="row-h h-1">
                        <div class="wrapper">
                          <ChartBox title="疑似受害者分布占比" :hasBg="false">
                            <div slot="chart">
                              <PieChart :chartData="suspectedVictimData" :center="['50%', '50%']" :radius="['60%','85%']" :legendLeft="10"  legendOrient="vertical" :legendShow="false" :pieAutoPlay="true" :tooltipShow="false" :showPercent="true" :legendFontSize="14"></PieChart>
                            </div>
                          </ChartBox>
                        </div>
                      </div>
                    </div>
                    <el-row class="wrapper-box">
                      <el-col :span="8">
                        <ChartBox title="涉诈类型占比" :hasBg="false">
                          <div slot="chart">
                            <PieChart :chartData="fraudWebsiteType" :radius="['60%','85%']" :center="['50%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :legendShow="false" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14" ></PieChart>
                          </div>
                        </ChartBox>
                      </el-col>
                      <el-col :span="8">
                        <ChartBox title="疑似受害者国内占比" :hasBg="false">
                          <div slot="chart">
                            <PieChart :chartData="suspectedVictimData" :center="['50%', '50%']" :radius="['60%','85%']" :legendLeft="10"  legendOrient="vertical" :legendShow="false" :pieAutoPlay="true" :tooltipShow="false" :showPercent="true" :legendFontSize="14"></PieChart>
                          </div>
                        </ChartBox>
                      </el-col>
                      <el-col :span="8">
                        <ChartBox title="网站境内外接入占比" :hasBg="false">
                          <div slot="chart">
                            <PieChart :chartData="websiteAccessProportion" :center="['50%', '50%']" :radius="['60%','85%']" :legendLeft="10"  legendOrient="vertical" :legendShow="false" :pieAutoPlay="true" :tooltipShow="false" :showPercent="true" :legendFontSize="14"></PieChart>
                          </div>
                          </ChartBox>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div :class="['pr','cus-bg',{'active':activeValue==='app'}]">
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
                  </div>
                </el-col>
              </el-row>              
            </div>
          </div>
          <div class="row-h h-1">
            <div :class="['wrapper','pr','cus-bg',{'active':activeValue==='app'}]">
              <div class="cus-title">涉诈APP分析</div>
              <div class="more" @click="clickCenterBox('app')">更多</div>
              <el-row class="wrapper-box">
                <el-col :span="8">
                  <ChartBox title="APP应用类型占比" :hasBg="false">
                    <div slot="chart">
                      <PieChart :chartData="fraudAppMarket" :radius="['60%','85%']" :center="['50%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :legendShow="false" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14" ></PieChart>
                    </div>
                  </ChartBox>
                </el-col>
                <el-col :span="8">
                  <ChartBox title="涉诈APP分类占比" :hasBg="false">
                    <div slot="chart">
                      <PieChart :chartData="fraudAppEventType" :radius="['60%','85%']" :center="['50%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :legendShow="false" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14" ></PieChart>
                    </div>
                  </ChartBox>
                </el-col>
                <el-col :span="8">
                  <ChartBox title="涉诈APP发现趋势" :hasBg="false">
                    <div slot="chart">
                      <LineChart
                        :chartData="fraudAppDiscoverTrend" :smooth="true" :legendLeft="40" :legendRight="40" :gridTop="30" :gridBottom="5" :showLineArea="true" :legendShow="false" :colors="['#01A3DF','#DD6744','#8A84F2']" :areaStartColors="['#01A3DF','#DD6744','rgba(145,134,251,1) ']" :areaEndColors="['rgba(251,118,62,0)',' rgba(1,197,250,0) ','rgba(151,1,250,0)']" :axisLabelFontSize="14" :legendFontSize="14"
                        ></LineChart>
                    </div>
                  </ChartBox>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="row-h h-1">
            <div :class="['wrapper','pr','cus-bg',{'active':activeValue==='group'}]">
              <div class="cus-title">涉诈团伙分析</div>
              <div class="more" @click="clickCenterBox('group')">更多</div>
              <el-row class="wrapper-box">
                <el-col :span="10">
                  <ChartBox title="涉诈团伙近况概览" :hasBg="false">
                    <div slot="chart">
                      <ul class="full-block total-ul">
                        <li class="pr" v-for="(item,index) in maptotalList" :key="index">
                          <div class="label">{{item.label}}</div>
                          <div class="value">{{item.value}}</div>
                        </li>
                      </ul>
                    </div>
                  </ChartBox>
                </el-col>
                <el-col :span="7">
                  <ChartBox title="域名总量趋势" :hasBg="false">
                    <div slot="chart">
                      <LineChart
                        :chartData="fraudGroupTotalTrend" :smooth="true" :legendLeft="40" :legendRight="40" :gridTop="30" :gridBottom="5" :showLineArea="true" :legendShow="false" :colors="['#DD6744']" :areaStartColors="['#DD6744']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14" :legendFontSize="14"
                        ></LineChart>
                    </div>
                  </ChartBox>
                </el-col>
                <el-col :span="7">
                  <ChartBox title="接入IP总量趋势" :hasBg="false">
                    <div slot="chart">
                      <LineChart
                        :chartData="fraudGroupUpdateTrend" :smooth="true" :legendLeft="40" :legendRight="40" :gridTop="30" :gridBottom="5" :showLineArea="true" :legendShow="false" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14" :legendFontSize="14"
                        ></LineChart>
                    </div>
                  </ChartBox>
                </el-col>
              </el-row>
            </div>
            <div class="wrapper">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div :class="['pr','cus-bg',{'active':activeValue==='group'}]">
                    <div class="cus-title">涉诈团伙分析</div>
                    <div class="more" @click="clickCenterBox('group')">更多</div>
                    <div class="ratio13 pr wrapper-box">
                      <div class="row-h h-1">
                        <div class="wrapper">
                          <ChartBox title="" :hasBg="false">
                            <div slot="chart">
                              <ul class="full-block total-ul">
                                <li class="pr" v-for="(item,index) in maptotalList" :key="index">
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
                          <ChartBox title="相关域名总量趋势" :hasBg="false">
                            <div slot="chart">
                              <LineChart
                                :chartData="fraudGroupTotalTrend" :smooth="true" :legendLeft="40" :legendRight="40" :gridTop="30" :gridBottom="5" :showLineArea="true" :legendShow="false" :colors="['#DD6744']" :areaStartColors="['#DD6744']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14" :legendFontSize="14"
                                ></LineChart>
                            </div>
                          </ChartBox>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div :class="['pr','cus-bg',{'active':activeValue==='phishing'}]">
                    <div class="cus-title">仿冒网站分析</div>
                    <div class="more" @click="clickCenterBox('phishing')">更多</div>
                    <div class="ratio13 pr wrapper-box">
                      <div class="row-h h-1">
                        <div class="wrapper">
                         <ChartBox title="" :hasBg="false">
                            <div slot="chart">
                              <ul class="full-block total-ul">
                                <li class="pr" v-for="(item,index) in fakeWebsiteList" :key="index">
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
                          <ChartBox title="受害用户分布" :hasBg="false">
                            <div slot="chart">
                              <PieChart :chartData="affectedUsersRatio" :radius="['60%','85%']" :center="['50%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :legendShow="false" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14" ></PieChart>
                            </div>
                          </ChartBox>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>              
            </div>
          </div>
        </el-col>
      </el-col> -->
      <el-col :span="21">
        <App v-if="activeValue==='app'"></App>
        <Website v-if="activeValue==='website'"></Website>
        <Group v-if="activeValue==='group'"></Group>
        <Phishing v-if="activeValue==='phishing'"></Phishing>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import sameMixin from './sameMixin'
import Website from './website'
import App from './app'
import Group from './group'
import Phishing from './phishing'
export default {
  name: 'Analysis',
  mixins: [sameMixin],
  props: {},
  components: {
    Website,
    App,
    Group,
    Phishing
  },
  data() {
    return {
      leftImg: './dataAnalysis/数据输入41.png'
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
 .analysis {
   .wrapper-box{
      top:0.3rem;
      height:calc(~'100% - 0.3rem') !important;
    }
    .more{
      position: absolute;
      right:0.1rem;
      top:0.05rem;
      font-size:0.09rem;
      color: #52bbce;
      z-index:100;
      cursor: pointer;
    }
   .el-table {
     a {
       color: #52bbce;
     }
   }
  //  .total-ul {
  //    li {
  //     float: left;
  //     width: calc(~'50% - 0.05rem');
  //     // height:calc(~'50% - 0.05rem');
  //     margin-right: 0.1rem;
  //     margin-bottom: 0.05rem;
  //     background: rgba(0,135,255,0.10);
  //     text-align: center;
  //     border: 1px solid #01BDF4;
  //     border-left-width:3px;
  //     border-right-width:3px;
  //     height:100%;
  //     padding:0 0.05rem;
  //     display: flex;
  //     justify-content: space-between;
  //     align-items: center;
  //     &:nth-of-type(even){
  //       margin-right: 0px;
  //     }
  //     .label {
  //       color:#46C4FF;
  //       font-size: 0.09rem;
  //       // padding:0.03rem 0.05rem;
  //     }
  //     .value {
  //       color: #FFA400;
  //       font-family: 'DS-Digital';
  //       font-size:0.15rem;
  //       font-weight: 600;
  //     }
  //   }
  // }
}
</style>
