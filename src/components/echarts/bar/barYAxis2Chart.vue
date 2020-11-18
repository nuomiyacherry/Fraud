<template>
  <ECharts :options="options" :autoresize="true"></ECharts>
</template>

<script>
  import globalChartMixin from 'mixins/globalChartMixin'
  import gridChartMixin from 'mixins/gridChartMixin'
  import axisChartMixin from 'mixins/axisChartMixin'
  import colorChartMixin from 'mixins/colorChartMixin'
  import tooltipChartMixin from 'mixins/tooltipChartMixin'
  import { getMaxValue, getMinValue } from 'constants/utils'
  import storage from "utils/storage"
  import ECharts from 'vue-echarts/components/ECharts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/legendScroll'
  import 'echarts/lib/component/title'
  const chartColors = storage.get('tColors')

  export default {
    name: 'barChart',
    components: { ECharts },
    mixins: [ globalChartMixin, axisChartMixin, gridChartMixin, colorChartMixin, tooltipChartMixin ],
    props: {
      chartData: {
        type: Object,
        default: () => {
          return {
            legendData: ['IP', 'IPV4'],
            seriesData: [
              [16672, 14345, 19876, 22098],
              [12672, 19345, 18876, 10098]
            ],
            categoryData: ['IDC', 'IRCS', 'CDN', 'DNS']
          }
        }
      },
      colors: {
        type: Array,
        default: () => chartColors.bar.colors
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
      barShadowRadius: {
        type: Array,
        default: () => [0, 0, 0, 0]
      },
      barWidth: {
        type: [Number, String],
        default: 'auto'
      }
    },
    data() {
      return {
        chartName: '[柱状图模板]',
        startColors: this.barGradientStartColors,
        endColors: this.barGradientEndColors,
        currColors: []
      }
    },
    mounted() {
      this.createTplCode('BarChart')
    },
    watch: {
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
      }
    },
    methods: {
      setOptions() {
        let [ legendData, seriesData, categoryData ] = [ this.chartData.legendData, this.chartData.seriesData, this.chartData.categoryData ]
        let [ seriesLabelPosition, seriesLabelShow, series ] = [ 'inside', false, [] ]
        let [ maxValue, minValue ] = [ 0, 0 ]

        if (this.labelShow) {
          seriesLabelShow = true
          this.xAxisValue
            ? (seriesLabelPosition = 'insideRight')
            : (seriesLabelPosition = 'insideTop')
        }

        if (legendData && legendData.length !== 0) {
          legendData.forEach((item, index) => {
            series.push({
              name: item,
              type: 'bar',
              yAxisIndex: index,
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
              data: seriesData[index],
              barMaxWidth: '20',
              barWidth: this.barWidth
            })
            if (this.barGradientShow) {
              this.initColors()
              series[index].itemStyle.normal = {
                barBorderRadius: this.barBorderRadius,
                color: this.currColors[index]
              }
            }
            maxValue = getMaxValue(seriesData[index], maxValue)
            minValue = getMinValue(seriesData[index], minValue)
          })
        }

        let barOpt = this.returnAxisOptions(legendData, categoryData, series, maxValue, minValue, true)
        return barOpt
      }
    }
  }
</script>

<style scoped></style>
