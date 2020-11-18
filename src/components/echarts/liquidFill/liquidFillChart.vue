<template>
  <ECharts :options="options" :autoresize="true"></ECharts>
</template>

<script>
  import globalChartMixin from 'mixins/globalChartMixin'
  import ECharts from 'vue-echarts/components/ECharts'
  import 'echarts-liquidfill/src/liquidFill.js'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/legendScroll'
  import 'echarts/lib/component/title'
  import storage from "utils/storage"
  const chartColors = storage.get('tColors')
  export default {
    name: 'liquidFillChart',
    components: { ECharts },
    mixins: [ globalChartMixin ],
    props: {
      chartData: {
        type: Object,
        default: () => {
          return {
            value: 1,
            name: '完成率'
          }
        }
      },
      colors: {
        type: Array,
        default: () => chartColors.liquidFill.colors
      },
      titleColor: {
        type: String,
        default: chartColors.liquidFill.title
      },
      labelColor: {
        type: String,
        default: chartColors.liquidFill.label
      },
      labelFontSize: {
        type: Number,
        default: 20
      },
      titleFontSize: {
        type: Number,
        default: 14
      },
      bgColor: {
        type: String,
        default: chartColors.liquidFill.bg
      },
      borderColor: {
        type: String,
        default: chartColors.liquidFill.border
      },
      borderWidth: {
        type: Number,
        default: 2
      },
      radius: {
        type: String,
        default: '60%'
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
      chartData: {
        handler(newVal, oldVal) {
          this.refresh()
        },
        deep: true
      },
      colors(newVal, oldVal) {
        this.refresh()
      },
      titleColor(newVal, oldVal) {
        this.refresh()
      },
      labelColor(newVal, oldVal) {
        this.refresh()
      },
      labelFontSize(newVal, oldVal) {
        this.refresh()
      },
      bgColor(newVal, oldVal) {
        this.refresh()
      },
      borderColor(newVal, oldVal) {
        this.refresh()
      },
      borderWidth(newVal, oldVal) {
        this.refresh()
      },
      radius(newVal, oldVal) {
        this.refresh()
      }
    },
    methods: {
      setOptions() {
        var pieOpts = {
          title: {
            left: 'center',
            bottom: 0,
            text: this.chartData.name,
            textStyle: {
              fontSize: this.titleFontSize,
              color: this.titleColor
            }
          },
          series: [{
            type: 'liquidFill',
            radius: this.radius,
            data: [this.chartData.value, this.chartData.value, this.chartData.value],
            color: this.colors,
            outline: {
              borderDistance: this.borderWidth + 1,
              itemStyle: {
                color: 'none',
                borderWidth: this.borderWidth,
                borderColor: this.borderColor
              }
            },
            backgroundStyle: {
              color: this.bgColor
            },
            label: {
              normal: {
                formatter: function(params) {
                  return parseFloat((params.value * 100).toFixed(2)) + '%'
                },
                textStyle: {
                  fontSize: this.labelFontSize,
                  color: this.labelColor
                }
              }
            }
          }]
        }
        return pieOpts
      }
    }
  }
</script>

<style scoped></style>
