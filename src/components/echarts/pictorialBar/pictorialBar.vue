<template>
  <div class="pictorialBar full-block">
    <ECharts :options="options" :autoresize="true" @click="barClick"></ECharts>
  </div>
</template>

<script>
import storage from "utils/storage"
import { getMaxValue, getMinValue, getRangeData } from 'constants/utils'
import { getNationalPng, getCountryImg } from "@/constants/country"
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
  name: 'pictorialBar',
  components: {
    ECharts
  },
  mixins: [ globalChartMixin, axisChartMixin, gridChartMixin, colorChartMixin, tooltipChartMixin ],
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {
          seriesName: '图例',
          seriesData: [51236, 45234, 48243, 23244, 52439, 24328],
          categoryData: ['1月', '2月', '3月', '4月', '5月', '6月']
        }
      }
    },
    toolTipType: {
      type: String,
      default: 'default'
    },
    colors: {
      type: Array,
      default: () => chartColors.pictorialBar.colors
    },
    size: {
      type: Array,
      default: () => [6, 10]
    },
    bgColors: {
      type: String,
      default: chartColors.pictorialBar.batteryBg
    },
    hasNational: {
      type: Boolean,
      default: false
    },
    range: {
      type: Array,
      default: () => []
    },
    labelShow: {
      type: Boolean,
      default: false
    },
    isClick: {
      type: Boolean,
      default: false
    },
    isPercent: {
      type: Boolean,
      default: false
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
    size(newVal, oldVal) {
      this.refresh()
    },
    hasNational(newVal, oldVal) {
      this.refresh()
    },
    range(newVal, oldVal) {
      this.ranges = newVal
      this.refresh()
    },
    labelShow(newVal, oldVal) {
      this.refresh()
    }
  },
  methods: {
    barClick(params) {
      if(this.isClick) {
        this.$emit('barClick', params)
      }
    },
    setOptions() {
      const _this = this
      if (!this.chartData.seriesData) return  {}
      if(this.chartData.seriesData.length === 0) return {}
      if(this.chartData.categoryData.length === 0) return {}
      if(!this.chartData.categoryData) return {}
      let [ legendData, seriesData, categoryData ] = [ this.chartData.legendData, this.chartData.seriesData, this.chartData.categoryData ]
      let [ maxValue, symbolSize ] = [ 0, 0, [] ]
      let series = []
      if(this.xAxisValue) {
        symbolSize = this.size
      } else {
        symbolSize = [this.size[1], this.size[0]]
      }
      let originalData = seriesData
      let max = getMaxValue(seriesData, 0)
      let min = getMinValue(seriesData)
      let tempArr = [...seriesData]
      tempArr.sort((a, b) => a - b)
      if (tempArr.length > 0) {
        min = tempArr[0]
      }
      // this.range.length !== 0 ?  this.ranges = this.range : this.ranges = [min, max]
      if(this.range.length !== 0 && seriesData.length !== 1) {
        this.ranges = this.range
        seriesData = getRangeData(seriesData, [min, max], this.ranges)
      }
      maxValue = getMaxValue(seriesData, maxValue)
      const data = []
      const data2 = []
      seriesData.forEach((item, index) => {
        data.push({
          value: item,
          itemStyle: {
            normal: {
              color: this.colors[index]
            }
          }
        })
        data2.push({
          value: item
        })
      })
      series.push({
        name: this.chartData.seriesName,
        type: 'pictorialBar',
        symbol: 'rect',
        symbolRepeat: 'fixed',
        symbolMargin: '20%',
        symbolClip: true,
        symbolSize: symbolSize,
        symbolBoundingData: maxValue,
        data: data,
        label: {
          show: this.labelShow,
          position: 'right',
          formatter: function(params) {
            if(_this.isPercent) {
              return params.value + '%'
            }
            return params.value
          }
        },
        z: 9999999,
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
        symbolSize: symbolSize,
        symbolBoundingData: maxValue,
        data: data2,
        z: 9999,
        animationEasing: 'elasticOut',
        animationDelay: function(dataIndex, params) {
            return params.index * 30
        }
      }
      )
      let axisOptions = this.axisOpt()
      let tooltipFormatter = (params) => {
        // console.log(params, '===formatter params')
        let obj = params[0]
        let str = ''
        // console.log('originalData:', originalData, this.chartData)
        originalData.forEach((item, i) => {
          if(obj.dataIndex === i) {
            // console.log(i, obj.dataIndex)
            str = obj.name + '<br/>' + obj.seriesName + ': ' + item + (_this.isPercent ? '%' : '')
          }
        })
        return str
      }
      if (this.toolTipType === 'attackSource') {
        tooltipFormatter = (params) => {
          // console.log(params, '===formatter params')
          let obj = params[0]
          let str = ''
          // console.log('originalData:', originalData, this.chartData)
          originalData.forEach((item, i) => {
            if(obj.dataIndex === i) {
              console.log('obj.name:', obj.name)

              str = obj.name + '(' + obj.seriesName + '：' + item + ')'
              
              let tipItemMap = this.chartData.tip[obj.name]
              let addTipStr = ""
              addTipStr += "<br/>" + '威胁标签：' + tipItemMap['eventType']
              addTipStr += "<br/>" + '攻击省份：' + tipItemMap['attackedProvince']

              str += addTipStr
            }
          })
          return str
        }
      }
      let barOpt = {
        color: this.colors,
        tooltip: {
          show: this.tooltipShow,
          ...this.tooltipOpt(),
          formatter: tooltipFormatter
        },
        legend: {
          ...this.legendOpt(),
          show: this.legendShow,
          data: legendData,
          textStyle: {
            color: this.legendTextColor
          },
          pageTextStyle: {
            color: this.legendPageTextColor
          }
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
          // barOpt.yAxis.axisLabel.align = 'left'
          // barOpt.yAxis.offset = this.labelLimitWidth
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
      if (max > 10000 || min < -10000) {
        //添加单位
        if (this.xAxisValue) {
          this.axisValueOpt(barOpt.xAxis, max, min)
        } else {
          this.axisValueOpt(barOpt.yAxis, max, min)
        }
      }
      if(this.hasNational) {
        barOpt = this.countryLabelFormatter(barOpt)
      }
      return barOpt
      // return barOpt
    },
    countryLabelFormatter(barOpt) {
      const _this = this
      const label = this.xAxisValue ? 'yAxis' : 'xAxis'
      barOpt[label].axisLabel.padding = [0, 0, 0, 12]
      // barOpt[label].axisLabel.align = 'justify'
      barOpt[label].axisLabel.formatter = function(val, index) {
        if(_this.hasNational) {
          let str = val
          let name = getNationalPng(val)
          // if(val.length === 2) {
          //   str = str.slice(0, 1) + '\t\t\t' + str.slice(1)
          // }
          // return '{' + name + '| }' + '  ' + '{value|' + str + '}'
          return '{value|' + str + '}' + '  ' + '{' + name + '| }'
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
