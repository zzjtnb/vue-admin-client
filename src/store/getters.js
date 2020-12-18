const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  info: state => state.user.info,
  menus: state => state.user.menus,
  network: state => state.settings.network
}
export default getters
