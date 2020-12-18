import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  network: null,
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  SET_NOTNETWORK: (state, value) => {//这里的state对应着上面这个state
    state.network = value
  },
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  ChangeNetwork({ commit }, value) {
    commit('SET_NOTNETWORK', value)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

