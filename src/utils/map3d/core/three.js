import * as THREE from 'three'
import { addControls, addGui, addTween, addStats } from './util'
import EventEmitter from '../libs/event-emitter'
import { requestAnimationFrame, on, off, setStyles } from '../libs/dom'
import merge from 'lodash/merge'

export default class Three extends EventEmitter {
  constructor(el, options) {
    super()
    this.el = el
    setStyles(el, {
      width: '100%',
      height: '100%',
      position: 'relative'
    })
    this.createCanvasContainer()
    const aspect = 2,
      defaultOpt = {
        stats: false,
        gui: false,
        tween: true,
        controls: false,
        background: '#000000',
        opcity: 1,
        autoResize: true,
        rendererOptions: {
          // 开启抗锯齿,使线条平滑
          antialias: true,
          // 在背景色透明显示渐变色
          alpha: true
        },
        ftp: 60,
        // createCamera为 OrthographicCamera时aspect必传，window.resize是需要用到
        aspect
      }
    this.options = merge({}, defaultOpt, options)

    this.f = Math.round(60 / this.options.ftp)
    this.skip = 0
    // 存储鼠标事件方法
    this.Events = []
    // this.necessaryInit()
  }

  createCanvasContainer() {
    this.container = document.createElement('div')
    setStyles(this.container, {
      position: 'absolute',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      padding: '0px',
      margin: '0px',
      borderWidth: '0px',
      top: 0,
      left: 0
    })
    this.el.appendChild(this.container)
  }

  async necessaryInit() {
    const { stats, gui, tween, controls, autoResize } = this.options
    this.setSize()
    this.gui && this.gui.destroy()
    this.scene = new THREE.Scene()
    this.setRenderer()
    this.setCamera()
    // this.scene.background = new THREE.Color(0xff0000)
    this.scene.add(this.camera)

    if (process.env.NODE_ENV === 'development') {
      if (stats) {
        await addStats(this)
      }
      if (gui) {
        await addGui(this)
      }
    }
    if (tween) {
      await addTween(this)
    }
    if (controls) {
      await addControls(this)
    }
    autoResize && on(window, 'resize', this._resize.bind(this))
  }

  // on(eventType, callback) {
  //   this.eventEmitter.off(eventType, callback)
  // }

  // off(eventType, callback) {
  //   this.eventEmitter.off(eventType, callback)
  // }

  // emit(eventType, ...args) {
  //   this.eventEmitter.emit()
  // }

  // once()

  // 子类覆盖
  render() {}

  // 子类覆盖
  setCamera() {}

  // 注册鼠标事件
  registerMouseEvent(eventType, callback, meshes) {
    // const canvas = this.renderer.domElement,
    const fn = e => {
      e.intersects = this.getIntersects(e, meshes)
      callback && callback.call(this, e)
    }
    on(this.container, eventType, fn)
    this.Events.push({ eventType, callback: fn })
  }

  /**
   * 获取鼠标事件产生的 THREE.Object3D对象
   * 使用e.offsetX而不使用e.clientX是父元素相对屏幕的位置会有偏移，用clientX会导致Mesh定位不准
   * @param {鼠标事件对象} e
   * @return [Array] THREE.Object3D对象组成的数组
   */
  getIntersects(e, meshes) {
    const width = e.target.width,
      height = e.target.clientHeight
    !this.raycaster && (this.raycaster = new THREE.Raycaster())
    !this.mouseVector && (this.mouseVector = new THREE.Vector2())
    this.mouseVector.x = (e.offsetX / width) * 2 - 1
    this.mouseVector.y = -(e.offsetY / height) * 2 + 1
    this.raycaster.setFromCamera(this.mouseVector, this.camera)
    return this.raycaster.intersectObjects(meshes || this.scene.children, true)
  }

  remove(object) {
    if (object instanceof THREE.Group) {
      this.removeGroup(object)
    } else {
      this.removeObject(object)
    }
  }

  // 删除THREE.Group对象
  // group THREE.Group 对象或者 group名称
  removeGroup(group) {
    group =
      group instanceof THREE.Group ? group : this.scene.getObjectByName(group)
    if (!group) {
      return
    }
    group.children.forEach(item => {
      // console.log(item)
      if (item instanceof THREE.Group) {
        this.removeGroup(item)
      } else {
        this.removeObject(item)
      }
    })
    this.scene.remove(group)
  }

  removeObject(object) {
    if (
      object instanceof THREE.Mesh ||
      object instanceof THREE.Line ||
      object instanceof THREE.Points ||
      object instanceof THREE.LineLoop ||
      object instanceof THREE.LineSegments
    ) {
      object.geometry && object.geometry.dispose && object.geometry.dispose()
      object.material && object.material.dispose && object.material.dispose()
      this.scene.remove(object)
    }
  }

  removeEvents() {
    this.Events.forEach(({ eventType, callback }) => {
      off(this.renderer.domElement, eventType, callback)
    })

    this.Events = []
  }

  clear() {
    this.scene &&
      this.scene.children.forEach(group => {
        this.remove(group)
      })
    this.removeEvents()
  }
  // 清除WebGL上下文
  destroy() {
    if (!this.renderer) {
      return
    }
    this.destroyHook && this.destroyHook()
    const el = this.renderer.domElement.parentNode
    this.scene.remove(this.camera)
    this.clear()
    this.camera = null
    this.scene = null
    this.renderer.forceContextLoss()
    el.removeChild(this.renderer.domElement)
    this.renderer.context = null
    this.renderer.domElement = null
    this.renderer = null
    if (this.stats) {
      el.removeChild(this.stats.dom)
      this.stats = null
    }
    el.innerHTML = ''
    this.gui && this.gui.destroy()
    this._resize && off(window, 'resize', this._resize.bind(this))
  }

  setSize() {
    this.rendererSize = Object.freeze({
      width: this.container.clientWidth,
      height: this.container.clientHeight
    })
  }

  setRenderer() {
    const { width, height } = this.rendererSize,
      { rendererOptions, background, opacity } = this.options
    this.renderer = new THREE.WebGLRenderer(rendererOptions)
    this.renderer.shadowMapSoft = true
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(background, opacity)
    // setStyles(this.renderer.domElement, {
    //   position: 'absolute',
    //   zIndex: 10,
    //   left: 0,
    //   top: 0
    // })
    this.container.appendChild(this.renderer.domElement)
    // this.renderer = renderer 这里不能这么写，渲染会有问题
  }

  _render() {
    if (!this.renderer) {
      return
    }
    // 根据otpions中的 ftp 做跳帧处理，优化
    if (this.skip !== 0 || this.f === 1) {
      this.options.render && this.options.render()
      this.render && this.render()
      this.stats && this.stats.update()
      this.controls && this.controls.update()
      this.renderer.render(this.scene, this.camera)

      this.skip = ++this.skip % this.f
    } else {
      this.skip = ++this.skip % this.f
    }
    requestAnimationFrame(this._render.bind(this))
  }

  _resize() {
    if (!this || !this.renderer) {
      return
    }
    this.setSize()
    this.resize && this.resize()
    const { width, height } = this.rendererSize
    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = width / height
    } else {
      const aspect = this.options.aspect
      this.camera.left = -width / aspect
      this.camera.right = width / aspect
      this.camera.top = height / aspect
      this.camera.bottom = -height / aspect
    }
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }
}
