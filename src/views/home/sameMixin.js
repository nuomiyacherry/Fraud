import ChartBox from 'components/chartBox'
import TotalBox from "components/totalBox"
// import TotalBox1 from "components/totalBox1"
import PieChart from 'components/echarts/pie/pieChart'
import LineChart from 'components/echarts/line/lineChart'
import BarChart from 'components/echarts/bar/barChart'
// import BarLineChart from 'components/echarts/barLine/barLineChart'
import PictorialBar from 'components/echarts/pictorialBar/pictorialBar'
import LiquidFillChart from 'components/echarts/liquidFill/liquidFillChart'
import VisualMapChart from 'components/echarts/map/visualMapChart'
import { insertSeparator } from 'utils/util'
// import {getData} from "./data"
// import Map3D from '@/utils/map3d'
// import mapJson from '@/assets/map/china.json'
import {
  getOverview,
  getDisposedType,
  // getReportTrend,
  getFraudAppType,
  // getAppMarketRank,
  // getDomainTrend,
  getFraudWebsiteType,
  getWebsiteCountryRank,
  getLiquidFillData,
  getMapData,
  getVisitedTrend,
  // getCountryFraud,
  // getProvinceFraud,
  getWechatDiscoverTrend,
  getWebsiteDiscoverTrend,
  getAppDiscoverTrend
  // getWechatDisposeTrend,
  // getWebsiteDisposeTrend,
  // getAppDisposeTrend
} from 'api/home'

export default {
  name: 'Home',
  props: {},
  components: {
    ChartBox,
    TotalBox,
    // TotalBox1,
    PieChart,
    LineChart,
    BarChart,
    // BarLineChart,
    PictorialBar,
    LiquidFillChart,
    VisualMapChart
  },
  data() {
    return {
      loading: false,
      totalList: [],
      // [
      //   {
      //     icon: "iconweixin",
      //     label: "涉诈微信QQ号总量",
      //     value: "2,445",
      //     unit: ""
      //   },
      //   {
      //     icon: "iconshouji",
      //     label: "涉诈APP总量",
      //     value: "8,061",
      //     unit: ""
      //   },
      //   {
      //     icon: "iconyuming-mianxing",
      //     label: "涉诈域名总量",
      //     value: "990,324",
      //     unit: ""
      //   },
      //   {
      //     icon: "iconlianjie",
      //     label: "涉诈URL总量",
      //     value: "16,112,106",
      //     unit: ""
      //   },
      //   {
      //     icon: "iconduanxin",
      //     label: "涉诈短信总量",
      //     value: "175,012",
      //     unit: ""
      //   }
      // ],
      mapData: {},
      // mapData: [
      // { name: '吉林', value: 3918914 },
      // { name: '河南', value: 2116730 },
      // { name: '福建', value: 1441649 },
      // { name: '山东', value: 1306185 },
      // { name: '黑龙江', value: 583138 },
      // { name: '云南', value: 437471 },
      // { name: '浙江', value: 296430 },
      // { name: '海南', value: 229186 },
      // { name: '天津', value: 176792 },
      // { name: '湖南', value: 147714 },
      // { name: '四川', value: 125580 },
      // { name: '陕西', value: 96279 },
      // { name: '江苏', value: 87925 },
      // { name: '青海', value: 78136 },
      // { name: '湖北', value: 53428 },
      // { name: '广东', value: 39801 },
      // { name: '上海', value: 37707 },
      // { name: '甘肃', value: 32997 },
      // { name: '重庆', value: 25595 },
      // { name: '辽宁', value: 14971 },
      // { name: '安徽', value: 14331 },
      // { name: '江西', value: 8269 },
      // { name: '山西', value: 7929 },
      // { name: '贵州', value: 7426 },
      // { name: '新疆', value: 6017 },
      // { name: '北京', value: 2519 },
      // { name: '河北', value: 2282 },
      // { name: '广西', value: 1671 },
      // { name: '西藏', value: 1260 },
      // { name: '宁夏', value: 1190 },
      // { name: '内蒙古', value: 500 }
      // ],
      disposedType: {},
      // reportTrend: {},
      fraudAppType: {},
      // appMarketRank: {},
      // domainTrend: {},
      liquidFillData: {
        // name: '境外接入率',
        // value: 0.6996
      },
      fraudWebsiteType: {
        // seriesData: [
        //   {name: "虚假信息诈骗", value: 5878},
        //   {name: "刷单诈骗", value: 4210},
        //   {name: "恶意木马诈骗", value: 3062},
        //   {name: "代孕求子诈骗", value: 1061},
        //   {name: "风险购物诈骗", value: 411},
        //   {name: "保健品销售诈骗", value: 151},
        //   {name: "高日化金融产品诈骗", value: 109},
        //   {name: "植发医疗诈骗", value: 85},
        //   {name: "高杠杆投资诈骗", value: 84},
        //   {name: "高收益理财诈骗", value: 53}
        // ]
      },
      websiteCountryRank: {
        // seriesName: '涉诈网站境外接入国家排名',
        // seriesData: [8439, 14498, 15951, 297648, 502618],
        // categoryData: ['韩国', '南非', '菲律宾', '中国', '美国']
      },
      pieces: [
        {
          min: 1000000000,
          label: '>10亿次'
        },
        {
          min: 500000000,
          max: 999999999,
          label: '5亿次 - 10亿次'
        },
        {
          min: 100000000,
          max: 499999999,
          label: '1亿次 - 5亿次'
        },
        {
          min: 10000000,
          max: 99999999,
          label: '1千万次 - 1亿次'
        },
        {
          min: 0,
          max: 9999999,
          label: '<1千万次'
        }
      ],
      visitedTrend: {},
      // countryFraud: {},
      // provinceFraud: {},
      wechatDiscoverTrend: {},
      websiteDiscoverTrend: {},
      appDiscoverTrend: {}
      // wechatDisposeTrend: {},
      // websiteDisposeTrend: {},
      // appDisposeTrend: {}
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getMapData()
    this.getOverview()
    this.getDisposedType()
    // this.getReportTrend()
    this.getFraudAppType()
    // this.getAppMarketRank()
    // this.getDomainTrend()
    this.getFraudWebsiteType()
    this.getWechatDiscoverTrend()
    this.getWebsiteDiscoverTrend()
    this.getAppDiscoverTrend()
    // this.getWechatDisposeTrend()
    // this.getWebsiteDisposeTrend()
    // this.getAppDisposeTrend()
    this.getWebsiteCountryRank()
    this.getLiquidFillData()
    this.getVisitedTrend()
    // this.getCountryFraud()
    // this.getProvinceFraud()
  },
  beforeDestroy() {
    this.loading = false
    this.map3d && this.map3d.destroy()
  },
  methods: {
    async getMapData() {
      this.loading = true
      const res = await this.$simpleAsyncTo(
        getMapData(),
        '获取疑似受害者全国分布失败'
      )
      if (res) {
        console.log(res, 'dt====')
        this.mapData = res.returnModel
        // const data = await getData(this.mapData)
        // this.mapInit(data)
      }
      this.loading = false
    },
    // async mapInit(data) {
    //   const $map3d = this.$refs.map3d
    //   if (!$map3d) await this.$sleep(30)
    //   console.log(data, 'data')
    //   const { map, nameMap, scatterData, flylinesData } = data //eslint-disable-line
    //   const mapOptions = {
    //     map,
    //     nameMap,
    //     font: '',
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
    //         color: '#6BC5F2',
    //         opacity: 1
    //       }
    //     },
    //     visualMap: {
    //       show: true,
    //       triggerOn: 'map',
    //       type: 'piecewise',
    //       text: ['', ''],
    //       bottom: 0,
    //       left: 10,
    //       pieces: [
    //         {
    //           min: 1000000
    //         },
    //         {
    //           min: 50000,
    //           max: 999999
    //         },
    //         {
    //           min: 10000,
    //           max: 99999
    //         },
    //         {
    //           min: 1000,
    //           max: 9999
    //         },
    //         {
    //           min: 0,
    //           max: 999
    //         }
    //       ],
    //       color: ['#cd0b11', '#ba2472', '#8f1fbd', '#5533b9', '#176cdd']
    //     },
    //     tooltip: {
    //       formatter: param => {
    //         return `<div>${param.data.name}</div>
    //                 <div>被攻击次数：${param.data.value || 0}</div>`
    //       }
    //     }
    //   }
    //   console.time('destroy')
    //   this.map3d && this.map3d.destroy()

    //   console.timeEnd('destroy')
    //   this.loading = true
    //   console.log('this.map3d', this.map3d)
    //   this.map3d = new Map3D($map3d, mapJson, mapOptions)
    //   this.map3d.on('ready', _ => {
    //     this.loading = false
    //   })
    // },
    async getOverview() {
      const res = await this.$simpleAsyncTo(getOverview(), '获取态势总览失败')
      if (res) {
        this.totalList = res.returnModel
        this.totalList.forEach(item => {
          item.value = insertSeparator(item.value)
        })
      }
    },
    async getDisposedType() {
      const res = await this.$simpleAsyncTo(
        getDisposedType(),
        '获取涉诈微信/QQ类型分布失败'
      )
      if (res) {
        this.disposedType = res.returnModel
      }
    },
    // async getReportTrend() {
    //   const res = await this.$simpleAsyncTo(
    //     getReportTrend(),
    //     '获取涉诈微信QQ号举报量趋势失败'
    //   )
    //   if (res) {
    //     this.reportTrend = res.returnModel
    //   }
    // },
    async getFraudAppType() {
      const res = await this.$simpleAsyncTo(
        getFraudAppType(),
        '获取涉诈APP类型分布失败'
      )
      if (res) {
        this.fraudAppType = res.returnModel
      }
    },
    // async getAppMarketRank() {
    //   const res = await this.$simpleAsyncTo(
    //     getAppMarketRank(),
    //     '获取应用商店涉诈APP总量排名失败'
    //   )
    //   if (res) {
    //     this.appMarketRank = res.returnModel
    //   }
    // },
    // async getDomainTrend() {
    //   const res = await this.$simpleAsyncTo(
    //     getDomainTrend(),
    //     '获取涉诈域名总量趋势失败'
    //   )
    //   if (res) {
    //     this.domainTrend = res.returnModel
    //   }
    // },
    async getFraudWebsiteType() {
      const res = await this.$simpleAsyncTo(
        getFraudWebsiteType(),
        '获取涉诈网站类型分布失败'
      )
      if (res) {
        this.fraudWebsiteType = res.returnModel
      }
    },
    async getWechatDiscoverTrend() {
      const res = await this.$simpleAsyncTo(
        getWechatDiscoverTrend(),
        '获取涉诈微信QQ发现数量月趋势失败'
      )
      if (res) {
        this.wechatDiscoverTrend = res.returnModel
      }
    },
    async getWebsiteDiscoverTrend() {
      const res = await this.$simpleAsyncTo(
        getWebsiteDiscoverTrend(),
        '获取涉诈网站发现数量月趋势失败'
      )
      if (res) {
        this.websiteDiscoverTrend = res.returnModel
      }
    },
    async getAppDiscoverTrend() {
      const res = await this.$simpleAsyncTo(
        getAppDiscoverTrend(),
        '获取涉诈APP发现数量月趋势失败'
      )
      if (res) {
        this.appDiscoverTrend = res.returnModel
      }
    },
    // async getWechatDisposeTrend() {
    //   const res = await this.$simpleAsyncTo(
    //     getWechatDisposeTrend(),
    //     '获取涉诈微信QQ处置量月趋势失败'
    //   )
    //   if (res) {
    //     this.wechatDisposeTrend = res.returnModel
    //   }
    // },
    // async getWebsiteDisposeTrend() {
    //   const res = await this.$simpleAsyncTo(
    //     getWebsiteDisposeTrend(),
    //     '获取涉诈网站处置量月趋势失败'
    //   )
    //   if (res) {
    //     this.websiteDisposeTrend = res.returnModel
    //   }
    // },
    // async getAppDisposeTrend() {
    //   const res = await this.$simpleAsyncTo(
    //     getAppDisposeTrend(),
    //     '获取涉诈APP处置量月趋势失败'
    //   )
    //   if (res) {
    //     this.appDisposeTrend = res.returnModel
    //   }
    // },
    async getWebsiteCountryRank() {
      const res = await this.$simpleAsyncTo(
        getWebsiteCountryRank(),
        '获取涉诈网站境外接入国家排名失败'
      )
      if (res) {
        this.websiteCountryRank = res.returnModel
      }
    },
    async getLiquidFillData() {
      const res = await this.$simpleAsyncTo(
        getLiquidFillData(),
        '获取涉诈网站境内外接入特征失败'
      )
      if (res) {
        this.liquidFillData = res.returnModel
      }
    },
    async getVisitedTrend() {
      const res = await this.$simpleAsyncTo(
        getVisitedTrend(),
        '获取疑似受害者访问趋势失败'
      )
      if (res) {
        this.visitedTrend = res.returnModel
      }
    }
    // async getCountryFraud() {
    //   const res = await this.$simpleAsyncTo(
    //     getCountryFraud(),
    //     '获取国际诈骗防范态势失败'
    //   )
    //   if (res) {
    //     this.countryFraud = res.returnModel
    //   }
    // },
    // async getProvinceFraud() {
    //   const res = await this.$simpleAsyncTo(
    //     getProvinceFraud(),
    //     '获取省际诈骗防范态势失败'
    //   )
    //   if (res) {
    //     this.provinceFraud = res.returnModel
    //   }
    // }
  }
}