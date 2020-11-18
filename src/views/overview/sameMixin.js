import ChartBox from 'components/chartBox'
import PieChart from 'components/echarts/pie/pieChart'
import LineChart from 'components/echarts/line/lineChart'
import BarChart from 'components/echarts/bar/barChart'
import VisualMapChart from 'components/echarts/map/visualMapChart'
import {getData} from "./data"
import Map3D from '@/utils/map3d'
import mapJson from '@/assets/map/china.json'
export default {
  name: 'Home',
  props: {},
  components: {
    ChartBox,
    PieChart,
    BarChart,
    LineChart,
    VisualMapChart
  },
  data() {
    return {
      trendData: {
        legendData: ["境外拦截量"],
        seriesData: [
          [63636979, 37788805, 62833269, 57134586, 32472170, 17999823, 14072944]
        ],
        categoryData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"]
      },
      provtrendData: {
        legendData: ["境内拦截量"],
        seriesData: [
          [22723936, 24184722, 34492095, 117904343, 102358215, 85298076, 59073399]
        ],
        categoryData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"]
      },
      mapData: {
        seriesData: [
          {"name": "北京", "value": "812329"},
          {"name": "上海", "value": "1066748"},
          {"name": "广东", "value": "687889"},
          {"name": "天津", "value": "617568"},
          {"name": "重庆", "value": "540011"},
          {"name": "辽宁", "value": "151696"},
          {"name": "河北", "value": "30743722"},
          {"name": "河南", "value": "382444"},
          {"name": "四川", "value": "973926"},
          {"name": "江苏", "value": "7597618"},
          {"name": "云南", "value": "11999215"},
          {"name": "广西", "value": "768402"},
          {"name": "福建", "value": "250799430"},
          {"name": "江西", "value": "252292"},
          {"name": "浙江", "value": "3642278"},
          {"name": "吉林", "value": "5495548"},
          {"name": "安徽", "value": "348153"},
          {"name": "山西", "value": "216795"},
          {"name": "内蒙古", "value": "21117882"},
          {"name": "甘肃", "value": "17239557"},
          {"name": "新疆", "value": "77170"},
          {"name": "海南", "value": "96412"},
          {"name": "贵州", "value": "75672"},
          {"name": "湖南", "value": "56058982"},
          {"name": "湖北", "value": "71291"},
          {"name": "山东", "value": "311452950"},
          {"name": "陕西", "value": "359083"},
          {"name": "宁夏", "value": "8017210"},
          {"name": "青海", "value": "53352"},
          {"name": "西藏", "value": "466327"},
          {"name": "黑龙江", "value": "80308"}

        ]
      },
      pieces: [
      {
        min: 1000000
      },
      {
        min: 50000,
        max: 999999
      },
      {
        min: 10000,
        max: 99999
      },
      {
        min: 1000,
        max: 9999
      },
      {
        min: 0,
        max: 999
      }
    ],
    // barData:{
    //   legendData: ["分类1","分类2","分类3","分类4","分类5"],
    //   seriesData: [
    //     [16672, 14345, 19876, 22098],
    //     [12672, 19345, 18876, 10098],
    //     [12672, 19345, 18876, 10098],
    //     [12672, 19345, 18876, 10098],
    //     [12672, 19345, 18876, 10098],
    //   ],
    //   categoryData: ["IDC", "IRCS", "CDN", "DNS"]
    // },
    //   sourceData:{
    //     seriesData: [
    //      { value: 335, name: '高杠杆信贷投资诈骗' },
    //       { value: 310, name: '代孕求子诈骗' },
    //       { value: 234, name: '信用卡套现诈骗' },
    //       { value: 135, name: '刷单诈骗' },
    //       { value: 1548, name: '低价商品诱导诈骗' }
    //     ]
    //   },
      reportTrend: {
        legendData: ['移动', '联通', '电信'],
        seriesData: [
          [15973, 1421, 8817, 18017, 20505, 8156, 17214],
          [498947, 40176, 93437, 26077, 17723, 12869, 30106],
          [20115, 3366, 30520, 16760, 17958, 7560, 62509]
        ],
        categoryData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
      },
      buttonList1: [
        {label: '诈骗来源', type: 'source'},
        {label: '落地排名', type: 'sort'}
      ],
      line1type: 'source'
    }
  },
  computed: {},
  created() {},
  mounted() {
    
  },
  beforeDestroy() {
    
  },
  methods: {
    changeLineData1(val) {
      if(val == 'source') {
         this.sourceData = {
        seriesData: [
          { value: 335, name: '高杠杆信贷投资诈骗' },
          { value: 310, name: '代孕求子诈骗' },
          { value: 234, name: '信用卡套现诈骗' },
          { value: 135, name: '刷单诈骗' },
          { value: 1548, name: '低价商品诱导诈骗' }
        ]
      }
      }
      if(val == 'sort') {
         this.sourceData = {
        seriesData: [
         { value: 2335, name: '排名1' },
          { value: 3120, name: '排名2' },
          { value: 2324, name: '排名3' },
          { value: 1325, name: '排名4' }
        ]
      }
      }
    }
  }
}