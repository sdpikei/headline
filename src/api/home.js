import request from '@/untils/request'
export const getchannelList = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'
    })
}
export const getNewList = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params
    })
}
export const getAllChannels = (params) => {
    return request({
        method: 'GET',
        url: '/v1_0/channels',
        params
    })
}
export const setUserChannel = (channels) => {
    return request({
        method: 'PUT',
        url: '/v1_0/channels',
        data: { channels }
    })
}