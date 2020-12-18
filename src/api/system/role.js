
import request from '@/utils/request'


//   获取路由表接口
export function getMoveRouter() {
  return request({
    url: '/role/getMoveRouter',
    method: 'get',
  })
}


// 获取权限列表
export function getRolesList(params) {
  return request({
    url: `/role/roleList`,
    method: 'get',
    params
  })
}

// 分配权限 /aoaoe/api/authorize/:id
export function authorize(id, data) {
  return request({
    url: `/role/authorize/${id}`,
    method: 'post',
    data
  })
}
// 获取分配权限弹窗内所需全部路由菜单数据 /aoaoe/api/getAllRouter
export function getAllRouter() {
  return request({
    url: `/role/getAllRouter`,
    method: 'get',
  })
}
// 新增权限 /aoaoe/api/role/add
export function addRoles(data) {
  return request({
    url: `/role/add`,
    method: 'post',
    data
  })
}
//编辑权限
export function editRoles(data, id) {
  return request({
    url: `/role/edit/${id}`,
    method: 'put',
    data
  })
}
// 删除权限 /role/delete/:id
export function deleteRoles(id, data) {
  return request({
    url: `/role/delete/${id}`,
    method: 'delete',
    data
  })
}