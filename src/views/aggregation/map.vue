<template>
  <div class="nested-map">
    <ECharts ref="mapBox" :options="options" :autoresize="true" @click="areaClick" @mouseover="areaOver" @mouseout="areaOut"></ECharts>
  </div>
</template>

<script>
import echarts from 'echarts'
import cloneDeep from 'lodash/cloneDeep'
// import { getMapJson } from 'api/common'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/component/tooltip'
import { setTimeout } from 'timers'

const provinces = [
  "北京市",
  "天津市",
  "河北省",
  "山西省",
  "内蒙古自治区",
  "黑龙江省",
  "吉林省",
  "辽宁省",
  "上海市",
  "山东省",
  "江苏省",
  "安徽省",
  "浙江省",
  "江西省",
  "福建省",
  "河南省",
  "湖北省",
  "湖南省",
  "海南省",
  "广西壮族自治区",
  "广东省",
  "重庆市",
  "四川省",
  "贵州省",
  "云南省",
  "西藏自治区",
  "陕西省",
  "甘肃省",
  "宁夏回族自治区",
  "青海省",
  "新疆维吾尔自治区",
  "台湾省",
  "香港特别行政区",
  "澳门特别行政区",
  "南海诸岛"
]

export default {
  name: 'Map',
  components: {
    ECharts
  },
  data() {
    return {
      options: {},
      deactiveAreaStyle: {
        areaColor: "rgba(24,101,158,0.05)",
        // borderColor: "#026891",
        // borderWidth: 1
        borderColor: "rgba(5,18,45,0.1)",
        borderWidth: 5
      },
      docked: [],
      timer: null,
      index: 0, //播放所在下标
      dockedIndex: 0 //去掉未对接数据所在下标
    }
  },
  props: {
    renderData: {
      type: Object,
      default: () => {
        return {
          name: 'china',
          type: 'china',
          data: [],
          docked: [],
          pieces: []
        }
      }
    }
  },
  watch: {
    renderData: {
      deep: true,
      handler(val) {
        this.setOptions()
        this.getIndex(0)
        this.areaOut()
      }
    }
  },
  mounted() {
    this.setOptions()
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    async setOptions() {
      const chartData = [].concat(this.renderData.data)
      let sumJson = {}
      let mZoom = 0
      if (this.renderData.type === 'china') {
        // type为china,显示中国地图，不显示世界地图
        // this.chinaJson = await getMapJson('china')
        this.chinaJson = require(`echarts/map/json/china.json`)
        sumJson = cloneDeep(this.chinaJson)
        echarts.registerMap('china', sumJson)
        mZoom = 1.2
        const mapOpt = {
          tooltip: {
            // trigger: 'item',
            padding: 0,
            enterable: true,
            transitionDuration: 1,
            textStyle: {
                color: '#000',
                decoration: 'none'
            },
            formatter: function(params) {
              // console.log(params, 'name')
              var tipHtml = ''
              if(params.data.value[2] !== 0) {
                tipHtml = `<div style="background:rgba(22,80,158,0.6);border:1px solid rgba(7,166,255,0.4); border-radius:8px; padding-bottom: 15px;">
                  <div style="width:100%;height:40px;line-height:40px;border-bottom:1px solid rgba(7,166,255,0.4);padding:0 20px;">
                    <i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;"></i>
                    <span style="margin-left:10px;color:#fff;font-size:16px;">` + params.name + `</span>
                  </div>
                  <div style="padding: 0 15px;height:26px;line-height:26px;">
                    <span style="color:#fff;font-size:16px;">建设阶段：</span><span style="color:#fff;font-size:16px;">` + params.data.construction + `</span>
                  </div>
                  <div style="padding: 0 15px;height:26px;line-height:26px;">
                    <span style="color:#fff;font-size:16px;">公安联动：</span><span style="color:#fff;font-size:16px;">` + params.data.linkage + `</span>
                  </div>
                </div>`
              } else {
                tipHtml = ''
              }
              return tipHtml
            }
          },
          visualMap: {
            show: true,
            left: 30,
            bottom: 30,
            orient: 'vertical',
            type: 'piecewise',
            pieces: this.renderData.pieces,
            inRange: {
              color: ['#744670', '#0067AC', '#33BCC9']
            },
            textStyle: {
              color: '#43bcf5',
              fontSize: '24'
            },
            calculable: true
          },
          series: [
            {
              name: '',
              type: 'map',
              mapType: this.renderData.type, // 自定义扩展图表类型
              center: this.renderData.center,
              zoom: mZoom,
              roam: true,
              label: {
                show: true,
                color: "#baf0ff",
                fontSize: 16
              },
              itemStyle: {
                areaColor: "rgba(4,90,107,0.7)",
                borderColor: "#092133"
              },
              data: this.convertMapData(chartData, sumJson)
            }
          ]
        }
        this.options = mapOpt
      } else {
        // const json = await getMapJson(this.renderData.name)
        this.chinaJson = require(`echarts/map/json/china.json`)
        const prov = this.provincesName(this.renderData.name)
        // console.log(prov, '=====name====')
        const json = require(`public/map/${prov}.json`)
        let provinceJson = cloneDeep(json)
        let sumJson = cloneDeep(this.chinaJson)
        provinceJson.features.forEach(item => {
          sumJson.features.push(item)
        })
        echarts.registerMap('china', sumJson)
        // echarts.registerMap('china', this.chinaJson)
        let sonJson = provinceJson
        mZoom = this.renderData.zoom || 4
        const mapOpt = {
          geo: {
            map: 'china',
            center: this.renderData.center,
            zoom: mZoom,
            silent: true,
            roam: true,
            itemStyle: this.deactiveAreaStyle,
            label: {
              show: false,
              color: "rgba(186,240,255,0.30)",
              fontSize: 16
            },
            regions: [this.getDeactiveRegionStyle(this.renderData.name)]
          }
        }
        sonJson.features.forEach(item => {
          mapOpt.geo.regions.push(this.getActiveRegionStyle(item.properties.name))
        })
        this.options = mapOpt
      }
    },
    convertMapData(data, mapJson) {
      let geoCoordMap = {}
      let mapFeatures = mapJson.features
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
    provincesName(name) {
      let sname = ''
      provinces.forEach(str => {
        if(str.substring(0, 2) == name.substring(0, 2)) {
          sname = str
        }
      })
      return sname
    },
    getDeactiveRegionStyle(name) {
      return {
        name,
        label: {
          show: false,
          color: "#baf0ff",
          fontSize: 14
        },
        itemStyle: {
          areaColor: "rgba(24,101,158,0.15)",
          // borderColor: "rgba(0,171,240,0)",
          borderColor: "rgba(5,18,45,0.1)",
          borderWidth: 5
        }
      }
    },
    getActiveRegionStyle(name) {
      return {
        name,
        label: {
          show: false,
          color: "#baf0ff",
          fontSize: 14
        },
        itemStyle: {
          areaColor: "rgba(24,101,158,0.15)",
          borderColor: "#092133",
          borderWidth: 1
          // borderColor: "#00abf0"
        }
      }
    },
    areaClick(params) {
      clearInterval(this.timer)
      this.$emit('mapClick', params)
    },
    areaOver(params) {
      clearInterval(this.timer)
      this.$refs.mapBox.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: params.dataIndex
      })
    },
    areaOut() {
      this.timer && clearInterval(this.timer)
      const _this = this
      this.timer = setInterval(function() {
          _this.$refs.mapBox.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: _this.index
          })
          _this.dockedIndex++
          if(_this.dockedIndex >= _this.renderData.docked.length) {
              _this.dockedIndex = 0
          }
          _this.getIndex(_this.dockedIndex)
      }, 2000)
    },
    getIndex(i) {
      this.renderData.data.forEach((item, index) => {
        if(this.renderData.docked[i].name === item.name) {
          this.index = index
        }
      })
    }
  }
}
</script>

<style lang="less">
.nested-map {
  width: 100%;
  height: 100% !important;
  position: relative;
  .mapBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
