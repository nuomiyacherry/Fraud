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
import { getMaxValue, getMinValue, getColumnMaxValue } from "constants/utils"
import { getNationalPng, getCountryImg } from "@/constants/country"
import ECharts from "vue-echarts/components/ECharts"
import "echarts/lib/chart/bar"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/legend"
import "echarts/lib/component/legendScroll"
import "echarts/lib/component/title"
import echarts from 'echarts'
const chartColors = storage.get("tColors")

export default {
  name: "barChart",
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
          legendData: ["IP", "IPV4"],
          seriesData: [
            [16672, 14345, 19876, 22098],
            [12672, 19345, 18876, 10098]
          ],
          categoryData: ["IDC", "IRCS", "CDN", "DNS"]
        }
      }
    },
    tipData: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Array,
      default: () => chartColors.bar.colors
    },
    barStack: {
      type: Boolean,
      default: false
    },
    barCategoryGap: {
      type: String,
      default: "40%"
    },
    barBorderRadius: {
      type: Array,
      default: () => [0, 0, 0, 0]
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
    barShadowShow: {
      type: Boolean,
      default: false
    },
    barShadowRadius: {
      type: Array,
      default: () => [0, 0, 0, 0]
    },
    barShadowColors: {
      type: String,
      default: chartColors.bar.shadow
    },
    barWidth: {
      type: [Number, String],
      default: "auto"
    },
    hasNational: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chartName: "[柱状图模板]",
      startColors: this.barGradientStartColors,
      endColors: this.barGradientEndColors,
      currColors: []
    }
  },
  mounted() {
    this.createTplCode("BarChart")
  },
  watch: {
    // chartData(newVal, oldVal) {
    //   // console.log(`${this.chartName}chartData[新值:${newVal};旧值:${oldVal}]`)
    //   this.refresh()
    // },
    chartData: {
      handler(newVal, oldVal) {
        this.refresh()
      },
      deep: true
    },
    colors(newVal, oldVal) {
      // console.log(`${this.chartName}colors[新值:${newVal};旧值:${oldVal}]`)
      this.refresh()
    },
    barStack(newVal, oldVal) {
      // console.log(`${this.chartName}barStack[新值:${newVal};旧值:${oldVal}]`)
      this.refresh()
    },
    barCategoryGap(newVal, oldVal) {
      // console.log(`${this.chartName}barCategoryGap[新值:${newVal};旧值:${oldVal}]`)
      this.refresh()
    },
    barBorderRadius(newVal, oldVal) {
      // console.log(`${this.chartName}barBorderRadius[新值:${newVal};旧值:${oldVal}]`)
      this.refresh()
    },
    barShadowRadius(newVal, oldVal) {
      // console.log(`${this.chartName}barShadowRadius[新值:${newVal};旧值:${oldVal}]`)
      this.refresh()
    },
    labelShow(newVal, oldVal) {
      // console.log(`${this.chartName}labelShow[新值:${newVal};旧值:${oldVal}]`)
      this.refresh()
    },
    barGradientShow(newVal, oldVal) {
      // console.log(`${this.chartName}barGradientShow[新值:${newVal};旧值:${oldVal}]`)
      this.refresh()
    },
    barGradientStartColors(newVal, oldVal) {
      // console.log(`${this.chartName}barGradientStartColors[新值:${newVal};旧值:${oldVal}]`)
      this.startColors = newVal
      this.refresh()
    },
    barGradientEndColors(newVal, oldVal) {
      // console.log(`${this.chartName}barGradientEndColors[新值:${newVal};旧值:${oldVal}]`)
      this.endColors = newVal
      this.refresh()
    },
    barShadowShow(newVal, oldVal) {
      // console.log(`${this.chartName}barShadowShow[新值:${newVal};旧值:${oldVal}]`)
      this.refresh()
    },
    barShadowColors(newVal, oldVal) {
      // console.log(`${this.chartName}barShadowColors[新值:${newVal};旧值:${oldVal}]`)
      this.refresh()
    },
    hasNational(newVal, oldVal) {
      // console.log(`${this.chartName}barShadowColors[新值:${newVal};旧值:${oldVal}]`)
      this.refresh()
    },
    tipData(newVal, oldVal) {
      this.refresh()
    }
  },
  methods: {
    setOptions() {
      let [legendData, seriesData, categoryData] = [
        this.chartData.legendData,
        this.chartData.seriesData,
        this.chartData.categoryData
      ]
      let [seriesLabelPosition, seriesLabelShow, series, maxSeriesData] = [
        "inside",
        false,
        [],
        []
      ]
      let [maxValue, minValue] = [0, 0]
      let [barCategoryGap, barStack] = [this.barCategoryGap, this.barStack]
      const _this = this
      if (this.barStack) {
        if (this.labelShow) {
          seriesLabelShow = true
          this.xAxisValue
            ? (seriesLabelPosition = "insideRight")
            : (seriesLabelPosition = "insideTop")
        }
        if (this.barShadowShow) {
          if (legendData && legendData.length !== 1) {
            barCategoryGap = "0%"
            barStack = true
          }
        }
      }
      
      if (legendData && legendData.length !== 0) {
        legendData.forEach((item, index) => {
          maxValue = getMaxValue(seriesData[index], maxValue)
          minValue = getMinValue(seriesData[index], minValue)
          if (this.tipData.length !== 0) {
            seriesData[0] = this.tipData
          }
          series.push({
            name: item,
            type: "bar",
            barCategoryGap: barCategoryGap,
            label: {
              normal: {
                show: seriesLabelShow,
                position: seriesLabelPosition
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: this.barBorderRadius,
                color: this.colors[index]
              }
            },
            stack: barStack,
            data: seriesData[index],
            barMaxWidth: "20",
            barWidth: this.barWidth
          })
          if (this.barGradientShow) {
            this.initColors()
            series[index].itemStyle.normal = {
              barBorderRadius: this.barBorderRadius,
              color: this.currColors[index]
            }
          }
        })
      }
      if (this.barStack && this.barShadowShow) {
        if (legendData && legendData.length !== 1) {
          maxValue = getColumnMaxValue(seriesData)
        }
        if (categoryData) {
          for (var i = 0; i < categoryData.length; i++) {
            maxSeriesData.push(maxValue + 20)
          }
        }
        series.push({
          name: "阴影",
          type: "bar",
          barGap: "-100%",
          z: 0,
          label: {
            normal: {
              show: seriesLabelShow,
              position: seriesLabelPosition
            }
          },
          itemStyle: {
            normal: {
              barBorderRadius: this.barShadowRadius,
              color: this.barShadowColors
            }
          },
          data: maxSeriesData,
          barMaxWidth: "20",
          barWidth: this.barWidth
        })
      }
      let barOpt = this.returnAxisOptions(
        legendData,
        categoryData,
        series,
        maxValue,
        minValue
      )
      if (this.tipData.length !== 0) {
        barOpt.tooltip = {
          formatter: function(params) {
            var name = params.name
            var str = ''
            if (_this.tipData.length !== 0) {
              var title = params.data.name + '(' + params.data.country + ')'
              return `${title}<br /> ${params.seriesName}` + ' : ' + params.data.value 
            } else {
              params.forEach((item, i) => {
                if (item.seriesName !== '阴影') {
                  str += item.seriesName + ' : ' + item.value + '<br />'
                }
              })
              return `${name}<br /> ${str}`
            }
          }
        }
      }
      return barOpt
    },
    countryLabelFormatter(barOpt) {
      const _this = this
      const label = this.xAxisValue ? "yAxis" : "xAxis"
      barOpt[label].axisLabel.padding = [0, 0, 0, 12]
      barOpt[label].axisLabel.formatter = function(val, index) {
        if (_this.hasNational) {
          let name = getNationalPng(val)
          return "{" + name + "| }" + "  " + "{value|" + val + "}"
        } else {
          return val
        }
      }
      barOpt[label].axisLabel.rich = {
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
