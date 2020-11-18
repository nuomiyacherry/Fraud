/* eslint-disable */
import { setStyles, addClass } from '../libs/dom'

// 添加轨道控制依赖包
// eslint-disable-next-line
export async function addControls(context) {
  if (context.controls) return
  const {
    OrbitControls
  } = await import(/* webpackChunkName: 'three-orbit-controls' */ 'three/examples/jsm/controls/OrbitControls')
  context.controls = new OrbitControls(
    context.camera,
    // context.renderer.domElement
    context.el
  )
}

// 添加gui依赖包
// eslint-disable-next-line
export async function addGui(context) {
  if (context.gui) return
  const dat = await import(/* webpackChunkName: 'dat.gui' */ 'dat.gui')
  context.gui = new dat.GUI()
  setStyles(context.gui.domElement.parentNode, {
    zIndex: 10000
  })
}
// 添加tween动画依赖包
// eslint-disable-next-line
export async function addTween(context) {
  if (context.TWEEN) return
  const TWEEN = await import(/* webpackChunkName: 'tweenjs' */ '@tweenjs/tween.js')
  context.TWEEN = TWEEN
  context.tweenEasing = {
    linear: TWEEN.Easing.Linear.None,
    quadraticIn: TWEEN.Easing.Quadratic.In,
    quadraticOut: TWEEN.Easing.Quadratic.Out,
    quadraticInOut: TWEEN.Easing.Quadratic.InOut,
    cubicIn: TWEEN.Easing.Cubic.In,
    cubicOut: TWEEN.Easing.Cubic.Out,
    cubicInOut: TWEEN.Easing.Cubic.InOut,
    quarticIn: TWEEN.Easing.Quartic.In,
    quarticOut: TWEEN.Easing.Quartic.Out,
    quarticInOut: TWEEN.Easing.Quartic.InOut,
    quinticIn: TWEEN.Easing.Quintic.In,
    quinticOut: TWEEN.Easing.Quintic.Out,
    quinticInOut: TWEEN.Easing.Quintic.InOut,
    sinusoidalIn: TWEEN.Easing.Sinusoidal.In,
    sinusoidalOut: TWEEN.Easing.Sinusoidal.Out,
    sinusoidalInOut: TWEEN.Easing.Sinusoidal.InOut,
    exponentialIn: TWEEN.Easing.Exponential.In,
    exponentialOut: TWEEN.Easing.Exponential.Out,
    exponentialInOut: TWEEN.Easing.Exponential.InOut,
    circularIn: TWEEN.Easing.Circular.In,
    circularOut: TWEEN.Easing.Circular.Out,
    circularInOut: TWEEN.Easing.Circular.InOut,
    elasticIn: TWEEN.Easing.Elastic.In,
    elasticOut: TWEEN.Easing.Elastic.Out,
    elasticInOut: TWEEN.Easing.Elastic.InOut,
    backIn: TWEEN.Easing.Back.In,
    backOut: TWEEN.Easing.Back.Out,
    backInOut: TWEEN.Easing.Back.InOut,
    bounceIn: TWEEN.Easing.Bounce.In,
    bounceOut: TWEEN.Easing.Bounce.Out,
    bounceInOut: TWEEN.Easing.Bounce.InOut
  }
}

// 添加运行信息组件
// eslint-disable-next-line
export async function addStats(context) {
  if (context.stats) return
  const Stats = (await import(/* webpackChunkName: 'stats' */ 'stats.js'))
      .default,
    stats = new Stats(),
    dom = stats.dom
  stats.setMode(0) // 0: fps, 1: ms, 2: mb, 3+: custom
  setStyles(dom, {
    position: 'absolute',
    left: '10px',
    top: '10px',
    zIndex: 999
  })
  addClass(dom, 'three-stats')
  context.el.appendChild(dom)
  context.stats = stats
}
