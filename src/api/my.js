import requset from '@/untils/request'
export const getUserName = () => requset({
    method: 'GET',
    url: '/v1_0/user/profile',
    // headers: {
    //     Authorization: `Bearer ${store.state.user.token}`
    // }
})
export const getMyname = () => requset({
    method: 'GET',
    url: '/v1_0/user'
})
export const changeprofile = (data) => requset({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
})
export const updateAvatar = (data) => requset({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    headers: {
        'Content-Type': "multipart/form-data",
    },
    transformRequest: [function () {
        return data;
    }],
    data
})


