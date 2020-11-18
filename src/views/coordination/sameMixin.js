// import {on, off} from '@/utils/dom'
import ChartBox from 'components/chartBox'
import LineChart from 'components/echarts/line/lineChart'
import { getTopData, getWarningTableData, getDissuadeTableData, getNetAccountMonitorTableData, getAppMonitorTableData, getWebsiteMonitorTableData, getDisposeList 
  // getWebsiteTrendLineData
 } from 'api/coordination'
import { elTableScroll } from 'utils/tableScroll'
import {getGroupArray} from 'constants/utils'
export default {
  name: 'Coordination',
  props: {},
  components: {
    ChartBox,
    LineChart
  },
  data() {
    return {
      videoSrc: require('@/assets/videos/domain.mp4'),
      videoName: 'domain',
      topData: {},
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
      dialoggVisible: false,
      dialogTitle: '',
      disposeList: [],
      loading: false,
      total: 0,
      dialogType: '',
      // websiteTrendLineData: {},
      websiteTrendBtns: [
        { label: '用户量', type: 0 },
        { label: '访问量', type: 1 }
      ],
      activeBtnType: 0,
      selectedAppInfo: {},
      fraudAppDetailVisible: false
    }
  },
  computed: {},
  created() {},
  mounted() {
    // this.setLayout()
    // on(window, 'resize', this.setLayout)
    this.getTopData()
    this.getWarningTableData()
    this.getDissuadeTableData()
    this.getNetAccountMonitorTableData()
    this.getAppMonitorTableData()
    this.getWebsiteMonitorTableData()
    // this.getWebsiteTrendLineData()
  },
  beforeDestroy() {
    // off(window, 'resize', this.setLayout)
  },
  destroyed() {
    this.warningTableScroll && this.warningTableScroll.destroy()
    this.dissuadeTableScroll && this.dissuadeTableScroll.destroy()
    this.netAccountMonitorTableScroll &&
      this.netAccountMonitorTableScroll.destroy()
    this.appMonitorTableScroll && this.appMonitorTableScroll.destroy()
    this.websiteMonitorTableScroll && this.websiteMonitorTableScroll.destroy()
  },
  methods: {
    // setLayout() {
    //   this.$refs.Video.style.height = this.$refs.videoBox.clientHeight + 'px'
    //   this.$refs.Video.style.width = this.$refs.videoBox.clientWidth + 'px'
    // },
    getGroupArray(data) {
      return getGroupArray(data, 2)
    },
    // clickBtn(value) {
    //   this.videoName = value
    //   this.videoSrc = require(`@/assets/videos/${this.videoName}.mp4`)
    // },
    async getTopData() {
      const res = await this.$simpleAsyncTo(getTopData(), '获取数据失败')
      if (res) {
        this.topData = res.returnModel
      }
    },
    openDialog(total, title, type) {
      this.dialogType = type
      this.total = total
      this.dialogTitle = title
      this.dialoggVisible = true
      this.getDisposeList(type)
    },
    async getWarningTableData() {
      const res = await this.$simpleAsyncTo(
        getWarningTableData(),
        '获取各省反诈系统预警数据失败'
      )
      if (res) {
        this.warningTableData = res.returnModel
        this.warningTableScroll = await elTableScroll(
          this.$refs.warningScrollTable
        )
      }
    },
    async getDissuadeTableData() {
      const res = await this.$simpleAsyncTo(
        getDissuadeTableData(),
        '获取各省反诈系统劝阻数据失败'
      )
      if (res) {
        this.dissuadeTableData = res.returnModel
        this.dissuadeTableScroll = await elTableScroll(
          this.$refs.dissuadeScrollTable
        )
      }
    },
    async getNetAccountMonitorTableData() {
      const res = await this.$simpleAsyncTo(
        getNetAccountMonitorTableData(),
        '获取涉诈互联网账号监测数据失败'
      )
      if (res) {
        this.netAccountMonitorTableData = res.returnModel
        this.netAccountMonitorTableScroll = await elTableScroll(
          this.$refs.netAccountMonitorScrollTable
        )
      }
    },
    async getAppMonitorTableData() {
      const res = await this.$simpleAsyncTo(
        getAppMonitorTableData(),
        '获取涉诈APP监测数据失败'
      )
      if (res) {
        this.appMonitorTableData = res.returnModel
        this.appMonitorTableScroll = await elTableScroll(
          this.$refs.appMonitorScrollTable
        )
      }
    },
    async getWebsiteMonitorTableData() {
      const res = await this.$simpleAsyncTo(
        getWebsiteMonitorTableData(),
        '获取涉诈网站监测数据失败'
      )
      if (res) {
        this.websiteMonitorTableData = res.returnModel
        this.websiteMonitorTableScroll = await elTableScroll(
          this.$refs.websiteMonitorScrollTable
        )
      }
    },
    async getDisposeList(type) {
      this.loading = true
      const res = await this.$simpleAsyncTo(
        getDisposeList({ type }),
        '获取已处置数据失败'
      )
      if (res) {
        this.disposeList = res.returnModel
        // 切换时也可以用请求的数据
        // for(var key in res.returnModel) {
        //   if(type === key) {
        //     this.disposeList = res.returnModel[key]
        //   }
        // }
        this.loading = false
      } else {
        this.loading = false
      }
    },
    handleClick(row) {
      this.selectedAppInfo = row
      this.fraudAppDetailVisible = true
    }
    // async getWebsiteTrendLineData() {
    //   const params = {type: this.activeBtnType}
    //   const res = await this.$simpleAsyncTo(getWebsiteTrendLineData(params), '获取赌博杀鸡盘网站用户量及访问量趋势失败')
    //   if (res) {
    //     this.websiteTrendLineData = res.returnModel
    //   }
    // },
    // changeLineData(val) {
    //   this.activeBtnType = val
    //   this.getWebsiteTrendLineData()
    // }
  }
}