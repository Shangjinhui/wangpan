import 'babel-polyfill'             //解决ie兼容模式下vuex requires a Promise polyfill in this browser
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/public.css'
import {getData} from './untils/index'
Vue.prototype.$fetch = getData
import './untils/untils'
import './untils/filter'

import Fragment from 'vue-fragment'
Vue.use(Element)
Vue.use(Fragment.Plugin)

router.beforeEach((to, from, next) => {
  //判断是否登录
  let token = store.state.userInfo.token || window.localStorage.getItem('tokenpc');
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
