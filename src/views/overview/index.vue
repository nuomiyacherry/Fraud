<template>
  <div class='overview'>
    <el-row class="main-height" :gutter="10">
      <el-col :span="8">
        <div class="ratio111">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="国际诈骗防范态势">
                <div slot="chart">
                  <BarChart :chartData="trendData" legendLeft="center" :legendShow="false" :gridTop="35" :colors="['#2983E9']"></BarChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="省际诈骗防范态势">
                <div slot="chart">
                  <BarChart :chartData="provtrendData" legendLeft="center" :legendShow="false" :gridTop="35" :colors="['#CA0A31']"></BarChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="运营商接入态势">
                <div slot="chart">
                  <LineChart :chartData="reportTrend" :smooth="true" legendLeft="center" :legendShow="true" :gridTop="30"></LineChart>
                </div>
              </ChartBox>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="full-block" style="padding-bottom:0.1rem;">
          <ChartBox title="全国诈骗防范整体情况">
            <div slot="chart">
              <VisualMapChart :chartData="mapData" :shadowBlur="0" :pieces="pieces" visualMapType="piecewise" :visualMapBottom="20" :visualMapLeft="20" :roam="true" tooltipFormatter="2019年拦截总量"></VisualMapChart>
            </div>
          </ChartBox>
        </div>
      </el-col>
      <!-- <el-col :span="6">
        <div class="ratio111">
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="诈骗话题分类">
                <div slot="chart">
                  <barChart :xAxisValue="true" :chartData="barData" legendLeft="10%" :barStack="true" :gridTop="24"></barChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="诈骗来源/落地排名">
                <div slot="chart">
                  <div class="btns">
                    <el-radio-group v-model="line1type" size="mini" @change="changeLineData1">
                      <el-radio-button v-for="item in buttonList1" :key="item.type"
                        :label="item.type">
                        {{item.label}}
                      </el-radio-button>
                    </el-radio-group>
                  </div>
                  <PieChart :chartData="sourceData" :radius="['0%','90%']" :center="['30%', '50%']" :legendRight="10"  :legendBottom="0" legendOrient="vertical" :tooltipShow="false" :seriesLabelEmphasisShow="true" :pieAutoPlay="true" :showPercent="true"></PieChart>
                </div>
              </ChartBox>
            </div>
          </div>
          <div class="row-h h-1">
            <div class="wrapper">
              <ChartBox title="运营商接入态势">
                <div slot="chart">
                  <LineChart :chartData="reportTrend" :smooth="true" legendLeft="center" :legendShow="true" :gridTop="30"></LineChart>
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
  name: 'Overview',
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
