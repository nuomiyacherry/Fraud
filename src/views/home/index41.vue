<template>
  <div class='home'>
    <el-row class="main-height" :gutter="20">
      <el-col :span="4">
        <div class="wrapper" style="height:calc(100% - 0.1rem)">
          <ChartBox title="态势总览">
            <div slot="chart">
              <TotalBox :list="totalList"></TotalBox>
            </div>
          </ChartBox>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="ratio111">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈微信QQ类型分布">
                <div slot="chart">
                  <PieChart :chartData="disposedType" :radius="['55%','75%']" :center="['70%', '50%']" :legendLeft="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14"></PieChart>
                  <!-- <BarChart :chartData="disposedType" :legendShow="false" legendLeft="10%" :barStack="true" :axisLabelFontSize="14" :legendFontSize="14"></BarChart> -->
                </div>
              </ChartBox>
            </div>
          </div>
           <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈网站类型分布">
                <div slot="chart">
                  <PieChart :chartData="fraudWebsiteType" :radius="['55%','75%']" :center="['70%', '50%']" :legendLeft="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14"></PieChart>
                  <!-- <BarChart :chartData="fraudWebsiteType" legendLeft="10%" :barStack="true" :legendShow="false" :axisLabelFontSize="14" :legendFontSize="14"></BarChart> -->
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈APP类型分布">
                <div slot="chart">
                  <PieChart :chartData="fraudAppType" :radius="['55%','75%']" :center="['70%', '50%']" :legendLeft="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true" :legendFontSize="14"></PieChart>
                  <!-- <BarChart :chartData="fraudAppType" legendLeft="10%" :barStack="true" :legendShow="false" :axisLabelFontSize="14" :legendFontSize="14"></BarChart> -->
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
              <ChartBox title="涉诈微信QQ发现数量月趋势">
                <div slot="chart">
                  <LineChart :chartData="wechatDiscoverTrend" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>  
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈网站发现数量月趋势">
                <div slot="chart">
                  <LineChart :chartData="websiteDiscoverTrend" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈APP发现数量月趋势">
                <div slot="chart">
                  <LineChart :chartData="appDiscoverTrend" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>      
        </div>
      </el-col>
      <!-- <el-col :span="4">
        <div class="ratio111">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈微信QQ处置数量月趋势">
                <div slot="chart">
                  <LineChart :chartData="wechatDisposeTrend" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#DD6744']" :areaStartColors="['#DD6744']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>  
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈网站处置数量月趋势">
                <div slot="chart">
                  <LineChart :chartData="websiteDisposeTrend" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#DD6744']" :areaStartColors="['#DD6744']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈APP处置数量月趋势">
                <div slot="chart">
                  <LineChart :chartData="appDisposeTrend" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#DD6744']" :areaStartColors="['#DD6744']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>      
        </div>
      </el-col> -->
      <el-col :span="9">
        <div class="wrapper pr">         
          <ChartBox title="疑似受害者全国分布">
            <div slot="chart">
              <VisualMapChart :chartData="mapData" :shadowBlur="0" :pieces="pieces" visualMapType="piecewise" :visualMapBottom="20" :visualMapLeft="20" :roam="true" tooltipFormatter="疑似受害者访问量" :visualMapFontSize="14"></VisualMapChart>
            </div>
          </ChartBox>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="ratio111">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈网站疑似受害者访问趋势">
                <div slot="chart">
                  <LineChart :chartData="visitedTrend" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#DD6744']" :areaStartColors="['#DD6744']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>  
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈网站境外接入国家排名">
                <div slot="chart">
                  <PictorialBar :chartData="websiteCountryRank" :gridLeft="5" :xAxisValue="true" :showxAxis="false" :yAxisTickShow="false" :yAxisLineShow="false" :legendShow="false" :axisLabelFontSize="14"></PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈网站境外接入占比">
                <div slot="chart">
                  <LiquidFillChart radius="60%" :labelFontSize="24" :titleFontSize="20" :chartData="liquidFillData"></LiquidFillChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <!-- <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈微信QQ号举报量趋势">
                <div slot="chart">
                  <LineChart :chartData="reportTrend" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈APP所属应用商店排名">
                <div slot="chart">
                  <PictorialBar :chartData="appMarketRank" :gridLeft="5" :xAxisValue="true" :showxAxis="false" :yAxisTickShow="false" :yAxisLineShow="false" :legendShow="false" :axisLabelFontSize="14"></PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>                 
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="国际诈骗电话拦截情况">
                <div slot="chart">
                  <LineChart :chartData="countryFraud" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#DD6744']" :areaStartColors="['#DD6744']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div> -->         
        </div>
      </el-col>
      <!-- <el-col :span="4">
        <div class="ratio1111">  
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈网站总量每月趋势">
                <div slot="chart">
                  <BarChart :chartData="domainTrend" legendLeft="center" :legendShow="false" :gridTop="35" :axisLabelFontSize="14"></BarChart>
                </div>
              </ChartBox>
            </div>
          </div>         
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="省际诈骗电话拦截情况">
                <div slot="chart">
                  <LineChart :chartData="provinceFraud" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30" :showLineArea="true" :colors="['#01A3DF']" :areaStartColors="['#01A3DF']" :areaEndColors="['rgba(0, 0, 0, 0)']" :axisLabelFontSize="14"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import sameMixin from './sameMixin'
export default {
  name: 'Home',
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

</style>
