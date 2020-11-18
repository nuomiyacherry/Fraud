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
  name: 'ProgressPieChart',
  components: { ECharts },
  mixins: [ globalChartMixin ],
  props: {
    chartData: {
      type: Object,
      default: function () {
        return {
          name: '国有企业',
          value: 40.5,
          total: 629,
          title: '被攻击企业数量'
        }
      }
    },
    titleColor: {
      type: String,
      default: chartColors.progressPie.title
    },
    radius: {
      type: Array,
      default: () => ['60%', '65%']
    },
    startColor: {
      type: String,
      default: chartColors.progressPie.start
    },
    endColor: {
      type: String,
      default: chartColors.progressPie.end
    },
    bgColor: {
      type: String,
      default: chartColors.progressPie.bg
    }
  },
  data () {
    return {
    }
  },
  watch: {
    chartData(newVal, oldVal) {
      this.refresh()
    },
    titleColor(newVal, oldVal) {
      this.refresh()
    },
    radius(newVal, oldVal) {
      this.refresh()
    },
    startColor(newVal, oldVal) {
      this.refresh()
    },
    endColor(newVal, oldVal) {
      this.refresh()
    },
    bgColor(newVal, oldVal) {
      this.refresh()
    }
  },
  computed: {},
  mounted() {},
  methods: {
    setOptions() {
      const that = this
      var pieOpts = {
        color: this.colors,
        title: {
          text: this.chartData.name,
          x: 'center',
          y: 'bottom',
          textStyle: {
            fontWeight: 'bold',
            color: this.titleColor,
            fontSize: 12
          }
        },
        series: [
          {
            name: this.chartData.name,
            type: 'pie',
            clockWise: false,
            radius: this.radius,
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [{
              value: this.chartData.value,
              label: {
                normal: {
                  rich: {
                    a: {
                      color: '#81c9f6',
                      align: 'center',
                      fontSize: 12,
                      fontWeight: "bold"
                    },
                    b: {
                      color: '#fff',
                      align: 'center',
                      fontSize: 10
                    }
                  },
                  formatter: function(params) {
                    return "{b|" + that.chartData.title + "}\n\n" + "{a|" + that.chartData.total + "个}" + "\n\n{b|占比" + params.value + "%}"
                  },
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '12',
                    fontWeight: 'normal',
                    color: '#fff'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: { // 完成的圆环的颜色
                    colorStops: [{
                      offset: 0,
                      color: this.startColor // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: this.endColor // 100% 处的颜色
                    }]
                  }
                }
              }
            }, {
              value: 100 - this.chartData.value,
              itemStyle: {
                normal: {
                  color: this.bgColor
                },
                emphasis: {
                  color: this.bgColor
                }
              }
          }]
        }
        ]
      }
      return pieOpts
    }
  }
}
</script>
<style lang='less' scoped>
</style>
