<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
    }
  },
  beforeCreate(){
    // //刷新页面如果有token缓存则直接重新获取用户信息
    let token = window.localStorage.getItem('token');
    if(token){
      this.$store.commit('userInfo/SET_TOKEN',token);
      //重新获取个人信息
      this.$store.dispatch('userInfo/getUserInfo');
    }
  },
  mounted(){

  },
}
</script>
