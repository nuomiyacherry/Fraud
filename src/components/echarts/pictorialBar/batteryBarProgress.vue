<template>
  <div class="pictorialBar full-block">
    <ECharts :options="options" auto-resize></ECharts>
  </div>
</template>

<script>
import storage from 'utils/storage'
import globalChartMixin from 'mixins/globalChartMixin'
import gridChartMixin from 'mixins/gridChartMixin'
import colorChartMixin from 'mixins/colorChartMixin'
import axisChartMixin from 'mixins/axisChartMixin'
import tooltipChartMixin from 'mixins/tooltipChartMixin'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pictorialBar'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/title'
const chartColors = storage.get('tColors')
export default {
  name: 'pictorialBar',
  components: {
    ECharts
  },
  mixins: [
    globalChartMixin,
    axisChartMixin,
    gridChartMixin,
    colorChartMixin,
    tooltipChartMixin
  ],
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {
          maxData: 1256,
          name: '1月',
          value: 56
        }
      }
    },
    colors: {
      type: String,
      default: chartColors.pictorialBar.batteryItem
    },
    bgColors: {
      type: String,
      default: chartColors.pictorialBar.batteryBg
    }
  },
  data() {
    return {}
  },
  watch: {
    chartData: {
      handler(newVal, oldVal) {
        this.refresh()
      },
      deep: true
    },
    colors(newVal, oldVal) {
      this.refresh()
    }
  },
  methods: {
    setOptions() {
      const series = []
      series.push({
        type: 'pictorialBar',
        symbol: 'rect',
        symbolRepeat: 'fixed',
        symbolMargin: '20%',
        symbolClip: true,
        symbolSize: [10, 20],
        symbolBoundingData: this.chartData.maxData,
        data: [
          {
            "value": this.chartData.value,
            "itemStyle": {
              "normal": {
                "color": this.colors
              }
            }
          }],
        z: 1,
        animationEasing: 'elasticOut',
        animationDelay: function(dataIndex, params) {
            return params.index * 30
        }
      }, {
        // full data
        type: 'pictorialBar',
        itemStyle: {
          normal: {
            color: this.bgColors
          }
        },
        animationDuration: 0,
        symbolRepeat: 'fixed',
        symbolMargin: '20%',
        symbol: 'rect',
        symbolSize: [10, 20],
        symbolBoundingData: this.chartData.maxData,
        data: [{"value": this.chartData.value}],
        z: 0,
        animationEasing: 'elasticOut',
        animationDelay: function(dataIndex, params) {
            return params.index * 30
        }
      })
      let barOpt = {
        color: this.colors,
        grid: {
          ...this.gridOpt(),
          containLabel: true
        },
        tooltip: {
          show: this.tooltipShow,
          position: ['center', 'bottom']
        },
        xAxis: {
          max: this.chartData.maxData,
          splitLine: {
            show: false
          },
          offset: 10,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'category',
            inverse: false,
            data: [this.chartData.name],
            position: 'left',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }
        ],
        series: series
      }
      return barOpt
    }
  }
}
</script>
