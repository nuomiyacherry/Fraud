<template>
  <div class="pictorialBar full-block">
    <ECharts :options="options" :autoresize="true"></ECharts>
  </div>
</template>

<script>
import storage from 'utils/storage'
import { getMaxValue, getMinValue, getRangeData } from 'constants/utils'
import { getNationalPng, getCountryImg } from '@/constants/country'
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
import echarts from 'echarts'
const chartColors = storage.get('tColors')
export default {
  name: 'cylinderBarChart',
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
          seriesName: '图例',
          seriesData: [56, 45, 48, 34, 59, 28],
          categoryData: ['1月', '2月', '3月', '4月', '5月', '6月']
        }
      }
    },
    colors: {
      type: Array,
      default: () => chartColors.pictorialBar.colors
    },
    tipData: {
      type: Array,
      default: () => []
    },
    barWidth: {
      type: Number,
      default: 20
    },
    visibleDecorator: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    labelFormatter: {
      type: [String, Function],
      default: params => {
        return '{b} \n {c}'
      }
    }
  },
  data() {
    return {
      ranges: []
    }
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
    barWidth(newVal, oldVal) {
      this.refresh()
    },
    visibleDecorator(newVal, oldVal) {
      this.refresh()
    },
    tipData(newVal, oldVal) {
      this.refresh()
    }
  },
  methods: {
    setOptions() {
      if (!this.chartData.seriesData || this.chartData.seriesData.length === 0) return {}
      if (!this.chartData.categoryData || this.chartData.categoryData.length === 0) return {}
      let [seriesData, categoryData] = [this.chartData.seriesData, this.chartData.categoryData]
      let [maxValue, minValue, barWidth, symbolSize] = [0, 0, this.barWidth, []]
      let series = []
      maxValue = getMaxValue(seriesData, maxValue)
      minValue = getMinValue(seriesData, minValue)
      const _this = this

      const data = []
      const data2 = []
      const data3 = []
      const data4 = []
      const data5 = []
      if (this.tipData.length !== 0) {
        this.tipData.forEach((item, index) => {
          data.push({
            ...item,
            symbolPosition: 'end',
            label: {
              normal: {
                show: this.showLabel,
                position: this.xAxisValue ? 'right' : 'top',
                formatter: this.labelFormatter
              }
            },
            itemStyle: {
              normal: {
                color: this.colors[index]
              }
            }
          })
          data2.push({
            ...item,
            itemStyle: {
              normal: {
                color: this.colors[index]
              }
            }
          })
          data3.push({
            ...item,
            itemStyle: {
              normal: {
                color: this.colors[index],
                opacity: 0.7
              }
            }
          })
        })
      } else {
        seriesData.forEach((item, index) => {
          data.push({
            value: item,
            symbolPosition: 'end',
            label: {
              normal: {
                show: this.showLabel,
                position: this.xAxisValue ? 'right' : 'top',
                formatter: this.labelFormatter
              }
            },
            itemStyle: {
              normal: {
                color: this.colors[index]
              }
            }
          })
          data2.push({
            value: item,
            itemStyle: {
              normal: {
                color: this.colors[index]
              }
            }
          })
          data3.push({
            value: item,
            itemStyle: {
              normal: {
                color: this.colors[index],
                opacity: 0.7
              }
            }
          })
          data4.push({
            value: item,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: this.colors[index],
                // borderType: "dashed",
                borderWidth: 1
              }
            }
          })
          data5.push({
            value: item,
            itemStyle: {
              normal: {
                color: 'transparent',
                borderColor: this.colors[index],
                borderType: 'dashed',
                borderWidth: 1
              }
            }
          })
        })
      }
      symbolSize = [barWidth, barWidth * (9 / 20)]
      series.push(
        {
          name: '',
          type: 'pictorialBar',
          symbolSize: symbolSize,
          symbolOffset: [0, -(barWidth / 5)],
          z: 99,
          tooltip: {
            show: false
          },
          data: data
        },
        {
          name: '',
          type: 'pictorialBar',
          symbolSize: symbolSize,
          symbolOffset: [0, barWidth / 5],
          z: 99,
          tooltip: {
            show: false
          },
          data: data2
        },
        {
          name: this.chartData.seriesName || '图例',
          type: 'bar',
          silent: true,
          barWidth: barWidth,
          barGap: '-100%',
          data: data3
        }
      )
      if (this.visibleDecorator) {
        series.push(
          {
            type: 'pictorialBar',
            symbolSize: [symbolSize[0] * 2, symbolSize[1] * 2],
            symbolOffset: [0, (symbolSize[0] * 2) / 5],
            z: 11,
            tooltip: {
              show: false
            },
            data: data4
          },
          {
            type: 'pictorialBar',
            symbolSize: [symbolSize[0] * 3, symbolSize[1] * 3],
            symbolOffset: [0, (symbolSize[0] * 3) / 5],
            z: 10,
            tooltip: {
              show: false
            },
            data: data5
          }
        )
      }
      let axisOptions = this.axisOpt()
      let barOpt = {
        // color: this.colors,
        tooltip: {
          show: this.tooltipShow,
          ...this.tooltipOpt(),
          formatter: function(params) {
            var name = params[0].name
            var str = ''
            if (_this.tipData.length !== 0) {
              var title = params[0].data.name + '(' + params[0].data.country + ')'
              return `${title}<br /> ${params[0].seriesName}` + ' : ' + params[0].data.value 
            } else {
              params.forEach((item, i) => {
                if (item.seriesName !== '阴影') {
                  str += item.seriesName + ' : ' + item.value + '<br />'
                }
              })
              return `${name}<br /> ${str}`
            }
          }
        },
        legend: {
          show: false
        },
        grid: {
          ...this.gridOpt(),
          containLabel: true
        },
        ...axisOptions,
        series: series
      }
      if (this.xAxisValue) {
        barOpt.yAxis.data = categoryData
        barOpt.yAxis.axisLabel.interval = 0
        if (this.labelLimit) {
          barOpt.yAxis.axisLabel.formatter = name => {
            return echarts.format.truncateText(name, this.labelLimitWidth)
          }
        }
      } else {
        barOpt.xAxis.data = categoryData
        barOpt.xAxis.axisLabel.interval = 0
        if (this.labelLimit) {
          barOpt.xAxis.axisLabel.formatter = name => {
            return echarts.format.truncateText(name, this.labelLimitWidth)
          }
        }
      }
      // 数值过大，添加相应单位
      if (maxValue > 10000 || minValue < -10000) {
        //添加单位
        if (this.xAxisValue) {
          this.axisValueOpt(barOpt.xAxis, maxValue, minValue)
        } else {
          this.axisValueOpt(barOpt.yAxis, maxValue, minValue)
        }
      }
      if (this.hasNational) {
        barOpt = this.countryLabelFormatter(barOpt)
      }
      return barOpt
      // return barOpt
    },
    countryLabelFormatter(barOpt) {
      const _this = this
      const label = this.xAxisValue ? 'yAxis' : 'xAxis'
      barOpt[label].axisLabel.padding = [0, 0, 0, 12]
      barOpt[label].axisLabel.formatter = function(val, index) {
        if (_this.hasNational) {
          let name = getNationalPng(val)
          return '{' + name + '| }' + '  ' + '{value|' + val + '}'
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
