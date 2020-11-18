<template>
  <ECharts :options="options" :autoresize="true"></ECharts>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts'
  import globalChartMixin from 'mixins/globalChartMixin'
  import storage from "utils/storage"
  const chartColors = storage.get('tColors')

  export default {
    name: 'mapChart',
    components: { ECharts },
    mixins: [ globalChartMixin ],
    props: {
      chartData: {
        type: Object,
        default: () => {
          return {
            seriesData: [
              {name: '北京', value: 177},
              {name: '天津', value: 42},
              {name: '河北', value: 102},
              {name: '山西', value: 81},
              {name: '内蒙古', value: 47},
              {name: '辽宁', value: 67},
              {name: '吉林', value: 82},
              {name: '黑龙江', value: 66},
              {name: '上海', value: 24},
              {name: '江苏', value: 92},
              {name: '浙江', value: 114},
              {name: '安徽', value: 109},
              {name: '福建', value: 116},
              {name: '江西', value: 91},
              {name: '山东', value: 119},
              {name: '河南', value: 137},
              {name: '湖北', value: 116},
              {name: '湖南', value: 114},
              {name: '重庆', value: 91},
              {name: '四川', value: 125},
              {name: '贵州', value: 62},
              {name: '云南', value: 83},
              {name: '西藏', value: 9},
              {name: '陕西', value: 80},
              {name: '甘肃', value: 56},
              {name: '青海', value: 10},
              {name: '宁夏', value: 18},
              {name: '新疆', value: 67},
              {name: '广东', value: 123},
              {name: '广西', value: 59},
              {name: '海南', value: 14}
            ]
          }
        }
      },
      // colors: {
      //   type: Array,
      //   default: () => chartColors.mapColors
      // },
      mapItemAreaColor: {
        type: String,
        default: chartColors.map.area
      },
      mapItemHoverareaColor: {
        type: String,
        default: chartColors.map.hoveArea
      },
      mapItemborderColor: {
        type: String,
        default: chartColors.map.border
      },
      effectScatterColor: {
        type: String,
        default: chartColors.map.effectScatter
      },
      mapLabelColor: {
        type: String,
        default: chartColors.map.label
      },
      dataTitle: {
        type: Array,
        default: () => ['告警事件']
      },
      tooltipFormatter: {
        type: String,
        default: '告警事件'
      },
      mapType: {
        type: String,
        default: 'china'
      },
      mapZoom: {
        type: Number,
        default: 1.1
      },
      symbolSize: {
        type: Number,
        default: 50
      },
      symbolOffset: {
        type: Array,
        default: () => ['0%', '0%']
      },
      layoutCenter: {
        type: Array,
        default: () => ['52%', '45%']
      },
      showTooltip: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        chartName: '[地图模板]',
        mapJson: {},
        maxValue: 0,
        minValue: 0
      }
    },
    watch: {
      chartData(newVal, oldVal) {
        // console.log(`${this.chartName}chartData[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      // colors() {
      //   console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
      //   this.refresh()
      // },
      mapItemAreaColor() {
        // console.log(`${this.chartName}mapItemAreaColor[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      mapItemHoverareaColor() {
        // console.log(`${this.chartName}mapItemHoverareaColor[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      mapItemborderColor() {
        // console.log(`${this.chartName}mapItemborderColor[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      mapLabelColor() {
        // console.log(`${this.chartName}mapLabelColor[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      // mapItemborderColor() {
      //   // console.log(`${this.chartName}mapLabelColor[新值:${this.newVal};旧值:${this.oldVal}]`)
      //   this.refresh()
      // },
      mapType() {
        // console.log(`${this.chartName}mapType[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      mapZoom() {
        // console.log(`${this.chartName}mapZoom[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      symbolSize() {
        // console.log(`${this.chartName}symbolSize[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      symbolOffset() {
        // console.log(`${this.chartName}symbolOffset[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      layoutCenter() {
        // console.log(`${this.chartName}layoutCenter[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      showTooltip() {
        // console.log(`${this.chartName}showTooltip[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      }
    },
    methods: {
      getMaxMinValue(data) {
        if (data && data.length && data.length > 0) {
          const maxArr = data.sort((a, b) => {
            return b.value - a.value
          })
          this.maxValue = maxArr[0].value
          this.minValue = maxArr[data.length - 1].value
        }
      },
      initMapJson() {
        if (this.mapType === 'china') {
          this.mapJson = require(`echarts/map/json/${this.mapType}.json`)
          ECharts.registerMap(this.mapType, this.mapJson)
        } else if (this.mapType === 'world') {
          this.mapJson = require(`echarts/map/json/${this.mapType}.json`)
          ECharts.registerMap(this.mapType, this.mapJson)
        } else {
          this.mapJson = require(`echarts/map/json/province/${
            this.mapType
            }.json`)
          ECharts.registerMap(this.mapType, this.mapJson)
        }
      },
      tooltipOpt(data) {
        if (this.tooltipFormatter === '') {
          let str = ''
          if (this.dataTitle && this.dataTitle.length !== 0) {
            this.dataTitle.forEach(item => {
              for (var key in data) {
                if (key !== 'value' && key !== 'name' && item.strName === key) {
                  str += item.name + '：' + data[key] + '<br/>'
                }
              }
            })
          }
          let html = `
        ${data.name} <br/>
        ${str}
      `
          return html
        } else {
          let html = `
        ${data.name} <br/>
        ${this.tooltipFormatter}：${data.value[2]}
      `
          return html
        }
      },
      convertMapData(data) {
        let geoCoordMap = {}
        let mapFeatures = this.mapJson.features
        if (mapFeatures && mapFeatures.length !== 0) {
          mapFeatures.forEach(v => {
            let name = v.properties.name // 地区名称
            geoCoordMap[name] = v.properties.cp // 地区经纬度
          })
        }
        const res = []
        if (data && data.length !== 0) {
          data.forEach(item => {
            let geoCoord = geoCoordMap[item.name]
            if (geoCoord) {
              const obj = {}
              for (var key in item) {
                if (key === 'value') {
                  obj[key] = geoCoord.concat(item[key])
                } else {
                  obj[key] = item[key]
                }
              }
              res.push(obj)
            }
          })
        }
        return res
      },
      setOptions() {
        let that = this
        this.getMaxMinValue(this.chartData.seriesData)
        const size = this.maxValue - this.minValue

        this.initMapJson()

        let mapOpts = {
          tooltip: {
            show: this.showTooltip,
            trigger: 'item',
            transitionDuration: 0,
            formatter: function(params) {
              const data = params.data
              return that.tooltipOpt(data)
            }
          },
          geo: {
            show: true,
            map: this.mapType,
            roam: true,
            zoom: this.mapZoom,
            hoverAnimation: true,
            layoutCenter: this.layoutCenter,
            layoutSize: '100%',
            label: {
              normal: {
                show: true,
                color: this.mapLabelColor
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: this.mapItemAreaColor, //chartColors.mapItemAreaColor,
                borderColor: this.mapItemborderColor, //chartColors.mapItemborderColor,
                borderWidth: 1
              },
              emphasis: {
                areaColor: this.mapItemHoverareaColor //chartColors.mapItemHoverareaColor
              }
            }
          },
          series: [
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              symbolSize(val) {
                // 范围 3-35
                const min = 3, max = 35
                let k = size / (max - min)
                let temp = parseFloat(val[2]) / k
                if (temp < min) {
                  temp = min
                } else if (temp > max) {
                  temp = max
                }
                return temp
                // return (val[2] / size) * 20 + 5
              },
              symbolOffset: this.symbolOffset,
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              itemStyle: {
                normal: {
                  color: this.effectScatterColor
                }
              },
              data: this.convertMapData(this.chartData.seriesData)
            }
          ]
        }

        setTimeout(() => {
          this.options = mapOpts
        }, 20)

        return mapOpts
      }
    }
  }
</script>

<style scoped>

</style>
