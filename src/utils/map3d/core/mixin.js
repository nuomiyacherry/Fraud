import EventEmitter from '../libs/event-emitter'
import {setStyles} from '../libs/dom'
import {createCanvas} from '../tool/canvas'

export default class Mixin extends EventEmitter {
  constructor(el, options) {
    super()
    this.el = el
    if (options.context) {
      this.ctx = options.context
      this.canvas = options.canvas
      const canvas = options.canvas || options.context.canvas
      this.size = {
        width: canvas.width,
        height: canvas.height
      }
    }
  }

  init() {}

  repaint(event) {
    const {left, top} = this.el.getBoundingClientRect()
    this.mouse = {
      x: event.clientX - left,
      y: event.clientY - top,
      event
    }
    this.render()
  }

  render() {}

  isDetect() {
    return this.mouse && this.ctx.isPointInPath(this.mouse.x, this.mouse.y)
  }

  setLayout() {}

  setSize() {
    const {offsetWidth, offsetHeight} = this.el
    this.size = {
      width: offsetWidth,
      height: offsetHeight
    }
    if (this.canvas) {
      this.canvas.width = offsetWidth
      this.canvas.height = offsetHeight
    }
  }

  initCanvas() {
    const {context, canvas} = createCanvas(this.size.width, this.size.height)
    this.ctx = context
    this.canvas = canvas
    this.el.appendChild(canvas)
    setStyles(this.canvas, {
      position: 'absolute',
      zIndex: 0,
      left: 0,
      top: 0
    })
  }

  resize() {
    !this.options.context && this.setSize()
    this.setLayout()
    this.render()
  }

  destroy() {}
}
