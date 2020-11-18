<template>
  <ECharts :options="options" :autoresize="true"></ECharts>
</template>

<script>
import globalChartMixin from 'mixins/globalChartMixin'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/title'
import storage from "utils/storage"
const chartColors = storage.get('tColors')
export default {
  name: 'PieChart1',
  components: {
    ECharts
  },
  mixins: [ globalChartMixin ],
  props: {
    chartData: {
      type: Object,
      default: function() {
        return {
          legendData: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
          seriesData: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
            ]
        }
      }
    },
    colors: {
      type: Array,
      default: () => chartColors.gradualPie.colors
    },
    gradualColors: {
      type: Array,
      default: () => chartColors.gradualPie.gradualColor
    },
    pieName: {
      type: String,
      default: '分布情况'
    },
    seriesLabelShow: {
      type: Boolean,
      default: false
    },
    pieAutoPlay: {
      type: Boolean,
      default: false
    },
    center: {
      type: Array,
      default: () => ['50%', '50%']
    },
    radius: {
      type: Array,
      default: () => ['40%', '65%']
    },
    showPercent: {
      type: Boolean,
      default: false
    },
    pieAutoPlayNumStyle: {
      type: Object,
      default: function() {
        return {
          color: chartColors.gradualPie.autoPlayNum,
          fontSize: '22',
          fontWeight: 'bold'
        }
      }
    },
    pieAutoPlayTextStyle: {
      type: Object,
      default: function() {
        return {
          color: chartColors.gradualPie.autoPlayText,
          fontSize: '14',
          fontWeight: 'bold'
        }
      }
    },
    showRatio: {
      type: Boolean,
      default: false
    },
    seriesLabelEmphasisShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chartName: '[渐变饼图模板]',
      timeFlag: 0
    }
  },
  watch: {
    chartData(newVal, oldVal) {
      this.refresh()
    },
    colors(newVal, oldVal) {
      this.refresh()
    },
    gradualColors(newVal, oldVal) {
      this.refresh()
    },
    pieName(newVal, oldVal) {
      this.refresh()
    },
    seriesLabelShow(newVal, oldVal) {
      this.refresh()
    },
    pieAutoPlay(newVal, oldVal) {
      this.refresh()
    },
    center(newVal, oldVal) {
      this.refresh()
    },
    radius(newVal, oldVal) {
      this.refresh()
    },
    showPercent(newVal, oldVal) {
      this.refresh()
    },
    pieAutoPlayNumColor(newVal, oldVal) {
      this.refresh()
    },
    pieAutoPlayNumFontSize(newVal, oldVal) {
      this.refresh()
    },
    pieAutoPlayNumFontWeight(newVal, oldVal) {
      this.refresh()
    },
    pieAutoPlayTextColor(newVal, oldVal) {
      this.refresh()
    },
    pieAutoPlayTextFontSize(newVal, oldVal) {
      this.refresh()
    },
    pieAutoPlayTextFontWeight(newVal, oldVal) {
      this.refresh()
    },
    showRatio(newVal, oldVal) {
      this.refresh()
    },
    seriesLabelEmphasisShow(newVal, oldVal) {
      this.refresh()
    }
  },
  methods: {
    refreshCallback() {
      if (this.pieAutoPlay) {
        this.startPieAutoPlay(this.chartData.seriesData)
      }
    },
    startPieAutoPlay(data) {
      let pieIndex = 0
      let allNum = 0
      for (let a = 0; a < data.length; a++) {
        allNum += parseFloat(data[a].value)
      }
      clearInterval(this.timeFlag)
      this.timeFlag = setInterval(() => {
        if (pieIndex > data.length - 1) {
          pieIndex = 0
        }
        for (let i = 0; i < data.length; i++) {
          data[i].selected = false
        }
        data[pieIndex].selected = true
        data.splice(pieIndex, 1, data[pieIndex])
        if (this.showPercent) {
          this.options.series[0].data[0].label.normal.formatter = (parseFloat(this.options.series[1].data[pieIndex].value) / allNum * 100).toFixed(1) + '%'
        } else {
          this.options.series[0].data[0].label.normal.formatter = '\n \n' + parseFloat(this.options.series[1].data[pieIndex].value).toFixed(0)
        }
        this.options.series[0].data[1].label.normal.formatter = this.options.series[1].data[pieIndex].name
        pieIndex++
      }, 2000)
    },
    addGradual(data) {
      // 计算总数
      // console.log(data.map(v => v.value), '===+++')
      var total = data.map(v => v.value).reduce((o, n) => o + n)
      // 计算每一个data的其实角度和末了角度 θ1和θ2
      data.reduce((o, v) => {
        v.theta1 = o
        v.theta2 = o + v.value / total
        return v.theta2
      }, 0)
      // 添加渐变
      data.forEach((v, i) => {
        var ops = this.calc(v.theta1 * 2 * Math.PI, v.theta2 * 2 * Math.PI)
        this.gradualColors.forEach((item, index) => {
          if (i === index) {
            v.color0 = item.color0
            v.color1 = item.color1
          }
        })
        if (v.value) {
          v.itemStyle = {
            color: {
              type: 'radial',
              x: ops.center[0],
              y: ops.center[1],
              r: ops.radius,
              colorStops: [
                {
                  offset: 0,
                  color: v.color0
                },
                {
                  offset: 0.5,
                  color: v.color0
                },
                {
                  offset: 0.3,
                  color: v.color1
                },
                {
                  offset: 1,
                  color: v.color1
                }
              ],
              globalCoord: false // 缺省为 false
            }
          }
        }
      })
      return data
      // console.log(data, '===data===+++')
    },
    // 计算渐变中心以及渐变半径
    calc(theta1, theta2) {
      var r = 0.5 // 半径是0.5 其实表示0.5个直径
      var inner = 0.6 // 里面镂空部分占60%  option中radius为[33%, 55%]  55 * 0.6 == 33

      var cos = Math.cos
      var sin = Math.sin
      var PI = Math.PI
      var min = Math.min
      var max = Math.max

      var bottom = 0
      var left = 2 * r
      var right = 0
      // y0: θ1对应的外部点的y值
      // y1: θ2对应的外部点的y值
      // _y0: θ1对应的内部点的y值
      // _y1: θ2对应的内部点的y值
      // x0: θ1对应的外部点的x值
      // x1: θ2对应的外部点的x值
      // _x0: θ1对应的内部点的x值
      // _x1: θ2对应的内部点的x值
      var y0 = r * (1 - cos(theta1))
      var y1 = r * (1 - cos(theta2))

      var _y0 = r * (1 - inner * cos(theta1))
      var _y1 = r * (1 - inner * cos(theta2))

      // 如果这个弧经过θ == PI的点  则bottom = 2PI
      // bottom用于之后的max计算中
      if (theta1 < PI && theta2 > PI) {
        bottom = 2 * r
      }
      // 计算这几个点的最大最小值
      var ymin = min(_y0, _y1, y0, y1)
      var ymax = max(_y0, _y1, y0, y1, bottom)

      var x0 = r * (1 + sin(theta1))
      var x1 = r * (1 + sin(theta2))

      var _x0 = r * (1 + inner * sin(theta1))
      var _x1 = r * (1 + inner * sin(theta2))

      // 如果这个弧经过θ == PI / 2的点  则right = 2PI
      if (theta1 < PI / 2 && theta2 > PI / 2) {
        right = 2 * r
      }
      // 如果这个弧经过θ == PI / 2 * 3的点  则left = 0
      if (theta1 < PI / 2 * 3 && theta2 > PI / 2 * 3) {
        left = 0
      }
      var xmin = min(_x0, _x1, x0, x1, left)
      var xmax = max(_x0, _x1, x1, x0, right)

      return {
        // 计算圆心以及半径
        center: [(r - xmin) / (xmax - xmin), (r - ymin) / (ymax - ymin)],
        radius: r / min(xmax - xmin, ymax - ymin)
      }
    },
    labelFormatter(flag) {
      if (flag) {
        return '{b}\n{d}%'
      } else {
        return '{b}'
      }
    },
    setOptions() {
      let [ legendData, seriesData ] = [ this.chartData.legendData, this.chartData.seriesData ]
      let [ seriesLabelPos, seriesLabelEmphasis ] = [ '', true ]
      seriesData = this.addGradual(seriesData)

      if (this.seriesLabelShow) {
        seriesLabelPos = 'outside'
      } else {
        seriesLabelPos = 'center'
      }
      if (this.pieAutoPlay) {
        seriesLabelEmphasis = false
      } else {
        this.seriesLabelEmphasisShow
          ? (seriesLabelEmphasis = true)
          : (seriesLabelEmphasis = false)
      }
      let options = {
        color: this.colors,
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '',
            type: 'pie',
            hoverAnimation: false,
            radius: [200, 200],
            center: this.center,
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [
              {
                value: 0,
                tooltip: {
                  show: false
                },
                label: {
                  normal: {
                    formatter: '',
                    textStyle: this.pieAutoPlayNumStyle
                  }
                }
              },
              {
                tooltip: {
                  show: false
                },
                label: {
                  normal: {
                    formatter: '',
                    textStyle: this.pieAutoPlayTextStyle
                  }
                }
              }
            ]
          },
          {
            name: this.pieName,
            type: 'pie',
            radius: this.radius,
            center: this.center,
            hoverAnimation: true,
            avoidLabelOverlap: false,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: chartColors.gradualPie.shadow
              }
            },
            label: {
              normal: {
                show: this.seriesLabelShow,
                color: chartColors.whiteColor,
                position: this.seriesLabelPos,
                formatter: this.labelFormatter(this.showRatio)
              },
              emphasis: {
                show: this.seriesLabelEmphasis,
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'bold'
                }
              }
            },
            data: seriesData
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