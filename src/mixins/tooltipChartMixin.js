
export default {
  props: {
    trigger: {
      type: String,
      default: 'axis'
    },
    axisPointerType: {
      type: String,
      default: 'shadow'
    },
    customFormatter: {
      type: Boolean,
      default: false
    },
    tooltipShow: {
      type: Boolean,
      default: true
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
    trigger(newVal, oldVal) {
      // console.log(`${this.chartName}trigger[新值:${newVal};旧值:${oldVal}]`)
      this.refresh()
    },
    axisPointerType(newVal, oldVal) {
      // console.log(`${this.chartName}axisPointerType[新值:${newVal};旧值:${oldVal}]`)
      this.refresh()
    },
    customFormatter(newVal, oldVal) {
      // console.log(`${this.chartName}customFormatter[新值:${newVal};旧值:${oldVal}]`)
      this.refresh()
    },
    tooltipShow(newVal, oldVal) {
      // console.log(`${this.chartName}customFormatter[新值:${newVal};旧值:${oldVal}]`)
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
    tooltipOpt(opt) {
      let [trigger, axisPointerType, customFormatter] = [this.trigger, this.axisPointerType, this.customFormatter]
      return {
        trigger: trigger,
        axisPointer: {
          type: axisPointerType
        },
        formatter: function (params) {
          if (customFormatter) {
            return this.getFormatterStr(params)
          } else {
            var name = params[0].name
            var str = ''
            params.forEach((item, i) => {
              if (item.seriesName !== '阴影') {
                str += item.seriesName + ' : ' + item.value + '<br />'
              }
            })
            return `${name}<br /> ${str}`
          }
        },
        ...opt
      }
    },
    getFormatterStr(params) {
      return 'aaaaaaaaaaa'
    },
    createTplCode(zjNm, imNm) {
      let propsKeys = Object.keys(this._props).map((_) => `:${_}="chartParams.${_}"`)
      // console.log(`<${zjNm}  ${propsKeys.join(' ')}></${zjNm}>`)
    }
  }
}