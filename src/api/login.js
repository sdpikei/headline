import request from '@/untils/request'
export const login = (data) => request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
})
export const sendCode = mobile => request({
    method: 'GET',
    url: '/v1_0/sms/codes/' + mobile,

})