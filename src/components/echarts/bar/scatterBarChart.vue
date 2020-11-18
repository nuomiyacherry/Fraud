<template>
  <ECharts :options="options" :autoresize="true" @click="handleClick"></ECharts>
</template>

<script>
import globalChartMixin from "mixins/globalChartMixin"
import gridChartMixin from "mixins/gridChartMixin"
import ECharts from "vue-echarts/components/ECharts"
import "echarts/lib/chart/bar"
import "echarts/lib/chart/scatter"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/legend"
import "echarts/lib/component/legendScroll"
import "echarts/lib/component/title"
import echarts from 'echarts'
import storage from "utils/storage"
import { getNationalPng, getCountryImg } from "@/constants/country"
const chartColors = storage.get("tColors")
export default {
  name: "barChart",
  components: { ECharts },
  mixins: [globalChartMixin, gridChartMixin],
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {
          seriesData: [6647, 7473, 8190, 8488, 9491, 11726, 12745, 13170, 21319, 24934],
          categoryData: ["南坪", "工贸", "石桥铺", "沙坪坝", "嘉州路", "红旗河沟", "两路口", "观音桥", "光电园", "小什字"]
        }
      }
    },
    colors: {
      type: Array,
      default: () => chartColors.scatterBar.colors
    },
    customToolTip: {
      type: String,
      default: 'default'
    },
    customToolTipTitle: {
      type: String,
      default: '安全事件'
    },
    axisLabelColor: {
      type: String,
      default: chartColors.axis.label
    },
    labelNumColor: {
      type: String,
      default: chartColors.scatterBar.label
    },
    symbolSize: {
      type: [Number, String],
      default: 30
    },
    barWidth: {
      type: [Number, String],
      default: 20
    },
    hasNational: {
      type: Boolean,
      default: false
    },
    labelLimit: {
      type: Boolean,
      default: false
    },
    labelLimitWidth: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      chartName: "[柱状图模板]",
      circleData: [],
      offset: 10
    }
  },
  mounted() {
    this.createTplCode("BarChart")
  },
  watch: {
    customToolTipTitle(newVal, oldVal) {
      this.refresh()
    },
    customToolTip(newVal, oldVal) {
      this.refresh()
    },
    chartData(newVal, oldVal) {
      this.refresh()
    },
    colors(newVal, oldVal) {
      this.refresh()
    },
    axisLabelColor(newVal, oldVal) {
      this.refresh()
    },
    labelNumColor(newVal, oldVal) {
      this.refresh()
    },
    symbolSize(newVal, oldVal) {
      this.refresh()
    },
    barWidth(newVal, oldVal) {
      this.refresh()
    },
    hasNational(newVal, oldVal) {
      this.refresh()
    },
    labelLimit(newVal, oldVal) {
      this.refresh()
    },
    labelLimitWidth(newVal, oldVal) {
      this.refresh()
    }
    // offset(newVal, oldVal) {
    //   this.refresh()
    // }
  },
  methods: {
    handleClick(params) {
      this.$emit('barClick', params)
    },
    getRichJson() {

    },
    setOptions() {
      const _this = this
      this.circleData = []
      if(this.chartData.seriesData && this.chartData.seriesData.length != 0) {
        this.chartData.seriesData.forEach(item => {
          this.circleData.push(0)
        })
      }
      let tooltipObj = {
        show: true
      }
      if (this.customToolTip === 'custom') {
        tooltipObj = {
          show: true,
          formatter: (val, ind) => {
            console.log('tooltipObj:', val, ind)
            return val.name + '<br />' + this.customToolTipTitle + ':' + val.data
          }
        }
      }
      // if(this.labelLimit) {
      //   this.offset = this.labelLimitWidth
      // } else {
      //    this.offset = 10
      // }
      let options = {
        grid: {
          ...this.gridOpt(),
          containLabel: true
        },
        tooltip: tooltipObj,
        xAxis: {
          show: false
        },
        yAxis: {
          axisTick: "none",
          axisLine: "none",
          offset: this.offset,
          axisLabel: {
            interval: 0,
            textStyle: {
              color: this.axisLabelColor,
              fontSize: "12"
            }
          },
          data: this.chartData.categoryData
        },
        series: [
          {
            name: "",
            type: "bar",
            data: this.chartData.seriesData,
            label: {
              normal: {
                show: true,
                position: "right",
                textStyle: {
                  color: this.labelNumColor,
                  fontSize: "12"
                }
              }
            },
            barWidth: this.barWidth,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = _this.colors.length
                  return _this.colors[params.dataIndex % num]
                }
              }
            },
            z: 2
          },
          {
            name: "",
            type: "scatter",
            hoverAnimation: false,
            data: this.circleData,
            tooltip: {
              show: false
            },
            symbolSize: this.symbolSize,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = _this.colors.length
                  return _this.colors[params.dataIndex % num]
                },
                opacity: 1
              }
            },
            z: 1
          }
        ]
      }
      if (this.labelLimit) {
        options.yAxis.axisLabel.formatter = name => {
          return echarts.format.truncateText(name, this.labelLimitWidth)
        }
      }
      if(this.hasNational) {
        options = this.countryLabelFormatter(options)
      }

      return options
    },
    countryLabelFormatter(options) {
      const _this = this
      options.yAxis.axisLabel.padding = [0, 0, 0, 12]
      options.yAxis.axisLabel.formatter = function(val, index) {
        if(_this.hasNational) {
          let str = val
          let name = getNationalPng(val)
          if(val.length === 2) {
            str = str.slice(0, 1) + '\t\t\t' + str.slice(1)
          }
          return '{' + name + '| }' + '  ' + '{value|' + str + '}'
          // return '{value|' + str + '}' + '  ' + '{' + name + '| }'
        } else {
          return val
        }
      }
      options.yAxis.axisLabel.rich = {
        value: {
          lineHeight: 30
        },
        ...getCountryImg()
      }
      return options
    }
  }
}
</script>

<style scoped></style>
