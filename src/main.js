import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import iconPicker from 'e-icon-picker';
import 'e-icon-picker/dist/index.css'; // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css'; //font-awesome 图标库
Vue.use(iconPicker, { FontAwesome: true });
import moment from "moment";
Vue.filter('formatDate', function (value) {
  return moment(value).format('YYYY-MM-DD HH:mm')
})
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'mini' // set element-ui default size
})
Vue.directive('permission', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el, binding, node) {
    const { value } = binding
    // //使用方式： v-permission="'add'"
    if (value && value instanceof Array && value.length > 0) {
      const roles = node.child.$route.meta.roles
      if (roles) {
        const permissionRoles = value
        const hasPermission = roles.some(role => {
          return permissionRoles.includes(role)
        })
        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    } else {
      throw new Error(`使用方式： v-permission="['admin','editor']"`)
    }

  }
})

Vue.use(ElementUI)
// 设置为 false 以阻止 vue 在启动时生成生产提示
// https://cn.vuejs.org/v2/api/#productionTip
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
