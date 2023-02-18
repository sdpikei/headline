import Vue from 'vue'
import VueRouter from 'vue-router'
import banner from '@/views/banner'
import login from '@/views/login'
import my from '@/views/my'
import home from '@/views/home'
import search from '@/views/search'
import article from '@/views/article'
import user from '@/views/user'
import setInfo from '@/views/setuserInfo.vue'
Vue.use(VueRouter)
const routes = [
    {
        path: "/", // 默认hash值路径
        redirect: "/login" // 重定向到/find
        // 浏览器url中#后的路径被改变成/find-重新匹配数组规则
        //  匹配路由"/", 强制切换到"/find"上
    },
    {
        path: '/login',
        component: login,
        meta: {
            deepth: 0.5
        }
    },
    {
        path: '/banner',
        component: banner,
        children: [{
            path: "/", // 默认hash值路径
            redirect: "/banner/home" // 重定向到/find
            // 浏览器url中#后的路径被改变成/find-重新匹配数组规则
            //  匹配路由"/", 强制切换到"/find"上
        },
        {
            path: 'my',
            component: my,

        },
        {
            path: 'home',
            component: home,
            name: 'home',
            meta: {
                keepAlive: true,
                deepth: 1,
                isback: false
            }
        },
        {
            path: '/search',
            component: search,
            name: 'search',
            meta: {
                keepAlive: false,
                deepth: 1
            }
        }],
        meta: {
            deepth: 0.5
        }

    },
    {
        path: '/article/:article_id',
        component: article,
        meta: {
            keepAlive: false,
            deepth: 2,
            name: 'article',

        }
    },
    {
        path: '/user/:user_id',
        component: user,
        meta: {
            keepAlive: false,
            deepth: 2,
            name: 'user',

        }
    },
    {
        path: '/setInfo',
        component: setInfo
    }


]
const router = new VueRouter({
    routes,
    mode: 'history'
})
export default router