/* eslint-disable new-cap */
export async function VisualMap(el, options) {
  if (options.type === 'continuous') {
    const Continuous = await import(
      /* webpackChunkName: 'continuous' */ './continuous'
    )
    return new Continuous.default(el, options)
  }
  if (options.type === 'piecewise') {
    const Piecewise = await import(
      /* webpackChunkName: 'piecewise' */ './piecewise'
    )
    return new Piecewise.default(el, options)
  }
}
