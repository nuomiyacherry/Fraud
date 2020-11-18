import {mapGetters} from 'vuex'
import { getNationalPng } from "@/constants/country"
export default {
  data() {
    return {
      themeColors: {}
    }
  },
  computed: {
    ...mapGetters({
      '_theme': 'theme',
      '_tColors': 'tColors',
      '_ratio': 'ratio'
    })
  },
  methods: {
    getSlotNames(rows) {
      let arr = []
      rows.forEach((row, rowInd) => {
        row.columns.forEach((column, columnInd) => {
          column.boxes.forEach((box, boxInd) => {
            let slotNm = ''
            if (column.type === 'row') {
              // arr.push(`r${rowInd + 1}c${columnInd + 1}r${boxInd + 1}`)
              slotNm = `r${rowInd + 1}c${columnInd + 1}r${boxInd + 1}`
            } else {
              // arr.push(`r${rowInd + 1}c${columnInd + 1}c${boxInd + 1}`)
              slotNm = `r${rowInd + 1}c${columnInd + 1}c${boxInd + 1}`
            }

            if (box.boxes && Array.isArray(box.boxes) && box.boxes.length > 0) {
              box.boxes.forEach((childBox, childBoxInd) => {
                let childSlotNm = ''
                if (box.type === 'row') {
                  childSlotNm = `${slotNm}r${childBoxInd + 1}`
                } else {
                  childSlotNm = `${slotNm}c${childBoxInd + 1}`
                }

                if (childBox.boxes && Array.isArray(childBox.boxes) && childBox.boxes.length > 0) {
                  childBox.boxes.forEach((sonBox, sonBoxInd) => {
                    if (childBox.type === 'row') {
                      arr.push(`${childSlotNm}r${sonBoxInd + 1}`)
                    } else {
                      arr.push(`${childSlotNm}c${sonBoxInd + 1}`)
                    }
                  })
                } else {
                  arr.push(childSlotNm)
                }
              })
            } else {
              arr.push(slotNm)
            }
          })
        })
      })

      return arr
    },
    getPxHeight(nodeNm) {
      if (this.$refs[nodeNm]) {
        return `${this.$refs[nodeNm].offsetHeight}px`
      }

      return '0px'
    },
    getHeight(nodeNm) {
      return this.getPxHeight(nodeNm)
    },
    getFindImg(cname) {
      return getNationalPng(cname)
    }
  },
  // keep-alive组件激活时调用
  activated() {
    this.$forceUpdate()
  },
  // keep-alive组件停用时调用
  deactivated() {
    this.$forceUpdate()
  }
}
