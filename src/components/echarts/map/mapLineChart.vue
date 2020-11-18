<template>
  <ECharts :options="options" :autoresize="true"></ECharts>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts'
  // import globalChartMixin from 'mixins/globalChartMixin'
  import storage from "utils/storage"
  const chartColors = storage.get('tColors')
  import { getEnCountry, getCnCountry, getCoord } from 'constants/worldsForMap'//eslint-disable-line
  // import { getMaxValue, getMinValue } from 'constants/utils'

  export default {
    name: 'mapLineChart',
    components: { ECharts },
    // mixins: [ globalChartMixin ],
    props: {
      chartData: {
        type: Object,
        default: () => {
          return {
            moveLineData: [
              [{ name: '湖北' }, { name: '北京', value: 95 }],
              [{ name: '湖北' }, { name: '广东', value: 90 }],
              [{ name: '湖北' }, { name: '上海', value: 80 }],
              [{ name: '湖北' }, { name: '西藏', value: 70 }]
              // [{ name: '中国' }, { name: '美国', value: 95 }],
              // [{ name: '中国' }, { name: '英国', value: 90 }],
              // [{ name: '中国' }, { name: '意大利', value: 80 }],
              // [{ name: '中国' }, { name: '澳大利亚', value: 70 }]
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
        default: chartColors.mapLine.area
      },
      mapItemHoverareaColor: {
        type: String,
        default: chartColors.mapLine.hoverArea
      },
      mapItemborderColor: {
        type: String,
        default: chartColors.mapLine.border
      },
      mapLineColor: {
        type: String,
        default: chartColors.mapLine.line
      },
      effectScatterItemColor: {
        type: String,
        default: chartColors.mapLine.effectScatter
      },
      mapLabelColor: {
        type: String,
        default: chartColors.mapLine.label
      },
      // dataTitle: {
      //   type: Array,
      //   default: () => ['告警事件']
      // },
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
      roam: {
        type: Boolean,
        default: true
      },
      symbol: {
        type: Array,
        default: () => ['none', 'arrow']
      },
      symbolSize: {
        type: Number,
        default: 10
      },
      symbolOffset: {
        type: Array,
        default: () => ['0%', '0%']
      },
      effectSymbol: {
        type: String,
        default: 'arrow'
      },
      effectSymbolSize: {
        type: Number,
        default: 8
      },
      geoSymbolShow: {
        type: Boolean,
        default: true
      },
      // geoSymbolSize: {
      //   type: Number,
      //   default: 0
      // },
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
      }
    },
    data() {
      return {
        chartName: '[地图模板]',
        mapJson: {},
        maxValue: 0,
        minValue: 0,
        seriesData: [],
        options: {}
      }
    },
    watch: {
      chartData: {
        handler(newVal, oldVal) {
          console.log(`${this.chartName}chartData[新值:${this.newVal};旧值:${this.oldVal}]`)
          this.seriesData = this.getSeriesData(newVal.moveLineData)
          this.refresh()
        },
        immediate: true,
        deep: true
      },
      // colors() {
      //   console.log(`${this.chartName}colors[新值:${this.newVal};旧值:${this.oldVal}]`)
      //   this.refresh()
      // },
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
      mapLineColor() {
        console.log(`${this.chartName}mapLineColor[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      effectScatterItemColor() {
        console.log(`${this.chartName}effectScatterItemColor[新值:${this.newVal};旧值:${this.oldVal}]`)
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
      roam() {
        console.log(`${this.chartName}roam[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      mapZoom() {
        console.log(`${this.chartName}mapZoom[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      symbol() {
        console.log(`${this.chartName}symbol[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      symbolSize() {
        console.log(`${this.chartName}symbolSize[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      symbolOffset() {
        console.log(`${this.chartName}symbolOffset[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      effectSymbol() {
        console.log(`${this.chartName}effectSymbol[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      effectSymbolSize() {
        console.log(`${this.chartName}effectSymbolSize[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      geoSymbolShow() {
        console.log(`${this.chartName}geoSymbolShow[新值:${this.newVal};旧值:${this.oldVal}]`)
        this.refresh()
      },
      // geoSymbolSize() {
      //   console.log(`${this.chartName}geoSymbolSize[新值:${this.newVal};旧值:${this.oldVal}]`)
      //   this.refresh()
      // },
      layoutCenter() {
        console.log(`${this.chartName}layoutCenter[新值:${this.newVal};旧值:${this.oldVal}]`)
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
      refresh() {
        this.options = this.setOptions()
        if (this.refreshCallback) {
          this.refreshCallback()
        }
      },
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
        this.tooltipFormatter = this.tooltipFormatter || ''
        let name = data.name
        if (this.mapType === 'world') {
          name = getCnCountry(data.name)
        }
        let html = ''
        if (this.tooltipFormatter === '') {
          html = `${name} ：${data.value[2]}`
        } else {
          html = `${name} <br/>${this.tooltipFormatter}：${data.value[2]}`
        }
        return html
      },
      // tooltipOpt(data) {
      //   if (this.tooltipFormatter === '') {
      //     let str = ''
      //     if (this.dataTitle && this.dataTitle.length !== 0) {
      //       this.dataTitle.forEach(item => {
      //         for (var key in data) {
      //           if (key !== 'value' && key !== 'name' && item.strName === key) {
      //             str += item.name + '：' + data[key] + '<br/>'
      //           }
      //         }
      //       })
      //     }
      //     let html = `
      //   ${data.name} <br/>
      //   ${str}
      // `
      //     return html
      //   } else {
      //     let html = `
      //   ${data.name} <br/>
      //   ${this.tooltipFormatter}：${data.value[2]}
      // `
      //     return html
      //   }
      // },
      // convertMapData(data) {
      //   let geoCoordMap = {}
      //   let mapFeatures = this.mapJson.features
      //   if (mapFeatures && mapFeatures.length !== 0) {
      //     mapFeatures.forEach(v => {
      //       let name = v.properties.name // 地区名称
      //       geoCoordMap[name] = v.properties.cp // 地区经纬度
      //     })
      //   }
      //   const res = []
      //   if (data && data.length !== 0) {
      //     data.forEach(item => {
      //       let geoCoord = geoCoordMap[item.name]
      //       if (geoCoord) {
      //         const obj = {}
      //         for (var key in item) {
      //           if (key === 'value') {
      //             obj[key] = geoCoord.concat(item[key])
      //           } else {
      //             obj[key] = item[key]
      //           }
      //         }
      //         res.push(obj)
      //       }
      //     })
      //   }
      //   return res
      // },
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
        return res
      },
      convertLineData(data) {
        let geoCoordMap = {}
        let mapFeatures = this.mapJson.features
        // console.log('mapFeatures', mapFeatures)
        if (mapFeatures && mapFeatures.length !== 0) {
          mapFeatures.forEach(v => {
            let name = v.properties.name // 地区名称
            // geoCoordMap[name] = v.properties.cp // 地区经纬度
            if (name !== '') {
              if (v.properties.cp) {
                geoCoordMap[name] = v.properties.cp // 地区经纬度
              } else {
                if (data && data.length !== 0) {
                  data.forEach(items => {
                    items.forEach(item => {
                      if (name === item.name) {
                        geoCoordMap[name] = item.cp
                      }
                    })
                  })
                }
              }
            }
          })
        }
        const res = []
        if (data && data.length !== 0) {
          data.forEach((item, index) => {
            var dataItem = data[index]
            var fromCoord = geoCoordMap[dataItem[0].name]
            var toCoord = geoCoordMap[dataItem[1].name]
            if (fromCoord && toCoord) {
              res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord],
                value: dataItem[1].value
              })
            }
          })
        }
        return res
      },
      getSeriesData(moveLineData) {
        let seriesData = []
        moveLineData && moveLineData.length && moveLineData.forEach(item => {
          // seriesData.push(item[1])
          seriesData.push({name: item[0].name, value: item[1].value})
        })
        if (seriesData.length === 0) {
          return seriesData
        } else {
          //将重复的地区合计
          let obj = {}, arr = []
          seriesData.forEach(item => {
            if (obj[item.name]) {
              obj[item.name] += item.value
            } else {
              obj[item.name] = item.value
            }
          })
          for (let key in obj) {
            arr.push({name: key, value: obj[key]})
          }
          // console.log('arr====', arr)
          return arr
        }
      },
      setOptions() {
        let that = this
        // console.log('this.seriesData===', this.seriesData)
        // this.getMaxMinValue(this.chartData.seriesData)
        this.getMaxMinValue(this.seriesData)
        const size = this.maxValue - this.minValue

        this.initMapJson()

        if (this.mapType === 'world') {
          // this.mapLabelShow = false
          if (this.seriesData && this.seriesData.length !== 0) {
            this.seriesData.forEach(item => {
              item.name = getEnCountry(item.name)
              item['cp'] = getCoord(item.name)
            })
          }
          if (this.chartData.moveLineData && this.chartData.moveLineData.length !== 0) {
            this.chartData.moveLineData.forEach(items => {
              items.forEach(item => {
                item.name = getEnCountry(item.name)
                item['cp'] = getCoord(item.name)
              })
            })
          }
          // console.log(seriesData, '==seriesData===')
          // console.log(moveLineData, '===moveLineData==')
        } 
        // else {
        //   this.mapLabelShow = this.labelShow
        // }
        // console.log('moveLineData====', this.chartData.moveLineData)
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
            roam: this.roam, //true,
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
                borderWidth: 1
              },
              emphasis: {
                areaColor: this.mapItemHoverareaColor //this.colors[1] //chartColors.mapItemHoverareaColor
              }
            }
          },
          series: [
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              symbolSize(val) {
                if (that.geoSymbolShow) {
                  // if (that.geoSymbolSize) {
                  //   return that.geoSymbolSize
                  // } else {
                    // 范围 3-35
                  const min = 3, max = 20
                  let k = size / (max - min)
                  let temp = parseFloat(val[2]) / k
                  if (temp < min) {
                    temp = min
                  } else if (temp > max) {
                    temp = max
                  }
                  return temp
                    // return (val[2] / size) * 20 + 5
                  // }
                } else {
                  return 0
                }
              },
              symbolOffset: this.symbolOffset,
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              itemStyle: {
                normal: {
                  color: this.effectScatterItemColor//this.colors[3]
                }
              },
              data: this.convertMapData(this.seriesData)
            },
            {
              name: '连接线',
              type: 'lines',
              zlevel: 2,
              symbol: this.symbol, //['none', 'arrow'],
              symbolSize: this.symbolSize, //10,
              tooltip: {
                show: true,
                formatter: function(params) {
                  if (that.mapType === 'world') {
                    return (
                      getCnCountry(params.data.fromName) +
                      ' > ' +
                      getCnCountry(params.data.toName) +
                      ' : ' +
                      params.data.value
                    )
                  } else {
                    return (
                      params.data.fromName +
                      ' > ' +
                      params.data.toName +
                      ' : ' +
                      params.data.value
                    )
                  }
                }
              },
              effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: this.effectSymbol, //'arrow',
                symbolSize: this.effectSymbolSize//8
              },
              lineStyle: {
                normal: {
                  color: this.mapLineColor, //this.colors[4],
                  width: 2,
                  opacity: 1,
                  curveness: 0.2
                }
              },
              data: this.convertLineData(this.chartData.moveLineData)
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
