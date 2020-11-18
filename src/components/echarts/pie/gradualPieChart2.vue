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
      data.forEach((v, i) => {
        this.gradualColors.forEach((item, index) => {
          if (i === index) {
            v.color0 = item.color0
            v.color1 = item.color1
          }
        })
        if (v.value) {
          v.itemStyle = {
            color: { // 完成的圆环的颜色
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                  offset: 0,
                  color: v.color0 // 0% 处的颜色
              }, {
                  offset: 1,
                  color: v.color1 // 100% 处的颜色
              }]
            }
          }
        }
      })
      return data
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