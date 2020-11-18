import merge from 'lodash/merge'
import {scaleLinear} from 'd3-scale'
import Mixin from '../../core/mixin'
import {on, off} from '../../libs/dom'
import {getTranslate} from '../../core/layout'
import {toFixed} from '../../tool/util'
import {drawText, getTextWidth, getPixelColor} from '../../tool/canvas'
import {drawTrangle, drawRect} from '../../core/shape'
import {continuousOptions} from './options'

export default class ContinuousVisualMap extends Mixin {
  constructor(el, options) {
    super(el, options)
    this.layout = {}
    this.options = merge({}, continuousOptions, options)
    this.options.show && this.init()
  }

  init() {
    !this.options.context && this.setSize()
    !this.options.context && this.initCanvas()
    this.setScale()
    this.setLayout()
    this.render()
    this.initRange()
    if (this.options.calculable) {
      on(this.el, 'mousedown', this.mousedown.bind(this))
      on(this.el, 'mouseup', this.mouseup.bind(this))
    }
    on(this.el, 'mousemove', this.mousemove.bind(this))
    !this.options.context && on(window, 'resize', this.resize.bind(this))
  }

  setScale() {
    const {min, max, itemHeight} = this.options
    this.colorScale = scaleLinear()
      .domain([0, itemHeight])
      .range([min, max])
    this.valueScale = scaleLinear()
      .domain([min, max])
      .range([0, itemHeight])
  }

  mouseDetect(options) {
    this.response.push(options)
    this.el.style.cursor = options.cursor
  }

  mousedown(event) {
    const {left, top} = this.el.getBoundingClientRect()
    this.downMouse = {
      x: event.clientX - left,
      y: event.clientY - top,
      event
    }
    // 在mousedown之前已经出发mousemove事件，所以这个时候this.response可能会有值
    if (this.response.length) {
      this.emit('mousedown')
    }
  }

  mousemove(event) {
    this.repaint(event)
    if (this.downMouse && (this.response.length || this.downMouse.object)) {
      if (this.response.length && this.response[0].type === 'colorBar') return
      this.controlMove()
      this.options.realtime && this.change()
      return
    }

    this.response.length &&
      this.emit('mouseover', {
        ...this.valueRange,
        ...this.response[0]
      })
  }

  change() {
    this.layout.range = {
      min: this.layout.minText.text,
      max: this.layout.maxText.text
    }
    this.emit('change', this.layout.range, this.layout)
  }

  mouseup(event) {
    this.downMouse = null
    !this.options.realtime && this.change()
    this.emit('mouseup')
  }

  controlMove() {
    !this.downMouse.object && (this.downMouse.object = {...this.response[0]})
    const {type, offset} = this.downMouse.object,
      {orient, itemHeight} = this.options,
      {highControl, lowControl} = this.layout
    if (orient === 'vertical') {
      if (type === 'highControl') {
        highControl.offset = offset + this.mouse.y - this.downMouse.y
        highControl.offset =
          highControl.offset >= lowControl.offset
            ? lowControl.offset
            : highControl.offset
        highControl.offset <= 0 && (highControl.offset = 0)
      } else {
        lowControl.offset = offset + this.mouse.y - this.downMouse.y
        lowControl.offset =
          lowControl.offset <= highControl.offset
            ? highControl.offset
            : lowControl.offset
        lowControl.offset >= itemHeight && (lowControl.offset = itemHeight)
      }
    } else {
      if (type === 'highControl') {
        highControl.offset = offset + this.mouse.x - this.downMouse.x
        highControl.offset =
          highControl.offset <= lowControl.offset
            ? lowControl.offset
            : highControl.offset
        highControl.offset >= itemHeight && (highControl.offset = itemHeight)
      } else {
        lowControl.offset = offset + this.mouse.x - this.downMouse.x
        lowControl.offset =
          lowControl.offset >= highControl.offset
            ? highControl.offset
            : lowControl.offset
        lowControl.offset <= 0 && (lowControl.offset = 0)
      }
    }
  }

  initRange() {
    const {range, orient, itemHeight} = this.options
    if (!Array.isArray(range)) return
    const valueRange = range.map(v => this.valueScale(v)),
      {highControl, lowControl} = this.layout
    if (orient === 'vertical') {
      highControl.offset = valueRange[1] ? itemHeight - valueRange[1] : 0
      lowControl.offset = valueRange[0]
        ? itemHeight - valueRange[0]
        : itemHeight
    }
    if (orient === 'horizontal') {
      lowControl.offset = valueRange[0] ? valueRange[0] : 0
      highControl.offset = valueRange[1] ? valueRange[1] : itemHeight
    }
    setTimeout(_ => {
      this.render()
      if (!this.calculable) {
        const {precision, orient} = this.options,
          {minText, maxText, highControl, lowControl} = this.layout
        minText.text = toFixed(
          this.colorScale(
            orient === 'vertical'
              ? itemHeight - lowControl.offset
              : lowControl.offset
          ),
          precision
        )
        maxText.text = toFixed(
          this.colorScale(
            orient === 'vertical'
              ? itemHeight - highControl.offset
              : highControl.offset
          ),
          precision
        )
      }
      this.change()
    }, 20)
  }

  setLayout() {
    const {
        itemHeight,
        itemWidth,
        textGap,
        textStyle,
        min,
        max,
        controller,
        orient,
        color,
        right,
        top,
        textControlGap
      } = this.options,
      text = this.options.text || ['', ''],
      highText = {
        x: 0,
        y: 0,
        text: text[0],
        width: getTextWidth(this.ctx, text[0], textStyle)
      },
      lowText = {
        x: 0,
        y: 0,
        text: text[1],
        width: getTextWidth(this.ctx, text[1], textStyle)
      },
      textWidth = Math.max(highText.width, lowText.width),
      colorBar = {
        x: 0,
        y: 0,
        type: 'colorBar',
        cursor: 'n-resize'
      },
      highControl = {
        offset: 0,
        color: color[0],
        x: 0,
        y: 0,
        cursor: 'n-resize',
        type: 'highControl'
      },
      lowControl = {
        offset: itemHeight,
        color: color.slice(-1)[0],
        x: 0,
        y: 0,
        cursor: 'n-resize',
        type: 'lowControl'
      },
      minText = {
        text: min,
        x: 0,
        y: 0,
        width: getTextWidth(this.ctx, min, textStyle),
        textBaseline: 'top',
        textAlign: 'left',
        cursor: 'n-resize'
      },
      maxText = {
        text: max,
        x: 0,
        y: 0,
        width: getTextWidth(this.ctx, max, textStyle),
        textBaseline: 'bottom',
        textAlign: 'left',
        cursor: 'n-resize'
      }

    let width, height
    if (orient === 'vertical') {
      const mainWidth =
          itemWidth +
          textGap +
          Math.max(minText.width, maxText.width) +
          controller.width,
        tx = (textWidth - itemWidth) / 2

      width = Math.max(mainWidth + tx, textWidth)
      height =
        itemHeight +
        controller.height * 2 +
        (text ? textControlGap + textStyle.fontSize * 2 : 0)
      colorBar.x = textWidth > itemWidth ? tx : 0
      colorBar.y =
        (highText ? textStyle.fontSize : 0) + controller.height + textControlGap
      highText.x = lowText.x = Math.max(highText.width / 2, lowText.width / 2)
      lowText.y = colorBar.y + itemHeight + controller.height + textControlGap
      if (right !== 'auto') {
        highControl.x = colorBar.x - controller.width
        highControl.y = colorBar.y
        lowControl.x = highControl.x
        lowControl.y = itemHeight + highControl.y
        minText.textAlign = maxText.textAlign = 'right'
        maxText.x = highControl.x - textGap
        maxText.y = highControl.y
        minText.x = maxText.x
        minText.y = lowControl.y
      } else {
        highControl.x = colorBar.x + itemWidth
        highControl.y = colorBar.y
        lowControl.x = highControl.x
        lowControl.y = itemHeight + highControl.y
        maxText.x = highControl.x + textGap + controller.width
        maxText.y = highControl.y
        minText.x = maxText.x
        minText.y = lowControl.y
      }
      colorBar.cursor = maxText.cursor = minText.cursor = highControl.cursor = lowControl.cursor =
        'n-resize'
    } else {
      const controlerMinWidth = minText.width + textGap + controller.width,
        controlerMaxWidth = maxText.width + textGap + controller.width
      width =
        itemHeight +
        Math.max(controlerMaxWidth, highText.width + textGap) +
        Math.max(controlerMinWidth, lowText.width + textGap)
      height = controller.height + itemWidth
      colorBar.x = Math.max(lowText.width + textGap, controlerMinWidth)
      colorBar.y = controller.height
      lowText.y = colorBar.y + (itemWidth - textStyle.fontSize) / 2
      lowText.x = lowText.width / 2
      highText.y = lowText.y
      highText.x = colorBar.x + itemHeight + highText.width / 2 + textGap
      lowControl.x = colorBar.x - controller.width
      highControl.x = colorBar.x + itemHeight
      lowControl.offset = 0
      highControl.offset = itemHeight
      minText.textAlign = 'right'
      minText.x = lowControl.x - textGap
      maxText.x = highControl.x + textGap + controller.width
      minText.textBaseline = maxText.textBaseline = 'top'
      if (top !== 'auto') {
        lowText.y = highText.y = lowText.y - colorBar.y
        colorBar.y = 0
        lowControl.y = highControl.y = itemWidth
        minText.y = maxText.y = itemWidth
      }
      colorBar.cursor = maxText.cursor = minText.cursor = highControl.cursor = lowControl.cursor =
        'e-resize'
    }
    const {translateX, translateY} = getTranslate(this.el, this.options, {
      width,
      height,
      rightWidth: Math.max(highText.width, lowText.width, itemWidth)
    })
    this.layout = {
      width,
      height,
      translateX,
      translateY,
      colorBar,
      highText,
      lowText,
      highControl,
      lowControl,
      minText,
      maxText
    }
  }

  render() {
    this.renderInit()
    this.response = []
    const {
        translateX,
        translateY,
        highText,
        lowText,
        highControl,
        lowControl,
        minText,
        maxText
      } = this.layout,
      {textStyle, orient, calculable} = this.options
    highText.text &&
      drawText(this.ctx, {
        x: translateX + highText.x,
        y: translateY + highText.y,
        text: highText.text,
        textBaseline: 'top',
        ...textStyle
      })
    lowText.text &&
      drawText(this.ctx, {
        x: translateX + lowText.x,
        y: translateY + lowText.y,
        text: lowText.text,
        textBaseline: 'top',
        ...textStyle
      })
    this.drawColorBar()
    if (calculable) {
      if (orient === 'vertical') {
        this.drawControl(highControl, maxText, 'up-left')
        this.drawControl(lowControl, minText, 'down-left')
      } else {
        this.drawControl(lowControl, minText, 'down-left')
        this.drawControl(highControl, maxText, 'up-right')
      }
    }
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
    const {translateX, translateY, width, height} = this.layout,
      {background, borderColor, borderWidth} = this.options
    drawRect(this.ctx, {
      x: translateX,
      y: translateY,
      width,
      height,
      color: background
    })
    borderColor &&
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

  drawColorBar() {
    const {itemWidth, itemHeight, color, orient, inactiveColor} = this.options,
      {highControl, lowControl, colorBar, translateX, translateY} = this.layout,
      gradient =
        orient === 'vertical'
          ? this.ctx.createLinearGradient(0, 0, 0, itemHeight)
          : this.ctx.createLinearGradient(0, 0, itemHeight, 0),
      length = color.length - 1,
      _color = orient === 'vertical' ? color : [...color].reverse()
    _color.forEach((color, i) => {
      gradient.addColorStop(i / length, color)
    })

    let detected = false
    orient === 'vertical'
      ? drawRect(this.ctx, {
          x: translateX + colorBar.x,
          y: translateY + colorBar.y,
          width: itemWidth,
          height: itemHeight,
          color: gradient,
          detect: _ => {
            this.ctx.fillStyle = gradient
            this.ctx.fill()
            if (this.isDetect()) {
              detected = true
            }
          }
        })
      : drawRect(this.ctx, {
          x: translateX + colorBar.x,
          y: translateY + colorBar.y,
          width: itemHeight,
          height: itemWidth,
          color: gradient,
          detect: _ => {
            this.ctx.fillStyle = gradient
            this.ctx.fill()
            if (this.isDetect()) {
              detected = true
            }
          }
        })

    orient === 'vertical'
      ? drawRect(this.ctx, {
          x: translateX + colorBar.x,
          y: translateY + colorBar.y,
          width: itemWidth,
          height: highControl.offset,
          color: inactiveColor
        })
      : drawRect(this.ctx, {
          x: translateX + colorBar.x + highControl.offset,
          y: translateY + colorBar.y,
          width: itemHeight - highControl.offset,
          height: itemWidth,
          color: inactiveColor
        })

    orient === 'vertical'
      ? drawRect(this.ctx, {
          x: translateX + colorBar.x,
          y: translateY + colorBar.y + lowControl.offset,
          width: itemWidth,
          height: itemHeight - lowControl.offset,
          color: inactiveColor
        })
      : drawRect(this.ctx, {
          x: translateX + colorBar.x,
          y: translateY + colorBar.y,
          width: lowControl.offset,
          height: itemWidth,
          color: inactiveColor,
          _type: 'aaa'
        })
    if (detected) {
      !this.downMouse &&
        (orient === 'vertical'
          ? this.drawVerticalColorBarTip()
          : this.drawHorizontalColorBarTip())
      this.mouseDetect(colorBar)
    }
  }

  drawVerticalColorBarTip() {
    const {
        textGap,
        textStyle,
        itemHeight,
        right,
        controller,
        precision,
        tipWidth,
        tipHeight,
        min: minValue,
        max: maxValue
      } = this.options,
      {colorBar, translateX, translateY, lowControl} = this.layout,
      textAlign = right === 'auto' ? 'left' : 'right',
      x =
        translateX +
        lowControl.x +
        (right === 'auto' ? -1 : controller.width + 1),
      y = this.mouse.y,
      min = colorBar.y + translateY,
      max = colorBar.y + itemHeight + translateY,
      color = getPixelColor(this.ctx, x, y >= max ? y - 1 : y),
      value = toFixed(this.colorScale(max - y), precision),
      text = right === 'auto' ? `≈ ${value}` : `${value} ≈`,
      delta = textAlign === 'left' ? 1 : -1,
      x1 = x,
      y1 = y - tipHeight <= min ? min : y - tipHeight,
      x2 = x + tipWidth * delta,
      y2 = y,
      x3 = x,
      y3 = y + tipHeight >= max ? max : y + tipHeight,
      textx = x2 + textGap * delta,
      texty = y + 1

    this.valueRange = {
      min: toFixed(this.colorScale(max - y - tipHeight), precision),
      max: toFixed(this.colorScale(max - y + tipHeight), precision)
    }
    this.valueRange.min < minValue && (this.valueRange.min = minValue)
    this.valueRange.min > maxValue && (this.valueRange.max = maxValue)
    drawTrangle(this.ctx, {
      x1,
      y1,
      x2,
      y2,
      x3,
      y3,
      color
    })
    drawText(this.ctx, {
      ...textStyle,
      text: text,
      textAlign,
      textBaseline: 'middle',
      fontSize: 12,
      x: textx,
      y: texty
    })
  }

  drawHorizontalColorBarTip() {
    const {
        textGap,
        textStyle,
        itemHeight,
        top,
        controller,
        precision,
        tipWidth,
        tipHeight,
        min: minValue,
        max: maxValue
      } = this.options,
      {colorBar, translateX, translateY, lowControl} = this.layout,
      x = this.mouse.x,
      y =
        translateY +
        lowControl.y +
        (top === 'auto' ? controller.height + 1 : -1),
      textBaseline = top === 'auto' ? 'bottom' : 'top',
      delta = top === 'auto' ? -1 : 1,
      min = colorBar.x + translateX,
      max = colorBar.x + itemHeight + translateX,
      color = getPixelColor(this.ctx, x >= max ? x - 1 : x, y - 1),
      value = toFixed(this.colorScale(x - min), precision),
      text = `≈ ${value}`,
      x1 = x - tipWidth <= min ? min : x - tipWidth,
      y1 = y,
      x2 = x,
      y2 = y + delta * tipHeight,
      x3 = x + tipHeight >= max ? max : x + tipWidth,
      y3 = y,
      textx = x2,
      texty = y + textGap * delta

    // this.valueRange = [toFixed(this.colorScale(x - min - tipWidth), precision), toFixed(this.colorScale(x - min + tipWidth), precision)]
    this.valueRange = {
      min: toFixed(this.colorScale(x - min - tipWidth), precision),
      max: toFixed(this.colorScale(x - min + tipWidth), precision)
    }
    this.valueRange.min < minValue && (this.valueRange.min = minValue)
    this.valueRange.max > maxValue && (this.valueRange.max = maxValue)

    drawTrangle(this.ctx, {
      x1,
      y1,
      x2,
      y2,
      x3,
      y3,
      color
    })
    drawText(this.ctx, {
      ...textStyle,
      text: text,
      textAlign: 'center',
      textBaseline,
      fontSize: 12,
      x: textx,
      y: texty
    })
  }

  drawControl(control, text, dir) {
    const {translateX, translateY} = this.layout,
      {controller, textStyle, orient, itemHeight, precision} = this.options,
      {width, height} = controller,
      offsetX =
        orient === 'vertical'
          ? 0
          : control.type === 'highControl'
          ? control.offset - itemHeight
          : control.offset,
      offsetY =
        orient === 'vertical'
          ? control.type === 'highControl'
            ? control.offset
            : control.offset - itemHeight
          : 0,
      x1 = translateX + control.x + offsetX,
      y1 = translateY + control.y + offsetY,
      x2 = x1 + (control.width || width),
      y2 = y1,
      textx = text.x + translateX + offsetX,
      texty = y1
    text.text = toFixed(
      this.colorScale(
        orient === 'vertical' ? itemHeight - control.offset : control.offset
      ),
      precision
    )
    let x3, y3
    if (dir === 'up-left') {
      x3 = x2
      y3 = y1 - height
    } else if (dir === 'up-right') {
      x3 = x2 - (control.width || width)
      y3 = y1 + height
    } else if (dir === 'down-left') {
      x3 = x2
      y3 = y1 + height
    } else if (dir === 'down-right') {
      x3 = x2 + (control.width || width)
      y3 = y1 + height
    }
    drawTrangle(this.ctx, {
      x1,
      y1,
      x2,
      y2,
      x3,
      y3,
      type: 'fill',
      color: control.color,
      detect: () => {
        if (this.isDetect()) {
          this.mouseDetect(control)
        }
        this.ctx.fillStyle = control.color
        this.ctx.fill()
      }
    })

    drawText(this.ctx, {
      ...textStyle,
      ...text,
      x: textx,
      y: texty
    })
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

  getColor(value) {
    const scaleValue = this.valueScale(value),
      {orient, itemHeight} = this.options,
      {translateX, translateY, colorBar} = this.layout,
      x =
        translateX +
        colorBar.x +
        (orient === 'vertical'
          ? 0
          : scaleValue === itemHeight
          ? scaleValue - 1
          : 0),
      y =
        translateY +
        colorBar.y +
        (orient === 'vertical'
          ? scaleValue === 0
            ? itemHeight - 1
            : itemHeight - scaleValue
          : 0)
    return getPixelColor(this.ctx, x, y)
  }

  destroy() {
    off(this.el, 'mousedown', this.mousedown.bind(this))
    off(this.el, 'mousemove', this.mousemove.bind(this))
    off(this.el, 'mouseup', this.mouseup.bind(this))
    this.off('mouseover')
    this.off('mouseout')
    this.off('mousedown')
    this.off('mouseup')
    this.off('change')
    !this.options.context && off(window, 'resize', this.resize.bind(this))
  }
}
