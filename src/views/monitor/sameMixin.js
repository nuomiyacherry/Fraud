import ChartBox from 'components/chartBox'
import {getWarningTableData, getDissuadeTableData, getNetAccountMonitorTableData, getAppMonitorTableData, getWebsiteMonitorTableData, getWarningList, getMapData} from 'api/monitor'
import { elTableScroll } from 'utils/tableScroll'
import vueSeamless from 'vue-seamless-scroll'
// import MapLineScatterChart from 'components/echarts/map/mapLineScatterChart'
export default {
  name: 'Monitor',
  props: {},
  components: {
    ChartBox,
    vueSeamless
    // MapLineScatterChart,
  },
  data() {
    return {
      warningTableData: [],
      warningTableScroll: null,
      dissuadeTableData: [],
      dissuadeTableScroll: null,
      netAccountMonitorTableData: [],
      netAccountMonitorTableScroll: null,
      appMonitorTableData: [],
      appMonitorTableScroll: null,
      websiteMonitorTableData: [],
      websiteMonitorTableScroll: null,
      warningList: [],
      worldMapData: {
        moveLineData: []
      }
    }
  },
  computed: {
    // 公告滚动自定义
    defaultOption () {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 2, // 0向下 1向上 2向左 3向右
        // openWatch: true, // 开启数据实时监控刷新dom
        singleWidth: 0 // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        // waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  created() {},
  mounted() {
    this.getMapData()
    this.getWarningTableData()
    this.getDissuadeTableData()
    this.getNetAccountMonitorTableData()
    this.getAppMonitorTableData()
    this.getWebsiteMonitorTableData()
    this.getWarningList()
  },
  destroyed() {
    this.warningTableScroll && this.warningTableScroll.destroy()
    this.dissuadeTableScroll && this.dissuadeTableScroll.destroy()
    this.netAccountMonitorTableScroll && this.netAccountMonitorTableScroll.destroy()
    this.appMonitorTableScroll && this.appMonitorTableScroll.destroy()
    this.websiteMonitorTableScroll && this.websiteMonitorTableScroll.destroy()
  },
  methods: {
    setWidth() {
      let width = 0
      const lis = document.querySelectorAll('.scroll-ul li')
      lis.forEach(li => {
        width += li.clientWidth
      })
      this.$refs.scrollUl.style.width = `${width / 2}px`
    },
    async getWarningTableData() {
      const res = await this.$simpleAsyncTo(getWarningTableData(), '获取各省反诈系统预警数据失败')
      if(res) {
        this.warningTableData = res.returnModel
        this.warningTableScroll = await elTableScroll(this.$refs.warningScrollTable)
      }
    },
    async getDissuadeTableData() {
      const res = await this.$simpleAsyncTo(getDissuadeTableData(), '获取各省反诈系统劝阻数据失败')
      if(res) {
        this.dissuadeTableData = res.returnModel
        this.dissuadeTableScroll = await elTableScroll(this.$refs.dissuadeScrollTable)
      }
    },
    async getNetAccountMonitorTableData() {
      const res = await this.$simpleAsyncTo(getNetAccountMonitorTableData(), '获取涉诈互联网账号监测数据失败')
      if(res) {
        this.netAccountMonitorTableData = res.returnModel
        this.netAccountMonitorTableScroll = await elTableScroll(this.$refs.netAccountMonitorScrollTable)
      }
    },
    async getAppMonitorTableData() {
      const res = await this.$simpleAsyncTo(getAppMonitorTableData(), '获取涉诈APP监测数据失败')
      if(res) {
        this.appMonitorTableData = res.returnModel
        this.appMonitorTableScroll = await elTableScroll(this.$refs.appMonitorScrollTable)
      }
    },
    async getWebsiteMonitorTableData() {
      const res = await this.$simpleAsyncTo(getWebsiteMonitorTableData(), '获取涉诈网站监测数据失败')
      if(res) {
        this.websiteMonitorTableData = res.returnModel
        this.websiteMonitorTableScroll = await elTableScroll(this.$refs.websiteMonitorScrollTable)
      }
    },
    async getWarningList() {
      const res = await this.$simpleAsyncTo(getWarningList(), '获取涉诈舆情预警数据失败')
      if(res) {
        this.warningList = res.returnModel
        setTimeout(() => {
          this.setWidth()
        }, 30)
      }
    },
    async getMapData() {
      const res = await this.$simpleAsyncTo(getMapData(), '获取涉诈网站全球访问监测数据失败')
      if(res) {
        let mapData = []
        // console.log('res==', res)
        res.returnModel.forEach(item => {
          // console.log('item===', item)
          const arr = [ {name: '中国'}, {name: item.name, value: item.value} ]
          mapData.push(arr)
        })
        // console.log('mapData====', mapData)
        this.worldMapData = {
          moveLineData: mapData
        }
        // console.log('this.worldMapData', this.worldMapData)
      }
    }
  }
}