import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' //进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie获取token
import getPageTitle from '@/utils/get-page-title'
const _import = require('./router/_import_' + process.env.NODE_ENV) // 获取组件的方法
import Layout from "@/layout";
NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login', '/netoff'] // 没有重定向白名单
router.beforeEach(async (to, from, next) => {
  if (window.navigator.onLine) {
    // if (to.path === '/netoff') {
    //   next()//如果要去的页面是断网页面直接,放行
    // } else {
    //   next(`/netoff?redirect=${to.path}`)//否则跳转到断网页面
    // }
    NProgress.start() //开启进度条
    document.title = getPageTitle(to.meta.title) //设置网页标题
    const hasToken = getToken() //确定用户是否已登录
    if (hasToken) {
      // if 去的path 是登陆页
      if (to.path === '/login' || to.path === '/netoff') {
        // if is logged in, redirect to the home page
        next({ path: '/' }) //正常执行，到 /
        NProgress.done() //关闭进度条
      } else { //如果去的不是登陆页面
        const hasGetUserInfo = store.getters.name //获取vuex中的name
        if (hasGetUserInfo) {
          next() //如果获取到vuex中的name 就正常执行
        } else {
          // 如果没有获取到vuex中到name
          try {
            // get user info
            await store.dispatch('user/getInfo') //触发获取用户信息到接口
            await store.dispatch('user/getRouter') //触发获取路由表的接口
            if (store.getters.menus.length < 1) {
              global.antRouter = []
              next()
            }
            const menus = filterAsyncRouter(store.getters.menus) //过滤路由
            router.addRoutes(menus) //动态添加路由
            global.antRouter = menus //将路由数据传递给全局变量，做侧边栏渲染的工作
            // next() //正常走
            next({ ...to, replace: true }) // 如果 addRoutes并未完成,路由守卫会一层一层的执行执行,直到 addRoutes完成,找到对应的路由
          } catch (error) {
            // remove token and go to login page to re-login
            await store.dispatch('user/resetToken') //删除token并进入登录页面重新登录
            // Message.error(error || 'Has Error') //弹出异常
            Message({ message: error, type: 'error' })
            next(`/login?redirect=${to.path}`) //然后就执行这里 跳转到 login,redirect把从哪个页面出错的
            NProgress.done()
          }
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next() //在免登录白名单中，直接进入
      } else {
        next(`/login?redirect=${to.path}`)  //其他无权访问的页面将重定向到登录页面。
        NProgress.done()
      }
    }
  } else {
    if (to.path === '/netoff') {
      next()//如果要去的页面是断网页面直接,放行
    } else {
      next(`/netoff?redirect=${to.path}`)//否则跳转到断网页面
    }
  }
})

router.afterEach(() => {
  NProgress.done()  //完成进度栏
})

//遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      route.component = route.component === 'Layout' ? Layout : _import(route.component)
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}