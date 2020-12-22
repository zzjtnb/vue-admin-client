import Vue from 'vue'

import Frame from './frame'

// 注意 有些组件使用异步加载会有影响
Vue.component('frame', Frame)
// Vue.component('highlight', () => import('./highlight'))
