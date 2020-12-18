import request from '@/utils/request'
// 账号密码登陆接口
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 获取用户详情
export function getUserInfo(data) {
  return request({
    url: '/user/detail',
    method: 'post',
    data
  })
}

//新增用户 /boss/add
export function addUser(data) {
  return request({
    url: `/user/add`,
    method: 'post',
    data
  })
}
// 编辑用户 /boss/update/:id
export function updateUser(data, id) {
  return request({
    url: `/user/update/${id}`,
    method: 'put',
    data
  })
}
// 删除用户 /boss/delete/:id
export function delUser(id) {
  return request({
    url: `/user/delete/${id}`,
    method: 'delete',
  })
}

// 获取用户列表
export function getUsersList(params) {
  return request({
    url: `/user/list`,
    method: 'get',
    params
  })
}
