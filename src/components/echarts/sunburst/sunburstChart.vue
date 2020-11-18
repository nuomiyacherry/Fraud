<template>
  <div class="full-block">
    <ECharts :options="options" auto-resize></ECharts>
  </div>
</template>

<script>
// import { tooltipOpt, legendOpt } from 'constants/chartConfig'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/sunburst'
import globalChartMixin from 'mixins/globalChartMixin'
import gridChartMixin from 'mixins/gridChartMixin'
import axisChartMixin from 'mixins/axisChartMixin'
import storage from "utils/storage"
const chartColors = storage.get('tColors')

export default {
  name: 'SunburstChart',
  components: {
    ECharts
  },
  mixins: [ globalChartMixin, axisChartMixin, gridChartMixin ],
  props: {
    chartData: {
      type: Object,
      default: function() {
        return {
          data: [
            {
              name: 'A', 
              children: [
                {value: 3, name: 'Aa'},
                {value: 5, name: 'Ab'},
                {value: 8, name: 'Ac'}
              ]
            }, 
            {
              name: 'B',
              value: 8,
              children: [
                {name: 'Ba', value: 4}, 
                {name: 'Bb', value: 2}
              ]
            }, 
            {
              name: 'C',
              value: 3,
              children: [
                {name: 'Ca', value: 2}
              ]
            }
          ]
        }
      }
    },
    colors: {
      type: Array,
      default: () => chartColors.sunburst.colors
    },
    highlightPolicy: {
      type: String,
      default: 'descendant'
    },
    sort: {
      type: String,
      default: 'desc'
    },
    // levels: {
    //   type: Array,
    //   default: () => [
    //     {},
    //     {
    //       itemStyle: {
    //         borderWidth: 2
    //       },
    //       label: {
    //         rotate: 'radial'
    //       }
    //     }, 
    //     {
    //       label: {
    //         align: 'center'
    //       }
    //     }]
    // },
    radius: {
      type: Array,
      default: () => ['0%', '80%']
    },
    center: {
      type: Array,
      default: () => ['50%', '50%']
    },
    nodeClick: {
      type: String,
      default: 'false' 
    },
    downPlayShow: {
      type: Boolean,
      default: false
    },
    emphasisShow: {
      type: Boolean,
      default: false
    },
    textColor: {
      type: String,
      default: chartColors.sunburst.text
    },
    rotate: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chartName: '[旭日图模板]'
    }
  },
  watch: {
    chartData(newVal, oldVal) {
      // console.log(`${this.chartName}chartData[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    colors(newVal, oldVal) {
      // console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    highlightPolicy(newVal, oldVal) {
      // console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    sort(newVal, oldVal) {
      // console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    // levels(newVal, oldVal) {
    //   console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
    //   this.refresh()
    // },
    radius(newVal, oldVal) {
      // console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    center(newVal, oldVal) {
      // console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    nodeClick(newVal, oldVal) {
      // console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    downplay(newVal, oldVal) {
      // console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    textColor(newVal, oldVal) {
      // console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    rotate(newVal, oldVal) {
      // console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    }
  },
  mounted() {
    this.createTplCode('SunburstChart')
  },
  methods: {
    setOptions() {
      let Data = this.chartData.data
      
      var sunburstOption = {
        color: this.colors,
        series: {
          type: 'sunburst',
          data: Data,
          highlightPolicy: this.highlightPolicy,
          radius: this.radius, 
          center: this.center, 
          sort: this.sort,
          // levels: this.levels,
          nodeClick: this.nodeClick,
          downplay: this.downPlayShow ? {itemStyle: { color: '#ccc' }} : {},
          emphasis: this.emphasisShow ? {itemStyle: { shadowBlur: 30 }} : {},
          label: {
            color: this.textColor,
            rotate: this.rotate
          }
        }
      }
      return sunburstOption
    }
  }
}
</script>
