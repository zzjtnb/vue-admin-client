import { localhost } from './base';
import { GET, POST, PUT, PATCH, DELETE } from '@/utils/request'

export const getMenuList = (params) => GET(`${localhost}/menu/getMenuList`, params)
export const addMenu = (data) => POST(`${localhost}/menu/add`, data)
export const updateMenu = (id, data) => PUT(`${localhost}/menu/update/${id}`, data)
export const delMenu = (id) => DELETE(`${localhost}/menu/delete/${id}`)