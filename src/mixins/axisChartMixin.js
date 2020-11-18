// import chartColors from 'constants/chartColors'
import echarts from 'echarts'
import storage from 'utils/storage'
const chartColors = storage.get('tColors')
export default {
  props: {
    rotate: {
      type: Number,
      default: 0
    },
    showxAxis: {
      type: Boolean,
      default: true
    },
    showyAxis: {
      type: Boolean,
      default: true
    },
    xAxisValue: {
      type: Boolean,
      default: false
    },
    axisType: {
      type: String,
      default: 'value'
    },
    logBase: {
      type: Number,
      default: 10
    },
    xAxisTickShow: {
      type: Boolean,
      default: true
    },
    yAxisTickShow: {
      type: Boolean,
      default: true
    },
    xAxisLineShow: {
      type: Boolean,
      default: true
    },
    yAxisLineShow: {
      type: Boolean,
      default: true
    },
    axisLineSymbol: {
      type: Array,
      default: () => ['none', 'arrow']
    },
    axisLineColor: {
      type: String,
      default: chartColors.axis.line
    },
    axisLabelColor: {
      type: String,
      default: chartColors.axis.label
    },
    xSplitLineShow: {
      type: Boolean,
      default: false
    },
    ySplitLineShow: {
      type: Boolean,
      default: false
    },
    xAxisLabelShow: {
      type: Boolean,
      default: true
    },
    yAxisLabelShow: {
      type: Boolean,
      default: true
    },
    splitLineType: {
      type: String,
      default: 'dotted'
    },
    axisSplitLineColor: {
      type: String,
      default: chartColors.axis.splitLine
    },
    labelLimit: {
      type: Boolean,
      default: false
    },
    labelLimitWidth: {
      type: Number,
      default: 100
    },
    axisLabelFontSize: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {}
  },
  watch: {
    rotate(newVal, oldVal) {
      // console.log(`${this.chartName}rotate[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    xAxisValue(newVal, oldVal) {
      // console.log(`${this.chartName}xAxisValue[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    showxAxis(newVal, oldVal) {
      // console.log(`${this.chartName}xAxisValue[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    showyAxis(newVal, oldVal) {
      // console.log(`${this.chartName}xAxisValue[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    axisType(newVal, oldVal) {
      // console.log(`${this.chartName}axisType[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    logBase(newVal, oldVal) {
      // console.log(`${this.chartName}logBase[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    xAxisTickShow(newVal, oldVal) {
      // console.log(`${this.chartName}xAxisTickShow[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    yAxisTickShow(newVal, oldVal) {
      // console.log(`${this.chartName}yAxisTickShow[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    xAxisLineShow(newVal, oldVal) {
      // console.log(`${this.chartName}xAxisLineShow[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    yAxisLineShow(newVal, oldVal) {
      // console.log(`${this.chartName}yAxisLineShow[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    axisLineSymbol(newVal, oldVal) {
      // console.log(`${this.chartName}axisLineSymbol[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    axisLineColor(newVal, oldVal) {
      // console.log(`${this.chartName}axisLineColor[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    axisLabelColor(newVal, oldVal) {
      // console.log(`${this.chartName}axisLabelColor[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    xSplitLineShow(newVal, oldVal) {
      // console.log(`${this.chartName}xSplitLineShow[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    ySplitLineShow(newVal, oldVal) {
      // console.log(`${this.chartName}ySplitLineShow[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    splitLineType(newVal, oldVal) {
      // console.log(`${this.chartName}splitLineType[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    axisSplitLineColor(newVal, oldVal) {
      // console.log(`${this.chartName}axisSplitLineColor[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    labelLimit(newVal, oldVal) {
      // console.log(`${this.chartName}labelLimit[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    labelLimitWidth(newVal, oldVal) {
      // console.log(`${this.chartName}labelLimitWidth[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    axisLabelFontSize(newVal, oldVal) {
      this.refresh()
    }
  },
  methods: {
    axisOpt() {
      let [xAxisType, yAxisType] = ['', '']
      if (this.xAxisValue) {
        xAxisType = this.axisType
        yAxisType = 'category'
      } else {
        xAxisType = 'category'
        yAxisType = this.axisType
      }
      return {
        xAxis: {
          show: this.showxAxis,
          type: xAxisType,
          splitLine: {
            show: this.xSplitLineShow,
            lineStyle: {
              width: 1,
              type: this.splitLineType,
              color: this.axisSplitLineColor
            }
          },
          axisTick: {
            show: this.xAxisLineShow && this.xAxisTickShow
          },
          axisLine: {
            show: this.xAxisLineShow,
            lineStyle: {
              width: 1,
              color: this.axisLineColor
            },
            symbol: this.axisLineSymbol
          },
          axisLabel: {
            show: this.xAxisLabelShow, //true,
            color: this.axisLabelColor,
            rotate: this.rotate,
            fontSize: this.axisLabelFontSize,
            interval: 0
          }
        },
        yAxis: {
          show: this.showyAxis,
          type: yAxisType,
          splitLine: {
            show: this.ySplitLineShow,
            lineStyle: {
              width: 1,
              type: this.splitLineType,
              color: this.axisSplitLineColor
            }
          },
          axisLabel: {
            show: this.yAxisLabelShow, //true,
            fontSize: this.axisLabelFontSize,
            textStyle: {
              color: this.axisLabelColor
            },
            interval: 0
          },
          axisTick: {
            show: this.yAxisLineShow && this.yAxisTickShow
          },
          axisLine: {
            show: this.yAxisLineShow,
            lineStyle: {
              width: 1,
              color: this.axisLineColor
            },
            symbol: this.axisLineSymbol
          }
        }
      }
    },
    axisValueOpt(option, maxValue, minValue) {
      if (maxValue > 100000000 || minValue < -100000000) {
        option.name = '亿'
        option.axisLabel.formatter = value => {
          return value / 100000000
        }
      } else if (maxValue > 10000 || minValue < -10000) {
        option.name = '万'
        option.axisLabel.formatter = value => {
          return value / 10000
        }
      }
    },
    axisOpt2(data, series) {
      let str = 'value'
      let type = ''
      let name = []
      let formatter = {}
      if (series && series.length !== 0) {
        let strname = ''
        series.forEach((item, i) => {
          if (i !== series.length - 1) {
            strname = strname + item.name + ' / '
          } else {
            name.push(strname.substring(0, strname.length - 2))
            if (item.data && item.data.length !== 0) {
              const arr = []
              name.push(item.name)
              item.data.forEach(d => {
                if (typeof d === 'string') {
                  type = 'category'
                  formatter = {
                    formatter: '{value} %'
                  }
                  arr.push(parseFloat(d.substring(0, d.length - 1)))
                }
              })
              if (type === 'category') {
                item.data = arr
              }
            }
          }
        })
      }
      return {
        xAxis: {
          show: this.showxAxis,
          type: 'category',
          splitLine: {
            show: this.xSplitLineShow,
            lineStyle: {
              width: 1,
              type: this.splitLineType,
              color: this.axisSplitLineColor
            }
          },
          axisTick: {
            show: this.xAxisLineShow && this.xAxisTickShow
          },
          axisLine: {
            show: this.xAxisLineShow,
            lineStyle: {
              width: 1,
              color: this.axisLineColor
            },
            symbol: ['none', 'none']
          },
          axisLabel: {
            show: this.xAxisLabelShow, //true,
            fontSize: this.axisLabelFontSize,
            color: this.axisLabelColor,
            rotate: this.rotate
          },
          data: data
        },
        yAxis: [
          {
            show: this.showyAxis,
            type: 'value',
            name: name[0],
            splitLine: {
              show: this.ySplitLineShow,
              lineStyle: {
                width: 1,
                type: this.splitLineType,
                color: this.axisSplitLineColor
              }
            },
            axisLabel: {
              show: this.yAxisLabelShow, //true,
              fontSize: this.axisLabelFontSize,
              textStyle: {
                color: this.axisLabelColor
              }
            },
            axisTick: {
              show: this.yAxisLineShow && this.yAxisTickShow
            },
            axisLine: {
              show: this.yAxisLineShow,
              lineStyle: {
                width: 1,
                color: this.axisLineColor
              },
              symbol: this.axisLineSymbol
            }
          },
          {
            show: this.showyAxis,
            type: str,
            name: name[1],
            splitLine: {
              show: false
            },
            axisLabel: {
              show: this.yAxisLabelShow, //true,
              fontSize: this.axisLabelFontSize,
              textStyle: {
                color: this.axisLabelColor
              },
              ...formatter
            },
            axisTick: {
              show: this.yAxisLineShow && this.yAxisTickShow
            },
            axisLine: {
              show: this.yAxisLineShow,
              lineStyle: {
                width: 1,
                color: this.axisLineColor
              },
              symbol: this.axisLineSymbol
            }
          }
        ]
      }
    },
    returnAxisOptions(
      legendData,
      categoryData,
      series,
      maxValue,
      minValue,
      hasyAxis2 = false
    ) {
      let axisOptions = this.axisOpt()
      if (hasyAxis2) {
        axisOptions = this.axisOpt2(categoryData, series)
      }
      let chartOpts = {
        color: this.colors,
        tooltip: {
          ...this.tooltipOpt()
        },
        legend: {
          ...this.legendOpt(),
          show: this.legendShow,
          data: legendData,
          textStyle: {
            color: this.legendTextColor,
            fontSize: this.legendFontSize
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
        chartOpts.yAxis.data = categoryData
        chartOpts.yAxis.axisLabel.interval = 0
        if (this.labelLimit) {
          chartOpts.yAxis.axisLabel.formatter = name => {
            return echarts.format.truncateText(name, this.labelLimitWidth)
          }
        }
      } else {
        chartOpts.xAxis.data = categoryData
        chartOpts.xAxis.axisLabel.interval = 0
        if (this.labelLimit) {
          chartOpts.xAxis.axisLabel.formatter = name => {
            return echarts.format.truncateText(name, this.labelLimitWidth)
          }
        }
      }

      if (this.axisType === 'log') {
        this.xAxisValue
          ? (chartOpts.xAxis.logBase = this.logBase)
          : (chartOpts.yAxis.logBase = this.logBase)
      }
      // console.log(this.logBase, '=====this.logBase=====')
      // 数值过大，添加相应单位
      if (maxValue > 10000 || minValue < -10000) {
        //添加单位
        if (this.xAxisValue) {
          this.axisValueOpt(chartOpts.xAxis, maxValue, minValue)
        } else {
          if (!hasyAxis2) {
            this.axisValueOpt(chartOpts.yAxis, maxValue, minValue)
          }
        }
      }
      return chartOpts
    }
  }
}
