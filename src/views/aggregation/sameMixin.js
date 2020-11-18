import ChartBox from "components/chartBox"
import PictorialBar from 'components/echarts/pictorialBar/pictorialBar'
import LineChart from 'components/echarts/line/lineChart'
import VisualMapChart from 'components/echarts/map/visualMapChart'
import BarChart from 'components/echarts/bar/barChart'
// import Map3D from '@/utils/map3d'
// import mapJson from '@/assets/map/china.json'
import {randomInRange} from '@/mock/tool'//eslint-disable-line
// import {getMap3dData} from '@/mock/map'
// import {getData} from "./data"
import {
  // getAuthorityReportData,
  // getIndependentDiscoveryData,
  // getGroupReport,
  // get12321Report,
  // getPublicSecurityCoordination,
  // getFraudRank,
  getFraudAppRank,
  getFraudDomainRank,
  getFraudUrlRank,
  getFraudMessageRank,
  getProvinceSystemDocking,
  getFraudAppTop,
  getFraudDomainTop,
  getFraudUrlTop,
  getFraudMessageTop
} from 'api/aggregation'

// import {getAuthorityReportData, getIndependentDiscoveryData, getGroupReport, get12321Report, getPublicSecurityCoordination, getFraudAppRank, getFraudDomainRank, getFraudUrlRank, getFraudMessageRank} from 'api/aggregation'//eslint-disable-line


export default {
  name: 'Aggregation',
  props: {},
  components: {
    ChartBox,
    PictorialBar,
    LineChart,
    VisualMapChart,
    BarChart
  },
  data() {
    return {
      loading: false,
      flowData: [
        {
          label: '涉诈APP',
          type: 'app',
          value: '',
          icon: '',
          children: [
            {
              label: '各省上报',
              type: 'report',
              value: 7654
            },
            {
              label: '各省上报',
              type: 'found',
              value: 3485
            }
          ]
        },
        {
          label: '涉诈网址',
          type: 'url',
          value: '',
          icon: '',
          children: [
            {
              label: '各省上报',
              type: 'report',
              value: 14877831
            }
          ]
        },
        {
          label: '涉诈微信QQ',
          type: 'qq',
          value: '',
          icon: '',
          children: [
            {
              label: '各省上报',
              type: 'report',
              value: 0
            },
            {
              label: '运营商集团',
              type: 'operator',
              value: 9485
            },
            {
              label: '12321举报',
              type: '12321',
              value: 0
            }
          ]
        },
        {
          label: '涉诈域名',
          type: 'domain',
          value: '',
          icon: '',
          children: [
            {
              label: '各省上报',
              type: 'report',
              value: 954084
            },
            {
              label: '自主研判',
              type: 'judge',
              value: 39485
            }
          ]
        },
        {
          label: '涉诈短信',
          type: 'qq',
          value: '',
          icon: '',
          children: [
            {
              label: '各省上报',
              type: 'report',
              value: 175012
            },
            {
              label: '运营商集团',
              type: 'operator',
              value: 51090
            }
          ]
        }
      ],
      pictorialBarData1: {
        // seriesData: [180487, 133362, 127400, 25413, 5005].reverse(),
        // categoryData: ["河北", "云南", "四川", "广东", "陕西"].reverse()
      },
      pictorialBarData2: {
        // seriesData: [14135, 26587, 51090, 107015, 109780],
        // categoryData: ['四川', '山西', '运营商集团', '山东', '河北']
      },
      pictorialBarData3: {
        // seriesData: [103431, 1139780, 1825498, 4547851, 5320890],
        // categoryData: ['吉林', '湖北', '四川', '云南', '河北']
      },
      pictorialBarData4: {
        // seriesData: [252, 771, 1094, 3176, 5337],
        // categoryData: ['湖南', '广东', '云南', '湖北', '四川']
      },
      // pictorialBarData5: {
      //   seriesData: [2, 181, 364, 4642],
      //   categoryData: ['上海', '山东', '天津', '运营商集团']
      // },
      // buttonList1: [
      //   { label: '域名', type: 6 },
      //   { label: '网址', type: 0 },
      //   { label: '短信', type: 2 },
      //   { label: 'APP', type: 1 },
      //   { label: '微信QQ', type: 3 }
      // ],
      line1type: 6,
      line1data: {
        // legendData: ['管局上报'],
        // seriesData: [
        //   [302739, 119805, 298440, 1370727, 58353, 80701]
        // ],
        // categoryData: ['3月', '4月', '5月', '6月', '7月', '8月']
      },
      // buttonList2: [
      //   { label: '域名', type: 'domain' },
      //   { label: 'APP', type: 'app' },
      //   { label: '微信QQ', type: 'qq' }
      // ],
      line2type: 'domain',
      line2data: {
        // legendData: ['自主发现'],
        // seriesData: [
        //   [0, 0, 0, 0, 0, 0]
        // ],
        // categoryData: ['3月', '4月', '5月', '6月', '7月', '8月']
      },
      buttonList3: [{ label: '短信', type: 'message' }],
      line3type: 'message',
      line3data: {
        // legendData: ['基础企业集团上报'],
        // seriesData: [
        //   [0, 0, 0, 2314, 4132, 0]
        // ],
        // categoryData: ['3月', '4月', '5月', '6月', '7月', '8月']
      },
      buttonList4: [{ label: '微信QQ', type: 'qq' }],
      line4type: 'qq',
      line4data: {
        // legendData: ['12321上报'],
        // seriesData: [
        //   [0, 0, 0, 0, 0, 0]
        // ],
        // categoryData: ['3月', '4月', '5月', '6月', '7月', '8月']
      },
      // buttonList5: [
      //   {label: '域名', type: 'domain'},
      //   {label: '微信QQ', type: 'qq'}
      // ],
      // line5type: 'domain',
      // line5data: {
      // legendData: ['公安协同'],
      // seriesData: [
      //   [0, 0, 0, 0, 0, 0]
      // ],
      // categoryData: ['3月', '4月', '5月', '6月', '7月', '8月']
      // },
      mapData: {
        seriesData: []
      },
      pieces: [
        // { value: 0, label: '未建设(黑/蒙/宁/甘/新/藏/豫/皖/苏/渝/黔/闽/琼)', color: '#744670' },
        // { value: 1, label: '对接中(2省)', color: '#0067AC' },
        // { value: 2, label: '已对接(16省)', color: '#33BCC9' }
      ],
      fraudDomainTop: {},
      fraudUrlTop: {},
      fraudAppTop: {},
      fraudMessageTop: {}
    }
  },
  computed: {},
  created() {
    // this.getMapData()
    // this.flowList = this.flowData.forEach()
    // this.getAuthorityReportData()
    // this.getIndependentDiscoveryData()
    // this.getGroupReport()
    // this.get12321Report()
    // this.getPublicSecurityCoordination()
    this.getFraudAppRank()
    this.getFraudDomainRank()
    this.getFraudUrlRank()
    this.getFraudMessageRank()
    this.getProvinceSystemDocking()
    this.getFraudDomainTop()
    this.getFraudUrlTop()
    this.getFraudAppTop()
    this.getFraudMessageTop()
  },
  mounted() {},
  methods: {
    // changeLineData(params) {
    //   if(params.datakey !== 'line1data' || params.datakey !== 'line3data') {

    //   } else {
    //     this.getLineData(params)
    //   }
    // },
    // async getLineData(params) {
    //   this.loading = true
    //   await this.$sleep(1000)
    //   this[params.datakey].seriesData = [this.genLineData()]
    //   this.loading = false
    // },
    // async getMapData() {
    //   this.loading = true
    //   this.mapData.forEach(item => {
    //     if(item.value === 0) {
    //       item.color = '#744670'
    //     } else if (item.value === 1) {
    //       item.color = '#33BCC9'
    //     }else if(item.value === 2) {
    //       item.color = '#0067AC'
    //     }
    //   })
    //   this.mapInit(await getData(this.mapData))
    //   this.loading = false
    // },
    // async mapInit(data) {
    //   // await this.getMapData()
    //   let $map3d = this.$refs.map3d
    //   if (!$map3d) {
    //     await this.$sleep(30)
    //     $map3d = this.$refs.map3d
    //   }
    //   const { map, nameMap } = data
    //   // console.log(map)
    //   const mapOptions = {
    //     map,
    //     nameMap,
    //     stats: false,
    //     zoom: 34,
    //     blending: false,
    //     visibleSouthSea: true,
    //     textStyle: {
    //       normal: {
    //         show: true,
    //         fontSize: 18,
    //         color: '#eee'
    //       }
    //     },
    //     areaStyle: {
    //       normal: {
    //         // color: '#6BC5F2', //'#9bd3ef',
    //         opacity: 1
    //       }
    //     },
    //     // visualMap: {
    //     //   show: true,
    //     //   type: 'piecewise',
    //     //   triggerOn: 'map',
    //     //   text: ['', ''], // ['疑似受害者全国分布', '']
    //     //   bottom: 25,
    //     //   left: 25,
    //     //   color: ['#744670', '#0067AC', '#33BCC9'],
    //     //   splitNumber: 3
    //     // },
    //     tooltip: {
    //       formatter: param => {
    //         return `<div>${param.data.name}</div>`
    //       }
    //     }
    //   }
    //   this.map3d && this.map3d.destroy()

    //   this.loading = true
    //   this.map3d = new Map3D($map3d, mapJson, mapOptions)
    //   this.map3d.on('ready', _ => {
    //     this.loading = false
    //   })
    // },
    // genLineData() {
    //   return Array.from({length: 6}, item => 0)
    // },
    // getMapData() {
    //   this.pieces.forEach(piece => {
    //     const total = this.mapData.seriesData.filter(item => item.value === piece.value).length
    //     piece.label = piece.label + '(' + total + ')'
    //   })
    // },
    async getProvinceSystemDocking() {
      const res = await this.$simpleAsyncTo(
        getProvinceSystemDocking(),
        '获取涉诈APP累计上报排名失败'
      )
      if (res) {
        this.mapData = {
          seriesData: res.returnModel.seriesData
        }
        this.pieces = res.returnModel.pieces
        this.curMapData.data = res.returnModel.seriesData
        this.curMapData.docked = this.curMapData.data.filter(function(item) {
          if (item.value !== 0) return item
        })
        this.curMapData.pieces = res.returnModel.pieces
      }
    },
    // async getAuthorityReportData() {
    //   const params = {
    //     businesstype: this.line1type
    //   }
    //   const res = await this.$simpleAsyncTo(
    //     getAuthorityReportData(params),
    //     '获取管局上报数据失败'
    //   )
    //   // if(res && res.returnModel) {
    //   //   // console.log('res', res)
    //   //   this.line1data = {
    //   //     legendData: ['管局上报'],
    //   //     seriesData: res.returnModel.seriesData,
    //   //     categoryData: res.returnModel.categoryData
    //   //   }
    //   // }
    //   if (res) {
    //     // this.line1data = res.returnModel
    //     // 切换时也可以用请求的数据
    //     for (var key in res.returnModel) {
    //       if (this.line1type === Number(key)) {
    //         this.line1data = res.returnModel[key]
    //       }
    //     }
    //   }
    // },
    // changeLineData1(val) {
    //   this.getAuthorityReportData()
    // },
    // async getIndependentDiscoveryData() {
    //   const params = {
    //     type: this.line2type
    //   }
    //   const res = await this.$simpleAsyncTo(
    //     getIndependentDiscoveryData(),
    //     '获取自主发现数据失败'
    //   )
    //   if (res && res.returnModel) {
    //     if (this.line2type === 'domain') {
    //       this.line2data = {
    //         legendData: ['自主发现'],
    //         seriesData: [res.returnModel.domainDatas],
    //         categoryData: res.returnModel.categoryData
    //       }
    //     } else if (this.line2type === 'app') {
    //       this.line2data = {
    //         legendData: ['自主发现'],
    //         seriesData: [res.returnModel.appDatas],
    //         categoryData: res.returnModel.categoryData
    //       }
    //     } else if (this.line2type === 'qq') {
    //       this.line2data = {
    //         legendData: ['自主发现'],
    //         seriesData: [res.returnModel.qqDatas],
    //         categoryData: res.returnModel.categoryData
    //       }
    //     }
    //   }
    //   // const res = await this.$simpleAsyncTo(getIndependentDiscoveryData(params), '获取自主发现数据失败')
    //   // if(res) {
    //   //   // this.line2data = res.returnModel
    //   //   // 切换时也可以用请求的数据
    //   //   for(var key in res.returnModel) {
    //   //     if(this.line2type === key) {
    //   //       this.line2data = res.returnModel[key]
    //   //     }
    //   //   }
    //   // }
    // },
    // changeLineData2(val) {
    //   this.getIndependentDiscoveryData()
    // },
    // async getGroupReport() {
    //   // const params = {
    //   //   businesstype: 7
    //   // }
    //   const res = await this.$simpleAsyncTo(
    //     getGroupReport(),
    //     '获取基础企业上报数据失败'
    //   )
    //   if (res) {
    //     this.line3data = res.returnModel
    //   }
    //   // const res = await this.$simpleAsyncTo(getAuthorityReportData(params), '获取基础企业集团上报数据失败')
    //   // if(res && res.returnModel) {
    //   //   this.line3data = {
    //   //     legendData: ['基础企业集团上报'],
    //   //     seriesData: res.returnModel.seriesData,
    //   //     categoryData: res.returnModel.categoryData
    //   //   }
    //   // }
    // },
    // async get12321Report() {
    //   const res = await this.$simpleAsyncTo(
    //     get12321Report(),
    //     '获取12321上报数据失败'
    //   )
    //   if (res) {
    //     this.line4data = res.returnModel
    //   }
    // },
    // async getPublicSecurityCoordination() {
    //   const params = {
    //     type: this.line5type
    //   }
    //   const res = await this.$simpleAsyncTo(getPublicSecurityCoordination(params), '获取公安协同数据失败')
    //   if(res) {
    //     this.line5data = res.returnModel
    //   }
    // },
    // changeLineData5(val) {
    //   this.getPublicSecurityCoordination()
    // },
    async getFraudAppRank() {
      // const params = {
      //   businesstype: 1
      // }
      const res = await this.$simpleAsyncTo(
        getFraudAppRank(),
        '获取涉诈APP累计上报排名失败'
      )
      if (res) {
        this.pictorialBarData4 = res.returnModel
      }
      // const res = await this.$simpleAsyncTo(getFraudRank(params), '获取涉诈APP累计上报排名失败')
      // if(res && res.returnModel) {
      //   this.pictorialBarData4 = {
      //     seriesName: '上报量',
      //     seriesData: res.returnModel.seriesData.reverse(),
      //     categoryData: res.returnModel.categoryData.reverse()
      //   }
      // }
    },
    async getFraudDomainRank() {
      // const params = {
      //   businesstype: 6
      // }
      const res = await this.$simpleAsyncTo(
        getFraudDomainRank(),
        '获取涉诈域名累计上报排名失败'
      )
      if (res) {
        this.pictorialBarData1 = res.returnModel
      }
      // const res = await this.$simpleAsyncTo(getFraudRank(params), '获取涉诈域名累计上报排名失败')
      // if(res && res.returnModel) {
      //   this.pictorialBarData1 = {
      //     seriesName: '上报量',
      //     seriesData: res.returnModel.seriesData.reverse(),
      //     categoryData: res.returnModel.categoryData.reverse()
      //   }
      // }
    },
    async getFraudUrlRank() {
      // const params = {
      //   businesstype: 0
      // }
      const res = await this.$simpleAsyncTo(
        getFraudUrlRank(),
        '获取涉诈网址累计上报排名失败'
      )
      if (res) {
        this.pictorialBarData3 = res.returnModel
      }
      // const res = await this.$simpleAsyncTo(getFraudRank(params), '获取涉诈网址累计上报排名失败')
      // if(res && res.returnModel) {
      //   this.pictorialBarData3 = {
      //     seriesName: '上报量',
      //     seriesData: res.returnModel.seriesData.reverse(),
      //     categoryData: res.returnModel.categoryData.reverse()
      //   }
      // }
    },
    async getFraudMessageRank() {
      const res = await this.$simpleAsyncTo(
        getFraudMessageRank(),
        '获取涉诈短信累计上报排名失败'
      )
      if (res) {
        this.pictorialBarData2 = res.returnModel
      }
    },
    async getFraudDomainTop() {
      const res = await this.$simpleAsyncTo(
        getFraudDomainTop(),
        '获取涉诈域名每月TOP5失败'
      )
      if (res) {
        this.fraudDomainTop = res.returnModel
      }
    },
    async getFraudUrlTop() {
      const res = await this.$simpleAsyncTo(
        getFraudUrlTop(),
        '获取涉诈网址每月TOP5失败'
      )
      if (res) {
        this.fraudUrlTop = res.returnModel
      }
    },
    async getFraudAppTop() {
      const res = await this.$simpleAsyncTo(
        getFraudAppTop(),
        '获取涉诈APP每月TOP5失败'
      )
      if (res) {
        this.fraudAppTop = res.returnModel
      }
    },
    async getFraudMessageTop() {
      const res = await this.$simpleAsyncTo(
        getFraudMessageTop(),
        '获取涉诈域名每月TOP5失败'
      )
      if (res) {
        this.fraudMessageTop = res.returnModel
      }
    }
  }
}