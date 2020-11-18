import { on, off, setStyles } from './dom'

export default class Arctext {
  constructor(el, options) {
    this.el = el
    this.options = {
      // 弯曲度数，最小的值是文字长度，如果设置为-1，则显示直线
      radius: 0,
      // 1：向下弯曲, 非1（-1,0,2等）：向上弯曲
      dir: 1,
      // 默认true，为false则不旋转文字
      rotate: true,
      // 默认false,如果你想尝试使用fitText插件，设置为true，记住包装的标签需要fluid布局
      fitText: false,
      // 过渡效果
      animation: {
        speed: 0, //ms
        easing: 'linear'
      },
      ...options
    }
    this._init()
  }

  _init() {
    this._applyLettering()
    this.el.arctext = true
    this._calc()
    this._rotateWord()
    this._loadEvents()
  }

  _applyLettering() {
    Arctext.injector(this.el, '', 'char', '')
    this.options.fitText && this.el.fitText()
    this.$letters = this.el.querySelectorAll('span')
    this.$letters.forEach(letter => {
      letter.style.display = 'inline-block'
    })
  }

  _calc() {
    if (this.options.radius === -1) return false
    // 计算单词弯曲后的长度与距离
    this._calcBase()
    // 获取letter最终的值
    this._calcLetters()
  }

  _calcBase() {
    this.totalWidth = 0
    this.$letters.forEach(letter => {
      const width = letter.offsetWidth
      this.totalWidth += width
      letter.center = this.totalWidth - width / 2
    })

    // 中间letter的位置
    const centerWord = this.totalWidth / 2
    if (this.options.radius < centerWord) this.options.radius = centerWord

    // 计算第一个letter到最后一个letter的角度
    const angle = 2 * Math.asin(centerWord / this.options.radius)
    // 弧长 = 半径 * 角度
    this.totalArc = this.options.radius * angle
  }

  _calcLetters() {
    let iteratorX = 0

    const { radius, rotate, dir } = this.options
    this.$letters.forEach(letter => {
      // 根据每个字母在原单词上所占的百分比计算每个字母的半弧
      const letterArc = (letter.offsetWidth / this.totalWidth) * this.totalArc,
        // 获取单位letter角度，除2将文字的角度分成两份，计算到文字中心
        beta = letterArc / 2 / radius,
        // 从半圆弧弦的中点到圆心的距离, 这就是字母的位置，到圆心的距离
        h = radius * Math.cos(beta),
        // 弦的x轴和最左边的点形成的角
        alpha = Math.acos((this.totalWidth / 2 - iteratorX) / radius),
        // 弦的x轴和弦的最右点构成的角
        theta = alpha + beta,
        // 由h构成的三角形的边长与x轴正交的距离
        x = Math.cos(theta) * h,
        y = Math.sin(theta) * h,
        // 弦中点的坐标x的值
        // xpos = iteratorX + Math.abs(this.totalWidth / 2 - x - iteratorX),
        xpos = Math.abs(this.totalWidth / 2 - x),
        // 计算最终的偏移量，同时计算相应旋转字母的角度
        xval = 0 | (xpos - letter.center),
        yval = 0 | (radius - y),
        angle = rotate ? 0 | (-Math.asin(x / radius) * (180 / Math.PI)) : 0

      iteratorX = 2 * xpos - iteratorX
      letter.x = xval
      letter.y = dir === 1 ? yval : -yval
      letter.angle = dir === 1 ? angle : -angle
    })
  }

  _rotateWord(animation) {
    if (!this.el.arctext) return
    const boolean = this.options.radius === -1,
      { speed = 0, easing = 'linear' } = animation || {}
    this.$letters.forEach(letter => {
      const { x, y, angle } = letter,
        transform = boolean
          ? 'none'
          : `translate(${x}px, ${y}px) rotate(${angle}deg)`,
        transition = animation ? `all ${speed}ms ${easing}` : 'none'
      setStyles(letter, {
        webkitTransition: transition,
        MozTransition: transition,
        OTransition: transition,
        msTransition: transition,
        transition: transition,
        webkitTransform: transform,
        MozTransform: transform,
        OTransform: transform,
        msTransform: transform,
        transform: transform
      })
    })
  }

  _loadEvents() {
    if (this.options.fitText) {
      on(window, 'resize', this.resize.bind(this))
    }
  }

  set(opts) {
    const { radius, dir, rotate } = opts
    if (!radius && !dir && rotate === 'undefined') return false
    this.options.radius = radius || this.options.radius
    this.options.dir = dir || this.options.dir

    if (rotate !== undefined) {
      this.options.rotate = rotate
    }
    this._calc()
    this._rotateWord(opts.animation)
  }

  destroy() {
    this.options.radius = -1
    this._rotateWord()
    this.$letters.forEach(letter => {
      letter.x = null
      letter.y = null
      letter.angle = null
      letter.center = null
    })
    this.el.arctext = null
    this.$el.removeData('arctext')
    off(window, 'resize', this.resize.bind(this))
  }

  resize() {
    this._calc()
    this._rotateWord()
  }

  fitText(compressor = 1, options) {
    const settings = {
      minFontSize: Number.NEGATIVE_INFINITY, // -Infinity
      maxFontSize: Number.POSITIVE_INFINITY // Infinity
    }
    return _ => {
      options && Object.assign(settings, options)
      const fontSize = Math.max(
          Math.min(
            this.el.clientWidth / (compressor * 10),
            parseFloat(settings.maxFontSize)
          ),
          parseFloat(settings.minFontSize)
        ),
        resizer = _ => {
          setStyles(this.el, {
            fontSize: `${fontSize}px`
          })
        }
      resizer()
      on(window, 'resize', resizer.bind(this))
    }
  }

  // changed injector function: add &nbsp; for empty chars.
  static injector(t, splitter, klass, after) {
    const char = t.innerText.split(splitter)
    let inject = '',
      emptyClass
    if (char.length) {
      char.forEach((item, i) => {
        emptyClass = ''
        if (item === ' ') {
          emptyClass = ' empty'
          item = '&nbsp;'
        }
        inject += `
          <span class="${klass + (i + 1) + emptyClass}">${item}</span>${after}
        `
      })
      t.innerHTML = ''
      t.innerHTML = inject
    }
  }
}
