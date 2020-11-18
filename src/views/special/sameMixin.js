import ChartBox from 'components/chartBox'
import lineChart from 'components/echarts/line/lineChart'
import barChart from 'components/echarts/bar/barChart'
import piechart from 'components/echarts/pie/pieChart'
import TotalBox from 'components/totalBox'
import {
  suspectedVictim,
  liveWebRank,
  baseInfoList,
  gambleWebOutside,
  gambleLiveDomain,
  loanFraudWebOutside,
  loanFraudleLiveDomain,
  lotteryFraudWebOutside,
  lotteryFraudleLiveDomain
} from 'api/special'
export default {
  name: 'Special',
  props: {},
  components: {ChartBox, TotalBox, lineChart, piechart, barChart},
  data() {
    return {
      gambleList1: [],
      gambleList2: [],
      gambleList3: [],
      webPieData1: {},
      webPieData2: {},
      webPieData3: {},
      webPieData4: {},
      lineData1: {

      },
      lineData2: {},
      lineData3: {},
      barData: {}
    }
  },
  computed: {},
  created() {},
  mounted() {
    this._suspectedVictim()
    this._liveWebRank()
    this._baseInfoList()
    this._gambleWebOutside()
    this._gambleLiveDomain()
    this._loanFraudWebOutside()
    this._loanFraudleLiveDomain()
    this._lotteryFraudWebOutside()
    this._lotteryFraudleLiveDomain()
  },
  methods: {
    // 疑似受害者国内分布占比
    _suspectedVictim() {
      suspectedVictim().then(res => {
        if (res.errorType === 0) {
          this.webPieData4 = {
            seriesData: res.returnModel
          }
        }
      })
    },
    // 存活网站数量趋势TOP5
    _liveWebRank() {
      liveWebRank().then(res => {
        if (res.errorType === 0) {
          this.barData = res.returnModel
        }
      })
    },
    // 基本情况
    _baseInfoList() {
      baseInfoList().then(res => {
        if (res.errorType === 0) {
          this.gambleList1 = res.returnModel.gambleList1
          this.gambleList2 = res.returnModel.gambleList2
          this.gambleList3 = res.returnModel.gambleList3
        }
      })
    },
    // 赌博杀猪盘-网站境内外接入占比
    _gambleWebOutside() {
      gambleWebOutside().then(res => {
        if (res.errorType === 0) {
          this.webPieData1 = {
            pieName: '网站境内外接入占比',
            seriesData: res.returnModel
          }
        }
      })
    },
    // 赌博杀猪盘-存活域名数量趋势
    _gambleLiveDomain() {
      gambleLiveDomain().then(res => {
        if (res.errorType === 0) {
          this.lineData1 = res.returnModel
        }
      })
    },
    // 小额贷款手续费诈骗-网站境内外接入占比
    _loanFraudWebOutside() {
      loanFraudWebOutside().then(res => {
        if (res.errorType === 0) {
          this.webPieData2 = {
            pieName: '网站境内外接入占比',
            seriesData: res.returnModel
          }
        }
      })
    },
    // 小额贷款手续费诈骗-存活域名数量趋势
    _loanFraudleLiveDomain() {
      loanFraudleLiveDomain().then(res => {
        if (res.errorType === 0) {
          this.lineData2 = res.returnModel
        }
      })
    },
    // 虚假彩票合买诈骗-网站境内外接入占比
    _lotteryFraudWebOutside() {
      lotteryFraudWebOutside().then(res => {
        if (res.errorType === 0) {
          this.webPieData3 = {
            pieName: '网站境内外接入占比',
            seriesData: res.returnModel
          }
        }
      })
    },
    // 虚假彩票合买诈骗-存活域名数量趋势
    _lotteryFraudleLiveDomain() {
      lotteryFraudleLiveDomain().then(res => {
        if (res.errorType === 0) {
          this.lineData3 = res.returnModel
        }
      })
    }

  }
}