import * as THREE from 'three'
import merge from 'lodash/merge'
import extend from 'lodash/extend'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import cloneDeep from 'lodash/cloneDeep'
import {createCanvas} from '../../tool/canvas'
import {COLOR, pointCount, flylineOpt} from './options'
import {getTexture} from '../../core/texture'

export default class Flyline {
  constructor(context, options) {
    const necessaryExtendProps = [
      'standardLayout',
      'mapCenterVectors',
      // 'coordToVector3',
      'scene',
      'TWEEN',
      'tweenEasing'
    ]
    this.defaultOptions = {
      ...flylineOpt,
      data: []
    }
    this.initOptions(options)
    extend(this, pick(context, necessaryExtendProps))
    this.context = context
    this.textures = []
    this.init()
  }

  init() {
    this.symbols = []
    this.symbolOpts = []
    this.allFlylines = null
    this.drawFlylines(this.options.data)
  }

  initOptions(options) {
    const _opt = omit(options, ['data']),
      _flylineOpt = merge({}, flylineOpt, _opt)
    options.data &&
      (this.defaultOptions.data = cloneDeep(options.data).map(item =>
        merge({}, _flylineOpt, item)
      ))
    this.options = merge({}, this.defaultOptions, _flylineOpt)
  }

  setOptions(options, repaint) {
    if (repaint) {
      this.allFlylines.forEach(item => {
        this.context.remove(item)
      })
      this.initOptions(options)
      this.init()
    } else {
      const data = cloneDeep(options).map(item => merge({}, flylineOpt, item))
      this.drawFlylines(data)
    }
  }

  render() {
    this.symbolAnimate()
    this.flylineTween && this.flylineTween.update()
  }

  symbolAnimate() {
    this.symbols.forEach(item => {
      item.progress > 1.0 && (item.progress = 0)
      item.progress += item.speed
      const {x, y, z} = item.curve.getPoint(item.progress) || []
      x && item.mesh.position.set(x, y, z)
    })
  }

  flylineAnimate() {
    !this.flylineTween && (this.flylineTween = new this.TWEEN.Group())
    this.flylineTween.removeAll()

    this.allFlylines.children.forEach(group => {
      const line = group.getObjectByName('flyline')
      if (!line || !line.tween) return
      const {animationDuration, animationEasing, points} = line.tween
      new this.TWEEN.Tween({endPointIndex: 0}, this.flylineTween)
        .to({endPointIndex: pointCount}, animationDuration)
        .easing(this.tweenEasing[animationEasing])
        .onUpdate(obj => {
          const endPointIndex = Math.ceil(obj.endPointIndex)
          // 这种设置在不是BufferGeometry时才有效果
          // line.geometry.vectices = new THREE.QuadraticBezierCurve3(points.slice(0, endPointIndex))
          line.geometry.setFromPoints(points.slice(0, endPointIndex))
          line.geometry.verticesNeedUpdate = true
        })
        .start()
    })
  }

  drawFlylines(data) {
    const group = new THREE.Group()
    group.name = 'flylines'
    data &&
      data.forEach(item => {
        const g = new THREE.Group(),
          {source, target, lineStyle, symbolStyle} = item,
          {name: sname, center: scenter} = source,
          {name: tname, center: tcenter} = target,
          {maxHeight} = lineStyle,
          name = `${sname}-${tname}`,
          spos = scenter
            ? this.context.coordToVector3(scenter.slice(0, 2), scenter[3] || 0)
            : this.mapCenterVectors[sname],
          tpos = tcenter
            ? this.context.coordToVector3(tcenter.slice(0, 2), tcenter[3] || 0)
            : this.mapCenterVectors[tname]
        if (!spos || !tpos) return
        const [x1, y1, z1] = spos,
          [x2, y2, z2] = tpos,
          curve = new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(x1, y1, z1),
            new THREE.Vector3(
              (x1 + x2) / 2,
              (y1 + y2) / 2,
              // maxHeight
              maxHeight / this.standardLayout.zoom
            ),
            new THREE.Vector3(x2, y2, z2)
          ),
          points = curve.getPoints(pointCount),
          line = this.drawFlyline(points, lineStyle)
        this.symbolOpts.push({
          ...symbolStyle,
          position: [x1, y1, z1],
          name,
          curve
        })
        g.add(line)
        g.name = name
        group.add(g)
      })
    this.scene.add(group)
    this.allFlylines = group
    this.drawSymbols()
    this.flylineAnimate()
  }

  drawFlyline(
    points,
    {
      color = COLOR,
      opacity = 1,
      show = true,
      type = 'solid',
      dashSize = 3,
      gapSize = 1,
      animationEasing,
      animation,
      animationDuration
    }
  ) {
    const _points = animation ? points.slice(0, 1) : points,
      geometry = new THREE.BufferGeometry().setFromPoints(_points)
    let material
    if (type === 'solid') {
      material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        side: THREE.DoubleSide
      })
    } else {
      material = new THREE.LineDashedMaterial({
        color,
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        // linewidth: 2,
        dashSize: dashSize / this.standardLayout.zoom,
        gapSize: gapSize / this.standardLayout.zoom
      })
    }
    const line = new THREE.Line(geometry, material)

    type === 'dashed' && line.computeLineDistances() // 不可或缺的，若无，则线段不能显示为虚线
    line.name = 'flyline'
    animation &&
      (line.tween = {
        points,
        animationEasing,
        animationDuration
      })
    line.visible = show
    return line
  }

  async drawSymbols() {
    for (let opt of this.symbolOpts) {
      const {curve, name, speed} = opt,
        symbol = await this.drawSymbol(opt)
      if (symbol) {
        this.symbols.push({
          name,
          curve,
          speed,
          progress: 0,
          mesh: symbol
        })
        const g = this.scene.getObjectByName(name) || this.scene
        g.add(symbol)
      }
    }
  }

  async drawSymbol({symbol, size, color, opacity, position, shadow}) {
    let mesh
    if (symbol.startsWith('image://')) {
      const texture = await getTexture(symbol)
      mesh = this.drawDotted({color, shadow, size, texture})
    } else {
      switch (symbol) {
        case 'dotted':
          !this.dottedTexture &&
            (this.dottedTexture = this.drawSymbolTexture(color, shadow))
          mesh = this.drawDotted({
            color,
            shadow,
            size,
            texture: this.dottedTexture
          })
          break
        case 'ball':
          mesh = this.drawBall({color, opacity, size})
          break
      }
    }
    if (mesh) {
      mesh.position.set(...position)

      mesh.renderOrder = 10
      mesh.name = 'flyline-symbol'
    }
    return mesh
  }

  drawDotted({color, size, texture}) {
    const material = new THREE.PointsMaterial({
        color,
        size: size * 3,
        // opacity,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        map: texture
      }),
      geometry = new THREE.BufferGeometry(),
      // geometry.vertices.push(
      //   new THREE.Vector3(0, 0, 0)
      // )
      positions = new Float32Array(3)
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3))
    return new THREE.Points(geometry, material)
  }

  drawBall({color = 0xffffff, opacity = 1, size = 10}) {
    const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthTest: false
      }),
      geometry = new THREE.SphereGeometry(
        size / this.standardLayout.zoom,
        100,
        100
      )
    return new THREE.Mesh(geometry, material)
  }

  drawSymbolTexture(color, shadow) {
    const size = 32,
      {canvas, ctx} = createCanvas(size, size)
    let gradient = color
    if (shadow) {
      gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      )
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, 'transparent')
    }
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    const texture = new THREE.Texture(canvas)
    texture.needsUpdate = true
    return texture
  }
}
