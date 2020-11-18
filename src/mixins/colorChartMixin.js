export default {
  methods: {
    initColors() {
      let [cLen, sLen, eLen] = [this.colors.length, this.startColors.length, this.endColors.length]
      if (cLen > sLen) {
        for (let i = 0; i < (cLen - sLen); i++) {
          this.startColors.push(this.colors[sLen + i])
        }
      }
      if (cLen > eLen) {
        for (let i = 0; i < (cLen - eLen); i++) {
          this.endColors.push(this.colors[eLen + i])
        }
      }
      this.currColors = []
      let [x, y, x2, y2] = [0, 0, 0, 1]
      if (this.xAxisValue) {
        x = 1
        y = 0
        x2 = 0
        y2 = 0
      }
      this.colors.forEach((item, index) => {
        this.currColors.push({
          type: 'linear',
          x: x,
          y: y,
          x2: x2,
          y2: y2,
          colorStops: [{
            offset: 0,
            color: this.startColors[index] // 0% 处的颜色
          }, {
            offset: 1,
            color: this.endColors[index] // 100% 处的颜色
          }]
        })
      })
    }
  }
}