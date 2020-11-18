<template>
  <div class="barChart" style="height:100%">
    <ECharts class="chart" :options="lineOption" auto-resize style="height: 100%" @click="handleClick"></ECharts>
  </div>
</template>
<script>
import storage from "utils/storage"
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/timeline'
// import chartColors from 'constants/chartColors'
const chartColors = storage.get('tColors')
import { mapGetters } from 'vuex'
export default {
  name: 'timeLineChart',
  components: {
    ECharts
  },
  props: {
    lineData: {
      type: Object,
      default: function() {
        return {
          seriesData:[[123,156,165,98],[156,123,561,86],[256,323,41,36]],
          xAxisData:['12345', '456123', '456123', '15656'],
          timelineData:['192.168.1.1','192.162.2.2','193.163.3.3'],
          seriesName: '攻击活跃度'
        }
      }
    },
    titleText:{
      type: String,
      default: ''
    },
    legendShow:{
      type: Boolean,
      default: false
    },
    legendData:{
      type: Array,
      default: ()=>[]
    },
    timelineLabelRotate:{
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      lineOption: {},
      colors:{}
    }
  },
  computed: {
    // ...mapGetters('framework', ['currentThemes'])
  },
  created () {
    this.lineOption= this.lineOpt(this.lineData)
  },
  // watch: {
  //   barData(value, oldValue){
  //     this.barOption= this.barOpt(this.barData)
  //   }
  // },
  watch:{
    // currentThemes:{
    //   handler(value, oldValue){
    //     this.colors = chartColors[value]
    //     this.lineOption= this.lineOpt(this.lineData)
    //   },
    //   immediate:true
    // },
    lineData:{
      handler(value, oldValue){
        this.lineOption= this.lineOpt(value)
      },
      immediate:true
    },
    titleText:{
      handler(value, oldValue){
        this.lineOption= this.lineOpt(this.lineData)
      },
      immediate:true
    }
  },
  mounted(){
      console.log(chartColors,"this.colors==================")
  },
  methods: {
    lineOpt (lineData) {
      const options = []
      if (lineData && lineData.seriesData && lineData.seriesData.length > 0) {
        lineData.seriesData.forEach((item, index) => {
          options.push({
            series:[
              {
                name: lineData.seriesName,
                data: item
              }
            ]
          })
        })
      }
      return {
        baseOption:{
          color: chartColors.colors[4],
          tooltip : {
            trigger: 'axis',
            // formatter:function(params){
            //   console.log('params',params)
            // },
          },
          title:{
            show:true,
            text:this.titleText,
            left:'center',
            textStyle:{
              color:chartColors.whiteColor
            }
          },
          legend: {
            show: this.legendShow,
            data: this.legendData,
            top: this.titleText?30:0,
            textStyle: {
              color: chartColors.whiteColor
            }
          },
          timeline:{
            axisType:'category',
            left:0,
            right:0,
            bottom:60,
            data:lineData.timelineData,
            label:{
              color:chartColors.whiteColor,
              rotate:this.timelineLabelRotate,
              interval:0,
              position:10,
              align:'right'
              // verticalAlign: 'top',
            },
            autoPlay : true,
            playInterval : 2000,
            controlStyle:{
              itemSize:18
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                width: 1,
                color: chartColors.whiteColor
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              color: chartColors.whiteColor
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              color: chartColors.whiteColor
            },
            data: lineData.xAxisData//['1','2','3','4','5','6','7']
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: true,

              lineStyle: {
                color: this.colors.axisLine
              }
            },
            axisLine: {
              lineStyle: {
                color: chartColors.whiteColor
              }
            },
            axisTick: {
              color: chartColors.whiteColor
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              color: chartColors.whiteColor
            },
          },
          grid: {
            top: this.titleText?80:20,
            bottom: 110,
            left: '3%',
            right: '4%',
            containLabel: true
          },
          series : [
            {
              type: 'line',
              smooth:true,
            }
          ],
        },
        options,
      }
    },
    handleClick(params){
      this.$emit('click',params)
    }
  }
}
</script>
