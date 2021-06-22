import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'layout',
            component: () => import('@/pages/layout'),
            redirect:'visitUser',
            children:[
                {
                    path: 'addUser',
                    name: 'addUser',
                    component: () => import('@/pages/addUser'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'addRole',
                    name: 'addRole',
                    component: () => import('@/pages/addRole'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'createBackstageRole',
                    name: 'createBackstageRole',
                    component: () => import('@/pages/createBackstageRole'),
                    meta:{
                        cache:false,
                    }
                },
                {
                    path: 'messCenter',
                    name: 'messCenter',
                    component: () => import('@/pages/messCenter'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'changeUserPsw',
                    name: 'changeUserPsw',
                    component: () => import('@/pages/changeUserPsw'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'fileHeat',
                    name: 'fileHeat',
                    component: () => import('@/pages/fileHeat'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'createContent',
                    name: 'createContent',
                    component: () => import('@/pages/createContent'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'createContent2',
                    name: 'createContent2',
                    component: () => import('@/pages/createContent2'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'createContent3',
                    name: 'createContent3',
                    component: () => import('@/pages/createContent3'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'visitUser',
                    name: 'visitUser',
                    component: () => import('@/pages/visitUser'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'fileKeyword',
                    name: 'fileKeyword',
                    component: () => import('@/pages/fileKeyword'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'fileCenter',
                    name: 'fileCenter',
                    component: () => import('@/pages/fileCenter'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'changeUserGroupRoot',
                    name: 'changeUserGroupRoot',
                    component: () => import('@/pages/changeUserGroupRoot'),
                    meta:{
                        cache:false,
                    }
                },
                {
                    path: 'addUserGroupRoot',
                    name: 'addUserGroupRoot',
                    component: () => import('@/pages/addUserGroupRoot'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'fileDetail',
                    name: 'fileDetail',
                    component: () => import('@/pages/fileDetail'),
                    meta:{
                        cache:false,
                    }
                },
                {
                    path: 'addUserRoot',
                    name: 'addUserRoot',
                    component: () => import('@/pages/addUserRoot'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'changeUserRoot',
                    name: 'changeUserRoot',
                    component: () => import('@/pages/changeUserRoot'),
                    meta:{
                        cache:false,
                    }
                },
                {
                    path: 'addFile',
                    name: 'addFile',
                    component: () => import('@/pages/addFile'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'userGroupRoot',
                    name: 'userGroupRoot',
                    component: () => import('@/pages/userGroupRoot'),
                    meta:{
                        cache:false,
                    }
                },
                {
                    path: 'userRoot',
                    name: 'userRoot',
                    component: () => import('@/pages/userRoot'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'matchingFile',
                    name: 'matchingFile',
                    component: () => import('@/pages/matchingFile'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'agreement',
                    name: 'agreement',
                    component: () => import('@/pages/agreement'),
                    meta:{
                        cache:true,
                    }
                },
                {
                    path: 'fileRecommend',
                    name: 'fileRecommend',
                    component: () => import('@/pages/fileRecommend'),
                    meta:{
                        cache:true,
                    }
                },
            ]
        },
        
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login'),
        },
    ]
})
export default router