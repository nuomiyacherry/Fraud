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
  import 'echarts/lib/component/polar'
  import 'echarts/lib/component/radiusAxis'
  import 'echarts/lib/component/angleAxis'
  import storage from "utils/storage"
  const chartColors = storage.get('tColors')
  export default {
    name: 'targetPieChart',
    components: { ECharts },
    mixins: [ globalChartMixin ],
    props: {
      chartData: {
        type: Object,
        default: () => {
          return {
            pieName: '直接访问',
            seriesData: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 548, name: '搜索引擎' }
            ]
          }
        }
      },
      colors: {
        type: Array,
        default: () => chartColors.pie.colors
      },
      center: {
        type: Array,
        default: () => ['50%', '50%']
      },
      radius: {
        type: Array,
        default: () => ['20%', '65%']
      },
      toolTipShowName: {
        type: Boolean,
        default: false
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
      center(newVal, oldVal) {
        this.refresh()
      },
      radius(newVal, oldVal) {
        this.refresh()
      }
    },
    methods: {
      getLegendData(data) {
        const legendData = []
        if (data && data.length !== 0) {
          data.forEach(item => {
            legendData.push(item.name)
          })
        }
        return legendData
      },
      setOptions() {
        const _this = this
        let seriesData = this.chartData.seriesData
        let legendData = this.getLegendData(seriesData)
        const start = parseInt(this.radius[0])
        const end = parseInt(this.radius[1])
        const step =  parseInt((end - start) / 10)
        const radius = []
        for(let i = 0; i < step + 2; i++) {
          let arr = []
          if(i === 0) {
            arr.push((start - 15) + '%')
            arr.push((start - 10) + '%')
          }
          if(i > 0 && i <= step) {
            arr.push((start + 10 * i) + '%')
            arr.push((start + 10 * i + 1) + '%')
          }
          if(i === step + 1) {
            arr.push((end + 5) + '%')
            arr.push((end + 10) + '%')
          }
          radius.push(arr)
        }

        const series = []
        radius.forEach((item, ind) => {
          series.push({
            type: 'pie',
            radius: item,
            center: this.center,
            hoverAnimation: false,
            tooltip: {
              show: false
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{
              name: '',
              value: 0,
              itemStyle: {
                normal: {
                  color: '#3a49c3'
                }
              }
            }]
          })
        })
        series.push( {
          name: this.chartData.pieName,
          stack: 'a',
          type: 'pie',
          radius: this.radius,
          center: this.center,
          roseType: 'area',
          zlevel: 10,
          label: {
            normal: {
              show: true,
              formatter: function(params) {
                if(_this.toolTipShowName) {
                  return params.name + '\n' + params.value + ' (' + params.percent + '%)'
                } else {
                  return params.percent + '%'
                }
              },
              // formatter: '{b}<br />{d}%',
              // formatter: '{d}%',
              textStyle: {
                fontSize: 12
              },
              position: 'outside'
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: true
            },
            emphasis: {
              show: true
            }
          },
          data: this.chartData.seriesData
        })
        let pieOpts = {
          color: this.colors,
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
//            formatter: '{a}<br/>{b} : {c} ({d}%)'
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            ...this.legendOpt(),
            show: this.legendShow,
            data: legendData,
            textStyle: {
              color: this.legendTextColor
            },
            pageTextStyle: {
              color: this.legendPageTextColor
            }
          },
          series: series
        }

        return pieOpts
      }
    }
  }
</script>

<style scoped>

</style>
