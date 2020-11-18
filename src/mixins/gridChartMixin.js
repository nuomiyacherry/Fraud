export default {
  props: {
    gridLeft: {
      type: [String, Number],
      default: () => ''
    },
    gridTop: {
      type: [String, Number],
      default: () => ''
    },
    gridRight: {
      type: [String, Number],
      default: () => ''
    },
    gridBottom: {
      type: [String, Number],
      default: () => ''
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
    gridLeft() {
      // console.log(`${this.chartName}gridLeft[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    gridTop() {
      // console.log(`${this.chartName}gridTop[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    gridRight() {
      // console.log(`${this.chartName}gridRight[新值:${this.newVal};旧值:${this.oldVal}]`)
      this.refresh()
    },
    gridBottom() {
      // console.log(`${this.chartName}gridBottom[新值:${this.newVal};旧值:${this.oldVal}]`)
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
    gridOpt(opt) {
      let [left, top, right, bottom] = [this.gridLeft || 'auto', this.gridTop || '10', this.gridRight || 'auto', this.gridBottom || 'auto']
      return {
        left: left,
        top: top,
        right: right,
        bottom: bottom,
        ...opt
      }
    },
    createTplCode(zjNm, imNm) {
      let propsKeys = Object.keys(this._props).map((_) => `:${_}="chartParams.${_}"`)
      // console.log(`<${zjNm}  ${propsKeys.join(' ')}></${zjNm}>`)
    }
  }
}
