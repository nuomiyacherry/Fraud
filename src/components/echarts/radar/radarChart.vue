<template>
  <ECharts :options="options" autoresize></ECharts>
</template>

<script>
import { tooltipOpt, legendOpt } from 'constants/chartConfig'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/radar'
import globalChartMixin from 'mixins/globalChartMixin'
import gridChartMixin from 'mixins/gridChartMixin'
import axisChartMixin from 'mixins/axisChartMixin'
import storage from "utils/storage"
const chartColors = storage.get('tColors')

export default {
  name: 'RadarChart',
  components: {
    ECharts
  },
  mixins: [ globalChartMixin, axisChartMixin, gridChartMixin ],
  props: {
    chartData: {
      type: Object,
      default: function() {
        return {
          legendData: ['北京', '上海'],
          indicatorData: [
            {
              name: '移动恶意程序事件',
              max: 1500
            },
            {
              name: '暗链',
              max: 1500
            },
            {
              name: '漏洞',
              max: 1500
            },
            {
              name: '钓鱼',
              max: 1500
            },
            {
              name: '篡改',
              max: 1500
            },
            {
              name: '挂马',
              max: 1500
            }
          ],
          seriesArrayData: [
            {
              seriesData: [
                [1036, 1458, 1290, 998, 1048, 1398],
                [236, 558, 490, 398, 148, 298]
              ]
            },
            {
              seriesData: [
                [566, 958, 290, 598, 848, 698],
                [1236, 1158, 1090, 1298, 1088, 1458]
              ]
            }
          ]
        }
      }
    },
    colors: {
      type: Array,
      default: () => chartColors.radar.colors
    },
    shape: {
      type: String,
      default: 'polygon'
    },
    radius: {
      type: [Number, String],
      default: '70%'
    },
    splitNumber: {
      type: Number,
      default: 5
    },
    startAngle: {
      type: Number,
      default: 90
    },
    center: {
      type: Array,
      default: () => ['50%', '50%']
    },
    type: {
      type: String,
      default: () => 'solid'
    },
    shadowBlur: {
      type: Number,
      default: 10
    },
    symbol: {
      type: String,
      default: () => 'circle'
    },
    width: {
      type: Number,
      default: 2
    },
    opacity: {
      type: Number,
      default: 1
    },
    radarAreaStyleNormal: {
      type: String,
      default: chartColors.radar.areaNormal
    },
    radarAreaStyleEmphasis: {
      type: String,
      default: chartColors.radar.areaEmphasis
    },
    radarNameColor: {
      type: String,
      default: chartColors.radar.name
    },
    radarSplitLine: {
      type: Array,
      default: () => chartColors.radar.splitLine
    },
    radarsplitAreaColor: {
      type: String,
      default: chartColors.radar.splitArea
    },
    radarAxisLine: {
      type: String,
      default: chartColors.radar.axisLine
    }
  },
  data() {
    return {
      // radarOption: {},
      chartName: '[雷达图模板]'
    }
  },
  watch: {
    chartData(newVal, oldVal) {
      this.refresh()
    },
    colors(newVal, oldVal) {
      this.refresh()
    },
    shape(newVal, oldVal) {
      this.refresh()
    },
    radius(newVal, oldVal) {
      this.refresh()
    },
    splitNumber(newVal, oldVal) {
      this.refresh()
    },
    startAngle(newVal, oldVal) {
      this.refresh()
    },
    center(newVal, oldVal) {
      this.refresh()
    },
    type(newVal, oldVal) {
      this.refresh()
    },
    shadowBlur(newVal, oldVal) {
      this.refresh()
    },
    symbol(newVal, oldVal) {
      this.refresh()
    },
    width(newVal, oldVal) {
      this.refresh()
    },
    opacity(newVal, oldVal) {
      this.refresh()
    },
    radarAreaStyleNormal(newVal, oldVal) {
      this.refresh()
    },
    radarAreaStyleEmphasis(newVal, oldVal) {
      this.refresh()
    },
    radarNameColor(newVal, oldVal) {
      this.refresh()
    },
    radarSplitLine(newVal, oldVal) {
      this.refresh()
    },
    radarsplitAreaColor(newVal, oldVal) {
      this.refresh()
    },
    radarAxisLine(newVal, oldVal) {
      this.refresh()
    }
  },
  mounted() {
    // this.createTplCode('RadarChart')
  },
  methods: {
    setOptions() {
      let [ legendData, indicatorData, seriesArrayData ] = [ this.chartData.legendData, this.chartData.indicatorData, this.chartData.seriesArrayData ]
      const series = []
      if (legendData && legendData.length !== 0) {
        legendData.forEach((item, index) => {
          series.push({
            name: item,
            type: 'radar',
            lineStyle: {
              normal: {
                width: this.width, //线条的粗细
                opacity: this.opacity, //线条的透明度
                type: this.type
              }
            },
            symbol: this.symbol,
            color: this.colors,
            areaStyle: {
              normal: {
                color: this.radarAreaStyleNormal
              },
              emphasis: {
                color: this.radarAreaStyleEmphasis
              }
            },
            data: seriesArrayData[index].seriesData
          })
        })
      }
      var radarOption = {
        color: this.colors,
        tooltip: {
          ...tooltipOpt('item')
        },
        // radius: this.radius, //定义未起作用
        backgroundColor: 'transparent',
        legend: {
          data: legendData,
          show: this.legendShow,
          selectedMode: 'single',
          textStyle: {
            color: this.legendTextColor
          },
          pageTextStyle: {
            color: this.legendPageTextColor
          },
          ...this.legendOpt()
        },
        radar: {
          center: this.center,
          radius: this.radius, 
          startAngle: this.startAngle,
          shape: this.shape,
          splitNumber: this.splitNumber,
          name: {
            textStyle: {
              color: this.radarNameColor
            }
          },
          splitLine: {
            lineStyle: {
              color: this.radarSplitLine
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: this.radarsplitAreaColor,
              shadowBlur: this.shadowBlur
            }
          },
          axisLine: {
            lineStyle: {
              color: this.radarAxisLine
            }
          },
          indicator: indicatorData
        },
        series: series
      }
      return radarOption
    }
  }
}
</script>
