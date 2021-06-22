import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/public.css'
import '@/assets/css/index.scss'
import {getData} from './untils/index'
import './untils/untils'
Vue.prototype.$fetch = getData
Vue.use(Element)
import './untils/filter'



router.beforeEach((to, from, next) => {
  //判断是否登录
  let token = store.state.userInfo.token || window.localStorage.getItem('token');
  if(!token&&to.name!='login'){
    next('/login');
  }else{
    next();
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
