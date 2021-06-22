import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//ie兼容模式下Unhandled promise rejection NavigationDuplicated: Avoided redundant navigation to current location: "/login".
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'layout',
            component: () => import('@/pages/layout'),
            redirect:'index',
            children:[
                {
                    path:'index',
                    name:'index',
                    component: () => import('@/pages/index'),
                },
                {
                    path:'fileList',
                    name:'fileList',
                    component: () => import('@/pages/fileList'),
                },
                {
                    path:'fileDetail',
                    name:'fileDetail',
                    component: () => import('@/pages/fileDetail'),
                },
                {
                    path:'selfCenter',
                    name:'selfCenter',
                    component: () => import('@/pages/selfCenter'),
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login'),
        },
        {
            path: '/Transfer',
            name: 'Transfer',
            component: () => import('@/pages/Transfer'),
        },
    ]
})
export default router