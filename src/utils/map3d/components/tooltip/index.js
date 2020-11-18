import merge from 'lodash/merge'
import { setStyles, addClass, on, off } from '../../libs/dom'
import { defaultOptions } from './options'

const CLASS = 'map3d-tooltip'
export default class Tooltip {
  constructor(context, options, event) {
    this.context = context
    this.event = event

    this.html = ''
    this.options = merge({}, defaultOptions, options)
    this.init()
  }

  init() {
    let div = this.tooltipEl
    if (!div) {
      div = document.createElement('div')
      addClass(div, CLASS)
      this.tooltipEl = div
      this.context.el.appendChild(div)
    }
    const {
        position = [],
        background,
        border,
        borderType,
        borderRadius,
        borderWidth,
        padding,
        boxShadow,
        width,
        height,
        textStyle = {},
        transitionDuration,
        extraCssText
      } = this.options,
      {
        color,
        fontStyle,
        fontWeight,
        fontFamily,
        fontSize,
        lineHeight,
        whiteSpace
      } = textStyle
    setStyles(div, {
      position: 'absolute',
      left: position[0],
      top: position[1],
      width: `${width}px`,
      height: `${height}px`,
      background,
      borderColor: border,
      borderRadius: this.setMaxFourValues(borderRadius),
      borderWidth: `${borderWidth}px`,
      borderType,
      padding: this.setMaxFourValues(padding),
      display: 'none',
      whiteSpace,
      boxShadow,
      color,
      fontStyle,
      fontWeight,
      fontFamily,
      fontSize: `${fontSize}px`,
      lineHeight: `${lineHeight}px`,
      zIndex: 999,
      transition: `all ${transitionDuration}ms linear`
    })
    if (extraCssText) {
      div.style.cssText += extraCssText
    }
    on(div, 'mouseover', this.mouseover.bind(this))
    on(div, 'mouseout', this.mouseout.bind(this))
  }

  mouseover() {
    this.visible = this.options.enterable
  }

  mouseout() {
    this.visible = false
  }

  destroy() {
    off(this.tooltipEl, 'mouseover', this.mouseover.bind(this))
    off(this.tooltipEl, 'mouseout', this.mouseout.bind(this))
  }

  show(params) {
    setTimeout(_ => {
      this.tooltipEl.style.display = 'block'
      this.tooltipEl.innerHTML = this.getHtml(this.options.formatter, params)
      this.setPopperPos(params.event, this.tooltipEl, this.options)
    }, this.options.showDelay)
  }

  hide(event) {
    setTimeout(_ => {
      !this.visible && (this.tooltipEl.style.display = 'none')
    }, this.options.hideDelay)
  }

  getHtml(formatter, params) {
    if (typeof formatter === 'function') return formatter(params)
    if (!params.data || JSON.stringify(params.data) === '{}') {
      params.data = { name: params.name }
    }
    if (!params.data.value && formatter === defaultOptions.formatter) {
      formatter = '{name}'
    }
    !params.data.name && (params.data.name = params.name)
    Object.keys(params.data).forEach(key => {
      formatter = formatter.replace(`{${key}}`, params.data[key])
    })
    return formatter
  }

  setMaxFourValues(value) {
    if (typeof value === 'number') return `${value}px`
    if (Array.isArray(value)) return value.map(item => `${item}px`).join(', ')
    return value
  }

  setPopperPos(event, el, options = {}) {
    if (!el) return
    const { placement = 'right', offset = [20, 20], pointCenter } = options,
      { offsetX, offsetY } = event,
      { offsetWidth, offsetHeight } = el,
      rect = el.parentNode.getBoundingClientRect(),
      width = el.parentNode.offsetWidth,
      height = el.parentNode.offsetHeight,
      pl = offsetX - offsetWidth - offset[0],
      plc = offsetX - offsetWidth / 2,
      pr = offsetX + offset[0],
      pt = offsetY - offsetHeight - offset[1],
      ptc = offsetY - offsetHeight / 2,
      pb = offsetY + offset[1]
    let left, top

    if (placement === 'left') {
      left = pl < 0 ? pr : pl
    } else if (placement === 'right') {
      left = pr + offsetWidth > width ? pl : pr
    } else if (placement === 'top') {
      top = pt < 0 ? pb : pt
    } else if (placement === 'bottom') {
      top = pb + offsetHeight > height ? pt : pb
    }
    if (placement === 'left' || placement === 'right') {
      if (offsetY + offsetHeight / 2 > height) {
        pointCenter && (left = plc)
        top = pt
      } else if (offsetY - offsetHeight / 2 < 0) {
        pointCenter && (left = plc)
        top = pb + offsetHeight > height ? pt : pb
      } else {
        top = pointCenter ? ptc : pb
      }
    }
    if (placement === 'top' || placement === 'btottom') {
      if (offsetX + offsetWidth / 2 > width) {
        left = pl
        pointCenter && (top = ptc)
      } else if (offsetX - offsetWidth / 2 < 0) {
        left = pr
        pointCenter && (top = ptc)
      } else {
        left = pointCenter ? plc : pr
      }
      if (
        (top === pb && top + offsetHeight > height) ||
        (top < 0 && top === pt)
      ) {
        pointCenter && (top = ptc)
        left = left + offsetWidth > width ? pl : pr
      }
    }

    left < rect.left && (left = pr)
    top < rect.top && (top = pb)
    left + offsetWidth + rect.left > window.innerWidth && (left = pl)
    top + offsetHeight + rect.top > window.innerHeight && (top = pt)
    setStyles(el, {
      left: left + 'px',
      top: top + 'px'
    })
  }
}
