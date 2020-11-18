<template>
  <ECharts :options="options" :autoresize="true"></ECharts>
</template>

<script>
import globalChartMixin from "mixins/globalChartMixin"
import gridChartMixin from "mixins/gridChartMixin"
import axisChartMixin from "mixins/axisChartMixin"
import colorChartMixin from "mixins/colorChartMixin"
import tooltipChartMixin from "mixins/tooltipChartMixin"
import storage from "utils/storage"
import { getNationalPng, getCountryImg } from "@/constants/country"
import ECharts from "vue-echarts/components/ECharts"
import "echarts/lib/chart/bar"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/legend"
import "echarts/lib/component/legendScroll"
import "echarts/lib/component/title"
const chartColors = storage.get("tColors")

const horizontalTranglePath = 'path://d="M70 90 L130 100 L130 80 Z"',
  verticalTranglePath = 'path://d="M150 130 L130 50 L170 50 Z"'
  // 另一种形态
  // verticalTranglePath = 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z'
  // barWidt = 50

/*
<TrangleBarChart
  :xAxisValue="true"
  :labelShow="true"
  :chartData="{
    seriesData: [
      {
        value: 32,
        itemStyle: {
          normal: {
            color: '#F9374D'
          }
        }
      },
      24, 15, 12, 6
    ],
    categoryData: ['西安市', '威阳市', '延安市', '宝鸡市', '南洛市']
  }"
></TrangleBarChart>
*/

export default {
  name: "TrangleBarChart",
  components: { ECharts },
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
          seriesName: '',
          seriesData: [],
          categoryData: []
          // seriesData: [32, 24, 15, 12, 6],
          // categoryData: ["西安市", "威阳市", "延安市", "宝鸡市", "南洛市"]
        }
      }
    },
    colors: {
      type: Array,
      default: () => chartColors.bar.colors
    },
    barCategoryGap: {
      type: String,
      default: "40%"
    },
    labelShow: {
      type: Boolean,
      default: false
    },
    barGradientShow: {
      type: Boolean,
      default: false
    },
    barGradientStartColors: {
      type: Array,
      default: () => chartColors.bar.gradualStart
    },
    barGradientEndColors: {
      type: Array,
      default: () => chartColors.bar.gradualEnd
    },
    barWidth: {
      type: [Number, String],
      default: 8
    },
    headDecoration: {
      type: String,
      default: "circle"
    },
    headDecorationSize: {
      type: Number,
      default: 12
    },
    hasNational: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chartName: "[三角形象形柱状图]",
      startColors: this.barGradientStartColors,
      endColors: this.barGradientEndColors,
      currColors: []
    }
  },
  mounted() {
    this.createTplCode("BarChart")
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
    },
    barCategoryGap(newVal, oldVal) {
      this.refresh()
    },
    labelShow(newVal, oldVal) {
      this.refresh()
    },
    barGradientShow(newVal, oldVal) {
      this.refresh()
    },
    barGradientStartColors(newVal, oldVal) {
      this.startColors = newVal
      this.refresh()
    },
    barGradientEndColors(newVal, oldVal) {
      this.endColors = newVal
      this.refresh()
    },
    hasNational(newVal, oldVal) {
      this.refresh()
    }
  },
  methods: {
    setOptions() {
      const { seriesData, categoryData } = this.chartData,
        axisOptions = this.axisOpt(),
        series = [],
        xAxis = [],
        yAxis = []
      let symbol, axisIndexs, symbolOffset, labelPosition

      seriesData.forEach(d => {
        if (d.itemStyle && d.itemStyle.normal) {
          d.itemStyle.normal.shadowColor =
            d.itemStyle.normal.color || this.color[0]
        }
      })
      if (this.xAxisValue) {
        symbol = horizontalTranglePath
        axisIndexs = [
          {
            yAxisIndex: 0
          },
          {
            yAxisIndex: 1
          }
        ]
        xAxis.push({ ...axisOptions.xAxis })
        yAxis.push(
          {
            ...axisOptions.yAxis,
            data: categoryData
          },
          {
            ...axisOptions.yAxis,
            show: false,
            data: seriesData
          }
        )

        symbolOffset = ["50%", 0]
        labelPosition = "right"
      } else {
        symbol = verticalTranglePath
        axisIndexs = [
          {
            xAxisIndex: 0
          },
          {
            xAxisIndex: 1
          }
        ]
        yAxis.push({ ...axisOptions.yAxis })
        xAxis.push(
          {
            ...axisOptions.xAxis,
            data: categoryData
          },
          {
            ...axisOptions.xAxis,
            show: false,
            data: seriesData
          }
        )
        symbolOffset = [0, "-50%"]
        labelPosition = "top"
      }

      const num = this.colors.length
      const _this = this

      series.push(
        {
          name: this.chartData.seriesName,
          type: "pictorialBar",
          barWidth: this.barWidth,
          symbol,
          data: seriesData,
          label: {
            normal: {
              show: this.labelShow,
              position: labelPosition,
              distance: this.headDecorationSize
            }
          },
          itemStyle: {
            normal: {
              // color: this.colors[0]
              color: function(params) {
                return _this.colors[params.dataIndex % num]
              }
            }
          },
          ...axisIndexs[0]
        },
        {
          type: "pictorialBar",
          symbolPosition: "end",
          symbol: this.headDecoration,
          symbolSize: this.headDecorationSize,
          symbolOffset,
          data: seriesData,
          tooltip: {
            show: false
          },
          itemStyle: {
            normal: {
              // color: this.colors[0],
              // shadowColor: this.colors[0],
              color: function(params) {
                return _this.colors[params.dataIndex % num]
              },
              shadowColor: function(params) {
                return _this.colors[params.dataIndex % num]
              },
              shadowBlur: 10
              // color: params => {
              //   return this.colors[params.dataIndex % this.colors.length];
              // }
            }
          },
          ...axisIndexs[1]
        }
      )

      let barOpt = {
        color: this.colors,
        tooltip: {
          ...this.tooltipOpt()
        },
        grid: {
          ...this.gridOpt(),
          containLabel: true
        },
        xAxis,
        yAxis,
        series: series
      }
      if (this.hasNational) {
        barOpt = this.countryLabelFormatter(barOpt)
      }
      return barOpt
    },
    countryLabelFormatter(barOpt) {
      const _this = this
      const label = this.xAxisValue ? "yAxis" : "xAxis"
      barOpt[label][0].axisLabel.padding = [0, 0, 0, 12]
      barOpt[label][0].axisLabel.formatter = function(val, index) {
        if (_this.hasNational) {
          let name = getNationalPng(val)
          return "{" + name + "| }" + "  " + "{value|" + val + "}"
        } else {
          return val
        }
      }
      barOpt[label][0].axisLabel.rich = {
        value: {
          lineHeight: 30
        },
        ...getCountryImg()
      }
      return barOpt
    }
  }
}
</script>

<style scoped></style>
