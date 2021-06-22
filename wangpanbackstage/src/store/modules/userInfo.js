// import {getData} from '@/untils/index'
import Vue from 'vue';
const state = {
    token: '',
    userInfo: {},
  }
  const mutations = {
    SET_TOKEN: (state, token) => {
      state.token = token;
      window.localStorage.setItem("token", token);
    },
    SET_USERINFO: (state, userInfo) => {
        state.userInfo = userInfo;
    },
  }
  const actions = {
    getUserInfo({commit}){
      
      const getUserInfo=()=>{
        Vue.prototype.$fetch({
          url:'admin/admin_member/info',
          loading:false,
        }).then(res=>{
            //console.log(res,'用户信息')
            if(res.data.returnCode){
              if(res.data.returnCode == '0000'){
                  commit('SET_USERINFO',res.data.data);
              }else{
                  Vue.prototype.$message(res.data.msg);
                  //登录失效，清空token和userinfo
                  commit('SET_TOKEN','');
                  commit('SET_USERINFO',null);
              }
            }else{
              let timer = setTimeout(() => {
                getUserInfo();
                clearTimeout(timer);
              }, 500);
            }
            
        })
      }
      
      getUserInfo();
    },
  }
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }