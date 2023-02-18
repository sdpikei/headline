import axios from "axios";
import store from '@/store'
axios.defaults.baseURL = 'http://toutiao.itheima.net'
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const { user } = store.state
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`
        // console.log(store);
    }
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})
export default axios
