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
    name: 'gaugePieChart',
    components: { ECharts },
    mixins: [ globalChartMixin ],
    props: {
      chartData: {
        type: Object,
        default: () => {
          return {
            value: 70,
            name: '完成率'
          }
        }
      },
      colors: {
        type: Array,
        default: () => chartColors.gaugePie.colors
      },
      titleColor: {
        type: String,
        default: chartColors.gaugePie.title
      },
      pieName: {
        type: String,
        default: '完成率'
      },
      showPieGradual: {
        type: Boolean,
        default: false
      },
      gradientStartColors: {
        type: String,
        default: chartColors.gaugePie.gradualStart
      },
      gradientEndColors: {
        type: String,
        default: chartColors.gaugePie.gradualEnd
      },
      bgColors: {
        type: String,
        default: chartColors.gaugePie.bg
      },
      bgBorderColor: {
        type: String,
        default: chartColors.gaugePie.bgBorder
      }
    },
    data() {
      return {
        chartName: '[饼图模板]',
        timeFlag: 0
      }
    },
    mounted() {},
    watch: {
      chartData(newVal, oldVal) {
        this.refresh()
      },
      colors(newVal, oldVal) {
        this.refresh()
      },
      titleColor(newVal, oldVal) {
        this.refresh()
      },
      pieName(newVal, oldVal) {
        this.refresh()
      },
      showPieGradual(newVal, oldVal) {
        this.refresh()
      },
      gradientStartColors(newVal, oldVal) {
        this.refresh()
      },
      gradientEndColors(newVal, oldVal) {
        this.refresh()
      },
      bgColors(newVal, oldVal) {
        this.refresh()
      },
      bgBorderColor(newVal, oldVal) {
        this.refresh()
      }
    },
    methods: {
      setOptions() {
        var pieOpts = {
          title: {
            x: '48%',
            y: '42%',
            text: this.chartData.value + '%',
            textAlign: 'center',
            textStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: this.titleColor
            }
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['40%', '60%'],
              hoverAnimation: false,
              silent: true,
              startAngle: 225,
              labelLine: {
                normal: {
                  show: false
                }
              },
              z: 15,
              data: [{
                value: 75,
                itemStyle: {
                  color: 'transparent'
                }
              }, {
                value: 25,
                itemStyle: {
                  color: 'transparent'
                },
                label: {
                  normal: {
                    show: true,
                    formatter: this.chartData.name,
                    position: 'inner',
                    textStyle: {
                      color: this.gradientStartColors,
                      fontSize: 16
                    }
                  }
                }
              }]
            }, { // 主圆环
                name: this.chartData.name,
                type: 'pie',
                radius: ['50%', '80%'],
                startAngle: 225,
                color: [{
                  type: 'linear',
                  x: 1,
                  y: 0,
                  x2: 0,
                  y2: 0,
                  colorStops: [{
                      offset: 0,
                      color: this.gradientStartColors // 0% 处的颜色
                  }, {
                      offset: 1,
                      color: this.gradientEndColors // 100% 处的颜色
                  }]
                }, 'transparent'],
                hoverAnimation: false,
                legendHoverLink: false,
                z: 10,
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [{
                  value: 75 * this.chartData.value / 100
                }, {
                  value: 100 - (75 * this.chartData.value / 100)
                }]
            }, { // 背景圆环
                name: '',
                type: 'pie',
                radius: ['45%', '85%'],
                hoverAnimation: false,
                silent: true,
                startAngle: 225,
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                z: 5,
                data: [{
                  value: 75,
                  itemStyle: {
                    color: this.bgColors,
                    borderWidth: 1,
                    borderColor: this.bgBorderColor
                  }
                }, {
                  value: 25,
                  itemStyle: {
                    color: 'transparent'
                  }
                }]
            }]
        }
        return pieOpts
      }
    }
  }
</script>

<style scoped></style>