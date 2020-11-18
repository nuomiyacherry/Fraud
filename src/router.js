const aggregation = _ => import(/* webpackChunkName: 'aggregation' */ 'views/aggregation/index.vue')
const analysis = _ => import(/* webpackChunkName: 'analysis' */ 'views/analysis/index.vue')
const coordination = _ => import(/* webpackChunkName: 'coordination' */ 'views/coordination/index.vue')
const home = _ => import(/* webpackChunkName: 'home' */ 'views/home/index.vue')
const layout = _ => import(/* webpackChunkName: 'layout' */ 'views/layout/index.vue')
const monitor = _ => import(/* webpackChunkName: 'monitor' */ 'views/monitor/index.vue')
const nav = _ => import(/* webpackChunkName: 'nav' */ 'views/nav/index.vue')
const overview = _ => import(/* webpackChunkName: 'overview' */ 'views/overview/index.vue')
const special = _ => import(/* webpackChunkName: 'special' */ 'views/special/index.vue')
const wrapperView = _ => import(/* webpackChunkName: 'wrapperView' */ 'views/wrapperView/index.vue')

export default {
  '/aggregation': aggregation,
  '/analysis': analysis,
  '/coordination': coordination,
  '/home': home,
  '/layout': layout,
  '/monitor': monitor,
  '/nav': nav,
  '/overview': overview,
  '/special': special,
  '/wrapperView': wrapperView
}