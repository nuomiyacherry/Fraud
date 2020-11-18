<template>
  <ECharts :options="options" :autoresize="true"></ECharts>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts'
  import 'echarts-wordcloud/src/wordCloud.js'
  import 'echarts/lib/component/tooltip'
  import storage from "utils/storage"
  const chartColors = storage.get('tColors')
  export default {
    name: 'wordCloudChart',
    components: { ECharts },
    props: {
      chartData: {
        type: Object,
        default: () => {
          return {
            seriesData: [
              { name: '诈骗', value: 1253 },
              { name: '团伙', value: 965 },
              { name: '冒充', value: 732 },
              { name: '骗局', value: 655 },
              { name: '集团', value: 523 },
              { name: '金额', value: 501 },
              { name: '公安局', value: 425 },
              { name: '嫌疑人', value: 412 },
              { name: '广告', value: 365 }
            ]
          }
        }
      }
    },
    data() {
      return {
        chartName: '[词云图模板]',
        options: {}
        // timeFlag: 0
      }
    },
    mounted() {
      this.refresh()
    },
    watch: {
      chartData: {
        handler(newVal, oldVal) {
          this.refresh()
        },
        deep: true
      }
    },
    methods: {
      refresh() {
        this.options = this.setOptions()
      },
      setOptions() {
        var pieOpts = {
          tooltip: {
            show: true,
            trigger: 'item'
          },
          series: [{
            type: 'wordCloud',
            shape: 'rect',   
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            right: 0,
            bottom: 0,
            sizeRange: [16, 60],
            rotationRange: [-90, 90],
            rotationStep: 45,
            gridSize: 20,
            drawOutOfBound: false,
            textStyle: {
              normal: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                // Color can be a callback function or a color string
                // color: function () {
                //     // Random color
                //   return 'rgb(' + [
                //       Math.round(Math.random() * 160),
                //       Math.round(Math.random() * 160),
                //       Math.round(Math.random() * 160)
                //   ].join(',') + ')'
                // }
                color: function(params) {
                  return chartColors.wordCloud[Math.floor(Math.random() * chartColors.wordCloud.length)]
                }
              },
              emphasis: {
                  shadowBlur: 10,
                  shadowColor: '#333'
              }
            },
            data: this.chartData.seriesData || []
          }]
        }
        return pieOpts
      }
    }
  }
</script>

<style scoped></style>
