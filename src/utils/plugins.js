import {
  errCb,
  asyncTo,
  simpleAsyncTo,
  debounce,
  throttle,
  sleep
} from 'utils/util'

export default {
  install(Vue) {
    Vue.prototype.$errCb = errCb
    Vue.prototype.$asyncTo = asyncTo
    Vue.prototype.$simpleAsyncTo = simpleAsyncTo
    Vue.prototype.$debounce = debounce
    Vue.prototype.$throttle = throttle
    Vue.prototype.$sleep = sleep
  }
}
