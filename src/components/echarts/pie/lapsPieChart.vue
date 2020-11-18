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
import storage from 'utils/storage'
const chartColors = storage.get('tColors')
export default {
  name: 'ProgressPieChart',
  components: { ECharts },
  mixins: [globalChartMixin],
  props: {
    chartData: {
      type: Object,
      default: function() {
        return {
          seriesData: [{ name: 'IP', value: 754 },
          { name: 'CND', value: 611 },
          { name: 'DNS', value: 400 },
          { name: 'Domain', value: 300 },
          { name: 'http', value: 500 }],
          pieName: '设备厂商分布'
        }
      }
    },
    colors: {
      type: Array,
      default: () => chartColors.lapsPie.colors
    },
    radius: {
      type: Array,
      default: () => ['60%', '65%']
    },
    bgColor: {
      type: String,
      default: chartColors.lapsPie.bg
    },
    center: {
      type: Array,
      default: () => ['50%', '50%']
    }
  },
  data() {
    return {}
  },
  watch: {
    chartData(newVal, oldVal) {
      this.refresh()
    },
    radius(newVal, oldVal) {
      this.refresh()
    },
    bgColor(newVal, oldVal) {
      this.refresh()
    },
    center(newVal, oldVal) {
      this.refresh()
    }
  },
  computed: {},
  mounted() {},
  methods: {
    getArrayValue(array, key) {
      key = key || 'value'
      var res = []
      if (array) {
        array.forEach(function(t) {
          res.push(t[key])
        })
      }
      return res
    },
    array2obj(array, key) {
      var resObj = {}
      for (var i = 0; i < array.length; i++) {
        resObj[array[i][key]] = array[i]
      }
      return resObj
    },
    getData(data, sumValue) {
      var res = {
        series: [],
        yAxis: []
      }
      for (let i = 0; i < data.length; i++) {
        // console.log(data.length)
        // console.log([90 - i * 18 + '%', 83 - i * 18 + '%'], '=====')
        res.series.push({
          name: this.chartData.pieName,
          type: 'pie',
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [90 - i * 19 + '%', 83 - i * 19 + '%'],
          center: this.center,
          label: {
            show: false
          },
          itemStyle: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },
          data: [
            {
              value: data[i].value,
              name: data[i].name
            },
            {
              value: sumValue - data[i].value,
              name: '',
              itemStyle: {
                color: 'transparent'
              },
              tooltip: {
                show: false
              },
              hoverAnimation: false
            }
          ]
        })
        res.series.push({
          name: '',
          type: 'pie',
          silent: true,
          z: 1,
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [90 - i * 19 + '%', 83 - i * 19 + '%'],
          center: this.center,
          label: {
            show: false
          },
          itemStyle: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },
          data: [
            {
              value: 7.5,
              itemStyle: {
                color: this.bgColor
              },
              tooltip: {
                show: false
              },
              hoverAnimation: false
            },
            {
              value: 2.5,
              name: '',
              itemStyle: {
                color: 'transparent'
              },
              tooltip: {
                show: false
              },
              hoverAnimation: false
            }
          ]
        })
        res.yAxis.push(((data[i].value / sumValue) * 100).toFixed(2) + '%')
      }
      return res
    },
    getLegendData(data) {
      const legendData = []
      if(data && data.length != 0) {
        data.forEach(item => {
          legendData.push(item.name)
        })
      }
      return legendData
    },
    setOptions() {
      let arrValue = this.getArrayValue(this.chartData.seriesData, 'value')
      let sumValue = arrValue.reduce(function(prev, curr, idx, arr) {
        return prev + curr
      })
      let optionData = this.getData(this.chartData.seriesData, sumValue)
      let legendData = this.getLegendData(this.chartData.seriesData)
      const _this = this
      console.log(optionData.yAxis, optionData.yAxis.length, '===optionData.yAxis')
      var pieOpts = {
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
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{a}<br>{b}:{c}({d}%)"
        },
        color: this.colors,
        grid: {
          top: '5%',
          bottom: '53%',
          left: '50%',
          containLabel: false
        },
        yAxis: [{
          type: 'category',
          inverse: true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            inside: true,
            textStyle: {
              color: function (value, index) {
                var num = _this.colors.length
                return _this.colors[index % num]
              },
              fontSize: 12,
              lineHeight: 18
            },
            formatter: function (value, index) {
              let str = ''
              _this.chartData.seriesData.forEach((item, i) => {
                if(i === index) {
                  str = value + '  ' + item.name
                }
              })
              return str
            },
            show: true
          },
          data: optionData.yAxis
        }],
        xAxis: [{
            show: false
        }],
        series: optionData.series
      }
      return pieOpts
    }
  }
}
</script>
<style lang='less' scoped>
</style>
