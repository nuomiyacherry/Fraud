<template>
  <div class="full-block">
    <ECharts :options="options" :autoresize="true" @click="handleClick"></ECharts>
  </div>
</template>
<script>
import ECharts from "vue-echarts/components/ECharts";
import storage from "utils/storage";
const chartColors = storage.get("tColors");
export default {
  name: "heapMap",
  components: { ECharts },
  props: {
    chartData: {
      type: Object,
      default: () => {
        return {
          seriesData: [],
          seriesName: "被攻击者行为活跃度",
          xData: [],
          yData: []
        };
      }
    },
    colors: {
      type: Array,
      default: () => chartColors.heatMap.colors
    },
    splitLineColor: {
      type: String,
      default: chartColors.axis.splitLine
    },
    axisLineColor: {
      type: String,
      default: chartColors.axis.line
    },
    axisLabelColor: {
      type: String,
      default: chartColors.axis.label
    },
    rotateX: {
      type: Number,
      default: 0
    },
    rotateY: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      options: {},
      minValue: 0,
      maxValue: 100,
      pieces: []
    };
  },
  watch: {
    chartData: {
      handler(val, oldValue) {
        this.heatMapMethod();
      },
      immediate: true
    }
  },
  created() {
    this.heatMapMethod();
  },
  methods: {
    handleClick(params) {
      this.$emit("click", params);
    },
    getMaxValue(data) {
      if (data && data.seriesData && data.seriesData.length > 0) {
        const maxArr = data.seriesData.sort((a, b) => {
          return b[2] - a[2];
        });
        this.maxValue = maxArr[0][2];
        this.pieces = this.getPieces(this.maxValue, this.minValue);
      }
    },
    getPieces(maxValue, minValue) {
      const pieceColors = this.colors;
      const range = (maxValue - minValue) / 5;
      let pieces = [];
      for (let i = 0; i <= 4; i++) {
        pieces.push({
          min: i * range,
          max: (i + 1) * range,
          color: pieceColors[i]
        });
      }
      return pieces;
    },
    heatMapMethod() {
      this.getMaxValue(this.chartData);
      const _this = this;
      let option = {
        tooltip: {
          show: true,
          trigger: "item",
          transitionDuration: 0,
          formatter: function(params) {
            let str = `${params.seriesName}<br/>${params.name}：${
              params.value[2]
            }(${_this.chartData.yData[params.value[1]]})`;
            return str;
          }
        },
        grid: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
          containLabel: true
        },
        visualMap: {
          // type: 'continuous',
          show: false,
          type: "piecewise",
          min: this.minValue,
          max: this.maxValue,
          pieces: this.pieces,
          // inRange:{
          //   color:['#37CDD6','#4796DF','#C165EB','#F99687','#D84874']
          // },
          calculable: true
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                // width: 1,
                color: this.axisLineColor
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: this.splitLineColor
              }
            },
            axisTick: {
              color: this.axisLineColor
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0,
              rotate: this.rotateX,
              color: this.axisLabelColor
            },
            data: this.chartData.xData
          }
        ],
        yAxis: [
          {
            type: "category",
            splitLine: {
              show: true,
              lineStyle: {
                color: this.splitLineColor
              }
            },
            axisLine: {
              lineStyle: {
                color: this.axisLineColor
              }
            },
            axisTick: {
              color: this.axisLineColor
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0,
              rotate: this.rotateY,
              color: this.axisLabelColor
            },
            nameTextStyle: {
              fontSize: 12
            },
            data: this.chartData.yData
          }
        ],
        series: [
          {
            name: this.chartData.seriesName,
            type: "heatmap",
            label: {
              normal: {
                show: true,
                color: "#fff"
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10
                // shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: this.chartData.seriesData
          }
        ]
      };
      // return option
      this.options = option;
    }
  }
};
</script>
