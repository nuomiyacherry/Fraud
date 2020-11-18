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
const bgImg = require(`assets/img/${chartColors.pictorialBar.bgImg}`)
const fillImg = require(`assets/img/${chartColors.pictorialBar.fillImg}`)
export default {
  name: "pictorialBarChart",
  props: {
    chartData: {
      type: Array,
      default: () => [{ name: "2018", value: 80 }]
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
    return {
      maxValue: 100
    }
  },
  computed: {},
  mounted() {},
  methods: {
    setOptions() {
      var bgData = []
      this.chartData.forEach(item => {
        bgData.push({
          name: item.name,
          value: this.maxValue
        })
      })
      var options = {
        xAxis: [
          {
            type: "value",
            show: false
          }
        ],
        yAxis: [
          {
            type: "category",
            data: (function(data) {
              var arr = []
              data.forEach(function(items) {
                arr.push(items.name)
              })
              return arr
            })(this.chartData),
            splitLine: 'none',
            axisLine: 'none',
            axisTick: 'none',
            axisLabel: 'none'
          },
          {
            splitLine: 'none',
            axisLine: 'none',
            axisTick: 'none',
            axisLabel: 'none',
            data: []
          },
          {
            splitLine: 'none',
            axisLine: 'none',
            axisTick: 'none',
            axisLabel: 'none',
            data: []
          }
        ],
        series: [
          {
            name: "bg",
            type: "pictorialBar",
            yAxisIndex: 0,
            symbol: "image://" + bgImg,
            symbolClip: false,
            symbolBoundingData: 100,
            symbolSize: ["100%", 35],
            data: [this.maxValue],
            z: 2
          },
          {
            name: "数据",
            type: "pictorialBar",
            yAxisIndex: 0,
            symbol: "image://" + fillImg,
            symbolClip: true,
            symbolBoundingData: 100,
            symbolSize: ["100%", 35],
            data: this.chartData,
            z: 3
          },
          {
            name: "白框",
            type: "bar",
            yAxisIndex: 1,
            data: [this.maxValue - 0.5],
            barWidth: 38,
            itemStyle: {
              normal: {
                color: this.bgColor
              }
            },
            z: 1
          },
          {
            name: "外框",
            type: "bar",
            yAxisIndex: 2,
            data: [this.maxValue],
            barWidth: 40,
            itemStyle: {
              normal: {
                color: this.borderColor
              }
            },
            z: 0
          }
        ]
      }
      return options
    }
  }
}
</script>
<style lang='less' scoped>
</style>