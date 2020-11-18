/**
 * threejs loader promise化
 * const objLoader = new THREE.OBJLoader()
 * const objLoaderLoadFn = tu.promisify(objLoader.load, objLoader)
 * objLoaderLoadFn('./path/obj.obj').then(obj => todo)
 */
export function promisify(fn, context = null) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.apply(context, [
        ...args,
        // onLoad callback
        data => resolve(data, context),
        // onProgress callback
        xhr => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded', xhr)
        },
        // onError callback
        err => reject(err)
      ])
    })
  }
}

/** threejs loader promise化， 简写
 *  const fontLoader = loaderPromisify(new THREE.FontLoader())
 *  fontLoader('./fonts/MicrosoftYaHei_Regular.json').then(font => todo)
 **/
export function loaderPromisify(loader) {
  return promisify(loader.load, loader)
}

const class2type = {
  '[object Boolean]': 'boolean',
  '[object Number]': 'number',
  '[object String]': 'string',
  '[object Function]': 'function',
  '[object Array]': 'array',
  '[object Date]': 'date',
  '[object RegExp]': 'regexp',
  '[object Object]': 'object',
  '[object Error]': 'error',
  '[object Symbol]': 'symbol'
}

export function getType(data) {
  if (data === null) return data + ''
  return typeof object === 'object' || typeof object === 'function'
    ? Object.prototype.toString.call(class2type[data]) || 'object'
    : typeof data
}

export function isNumber(x) {
  return typeof x === 'number'
}

export function toFixed(value, number = 2) {
  const res = value.toString().indexOf('.') > -1 ? value.toFixed(number) : value
  return Number(res)
}

export function normalizeFourValues(value) {
  if (typeof padding === 'number') return [value, value, value, value]
  if (Array.isArray(value)) {
    if (value.length === 1) {
      const v = value[0]
      value = [v, v, v, v]
    } else if (value.length === 2) {
      value = value.concat(value)
    } else if (value.length === 3) {
      value = [...value, value[1]]
    }
    return value
  }
  return [0, 0, 0, 0]
}
