//开发环境导入组件
// module.exports = file => require('@/views/' + file + '.vue').default // vue-loader at least v13.0.0+
const { Message } = require('element-ui');
/**
 * @param {String} file views下的路径,省略.vue
 */
module.exports = file => {
  try {
    return require('@/views/' + file + '.vue').default
  } catch (error) {
    // console.log(error);
    Message({ message: error, type: 'error' })//弹出异常
  }
}
