import request from '@/utils/request'

// 获取菜单列表
export function getMenuList(params) {
  return request({
    url: '/menu/getMenuList',
    method: 'get',
    params
  })
}
//  新增菜单
export function addMenu(data) {
  return request({
    url: 'menu/add',
    method: 'post',
    data
  })
}
//   修改菜单
export function updateMenu(id, data) {
  return request({
    url: `/menu/update/${id}`,
    method: 'put',
    data
  })
}
//   删除菜单
export function delMenu(id) {
  return request({
    url: `/menu/delete/${id}`,
    method: 'delete',
  })
}