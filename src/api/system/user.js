// 导入接口域名列表
import { localhost } from './base';
// 每个模块都应该有自己的接口文件去统一管理api
import { GET, POST, PUT, PATCH, DELETE } from '@/utils/request'
export const login = (data) => POST(`${localhost}/user/login`, data);
export const logout = () => POST(`${localhost}/user/logout`);
export const getUserInfo = (data) => POST(`${localhost}/user/detail`, data);
export const addUser = (data) => POST(`${localhost}/user/add`, data);
export const updateUser = (id, data) => PUT(`${localhost}/user/update/${id}`, data);
export const delUser = (id) => DELETE(`${localhost}/user/delete/${id}`);
export const getUsersList = (params) => GET(`${localhost}/user/list`, params);

