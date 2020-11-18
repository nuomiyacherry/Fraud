import {setStyles, on, off, removeClass, addClass} from '../libs/dom'

export default class Loading {
  constructor(container, options) {
    this.container = container || document.body
    this.options = {
      min: 20,
      max: 70,
      minMove: 10,
      maxMove: 20,
      styleId: 'Map3dLoadingStyles',
      id: 'Map3dLoading',
      wrapperClass: 'map3d-loading-wrapper',
      loadingClass: 'map3d-loading',
      animateClass: 'map3d-laoding-run',
      content: 'Loading...',
      ...options
    }
    this.init()
  }

  init() {
    this.addStyle()
    const {id, loadingClass, content, wrapperClass} = this.options
    this.el = this.container.querySelector(`#${id}`)
    if (!this.el) {
      this.el = document.createElement('div')
      this.el.innerHTML = `
        <div class="${loadingClass}">
          <div>${content}</div>
        </div>
      `
      addClass(this.el, wrapperClass)
      this.el.setAttribute('id', id)
      this.container.appendChild(this.el)
    }
    this.loadingEl = this.el.querySelector(`.${loadingClass}`)

    this.animate()
    this.lastSpan = this.loadingEl.lastElementChild
    this.lastSpan && on(this.lastSpan, 'animationend', this.animate.bind(this))
  }

  show() {
    this.animate()
  }

  hide() {
    setStyles(this.el, {
      opacity: 0,
      zIndex: -1
    })
    removeClass(this.loadingEl, this.options.animateClass)
    this.visible = false
  }

  destroy() {
    this.lastSpan && off(this.lastSpan, 'animationend', this.animate.bind(this))
    this.el.innerHTML = ''
    this.container && this.container.removeChild(this.el)
  }

  animate() {
    const {min, max, minMove, maxMove, animateClass, content} = this.options
    setStyles(this.el, {
      opacity: 1,
      zIndex: 1000
    })
    removeClass(this.loadingEl, animateClass)
    this.setCSSVars(this.loadingEl, min, max, minMove, maxMove, content)
    addClass(this.loadingEl, animateClass)
    this.visible = true
  }

  addStyle() {
    const {styleId, loadingClass, animateClass, wrapperClass} = this.options
    if (document.querySelector(`#${styleId}`)) return
    const style = document.createElement('style'),
      styleText = `
        .${wrapperClass} {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(50, 50, 50, 0.5);
          padding: 10px 20px;
          opacity: 1;
          transition: all 0.3s linear;
        }
        .${loadingClass} {
          --color: #F5F9FF;
          --duration: 2000ms;
          font-family: Roboto, Arial;
          font-size: 32px;
          white-space: nowrap;
          user-select: none;
          color: var(--color);
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .${loadingClass} span {
          --x: 0;
          --y: 0;
          --move-y: 0;
          --move-y-s: 0;
          --delay: 0ms;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          text-indent: calc(var(--x) * -1);
          overflow: hidden;
          transform: translate(var(--x), var(--y));
        }
        .${loadingClass}.${animateClass} div {
          opacity: 0;
        }
        .${loadingClass}.${animateClass} span {
          animation: move var(--duration) ease-in-out var(--delay);
        }

        @keyframes move {
          30% {
            transform: translate(var(--x), var(--move-y));
          }
          82% {
            transform: translate(var(--x), var(--move-y-s));
          }
        }
      `
    style.textContent = styleText
    style.setAttribute('id', styleId)
    document.head.append(style)
  }

  setCSSVars(el, min, max, minMove, maxMove, text) {
    const width = Math.ceil(el.clientWidth)
    for (let i = 1; i < width; i++) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min,
        numMove = Math.floor(Math.random() * (maxMove - minMove + 1)) + minMove,
        dir = i % 2 === 0 ? 1 : -1,
        spanCurrent = el.querySelector(`span:nth-child(${i})`),
        span = spanCurrent || document.createElement('span')
      span.style.cssText = `
        --x: ${i - 1}px;
        --move-y: ${num * dir}px;
        --move-y-s: ${(num - numMove) * dir}px;
        --delay: ${i * 10}ms;
      `
      if (!spanCurrent) {
        span.textContent = text
        el.appendChild(span)
      }
    }
  }
}
