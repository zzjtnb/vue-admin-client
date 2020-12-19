import { getMoveRouter } from '@/api/system/role';
import { login, logout, getUserInfo } from "@/api/system/user";
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    info: '',
    avatar: '',
    menus: "",//存放路由表的容器
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENU: (state, menus) => {
    state.menus = menus
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginname, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginname: loginname.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response.token)
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { loginname } = data //从data中解构出name 和头像
        commit('SET_NAME', loginname) //把name 保存到vuex中
        commit('SET_INFO', data) //把name 保存到vuex中
        commit('SET_AVATAR', '/images/icons/avatar.gif') //把头像保存到vuex中
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // getRouter
  getRouter({ commit, state }) {
    return new Promise((resolve, reject) => {
      getMoveRouter().then(response => {
        const menus = response.data
        //如果需要404 页面，请在此处添加
        menus.push({
          path: "/404",
          component: "404",
          hidden: true
        }, {
          path: "*",
          redirect: "/404",
          hidden: true
        })
        commit('SET_MENU', menus) //把name 保存到vuex中
        resolve(true)
      }).catch(error => {
        reject(false)
      })
    })
  },
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first //清楚token
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

