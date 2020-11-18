<template>
  <ECharts :options="options" :autoresize="true"></ECharts>
</template>

<script>
  import globalChartMixin from 'mixins/globalChartMixin'
  import ECharts from 'vue-echarts/components/ECharts'
  import 'echarts/lib/chart/treemap'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/title'
  import storage from "utils/storage"
  const chartColors = storage.get('tColors')
  export default {
    name: 'TreeMapChart',
    components: { ECharts },
    mixins: [ globalChartMixin ],
    props: {
      chartData: {
        type: Array,
        default: function () {
          return [
            {name: '皮革、毛皮、羽毛及其制品和制造业', value: 10},
            {name: '皮革、毛皮、羽毛及其制品和制造业', value: 20},
            {name: '皮革、毛皮、羽毛及其制品和制造业', value: 30},
            {name: '皮革、毛皮、羽毛及其制品和制造业', value: 40},
            {name: '皮革、毛皮、羽毛及其制品和制造业', value: 50},
            {name: '皮革、毛皮、羽毛及其制品和制造业', value: 60},
            {name: '皮革、毛皮、羽毛及其制品和制造业', value: 70},
            {name: '皮革、毛皮、羽毛及其制品和制造业', value: 80},
            {name: '皮革、毛皮、羽毛及其制品和制造业', value: 90},
            {name: '皮革、毛皮、羽毛及其制品和制造业', value: 100}
          ]
        }
      },
      colors: {
        type: Array,
        default: () => chartColors.treeMap.colors
      },
      roam: {
        type: Boolean,
        default: false
      },
      textStyleColor: {
        type: String,
        default: () => chartColors.treeMap.text
      },
      textStyleFontSize: {
        type: Number,
        default: 16
      },
      borderWidth: {
        type: Number,
        default: 6
      },
      labelShow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        chartName: '[饼图模板]',
        timeFlag: 0
      }
    },
    mounted() {
    },
    watch: {
      chartData(newVal, oldVal) {
        this.refresh()
      },
      colors(newVal, oldVal) {
        this.refresh()
      },
      roam(newVal, oldVal) {
        this.refresh()
      },
      textStyleColor(newVal, oldVal) {
        this.refresh()
      },
      textStyleFontSize(newVal, oldVal) {
        this.refresh()
      },
      borderWidth(newVal, oldVal) {
        this.refresh()
      },
      labelShow(newVal, oldVal) {
        this.refresh()
      }
    },
    methods: {
      setOptions() {
        let options = {
          color: this.colors,
          background: 'transparent',
          tooltip: {
            formatter: '{b}: {c}'
          },
          series: [{
            width: '100%',
            height: '100%',
            type: 'treemap',
            roam: this.roam, //是否开启拖拽漫游（移动和缩放）
            nodeClick: false, //点击节点后的行为,false无反应
            upperLabel: true,
            breadcrumb: {  //面包屑 关闭
              show: false
            },
            itemStyle: {
              normal: {
                show: this.labelShow,
                textStyle: {
                  color: this.textStyleColor,
                  fontSize: this.textStyleFontSize,
                },
                borderWidth: this.borderWidth,
                strokeColor: 'transparent',
                borderColor: 'transparent'
              },
              emphasis: {
                label: {
                  show: this.labelShow
                }
              }
            },
            data: this.chartData
          }]
        }
        return options
      }
    }
  }
</script>

<style scoped></style>
