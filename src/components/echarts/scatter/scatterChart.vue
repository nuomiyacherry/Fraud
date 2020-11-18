<template>
  <div class="full-block">
    <ECharts :options="options" auto-resize @click="chartClick"></ECharts>
  </div>
</template>

<script>
  import globalChartMixin from 'mixins/globalChartMixin'
  import axisChartMixin from 'mixins/axisChartMixin'
  import ECharts from 'vue-echarts/components/ECharts'
  import storage from "utils/storage"
  const chartColors = storage.get('tColors')

  export default {
    name: 'scatterChart',
    components: { ECharts },
    mixins: [ globalChartMixin, axisChartMixin ],
    props: {
      chartData: {
        type: Object,
        default: () => {
          return {
            legendData: ['传播数量统计'],
            axisTypeTitle: {x: '访问量', y: '单位时间'},
            seriesData: [[
              [133119620, 31, 'www.58wg.co/'],
              [69355780, 25, 'm.yiqixiegushi.com/'],
              [54617180, 29, 'api-laxin.1sapp.com/'],
              [51598260, 32, '7xiav1.com2.z0.glb.qiniucdn.com/'],
              [43583280, 22, 'an.res.taozuiredian.com/'],
              [40691743, 12, 'yd8.jianzhousc.com/'],
              [40186091, 22, 'cdn.voole.com:3580/mp4'],
              [33400235, 15, '527575.com/kj.html'],
              [4386543, 21, 'css.c7k7.com/'],
              [4384227, 30, 'www.244500.com/'],
              [4377613, 26, 'www.bturl.cc/'],
              [4362099, 24, 'baicizhan.qiniucdn.com/'],
              [4337705, 18, 'img.sique.com/']
            ]]
          }
        }
      },
      colors: {
        type: Array,
        default: () => chartColors.scatter.colors
      }
    },
    data() {
      return {
        chartName: '[散点图模板]'
      }
    },
    watch: {
      chartData(newVal, oldVal) {
        console.log(`${this.chartName}chartData[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      colors() {
        console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      }
    },
    mounted() {
      this.createTplCode('ScatterChart')
    },
    methods: {
      returnScatterOptions(legendData, series, axisTypeTitle) {
        let chartOpts = {
          color: this.colors,
          tooltip: {
            formatter: function(params) {
              return `${params.value[2]}${params.seriesName}:<br/>${axisTypeTitle.x}：${
                params.value[0]
                }<br/>${axisTypeTitle.y}：${params.value[1]}`
            }
          },
          legend: {
            ...this.legendOpt(),
            show: this.legendShow,
            data: legendData,
            textStyle: {
              color: this.legendTextColor
            }
          },
          ...this.scatterAxisOpt(),
          series: series
        }

        return chartOpts
      },
      scatterAxisOpt() {
        let [ xAxisType, yAxisType, gridTop, gridBottom ] = [ 'value', 'value', '', 5 ]
        this.legendShow ? gridTop = 30 : gridTop = 10
        return {
          grid: {
            top: gridTop,
            left: 10,
            right: 20,
            bottom: gridBottom,
            containLabel: true
          },
          xAxis: {
            type: xAxisType,
            splitLine: {
              show: this.xSplitLineShow,
              lineStyle: {
                width: 1,
                type: 'dotted',
                color: this.axisSplitLineColor
              }
            },
            axisTick: {
              show: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: this.axisLineColor
              },
              symbol: ['none', 'arrow']
            },
            axisLabel: {
              show: true,
              color: this.axisLabelColor,
              rotate: this.rotate
            }
          },
          yAxis: {
            type: yAxisType,
            splitLine: {
              show: this.ySplitLineShow,
              lineStyle: {
                width: 1,
                type: 'dotted',
                color: this.axisSplitLineColor
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: this.axisLabelColor
              }
            },
            axisTick: {
              show: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: this.axisLineColor
              },
              symbol: ['none', 'arrow']
            }
          }
        }
      },
      setOptions() {
        let [ legendData, seriesData, axisTypeTitle ] = [ this.chartData.legendData, this.chartData.seriesData, this.chartData.axisTypeTitle ]
        const series = []
        // 构造数据
        if (legendData && legendData.length !== 0) {
          legendData.forEach((item, index) => {
            series.push({
              name: item,
              type: 'scatter',
              symbolSize: 30,
              data: seriesData[index]
            })
          })
        }
        let scatterOpt = this.returnScatterOptions(legendData, series, axisTypeTitle)
        return scatterOpt
      }
    }
  }
</script>

<style scoped lang='less'></style>
