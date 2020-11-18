<template>
  <ECharts :options="options" :autoresize="true"></ECharts>
</template>

<script>
  import ECharts from 'vue-echarts/components/ECharts'
  // import globalChartMixin from 'mixins/globalChartMixin'
  import storage from "utils/storage"
  import { getEnCountry, getCnCountry, getCoord,  mapName } from 'constants/worldsForMap'
//eslint-disable-line
  // import { getMaxValue, getMinValue } from 'constants/utils'
import { getNationalPng, getCountryImg } from "@/constants/country"
  const chartColors = storage.get('tColors')
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
      mapItemAreaColor: {
        type: String,
        default: chartColors.mapLine.area
      },
      effectScatterShow: {
        type: Boolean,
        default: false
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
      effectScatterStartItemColor: {
        type: String,
        default: chartColors.mapLine.effectScatterStart
      },
      effectScatterEndItemColor: {
        type: String,
        default: chartColors.mapLine.effectScatterEnd
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
      effectColor: {
        type: String,
        default: chartColors.mapLine.effectColor
      },
      effectSymbol: {
        type: String,
        default: 'arrow'
      },
      effectSymbolSize: {
        type: Number,
        default: 8
      },
      mapLineOpacity: {
        type: Number,
        default: 1
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
      },
      visualMapLeft: {
        type: [Number, String],
        default: 0
      },
      visualMapBottom: {
        type: [Number, String],
        default: 0
      },
      effectScatterSymbol: {
        type: String,
        default: 'diamond'
      }
    },
    data() {
      return {
        chartName: '[地图模板]',
        mapJson: {},
        maxValue: 0,
        minValue: 0,
        startSeriesData: [],
        endSeriesData: [],
        options: {}
      }
    },
    watch: {
      chartData: {
        handler(newVal, oldVal) {
          const obj = this.getSeriesData(newVal.moveLineData)
          this.startSeriesData = obj.start
          this.endSeriesData = obj.end
          this.refresh()
        },
        immediate: true,
        deep: true
      },
      mapItemAreaColor() {
        this.refresh()
      },
      mapItemHoverareaColor() {
        this.refresh()
      },
      mapItemborderColor() {
        this.refresh()
      },
      mapLineColor() {
        this.refresh()
      },
      effectScatterStartItemColor() {
        this.refresh()
      },
      effectScatterEndItemColor() {
        this.refresh()
      },
      mapLabelColor() {
        this.refresh()
      },
      mapType() {
        this.refresh()
      },
      roam() {
        this.refresh()
      },
      mapZoom() {
        this.refresh()
      },
      symbol() {
        this.refresh()
      },
      symbolSize() {
        this.refresh()
      },
      symbolOffset() {
        this.refresh()
      },
      effectSymbol() {
        this.refresh()
      },
      effectSymbolSize() {
        this.refresh()
      },
      effectColor() {
        this.refresh()
      },
      mapLineOpacity() {
        this.refresh()
      },
      geoSymbolShow() {
        this.refresh()
      },
      // geoSymbolSize() {
      //   console.log(`${this.chartName}geoSymbolSize[新值:${this.newVal};旧值:${this.oldVal}]`)
      //   this.refresh()
      // },
      layoutCenter() {
        this.refresh()
      },
      showTooltip() {
        this.refresh()
      },
      mapLabelShow() {
        this.refresh()
      },
      mapLabelEmphasisShow() {
        this.refresh()
      },
      visualMapLeft() {
        this.refresh()
      },
      visualMapBottom() {
        this.refresh()
      },
      effectScatterSymbol() {
        this.refresh()
      },
      effectScatterShow() {
        this.refresh()
      }
    },
    mounted() {
      // this.refresh()
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
          return {
            max: maxArr[0].value,
            min: maxArr[data.length - 1].value
          }
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
      convertMapData(data) {
        let geoCoordMap = {}
        let mapFeatures = this.mapJson.features
        if (mapFeatures && mapFeatures.length !== 0) {
          mapFeatures.forEach(v => {
            let name = v.properties.name // 地区名称
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
            if (item.name === '企业') {
              const obj = {}
              for (let key in item) {
                if (key === 'value') {
                  obj[key] = item['cp'].concat(item[key])
                } else {
                  obj[key] = item[key]
                }
              }
              res.push(obj)
            } else {
              let geoCoord = geoCoordMap[item.name]
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
            }
          })
        }
        return res
      },
      convertLineData(data) {
        let geoCoordMap = {}
        let mapFeatures = this.mapJson.features
        if (mapFeatures && mapFeatures.length !== 0) {
          mapFeatures.forEach(v => {
            let name = v.properties.name // 地区名称
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
            // console.log('dataItem:', dataItem[0].name, dataItem[1].name, dataItem)
            var fromCoord = dataItem[0].name === '企业' ? dataItem[0].cp : geoCoordMap[dataItem[0].name]
            var toCoord = dataItem[1].name === '企业' ? dataItem[1].cp : geoCoordMap[dataItem[1].name]
            if (fromCoord && toCoord) {
              res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord],
                value: dataItem[0].value
              })
            }
          })
        }
        return res
      },
      getSeriesData(moveLineData) {
        let startSeriesData = []
        let endSeriesData = []
        moveLineData && moveLineData.length && moveLineData.forEach(item => {
          startSeriesData.push(item[0])
          endSeriesData.push(item[1])
        })
        let startObj = {}, start = []
        let endObj = {}, end = []
        if (startSeriesData.length !== 0) {
          startSeriesData.forEach(item => {
            if(item.value) {
              if (startObj[item.name]) {
                startObj[item.name] += item.value
              } else {
                startObj[item.name] = item.value
              }
            } else {
              startObj[item.name] = 0
            }
          })
          for (let key in startObj) {
            start.push({name: key, value: startObj[key]})
          }
        }
        if(endSeriesData.length !== 0) {
          endSeriesData.forEach(item => {
             if(item.value) {
              if (endObj[item.name]) {
                endObj[item.name] += item.value
              } else {
                endObj[item.name] = item.value
              }
             } else {
               endObj[item.name] = 0
             }
          })
          for (let key in endObj) {
            end.push({name: key, value: endObj[key]})
          }
        }
        // console.log('endSeriesData start end:', endSeriesData, start, end)
        return  {
          start: start,
          end: end
        }
      },
      setOptions() {
        this.initMapJson()
        let that = this
        let obj =  this.getMaxMinValue(this.startSeriesData)
          // this.getMaxMinValue(this.startSeriesData)
        let size1 = 8
        // let size2 = 8
        if(obj && obj.max && obj.min) {
          size1 = this.getMaxMinValue(this.startSeriesData).max - this.getMaxMinValue(this.startSeriesData).min
          // size2 = this.getMaxMinValue(this.endSeriesData).max - this.getMaxMinValue(this.endSeriesData).min
        } else {
          obj = {
            max: 10000,
            min: 0
          }
        }
        // console.log(this.startSeriesData, '======this.startSeriesData================')

        if (this.mapType === 'world') {
          if (this.startSeriesData && this.startSeriesData.length !== 0) {
            this.startSeriesData.forEach(item => {
              item.name = getEnCountry(item.name)
              item['cp'] = getCoord(item.name)
            })
          }
          if (this.endSeriesData && this.endSeriesData.length !== 0) {
            this.endSeriesData.forEach(item => {
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
          // console.log(this.chartData.moveLineData)
        }
        // console.log(' this.convertMapData(this.endSeriesData):',  this.convertMapData(this.endSeriesData))
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
          visualMap: { //图例值控制
            min: 0,
            max: obj.max,
            left: this.visualMapLeft,
            bottom: this.visualMapBottom,
            seriesIndex: [0, 1, 3],
            calculable: true,
            show: true,
            color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#55ff2d'],
            textStyle: {
              color: '#fff'
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
            nameMap: mapName(),
            label: {
              normal: {
                show: this.mapLabelShow,
                color: this.mapLabelColor
              },
              emphasis: {
                show: this.mapLabelEmphasisShow, //true,
                color: this.mapLabelColor
              }
            },
            itemStyle: {
              normal: {
                areaColor: this.mapItemAreaColor,
                borderColor: this.mapItemborderColor,
                borderWidth: 1,
                shadowColor: 'rgba(128, 217, 248, 0.4)',
                shadowOffsetX: -2,
                shadowOffsetY: 2,
                shadowBlur: 2
              },
              emphasis: {
                areaColor: this.mapItemHoverareaColor,
                borderWidth: 0
              }
            }
          },
          series: [
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: this.convertMapData(this.startSeriesData.sort(function (a, b) {
                  return b.value - a.value
              }).slice(0, 5)),
              symbolSize(val) {
                if (that.geoSymbolShow) {
                  const min = 5, max = 20
                  let k = size1 / (max - min)
                  let temp = parseFloat(val[2]) / k
                  if (temp < min) {
                    temp = min
                  } else if (temp > max) {
                    temp = max
                  }
                  return temp
                } else {
                  return 0
                }
              },
              showEffectOn: 'render',
              rippleEffect: {
                  brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  position: 'right', //显示位置
                  offset: [5, 0], //偏移设置
                  show: true
                }
              },
              zlevel: 1
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              symbolSize(val) {
                if (that.geoSymbolShow) {
                  const min = 5, max = 20
                  let k = size1 / (max - min)
                  let temp = parseFloat(val[2]) / k
                  if (temp < min) {
                    temp = min
                  } else if (temp > max) {
                    temp = max
                  }
                  return temp
                } else {
                  return 0
                }
              },
              label: {
                normal: {
                  show: this.effectScatterShow,
                  position: 'right', //显示位置
                  offset: [5, 0], //偏移设置
                  formatter: function(params) {//圆环显示文字
                    return getCnCountry(params.data.name) + " " + params.data.value[params.data.value.length - 1]
                  },
                  fontSize: 13
                },
                emphasis: {
                  show: true
                }
              },
              symbolOffset: this.symbolOffset,
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              itemStyle: {
                normal: {
                  color: this.effectScatterStartItemColor
                }
              },
              zlevel: 2,
              data: this.convertMapData(this.startSeriesData)
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              symbol: this.effectScatterSymbol,
              symbolSize: 15,
              symbolOffset: this.symbolOffset,
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              itemStyle: {
                normal: {
                  color: this.effectScatterEndItemColor
                }
              },
              tooltip: {
                show: false
              },
              zlevel: 3,
              data: this.convertMapData(this.endSeriesData)
            },
            {
              name: '连接线',
              type: 'lines',
              zlevel: 4,
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
                period: 4,
                trailLength: 0.02,
                color: this.effectColor,
                symbol: this.effectSymbol, //'arrow',
                symbolSize: this.effectSymbolSize//8
              },
              lineStyle: {
                normal: {
                  color: this.mapLineColor, //this.colors[4],
                  width: 1,
                  opacity: this.mapLineOpacity,
                  curveness: 0.3
                }
              },
              data: this.convertLineData(this.chartData.moveLineData)
            }
          ]
        }
        // console.log('mapOpts==', mapOpts)
        const l = this.effectScatterSymbol.length
        if(this.effectScatterSymbol.substring(l - 3, l) === 'png') {
          mapOpts.series[2].type = 'scatter'
          mapOpts.series[2].symbol = 'image://' + this.effectScatterSymbol
          mapOpts.series[2].symbolSize = [55, 56]
        }
        mapOpts = this.countryLabelFormatter(mapOpts)
        setTimeout(() => {
          this.options = mapOpts
        }, 20)
        return mapOpts
      },
      countryLabelFormatter(mapOpts) {
      // const _this = this
      mapOpts.series[0].label.normal.formatter = function(params) {
        let name = getNationalPng(getCnCountry(params.data.name))
        return "{" + name + "| }" + "  " + "{value|" + getCnCountry(params.data.name) + params.data.value[2] + "}"
        // return  "{value|" + params.data.value[2] + getCnCountry(params.data.name) + "}" + "  "  + "{" + name + "| }"
      }
      mapOpts.series[0].label.normal.rich = {
        value: {
          lineHeight: 15
        },
        ...getCountryImg()
      }
      return mapOpts
    }
    }
  }
</script>

<style scoped>

</style>
