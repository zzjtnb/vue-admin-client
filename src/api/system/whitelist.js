import { localhost } from '@/api/base';
import { GET, POST, PUT, DELETE } from '@/utils/request'

export const addWhitelist = (data) => POST(`${localhost}/whitelist/add`, data)
export const updateWhitelist = (id, data) => PUT(`${localhost}/whitelist/update/${id}`, data)
export const delWhitelist = (data) => DELETE(`${localhost}/whitelist/delete`, data)
export const getWhitelist = (params) => GET(`${localhost}/whitelist/list`, params)