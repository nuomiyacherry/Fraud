<template>
  <ECharts :options="options" :autoresize="true"></ECharts>
</template>

<script>
import ECharts from "vue-echarts/components/ECharts"
import "echarts/lib/chart/pictorialBar"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/legend"
import "echarts/lib/component/legendScroll"
import "echarts/lib/component/title"
import globalChartMixin from "mixins/globalChartMixin"
import storage from "utils/storage"
const chartColors = storage.get("tColors")
export default {
  name: "pictorialBarChart",
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {
          seriesData: [100, 80, 60],
          categoryData: ["僵尸程序", "木马程序", "蠕虫病毒"]
        }
      }
    },
    borderColor: {
      type: String,
      default: chartColors.pictorialBar.border
    },
    bgColor: {
      type: String,
      default: chartColors.pictorialBar.bg
    }
  },
  components: { ECharts },
  mixins: [globalChartMixin],
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    setOptions() {
      var options = {
        xAxis: {
          data: this.chartData.categoryData,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true
          },
          zlevel: 30
        },
        yAxis: {
          show: false
        },
        series: [{
          name: '年报上报率3',
          type: 'pictorialBar',
          symbolSize: [30, 20],
          symbolOffset: [0, -10],
          z: 12,
          itemStyle: {
            normal: {
              color: '#c8c66c'
            }
          },
          data: [{
            value: 100,
            symbolPosition: 'end'
          }, {
            value: 80,
            symbolPosition: 'end'
          }, {
            value: 60,
            symbolPosition: 'end'
          }]
        }, {
          name: '年报上报率2',
          type: 'pictorialBar',
          symbolSize: [30, 20],
          symbolOffset: [0, 10],
          z: 12,
          itemStyle: {
              normal: {
                  color: '#c8c66c'
              }
          },
          data: this.chartData.seriesData
        }, {
          name: '年报上报率1',
          type: 'pictorialBar',
          symbolSize: [45, 30],
          symbolOffset: [0, 20],
          z: 11,
          itemStyle: {
              normal: {
                  color: 'transparent',
                  borderColor: '#c8c66c',
                  borderWidth: 5
              }
          },
          data: this.chartData.seriesData
        }, {
          name: '年报上报率',
          type: 'pictorialBar',
          symbolSize: [60, 30],
          symbolOffset: [0, 30],
          z: 10,
          itemStyle: {
            normal: {
              color: 'transparent',
              borderColor: '#c8c66c',
              borderType: 'dashed',
              borderWidth: 5
            }
          },
          data: this.chartData.seriesData
        }, {
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#c8c66c',
              opacity: 0.7
            }
          },
          silent: true,
          barWidth: 30,
          barGap: '-100%', // Make series be overlap
          data: [100, 80, 60]
        }]
      }
      return options
    }
  }
}
</script>
<style lang='less' scoped>
</style>
