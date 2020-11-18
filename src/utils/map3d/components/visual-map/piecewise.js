import merge from 'lodash/merge'
import { scaleLinear } from 'd3-scale'
import Mixin from '../../core/mixin'
import { on, off } from '../../libs/dom'
import { toFixed } from '../../tool/util'
import { getTranslate } from '../../core/layout'
import { drawText, genColors, getTextWidth } from '../../tool/canvas'
import { drawRoundRect, drawRect } from '../../core/shape'
import { piecewiseOptions } from './options'

export default class PiecewiseVisualMap extends Mixin {
  constructor(el, options) {
    super(el, options)
    this.layout = {}
    this.options = merge({}, piecewiseOptions, options)
    this.options.show && this.init()
  }

  init() {
    const { color, splitNumber } = this.options
    !this.options.context && this.setSize()
    !this.options.context && this.initCanvas()
    this.color = genColors(color, splitNumber, this.ctx)
    this.setLayout()
    this.render()
    on(this.el, 'mousemove', this.repaint.bind(this))
    on(this.el, 'click', this.repaint.bind(this))
    !this.options.context && on(window, 'resize', this.resize.bind(this))
  }

  mouseDetect(options) {
    this.response.push(options)
    if (this.mouse.event.type === 'click') {
      this.emit('click', this.response[0], this.response)
    } else {
      this.el.style.cursor = 'pointer'
      this.emit('mouseover', this.response[0], this.response)
    }
  }

  setLayout() {
    const {
      itemHeight,
      itemWidth,
      pieces,
      categories,
      itemGap,
      orient,
      unit,
      textStyle,
      inverse,
      text,
      textGap,
      right,
      top
    } = this.options

    this.itemList = pieces || categories || this.getItemList()
    this.text0 = {
      ...textStyle,
      text: '',
      textAlign: 'left',
      textBaseline: 'top'
    }
    this.text1 = {
      ...textStyle,
      text: '',
      textAlign: 'left',
      textBaseline: 'top'
    }

    let x = 0,
      y = 0,
      width = 0,
      height = 0,
      text0Width = 0,
      text0Height = 0,
      text1Width = 0,
      text1Height = 0

    if (text) {
      if (text[0]) {
        text0Width = getTextWidth(this.ctx, text[0], textStyle)
        text0Height = textStyle.fontSize
        Object.assign(this.text0, {
          text: text[0],
          width: text0Width,
          height: text0Height
        })
      }
      if (text[1]) {
        text1Width = getTextWidth(this.ctx, text[1], textStyle)
        text1Height = textStyle.fontSize
        Object.assign(this.text1, {
          text: text[1],
          width: text1Width,
          height: text1Height
        })
      }
    }
    inverse && this.itemList.reverse()
    this.itemList.forEach((item, i) => {
      const { min = -Infinity, max = Infinity, color = this.color[i] } = item
      let text = `${min} - ${max}` + (unit ? ` ${unit}` : '')
      max === Infinity && (text = `>= ${min}`)
      min === -Infinity && (text = `<= ${max}`)
      item.max = max
      item.min = min
      const textWidth = getTextWidth(this.ctx, text, textStyle),
        h = Math.max(itemHeight, textStyle.fontSize)
      if (orient === 'vertical') {
        const tempWidth = itemWidth + itemGap + textWidth
        width = width > tempWidth ? width : tempWidth
        height += h + itemGap
        y = i * (h + itemGap) + (text0Height ? text0Height + textGap : 0)
      } else {
        x = text0Width ? text0Width + textGap : 0
        if (i !== 0) {
          x += width + itemGap
        }
        width += itemWidth + itemGap * 2 + textWidth
        height = h
      }
      item.x = x
      item.y = y
      item.color = color
      item.text = text
      item.textWidth = textWidth
      item.selected = true
    })

    if (text) {
      if (orient === 'vertical') {
        width = Math.max(text0Width, text1Width, width)
        height +=
          (text0Height ? text0Height + textGap : 0) +
          (text1Height ? text1Height + textGap : 0)
      } else {
        width +=
          (text0Width ? text0Width + textGap : 0) +
          (text1Width ? text1Width + textGap : 0)
      }
    }

    const { translateX, translateY } = getTranslate(this.el, this.options, {
      width,
      height,
      rightWidth: itemWidth
    })

    if (text) {
      if (orient === 'vertical') {
        this.text0.x =
          (right !== 'auto' ? -text0Width + itemWidth : 0) + translateX
        this.text0.y = (top !== 'auto' ? 0 : itemGap) + translateY
        this.text1.x =
          (right !== 'auto' ? -text1Width + itemWidth : 0) + translateX
        this.text1.y =
          height - text1Height - (top === 'auto' ? 0 : itemGap) + translateY
      } else {
        this.text0.x = translateX
        this.text0.y = translateY
        this.text1.x = width - text1Width + translateX
        this.text1.y = translateY
      }
    }
    this.layout = {
      width,
      height,
      translateX,
      translateY
    }

    this.setItemlistLayout()
  }

  setItemlistLayout() {
    const { translateX, translateY } = this.layout,
      { itemWidth, itemHeight, itemGap, right, top, orient } = this.options

    this.itemList.forEach(item => {
      const { x, y } = item,
        deltaxText = right !== 'auto' && orient === 'vertical' ? -1 : 1,
        deltaY = orient === 'horizontal' ? 0 : top !== 'auto' ? 0 : 1,
        rectx = x + translateX,
        recty = y + translateY + itemGap * deltaY,
        textx = x + translateX + itemGap + itemWidth * deltaxText,
        texty = y + translateY + itemHeight / 2 + itemGap * deltaY
      item.rectx = rectx
      item.recty = recty
      item.textx = textx
      item.texty = texty
    })
  }

  render() {
    this.renderInit()
    this.response = []
    const { textStyle, itemHeight, right, orient, inactiveColor } = this.options

    this.setItemlistLayout()
    drawText(this.ctx, this.text0)
    drawText(this.ctx, this.text1)

    this.itemList.forEach(item => {
      const { textx, texty, text, textWidth } = item
      let change = false
      this.drawFillRoundRect(item)
      this.drawTextRect(
        textx,
        texty - itemHeight / 2,
        textWidth,
        textStyle.fontSize
      )
      drawText(this.ctx, {
        ...textStyle,
        text,
        textAlign: right !== 'auto' && orient === 'vertical' ? 'right' : 'left',
        x: textx,
        y: texty,
        detect: textOptions => {
          if (this.isDetect()) {
            if (this.mouse.event.type === 'click') {
              change = true
              item.selected = !item.selected
            }
            this.mouseDetect({
              type: 'text',
              ...item
            })
          }
          this.ctx.fillStyle = item.selected ? textStyle.color : inactiveColor
          this.ctx.fillText(text, textx, texty)
        }
      })

      change && this.drawFillRoundRect(item, true)
    })
    if (!this.response.length) {
      this.el.style.cursor = 'default'
      this.emit('mouseout')
    }
  }

  renderInit() {
    this.ctx.clearRect(0, 0, this.size.width, this.size.height)
    // const {translateX, translateY, width, height} = this.layout
    // this.ctx.clearRect(translateX, translateY, width, height)
    // this.drawBg()
  }

  drawBg() {
    const { translateX, translateY, width, height } = this.layout,
      { background, borderColor, borderWidth } = this.options
    drawRect(this.ctx, {
      x: translateX,
      y: translateY,
      width,
      height,
      color: background
    })
    borderWidth &&
      drawRect(this.ctx, {
        x: translateX,
        y: translateY,
        width,
        height,
        color: borderColor,
        type: 'stroke',
        lineWidth: borderWidth
      })
  }

  drawFillRoundRect(options, redraw) {
    const { rectx: x, recty: y, color } = options,
      { itemWidth, itemHeight, itemRadius } = this.options
    this.ctx.save()
    this.ctx.translate(x, y)
    redraw && this.ctx.clearRect(0, 0, itemWidth, itemHeight)
    drawRoundRect(this.ctx, itemWidth, itemHeight, itemRadius)
    if (!redraw && this.isDetect()) {
      if (this.mouse.event.type === 'click') {
        options.selected = !options.selected
      }
      this.mouseDetect({ ...options, type: 'roundRect' })
    }
    this.ctx.fillStyle = options.selected ? color : this.options.inactiveColor
    this.ctx.fill()
    this.ctx.restore()
  }

  // 辅助text鼠标事件
  drawTextRect(x, y, width, height) {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    this.ctx.rect(x, y, width, height)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.restore()
  }

  getItemList() {
    const { splitNumber, max, min, precision } = this.options,
      pieceValue = (max - min) / splitNumber
    this.valueScale = scaleLinear()
      .domain([min, max])
      .range([0, splitNumber])
    return Array.from({ length: splitNumber }, (item, i) => {
      const min = toFixed(i * pieceValue, precision),
        max = toFixed((i + 1) * pieceValue, precision)
      return {
        min,
        max,
        color: this.color[this.valueScale(i * pieceValue)]
      }
    })
  }

  getColor(value) {
    const item = this.itemList.find(
      item => value >= item.min && value <= item.max
    )
    if (item) return item.color
    const { min, max } = this.options
    if (min > value) return this.color[0]
    if (max < value) return this.color.slice(-1)[0]
  }

  destroy() {
    off(this.el, 'mousemove', this.repaint.bind(this))
    off(this.el, 'click', this.repaint.bind(this))
    this.off('click')
    this.off('mouseover')
    this.off('mouseout')
    !this.options.context && off(window, 'resize', this.resize.bind(this))
  }
}
