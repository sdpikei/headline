import request from '@/untils/request'
export const LinkThink = (params) => request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params
})
export const toSearch = (params) => request({
    method: 'GET',
    url: '/v1_0/search',
    params
})