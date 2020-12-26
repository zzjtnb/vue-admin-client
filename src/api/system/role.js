// 导入接口域名列表
import { localhost } from '@/api/base';
// 每个模块都应该有自己的接口文件去统一管理api
import { GET, POST, PUT, PATCH, DELETE } from '@/utils/request'


export const getAllRouter = () => GET(`${localhost}/role/getAllRouter`); //获取分配权限弹窗内所需全部路由菜单数据
export const getMoveRouter = () => GET(`${localhost}/role/getMoveRouter`); //获取路由表接口
export const getRolesList = (params) => GET(`${localhost}/role/roleList`, params); //获取权限列表
export const authorize = (id, data) => POST(`${localhost}/role/authorize/${id}`, data);// 分配权限
export const addRoles = (data) => POST(`${localhost}/role/add`, data);//新增权限
export const editRoles = (id, data) => PUT(`${localhost}/role/edit/${id}`, data);//编辑权限
export const deleteRoles = (id, data) => DELETE(`${localhost}/role/delete/${id}`, data);//删除权限


