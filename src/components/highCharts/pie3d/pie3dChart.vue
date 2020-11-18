<template>
    <div class="pie3d-chart full-block">
        <div :id="id" :option="option" class="full-block"></div>
    </div>
</template>
<script>
import HighCharts from 'highcharts'
import HighCharts3d from 'highcharts/highcharts-3d'
import Exporting from 'highcharts/modules/exporting'
import storage from "utils/storage"
const chartColors = storage.get("tColors")
HighCharts3d(HighCharts)
Exporting(HighCharts)
export default {
  name: 'Pie3dChart',
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {
          pieName:  '货物金额',
          seriesData: [
            ['香蕉', 8],
            ['猕猴桃', 3],
            ['桃子', 1],
            ['橘子', 6],
            ['苹果', 8],
            ['梨', 4],
            ['柑橘', 4],
            ['橙子', 1],
            ['葡萄 (串)', 1]
          ]
        }
      }
    },
    colors: {
      type: Array,
      default: () => chartColors.pie3d.colors
    },
    id: {
      type: String,
      default: 'test'
    },
    showInLegend: {
      type: Boolean,
      default: true
    },
    legendAlign: {
      type: String,
      default: 'left'
    },
    legendLayout: {
      type: String,
      default: 'vertical'
    },
    legendVerticalAlign: {
      type: String,
      default: 'bottom'
    },
    legendItemColor: {
      type: String,
      default: chartColors.pie3d.lengend.item
    },
    legenditemHoverColor: {
      type: String,
      default: chartColors.pie3d.lengend.itemHover
    }
  },
  data() {
    return {
      option: {}
    }
  },
  watch: {
    chartData(newVal, oldVal) {
      this.refresh()
    },
    colors(newVal, oldVal) {
      this.refresh()
    },
    id(newVal, oldVal) {
      this.refresh()
    },
    legendAlign(newVal, oldVal) {
      this.refresh()
    },
    legendLayout(newVal, oldVal) {
      this.refresh()
    },
    legendVerticalAlign(newVal, oldVal) {
      this.refresh()
    },
    showInLegend(newVal, oldVal) {
      this.refresh()
    },
    legendItemColor(newVal, oldVal) {
      this.refresh()
    },
    legenditemHoverColor(newVal, oldVal) {
      this.refresh()
    }
  },
  mounted() {
    this.setOptions()
  },
  methods: {
    refresh() {
      this.setOptions()
    },
    setOptions() {
      this.option = {
        chart: {
          type: 'pie',
          backgroundColor: 'transparent',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: ''
        },
        colors: this.colors,
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        credits: {
          enabled: false
        },
        exporting:{
          enabled: false
        },
        legend: {
          align: this.legendAlign,
          layout: this.legendLayout,
          verticalAlign: this.legendVerticalAlign,
          itemStyle: {
            color: this.legendItemColor
          },
          itemHoverStyle: {
            color: this.legenditemHoverColor
          }
        },
        series: [{
          name: this.chartData.pieName,
          type: 'pie',
          innerSize: '70%',
          depth: 30,
          dataLabels: {
            enabled: false
          },
          showInLegend: this.showInLegend,
          data: this.chartData.seriesData
        }]
      }
      HighCharts.chart(this.id, this.option)
    }
  }
}
</script>
