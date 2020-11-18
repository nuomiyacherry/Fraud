import { visualMapOpt } from 'constants/chartConfig'
import storage from "utils/storage"
const chartColors = storage.get('tColors')
export default {
  props: {
    visualMapShow: {
      type: Boolean,
      default: true
    },
    visualMapType: {
      type: String,
      default: 'continuous'
    },
    splitNumber: {
      type: Number,
      default: 5
    },
    pieces: {
      type: Array,
      default: () => {
        return [
          { min: 100000 },
          { min: 50000, max: 99999 },
          { min: 10000, max: 49999 },
          { min: 1000, max: 9999 },
          { min: 0, max: 999 }
        ]
      }
    },
    visualMapOrient: {
      type: String,
      default: 'vertical'
    },
    visualMapAlign: {
      type: String,
      default: 'auto'
    },
    visualMapLeft: {
      type: [String, Number],
      default: () => 0
    },
    visualMapRight: {
      type: [String, Number],
      default: () => 'auto'
    },
    visualMapTop: {
      type: [String, Number],
      default: () => 'auto'
    },
    visualMapBottom: {
      type: [String, Number],
      default: () => 0
    },
    visualMapMin: {
      type: Number,
      default: 0
    },
    visualMapMax: {
      type: Number,
      default: 999999
    },
    visualMapText: {
      type: Array,
      default: () => ['高', '低']
    },
    visualMapTextColor: {
      type: String,
      default: chartColors.visualMap.text
    },
    visualMapRangeColor: {
      type: Array,
      default: () => chartColors.visualMap.range
    },
    visualMapFontSize: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
      chartName: '注意：没有给图表制定名称，请及时补充图表名称.........',
      options: {}
    }
  },
  created() {
    // console.log(`准备构建图表组件${this.chartName}`)
  },
  mounted() {
    this.refresh()
  },
  watch: {
    pieces: {
      handler(newVal, oldVal) {
        this.refresh()
      },
      deep: true
    },
    visualMapType() {
      this.refresh()
    },
    splitNumber() {
      this.refresh()
    },
    visualMapShow() {
      // console.log(
      //   `${this.chartName}visualMapShow[新值:${this.newVal};旧值:${
      //     this.oldVal
      //   }]`
      // )
      this.refresh()
    },
    visualMapOrient() {
      // console.log(
      //   `${this.chartName}visualMapOrient[新值:${this.newVal};旧值:${
      //     this.oldVal
      //   }]`
      // )
      this.refresh()
    },
    visualMapAlign() {
      // console.log(
      //   `${this.chartName}visualMapAlign[新值:${this.newVal};旧值:${
      //     this.oldVal
      //   }]`
      // )
      this.refresh()
    },
    visualMapLeft() {
      // console.log(
      //   `${this.chartName}visualMapLeft[新值:${this.newVal};旧值:${
      //     this.oldVal
      //   }]`
      // )
      this.refresh()
    },
    visualMapRight() {
      // console.log(
      //   `${this.chartName}visualMapRight[新值:${this.newVal};旧值:${
      //     this.oldVal
      //   }]`
      // )
      this.refresh()
    },
    visualMapTop() {
      // console.log(
      //   `${this.chartName}visualMapTop[新值:${this.newVal};旧值:${this.oldVal}]`
      // )
      this.refresh()
    },
    visualMapBottom() {
      // console.log(
      //   `${this.chartName}visualMapBottom[新值:${this.newVal};旧值:${
      //     this.oldVal
      //   }]`
      // )
      this.refresh()
    },
    visualMapMin() {
      // console.log(`${this.chartName}visualMapMin[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    visualMapMax() {
      // console.log(`${this.chartName}visualMapMax[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    visualMapText() {
      // console.log(`${this.chartName}visualMapText[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    visualMapTextColor() {
      // console.log(`${this.chartName}visualMapTextColor[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    visualMapRangeColor() {
      // console.log(`${this.chartName}visualMapRangeColor[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    visualMapFontSize() {
      // console.log(`${this.chartName}visualMapRangeColor[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    }
  },
  methods: {
    refresh() {
      this.options = this.setOptions()
      if (this.refreshCallback) {
        this.refreshCallback()
      }
    },
    // gridOpt(opt) {
    //   let [left, top, right, bottom] = [
    //     this.gridLeft || 'auto',
    //     this.gridTop || 'auto',
    //     this.gridRight || 'auto',
    //     this.gridBottom || 'auto'
    //   ]
    //   return {
    //     left: left,
    //     top: top,
    //     right: right,
    //     bottom: bottom,
    //     ...opt
    //   }
    // },
    visualMap() {
      console.log(this.pieces, 'pieces111')
      // console.log('this.visualMapShow', this.visualMapShow)
      if (this.visualMapType === 'piecewise') {
        return {
          ...visualMapOpt(
            this.visualMapLeft,
            this.visualMapTop,
            this.visualMapRight,
            this.visualMapBottom,
            this.visualMapOrient,
            this.visualMapAlign
          ),
          pieces: this.pieces,
          type: this.visualMapType,
          show: this.visualMapShow,
          inRange: {
            color: this.visualMapRangeColor //['rgba(219,112,147,0.4)', 'rgba(238,25,27,1)']
          },
          // color: ['rgba(219,112,147,0.4)', 'rgba(238,25,27,1)'], //[this.colors[0], this.colors[1]],
          // text: this.visualMapText, //['高', '低'], // 文本，默认为数值文本
          textStyle: {
            show: true,
            fontSize: this.visualMapFontSize,
            color: this.visualMapTextColor //this.colors[3]
          },
          calculable: true
        }
      } else {
        return {
          ...visualMapOpt(
            this.visualMapLeft,
            this.visualMapTop,
            this.visualMapRight,
            this.visualMapBottom,
            this.visualMapOrient,
            this.visualMapAlign
          ),
          type: this.visualMapType,
          show: this.visualMapShow,
          min: this.visualMapMin, //this.minValue, //this.min
          max: this.visualMapMax, //this.maxValue, //this.max,
          inRange: {
            color: this.visualMapRangeColor //['rgba(219,112,147,0.4)', 'rgba(238,25,27,1)']
          },
          // color: ['rgba(219,112,147,0.4)', 'rgba(238,25,27,1)'], //[this.colors[0], this.colors[1]],
          text: this.visualMapText, //['高', '低'], // 文本，默认为数值文本
          textStyle: {
            fontSize: this.visualMapFontSize,
            color: this.visualMapTextColor //this.colors[3]
          },
          calculable: true
        }
      }
    }
    // createTplCode(zjNm, imNm) {
    //   let propsKeys = Object.keys(this._props).map(
    //     _ => `:${_}="chartParams.${_}"`
    //   )
    //   console.log(`<${zjNm}  ${propsKeys.join(' ')}></${zjNm}>`)
    // }
  }
}
