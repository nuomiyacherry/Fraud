<template>
  <div class='home'>
    <el-row class="main-height" :gutter="10">
      <el-col :span="6">
        <div class="ratio111">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="态势总览">
                <div slot="chart">
                  <TotalBox :list="totalList"></TotalBox>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈微信QQ类型分布">
                <div slot="chart">
                  <PieChart :chartData="disposedType" :radius="['60%','80%']" :center="['30%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true"></PieChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈微信QQ号举报量趋势">
                <div slot="chart">
                  <LineChart :chartData="reportTrend" :smooth="true" legendLeft="center" :legendShow="false" :gridTop="30"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="ratio31">
          <div class="row-h h-3">
            <div class="wrapper pr">
              <div class="title">疑似受害者全国分布</div>
              <!-- <div class="map3d" ref="map3d"></div> -->
              <VisualMapChart :chartData="mapData" :shadowBlur="0" :pieces="pieces" visualMapType="piecewise" :visualMapBottom="20" :visualMapLeft="20" :roam="true" tooltipFormatter="疑似受害者数量"></VisualMapChart>
            </div>
          </div>
          <div class="row-h h-1">
             <el-row class="full-block" :gutter="10">
              <el-col :span="12">
                <div class="wrapper">
                  <ChartBox title="涉诈APP类型分布">
                    <div slot="chart">
                      <PieChart :chartData="fraudAppType" :radius="['70%','90%']" :center="['30%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true"></PieChart>
                    </div>
                  </ChartBox>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="wrapper">
                  <ChartBox title="应用商店涉诈APP总量排名">
                    <div slot="chart">
                      <PictorialBar :chartData="appMarketRank" :gridLeft="5" :xAxisValue="true" :showxAxis="false" :yAxisTickShow="false" :yAxisLineShow="false" :legendShow="false"></PictorialBar>
                    </div>
                  </ChartBox>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="ratio1111">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈网站总量每月总量趋势">
                <div slot="chart">
                  <!-- <BarLineChart :chartData="domainTrend" legendLeft="center"></BarLineChart> -->
                  <BarChart :chartData="domainTrend" legendLeft="center" :legendShow="false" :gridTop="35"></BarChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈网站类型分布">
                <div slot="chart">
                  <PieChart :chartData="fraudWebsiteType" :radius="['70%','90%']" :center="['30%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true"></PieChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈网站境外接入国家排名">
                <div slot="chart">
                  <PictorialBar :chartData="websiteCountryRank" :gridLeft="5" :xAxisValue="true" :showxAxis="false" :yAxisTickShow="false" :yAxisLineShow="false" :legendShow="false"></PictorialBar>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="涉诈网站境外接入占比">
                <div slot="chart">
                  <LiquidFillChart radius="60%" :labelFontSize="16" :chartData="liquidFillData"></LiquidFillChart>
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
.title {
  margin-right: 5px;
  width:365px;
  color: #0cfbff;
  background-image: url('~assets/img/graphTitle.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  font-size: 0.16rem;
  height: 36px;
  line-height: 36px;
  text-align: center;
  position: absolute;
  top:0;
  left:0;
  z-index:10;
}
</style>
