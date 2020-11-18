<template>
  <ECharts :options="options" :autoresize="true"></ECharts>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts'
  // import globalChartMixin from 'mixins/globalChartMixin'
  import storage from "utils/storage"
  import { getEnCountry, getCnCountry, getCoord } from 'constants/worldsForMap'
  // import visualMapMixin from 'mixins/visualMapMixin'
  const chartColors = storage.get('tColors')

  export default {
    name: 'mapLineChart',
    components: { ECharts },
    mixins: [
      // globalChartMixin
      // visualMapMixin
    ],
    props: {
      chartData: {
        type: Object,
        default: () => {
          return {
            seriesData: [
              { name: '北京', value: 1253 },
              { name: '广东', value: 965 },
              { name: '上海', value: 732 },
              { name: '湖北', value: 655 },
              { name: '湖南', value: 523 },
              { name: '西藏', value: 501 },
              { name: '天津', value: 425 },
              { name: '四川', value: 412 },
              { name: '浙江', value: 365 }
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
        default: chartColors.scattarMap.area
      },
      roam: {
        type: Boolean,
        default: false
      },
      mapItemHoverareaColor: {
        type: String,
        default: chartColors.scattarMap.hoverArea
      },
      mapItemborderColor: {
        type: String,
        default: chartColors.scattarMap.border
      },
      mapLabelColor: {
        type: String,
        default: chartColors.scattarMap.label
      },
      mapScatterColor: {
        type: String,
        default: chartColors.scattarMap.scatter
      },
      mapShadowColor: {
        type: String,
        default: chartColors.scattarMap.shadow
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
      layoutCenter: {
        type: Array,
        default: () => ['52%', '45%']
      },
      showTooltip: {
        type: Boolean,
        default: true
      },
      mapLabelShow: {
        type: Boolean,
        default: false
      },
      mapLabelEmphasisShow: {
        type: Boolean,
        default: true
      },
      shadowBlur: {
        type: Number,
        default: 15
      }
    },
    data() {
      return {
        chartName: '[地图模板]',
        mapJson: {},
        options: {}
        // maxValue: 0,
        // minValue: 0
      }
    },
    watch: {
      chartData() {
        console.log(`${this.chartName}chartData[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      mapItemAreaColor() {
        console.log(`${this.chartName}mapItemAreaColor[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      mapItemHoverareaColor() {
        console.log(`${this.chartName}mapItemHoverareaColor[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      mapItemborderColor() {
        console.log(`${this.chartName}mapItemborderColor[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      mapLabelColor() {
        console.log(`${this.chartName}mapLabelColor[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      mapType() {
        console.log(`${this.chartName}mapType[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      mapZoom() {
        console.log(`${this.chartName}mapZoom[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      layoutCenter(newVal, oldVal) {
        this.refresh()
      },
      showTooltip() {
        console.log(`${this.chartName}showTooltip[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      mapLabelShow() {
        console.log(`${this.chartName}mapLabelShow[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      mapLabelEmphasisShow() {
        console.log(`${this.chartName}mapLabelEmphasisShow[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      }
    },
    mounted() {
      this.refresh()
    },
    methods: {
      getMaxMinValue(data) {
        if (data && data.length && data.length > 0) {
          const maxArr = data.sort((a, b) => {
            return b.value - a.value
          })
          return {
            max: maxArr[0].value,
            min: maxArr[data.length - 1].value
          }
        }
      },
      refresh() {
      this.options = this.setOptions()
      if (this.refreshCallback) {
        this.refreshCallback()
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
      tooltipOpt(params) {
        this.tooltipFormatter = this.tooltipFormatter || ''
        let name = params.name
        if (this.mapType === 'world') {
          name = getCnCountry(params.name)
        }
        let html = ''
        if (this.tooltipFormatter === '') {
          html = `${name} ：${params.data ? params.data.value[2] : 0}`
        } else {
          if(this.tooltipFormatter === 'ministry') {
            html = `${name}：${params.data.value[2] === 0 ? '未对接' : params.data.value[2] === 1 ? '对接中' : '已对接'}`
          }else if(this.tooltipFormatter === 'enterprise') {
            html = `${name} <br/> 被攻击企业数量：${params.data.value[2] || 0} <br/> 被攻击成功企业数量：${params.data.success || 0}`
          }else{
            html = `${name} <br/>${this.tooltipFormatter}：${params.data ? params.data.value[2] : 0}`
          }
        }
        return html
      },
      convertMapData(data) {
        let geoCoordMap = {}
        let mapFeatures = this.mapJson.features
        // console.log('mapFeatures===', mapFeatures)
        if (mapFeatures && mapFeatures.length !== 0) {
          mapFeatures.forEach(v => {
            let name = v.properties.name // 地区名称
            // geoCoordMap[name] = v.properties.cp // 地区经纬度
            if (name !== '') {
              if (v.properties.cp) {
                geoCoordMap[name] = v.properties.cp // 地区经纬度
              } else {
                if (data && data.length !== 0) {
                  // console.log('data=========+++++++', data)
                  data.forEach((item, i) => {
                    if (name === item.name) {
                      geoCoordMap[name] = item.cp
                    }
                  })
                }
              }
            }
          })
        }
        const res = []
        if (data && data.length !== 0) {
          data.forEach(item => {
            // console.log('item===', item)
            let geoCoord = geoCoordMap[item.name]
            // console.log('geoCoord', geoCoord)
            if (geoCoord) {
              const obj = {}
              for (let key in item) {
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
        // console.log('res==', res)
        return res
      },
      setOptions() {
        let that = this
        // console.log('this.seriesData===', this.seriesData)
        // this.getMaxMinValue(this.chartData.seriesData)
        // this.getMaxMinValue(this.chartData.seriesData)
        // const size = this.maxValue - this.minValue

        this.initMapJson()
        let size1 = 8
        if(this.chartData.seriesData && this.chartData.seriesData.length !== 0) {
          size1 = (this.getMaxMinValue(this.chartData.seriesData).max - this.getMaxMinValue(this.chartData.seriesData).min) || 8
        }

        if (this.mapType === 'world') {
          // this.mapLabelShow = false
          if (this.chartData.seriesData && this.chartData.seriesData.length !== 0) {
            this.chartData.seriesData.forEach(item => {
              item.name = getEnCountry(item.name)
              item['cp'] = getCoord(item.name)
            })
          }
        }
        let mapOpts = {
          tooltip: {
            show: this.showTooltip,
            trigger: 'item',
            transitionDuration: 0,
            formatter: function(params) {
              console.log('params', params)
              // const data = params
              return that.tooltipOpt(params)
            }
          },
          geo: {
            show: true,
            map: this.mapType,
            roam: this.roam,
            zoom: this.mapZoom,
            hoverAnimation: true,
            layoutCenter: this.layoutCenter,
            layoutSize: '100%',
            label: {
              normal: {
                show: this.mapLabelShow,
                color: this.mapLabelColor//this.colors[5] //chartColors.whiteColor
              },
              emphasis: {
                show: this.mapLabelEmphasisShow, //true,
                color: this.mapLabelColor//this.colors[5]
              }
            },
            itemStyle: {
              normal: {
                areaColor: this.mapItemAreaColor, //this.colors[0], //chartColors.mapItemAreaColor,
                borderColor: this.mapItemborderColor, //this.colors[2], //chartColors.mapItemborderColor,
                borderWidth: 0,
                shadowColor: this.mapShadowColor,
                shadowBlur: this.shadowBlur//40
              },
              emphasis: {
                areaColor: this.mapItemHoverareaColor //this.colors[1] //chartColors.mapItemHoverareaColor
              }
            }
          },
          series: [
            // {
            //   name: this.tooltipFormatter,
            //   type: 'map',
            //   mapType: this.mapType,
            //   geoIndex: 0,
            //   coordinateSystem: 'geo',
            //   zlevel: 1,
            //   itemStyle: {
            //     normal: {
            //       areaColor: this.mapItemAreaColor, 
            //       borderColor: this.mapItemborderColor
            //     },
            //     emphasis: {
            //       areaColor: this.mapItemHoverareaColor
            //     }
            //   }
            // },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: this.convertMapData(this.chartData.seriesData),
              symbolSize(val) {
                const min = 5, max = 20
                let k = size1 / (max - min)
                let temp = parseFloat(val[2]) / k
                if (temp < min) {
                  temp = min
                } else if (temp > max) {
                  temp = max
                }
                return temp
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  color: this.mapLabelColor,
                  position: 'right', //显示位置
                  offset: [5, 0], //偏移设置
                  show: true,
                  formatter: function(params) {
                    return params.name
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: this.mapScatterColor
                }
              },
              zlevel: 1
            }
          ]
        }
        // console.log('mapOpts==', mapOpts)
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
