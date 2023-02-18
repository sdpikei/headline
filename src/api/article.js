import request from "@/untils/request";
export const getArticals = (ids) => request({
    method: 'GET',
    url: `/v1_0/articles/${ids}`
})
export const followings = (id) => request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: { target: id }
})

export const unfollowings = (id) => request({
    method: 'DELETE',
    url: `/v1_0/user/followings/ + ${id}`
})
export const colletions = (id) => request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: { target: id }
})
export const uncolletions = (id) => request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${id}`,
})
export const likeings = (id) => request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: { target: id }
})
export const dislikeings = (id) => request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${id}`,
})
export const getcommets = (params) => request({
    method: 'GET',
    url: '/v1_0/comments',
    params
})
export const popcomment = (data) => request({
    method: 'POST',
    url: '/v1_0/comments',
    data
})
export const likecommet = (data) => request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data
})
export const dislikecommet = (id) => request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${id}`
})