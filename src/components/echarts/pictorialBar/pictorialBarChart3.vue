<template>
  <ECharts :options="options" :autoresize="true"></ECharts>
</template>
<script>
  import ECharts from "vue-echarts/components/ECharts"
  import "echarts/lib/chart/pictorialBar"
  import "echarts/lib/component/tooltip"
  import "echarts/lib/component/legend"
  import "echarts/lib/component/legendScroll"
  import "echarts/lib/component/title"
  import echarts from 'echarts'
  import globalChartMixin from "mixins/globalChartMixin"
  import storage from "utils/storage"
  export default {
    name: 'pictorialBarChart3',
    props: {
      chartData: {
        type: Object,
        default: () => {
          return {
            seriesData: [100, 80, 60],
            categoryData: ["僵尸程序", "木马程序", "蠕虫病毒"]
          }
        }
      }
    },
    components: { ECharts },
    mixins: [globalChartMixin],
    data() {
      return {}
    },
    computed: {},
    mounted() {},
    methods: {
      setOptions() {
        let options = {
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '21%',
            containLabel: true
          },
          yAxis: [{
            type: 'value',
            axisLabel: {
              interval: 0,
              color: '#d3e0fa'
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }],
          xAxis: [{
            type: 'category',
            axisTick: {
              show: false
            },
            data: this.chartData.categoryData,
            axisLabel: {
              interval: 0,
              color: '#d3e0fa'
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitArea: {
              show: false
            }
          }],
          series: [{
            type: 'pictorialBar',
            symbol: 'path://M35,0L35,70L0,70z M35,0L35,70L70,70z',
            data: this.chartData.seriesData,
            barWidth: '40%',
            symbolOffset: [0, -15],
            z: 99,
            label: {
              show: true,
              position: 'top',
              color: '#fff',
              fontSize: 14
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  offset: 0,
                  color: 'rgba(231,228,120,0.65)'
                }, {
                  offset: 0.5,
                  color: 'rgba(231,228,120,0.65)'
                }, {
                  offset: 0.5,
                  color: 'rgba(231,228,120,1)'
                }, {
                  offset: 1,
                  color: 'rgba(231,228,120,1)'
                }]),
                opacity: 1
              }
            }
          },
            {
              name: '年报上报率2',
              type: 'pictorialBar',
              symbol: 'diamond',
              barWidth: '40%',
              symbolSize: ['100%', 30],
              z: 99,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 1, 1, 1, [{
                    offset: 0,
                    color: 'rgba(231,228,120,0.8)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(231,228,120,0.8)'
                  }, {
                    offset: 0.5,
                    color: 'rgba(231,228,120,1)'
                  }, {
                    offset: 1,
                    color: 'rgba(231,228,120,1)'
                  }]),
                  opacity: 1
                }
              },
              data: this.chartData.seriesData
            }
          ]
        }
        return options
      }
    }
  }
</script>
