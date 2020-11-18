<template>
  <div class="full-block">
    <ECharts :options="options" auto-resize @click="chartClick"></ECharts>
  </div>
</template>

<script>
  import globalChartMixin from 'mixins/globalChartMixin'
  import ECharts from 'vue-echarts/components/ECharts'
  import storage from "utils/storage"
  const chartColors = storage.get('tColors')
  import 'echarts/lib/chart/gauge'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'

  export default {
    name: 'gaugeChart',
    components: { ECharts },
    mixins: [ globalChartMixin ],
    props: {
      chartData: {
        type: Object,
        default: () => {
          return {
            seriesData: [
              {
                name: '覆盖率',
                value: 92
              }
            ]
          }
        }
      },
      colors: {
        type: Array,
        default: () => chartColors.gauge.colors
      },
      gaugeTitle: {
        type: String,
        default: '仪表盘'
      },
      gaugeTitleColor: {
        type: String,
        default: chartColors.gauge.title
      },
      detailTextShadowColor: {
        type: String,
        default: chartColors.gauge.detailTextShadow
      },
      shadowColor: {
        type: String,
        default: chartColors.gauge.shadow
      },
      detailColor: {
        type: String,
        default: chartColors.gauge.detail
      }
    },
    data() {
      return {
        chartName: '[仪表盘模板]'
      }
    },
    mounted() {
      this.createTplCode('GaugeChart')
    },
    watch: {
      chartData(newVal, oldVal) {
        console.log(`${this.chartName}chartData[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      colors(newVal, oldVal) {
        console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      gaugeTitle(newVal, oldVal) {
        console.log(`${this.chartName}gaugeTitle[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      gaugeTitleColor(newVal, oldVal) {
        console.log(`${this.chartName}gaugeTitleColor[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      detailTextShadowColor(newVal, oldVal) {
        console.log(`${this.chartName}detailTextShadowColor[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      shadowColor(newVal, oldVal) {
        console.log(`${this.chartName}shadowColor[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      detailColor(newVal, oldVal) {
        console.log(`${this.chartName}detailColor[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      }
    },
    methods: {
      setOptions() {
        let gaugeOpts = {
          title: {
            show: true,
            text: this.gaugeTitle,
            top: 10,
            left: 'center',
            textStyle: {
              fontSize: 14,
              fontWeight: 'lighter',
              color: this.gaugeTitleColor
            }
          },
          legend: {
            ...this.legendOpt(),
            show: this.legendShow,
            data: [this.gaugeTitle],
            textStyle: {
              color: this.legendTextColor
            }
          },
          color: this.colors,
          series: [
            {
              name: this.gaugeTitle,
              type: 'gauge',
              center: ['50%', '60%'],
              startAngle: 180,
              endAngle: 0,
              detail: {
                formatter: function(value) {
                  return value.toFixed(0) + '%'
                },
                fontWeight: 'bolder',
                fontSize: 16,
                borderRadius: 6,
                backgroundColor: this.colors[0],
                borderColor: this.colors[1],
                shadowBlur: 3,
                shadowColor: this.colors[2],
                shadowOffsetX: 0,
                shadowOffsetY: 2,
                borderWidth: 1,
                textBorderColor: this.colors[1],
                textBorderWidth: 2,
                textShadowBlur: 1,
                textShadowColor: this.detailTextShadowColor,
                textShadowOffsetX: 0,
                textShadowOffsetY: 0,
                fontFamily: 'Arial',
                width: 80,
                color: this.detailColor,
                rich: {}
              },
              pointer: {
                color: 'auto'
              },
              splitLine: {
                length: 15,
                lineStyle: {
                  color: 'auto'
                }
              },
              axisLine: {
                show: true,
                lineStyle: {
                  width: 15,
                  shadowBlur: 0,
                  color: [
                    [0.3, this.colors[3]],
                    [0.7, this.colors[4]],
                    [1, this.colors[5]]
                  ]
                }
              },
              axisLabel: {
                fontStyle: 'italic'
              },
              title: {
                textStyle: {
                  fontSize: 13,
                  fontStyle: 'italic',
                  color: this.gaugeTitleColor,
                  shadowColor: this.shadowColor,
                  shadowBlur: 10
                }
              },
              data: this.chartData.seriesData
            }
          ],
          animationDuration: 2e3,
          animationDurationUpdate: 2e3
        }

        return gaugeOpts
      }
    }
  }
</script>

<style scoped lang='less'></style>
