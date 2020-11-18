import storage from "utils/storage"
const chartColors = storage.get('tColors')
export default {
  props: {
    legendShow: {
      type: Boolean,
      default: true
    },
    legendOrient: {
      type: String,
      default: 'horizontal'
    },
    legendType: {
      type: String,
      default: 'scroll'
    },
    legendLeft: {
      type: [String, Number],
      default: () => ''
    },
    legendTop: {
      type: [String, Number],
      default: () => ''
    },
    legendRight: {
      type: [String, Number],
      default: () => ''
    },
    legendBottom: {
      type: [String, Number],
      default: () => ''
    },
    legendTextColor: {
      type: String,
      default: () => chartColors.legend.text
    },
    legendPageTextColor: {
      type: String,
      default: () => chartColors.legend.pageText
    },
    legendFontSize: {
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
    setTimeout(this.refresh, 10)
  },
  watch: {
    legendShow(newVal, oldVal) {
      this.refresh()
    },
    legendOrient(newVal, oldVal) {
      this.refresh()
    },
    legendType(newVal, oldVal) {
      this.refresh()
    },
    legendLeft(newVal, oldVal) {
      this.refresh()
    },
    legendTop(newVal, oldVal) {
      this.refresh()
    },
    legendRight(newVal, oldVal) {
      this.refresh()
    },
    legendBottom(newVal, oldVal) {
      this.refresh()
    },
    legendTextColor(newVal, oldVal) {
      this.refresh()
    },
    legendPageTextColor(newVal, oldVal) {
      this.refresh()
    },
    legendFontSize(newVal, oldVal) {
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
    legendOpt(opt) {
      let [left, top, right, bottom, type, orient] = [
        this.legendLeft || 'auto',
        this.legendTop || 'auto',
        this.legendRight || 'auto',
        this.legendBottom || 'auto',
        this.legendType || 'plain',
        this.legendOrient || 'horizontal'
      ]
      return {
        type: type,
        orient: orient,
        left: left,
        top: top,
        right: right,
        bottom: bottom,
        legendFontSize: this.legendFontSize,
        ...opt
      }
    },
    chartClick(params) {
      this.$emit('click', params)
    },
    createTplCode(zjNm) {
      // console.log(JSON.stringify(this._props))
      let propsKeys = Object.keys(this._props).map(
        _ => `:${_}="chartParams.${_}"`
      )
      // console.log(`<${zjNm}  ${propsKeys.join(' ')}></${zjNm}>`)
    }
  }
}
