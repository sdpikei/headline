// // 配置vuex
// import Vue from "vue";
// import Vuex from 'vuex'
// Vue.use(Vuex)
// export default new Vuex.Store({
//     state: {
//         user: getLocalKey(keys)
//     },
//     mutations: {
//         setKey(state, user) {
//             state.user = user
//             setLocalKey(keys, user)
//         }
//     }

// })
import Vue from 'vue'
import Vuex from 'vuex'
import { setLocalKey, getLocalKey, removeLocalKey } from '@/untils/storage'

Vue.use(Vuex)
const keys = 'Authorization'

export default new Vuex.Store({
    state: {
        // 用户的登录状态信息
        user: getLocalKey(keys),
        pagescrolltop: []
        // user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            setLocalKey(keys, user)
        },
        romoveUser(state) {
            state.user = ''
            removeLocalKey(keys)
        },
        setpagescroll(state, roll) {
            state.pagescrolltop.push(roll)
        }
    },
    actions: {
    },
    modules: {
    }
})
