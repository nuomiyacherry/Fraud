import ChartBox from 'components/chartBox'
import CornerBg from 'components/corner'
import PieChart from 'components/echarts/pie/pieChart'
import LineChart from 'components/echarts/line/lineChart'
import {
  fraudRings,
  domainGross,
  domainLive,
  tableList,
  getFraudAppMarket,
  getFraudAppEventType,
  getFraudAppDiscoverTrend,
  getWebsiteAccessProportion,
  getFraudGroupTotalTrend,
  getFraudGroupUpdateTrend,
  getFraudWebsiteType,
  suspectedVictim,
  getFakeWebsiteList,
  getAffectedUsersRatio
  // getFraudAppTotal
} from 'api/analysis'

export default {
  name: 'Analysis',
  props: {},
  components: { ChartBox, CornerBg, LineChart, PieChart },
  data() {
    return {
      // bk:'#E0693C',
      bk: 'rgba(221,135,73,0.3)',
      bk1: '#E0693C',
      loading: false,
      maptotalList: [],
      fakeWebsiteList: [],
      // fraudAppTotal: [],
      leftImg: './dataAnalysis/数据输入.png',
      rightGraphImg: './dataAnalysis/数据输入点状图.png',
      graphBtns: [
        { name: '数据输入', active: true },
        { name: '协同融合', active: false },
        { name: '关联分析', active: false },
        { name: '省部聚合', active: false },
        { name: '全国总览', active: false }
      ],
      type: 0,
      tableData: [],
      // barData1: {
      //   legendData: ['涉诈资源集合新增趋势'],
      //   seriesData: [
      //     [219, 227, 13280, 22455, 14605, 8955]
      //   ],
      //   categoryData: ['3月', '4月', '5月', '6月', '7月', '8月']
      // },
      // barData2: {
      //   legendData: ['涉诈资源集合更新趋势'],
      //   seriesData: [
      //     [251, 280, 280, 254, 296, 175]
      //   ],
      //   categoryData: ['3月', '4月', '5月', '6月', '7月', '8月']
      // },
      // barData3: {
      //   legendData: ['涉诈类型分析'],
      //   seriesData: [
      //     [302739, 119805, 298440, 1370727, 58353, 80701]
      //   ],
      //   categoryData: ['3月', '4月', '5月', '6月', '7月', '8月']
      // },
      line1data: {},
      line2data: {},
      fraudAppMarket: {},
      fraudAppEventType: {},
      fraudAppDiscoverTrend: {},
      fraudWebsiteType: {},
      suspectedVictimData: {},
      websiteAccessProportion: {},
      fraudGroupTotalTrend: {},
      fraudGroupUpdateTrend: {},
      navList: [
        { label: '重点网站分析', value: 'website', icon: 'iconwangzhi' },
        { label: '重点APP分析', value: 'app', icon: 'iconAPP' },
        { label: '涉诈团伙分析', value: 'group', icon: 'icontuanhuoqunti' },
        { label: '仿冒网页分析', value: 'phishing', icon: 'iconyumingyuwangzhan' }
      ],
      activeValue: 'website',
      affectedUsersRatio: {}
    }
  },
  computed: {},
  created() {},
  mounted() {
    this._fraudRings()
    this._domainGross()
    this._domainLive()
    this._tableList()
    this.getFraudAppMarket()
    this.getFraudAppEventType()
    this.getFraudAppDiscoverTrend()
    this.getFraudWebsiteType()
    this.suspectedVictim()
    this.getWebsiteAccessProportion()
    this.getFraudGroupTotalTrend()
    this.getFraudGroupUpdateTrend()
    this.getFakeWebsiteList()
    this.getAffectedUsersRatio()
    // this.getFraudAppTotal()
  },
  methods: {
    changeGraph(name, index) {
      this.graphBtns.forEach(item => {
        if (index === 0) {
          // this.bk='#E0693C'
          this.bk = 'rgba(221,135,73,0.3)'
        }
        if (index === 1) {
          // this.bk='#5D89FF'
          this.bk = 'rgba(67,120,226,0.30)'
        }
        if (index === 2) {
          // this.bk=' #BD52F6'
          this.bk = 'rgba(138,85,255,0.30)'
        }
        if (index === 3) {
          // this.bk='#45DFFF'
          this.bk = 'rgba(90,201,225,0.30)'
        }
        if (index === 4) {
          // this.bk='#D2DF5D'
          this.bk = 'rgba(181,193,75,0.30)'
        }
        if (item.name === name) {
          item.active = true
          this.leftImg = `./dataAnalysis/${name}.png`
          // this.rightGraphImg = `./dataAnalysis/${name}关系图.png`
          this.rightGraphImg = `./dataAnalysis/${name}点状图.png`
          this.type = index
          this._tableList()
        } else {
          item.active = false
        }
      })
    },
    _fraudRings() {
      fraudRings().then(res => {
        if (res.errorType === 0) {
          const mapTemp = []
          mapTemp.push({
            label: '涉诈团伙总数',
            value: res.returnModel['reportNum']
          })
          mapTemp.push({
            label: '昨日新增涉诈团伙',
            value: res.returnModel['blockNum']
          })
          // mapTemp.push({
          //   label: '团伙域名总量',
          //   value: res.returnModel['domain']
          // })
          // mapTemp.push({
          //   label: '团伙接入IP总量',
          //   value: res.returnModel['ip']
          // })
          console.log(mapTemp)
          this.maptotalList = mapTemp
        }
      })
    },
    getFakeWebsiteList() {
      getFakeWebsiteList().then(res => {
        if (res.errorType === 0) {
          const mapTemp = []
          mapTemp.push({
            label: '仿冒网页总数',
            value: res.returnModel['sum']
          })
          mapTemp.push({
            label: '受害用户总数',
            value: res.returnModel['userNum']
          })
          this.fakeWebsiteList = mapTemp
        }
      })
    },
    _domainGross() {
      domainGross().then(res => {
        if (res.errorType === 0) {
          this.line1data = res.returnModel
        }
      })
    },
    _domainLive() {
      domainLive().then(res => {
        if (res.errorType === 0) {
          this.line2data = res.returnModel
        }
      })
    },
    _tableList() {
      tableList({ type: this.type }).then(res => {
        if (res.errorType === 0) {
          // this.tableData = res.returnModel
          // 切换时也可以用请求的数据
          for (var key in res.returnModel) {
            if (this.type === key) {
              this.tableData = res.returnModel[key]
            }
          }
        }
      })
    },
    clickCenterBox(type) {
      this.activeValue = type
    },
    async getFraudAppMarket() {
      const res = await this.$simpleAsyncTo(
        getFraudAppMarket(),
        '获取涉诈APP接入商城占比失败'
      )
      if (res) {
        this.fraudAppMarket = res.returnModel
      }
    },
    async getFraudAppEventType() {
      const res = await this.$simpleAsyncTo(
        getFraudAppEventType(),
        '获取涉诈APP诈骗事件类型分布失败'
      )
      if (res) {
        this.fraudAppEventType = res.returnModel
      }
    },
    async getFraudAppDiscoverTrend() {
      const res = await this.$simpleAsyncTo(
        getFraudAppDiscoverTrend(),
        '获取近一周涉诈APP发现趋势失败'
      )
      if (res) {
        this.fraudAppDiscoverTrend = res.returnModel
      }
    },
    async getFraudWebsiteType() {
      const res = await this.$simpleAsyncTo(
        getFraudWebsiteType(),
        '获取涉诈网站类型分布失败'
      )
      if (res) {
        this.fraudWebsiteType = res.returnModel
      }
    },
    async suspectedVictim() {
      const res = await this.$simpleAsyncTo(
        suspectedVictim(),
        '获取疑似受害者国内分布占比失败'
      )
      if (res) {
        this.suspectedVictimData = {
          seriesData: res.returnModel
        }
      }
    },
    async getWebsiteAccessProportion() {
      const res = await this.$simpleAsyncTo(
        getWebsiteAccessProportion(),
        '获取网站境内外接入占比失败'
      )
      if (res) {
        this.websiteAccessProportion = {
          seriesData: res.returnModel
        }
      }
    },
    async getFraudGroupTotalTrend() {
      const res = await this.$simpleAsyncTo(
        getFraudGroupTotalTrend(),
        '获取涉诈团伙总量趋势失败'
      )
      if (res) {
        this.fraudGroupTotalTrend = {
          legendData: ['涉诈团伙总量趋势'],
          seriesData: res.returnModel.seriesData,
          categoryData: res.returnModel.categoryData
        }
      }
    },
    async getFraudGroupUpdateTrend() {
      const res = await this.$simpleAsyncTo(
        getFraudGroupUpdateTrend(),
        '获取涉诈团伙更新趋势失败'
      )
      if (res) {
        this.fraudGroupUpdateTrend = {
          legendData: ['涉诈团伙更新趋势'],
          seriesData: res.returnModel.seriesData,
          categoryData: res.returnModel.categoryData
        }
      }
    },
    async getAffectedUsersRatio() {
      const res = await this.$simpleAsyncTo(
        getAffectedUsersRatio(),
        '获取受害用户分布分布失败'
      )
      if (res) {
        this.affectedUsersRatio = res.returnModel
      }
    }
    // async getFraudAppTotal() {
    //   const res = await this.$simpleAsyncTo(
    //     getFraudAppTotal(),
    //     '获取涉诈App发现总数失败'
    //   )
    //   if (res) {
    //     const mapTemp = []
    //     mapTemp.push({
    //       label: '发现总数',
    //       value: res.returnModel['total']
    //     })
    //     mapTemp.push({
    //       label: '昨日新增',
    //       value: res.returnModel['yesterday']
    //     })
    //     this.fraudAppTotal = mapTemp
    //   }
    // }
  }
}