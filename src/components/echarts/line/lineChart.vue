<template>
  <ECharts :options="options" :autoresize="true" @click="chartClick"></ECharts>
</template>

<script>
  import globalChartMixin from 'mixins/globalChartMixin'
  import gridChartMixin from 'mixins/gridChartMixin'
  import axisChartMixin from 'mixins/axisChartMixin'
  import colorChartMixin from 'mixins/colorChartMixin'
  import tooltipChartMixin from 'mixins/tooltipChartMixin'
  import storage from "utils/storage"
  import { getMaxValue, getMinValue } from 'constants/utils'
  import ECharts from 'vue-echarts/components/ECharts'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/legendScroll'
  import 'echarts/lib/component/title'
  import 'echarts/lib/component/markLine'
  import 'echarts/lib/component/markPoint'
  const chartColors = storage.get('tColors')

  export default {
    name: 'lineChart',
    components: { ECharts },
    mixins: [ globalChartMixin, axisChartMixin, gridChartMixin, colorChartMixin, tooltipChartMixin ],
    props: {
      chartData: {
        type: Object,
        default: () => {
          return {
            legendData: ['告警事件'],
            seriesData: [
              [1432, 1568, 1125, 1359, 1654, 1852, 1523, 1369, 1459, 1854, 1635, 1364]
            ],
            categoryData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        }
      },
      colors: {
        type: Array,
        default: () => chartColors.line.colors
      },
      smooth: {
        type: Boolean,
        default: false
      },
      markLineAverage: {
        type: Boolean,
        default: false
      },
      markLineAverageLabel: {
        type: String,
        default: '平均值'
      },
      markLineColor: {
        type: String,
        default: chartColors.line.markLine
      },
      showLineArea: {
        type: Boolean,
        default: false
      },
      areaStartColors: {
        type: Array,
        default: () => chartColors.line.gradualStart
      },
      areaEndColors: {
        type: Array,
        default: () => chartColors.line.gradualEnd
      },
      dataZoomShow: {
        type: Boolean,
        default: false
      },
      dataZoomStart: {
        type: Number,
        default: 0
      },
      dataZoomEnd: {
        type: Number,
        default: 100
      },
      handleColor: {
        type: String,
        default: chartColors.dataZoomColor.handleColor
      },
      backgroundColor: {
        type: String,
        default: chartColors.dataZoomColor.backgroundColor
      },
      fillerColor: {
        type: String,
        default: chartColors.dataZoomColor.fillerColor
      },
      dataZoomTextColor: {
        type: String,
        default: chartColors.dataZoomColor.textColor
      }
    },
    data() {
      return {
        chartName: '[折线图模板]',
        startColors: this.areaStartColors,
        endColors: this.areaEndColors,
        currColors: []
      }
    },
    watch: {
      chartData: {
        handler(newVal, oldVal) {
          this.refresh()
        },
        deep: true
      },
      colors() {
        // console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      smooth(newVal, oldVal) {
        // console.log(`${this.chartName}smooth[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      markLineAverage(newVal, oldVal) {
        // console.log(`${this.chartName}markLineAverage[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      markLineColor(newVal, oldVal) {
        // console.log(`${this.chartName}markLineColor[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      showLineArea(newVal, oldVal) {
        // console.log(`${this.chartName}showLineArea[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      areaStartColors(newVal, oldVal) {
        // console.log(`${this.chartName}areaStartColors[新值:${newVal};旧值:${oldVal}]`)
        this.startColors = newVal
        this.refresh()
      },
      areaEndColors(newVal, oldVal) {
        // console.log(`${this.chartName}areaEndColors[新值:${newVal};旧值:${oldVal}]`)
        this.endColors = newVal
        this.refresh()
      },
      dataZoomShow(newVal, oldVal) {
        this.refresh()
      },
      handleColor(newVal, oldVal) {
        this.refresh()
      },
      backgroundColor(newVal, oldVal) {
        this.refresh()
      },
      fillerColor(newVal, oldVal) {
        this.refresh()
      },
      dataZoomTextColor(newVal, oldVal) {
        this.refresh()
      }
    },
    computed: {},
    created() {
      if (this.currColors.length === 0) {
        this.initAreaColors()
      }
    },
    methods: {
      initAreaColors() {
        this.colors.forEach((item, index) => {
          this.currColors.push({
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: this.areaStartColors[index] // 0% 处的颜色
              },
              {
                offset: 1,
                color: this.areaEndColors[index] // 100% 处的颜色
              }
            ]
          })
        })
      },
      markLineAverageData(item, index) {
        // 判断是否绘制平均值标线
        let oMarkLineAverage = {}
        if (this.markLineAverage) {
          oMarkLineAverage = {
            markLine: {
              precision: 0,
              lineStyle: {
                normal: {
                  color: this.markLineColor
                }
              },
              label: {
                normal: {
                  position: 'middle',
                  formatter: this.markLineAverageLabel + '：{c}'
                }
              },
              data: [{
                type: 'average',
                name: '平均值'
              }]
            },
            markPoint: {
              data: [{
                type: 'max',
                name: '最大值'
              },
              {
                type: 'min',
                name: '最小值'
              }
              ]
            }
          }
        }
        return oMarkLineAverage
      },
      setOptions() {
        let [ legendData, seriesData, categoryData ] = [ this.chartData.legendData, this.chartData.seriesData, this.chartData.categoryData ]
        const series = []
        let maxValue = 0, minValue = 0

        // 构造数据
        if (legendData && legendData.length !== 0) {
          legendData.forEach((item, index) => {
            series.push({
              name: item,
              type: 'line',
              smooth: this.smooth,
              data: seriesData[index],
              ...this.markLineAverageData(item, index)
            })
            if (this.showLineArea) {
              this.initColors()
              series[index].areaStyle = {
                color: this.currColors[index]
              }
            }
            maxValue = getMaxValue(seriesData[index], maxValue)
            minValue = getMinValue(seriesData[index], minValue)
          })
        }

        // 构造折线图的选项
        let lineOpt = this.returnAxisOptions(legendData, categoryData, series, maxValue, minValue)

        // console.log('lineChart', lineOpt)
        lineOpt.dataZoom = [
          {
            show: this.dataZoomShow,
            zoomOnMouseWheel: false,
            moveOnMouseMove: false,
            realtime: true,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '20',
            handleColor: this.handleColor, //h滑动图标的颜色
            handleStyle: {
              borderColor: this.handleColor,
              borderWidth: '1',
              background: this.handleColor
            },
            height: 15, //组件高度
            backgroundColor: this.backgroundColor,
            fillerColor: this.fillerColor, //选中范围的填充颜色。
            borderColor: this.handleColor,
            textStyle: {
              color: this.dataZoomTextColor
            },
            left: '15%',
            right: '15%',
            bottom: 2,
            start: this.dataZoomStart,
            end: this.dataZoomEnd,
            filterMode: 'empty'
          },
          {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100,
            filterMode: 'empty',
            zoomOnMouseWheel: false,
            moveOnMouseMove: false
          }
        ]

        return lineOpt
      }
    }
  }
</script>

<style scoped>

</style>
