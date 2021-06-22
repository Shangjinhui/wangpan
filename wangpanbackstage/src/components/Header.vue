<template>
<div class="header h80 flex-end bgfff col333 fsize14 pr92">
    <p class="f-arialB mr42 f-yahei">{{userInfo.nickname}}</p>
    <div class="flex cursor" @click="excit">
        <img src="@/assets/img/exit.png" alt="">
        <p class="f-pf2 ml5 f-yahei">退出</p>
    </div>
</div>
</template>

<script>
export default {
	components:{},
	data(){
		return {
			
		}
    },
    computed:{
        userInfo(){
            return this.$store.state.userInfo.userInfo;
        }
    },
    methods:{
        excit(){
            this.$fetch({
				url:'admin/admin_member/signout',
				type:'post',
				data:{
					id:this.userInfo.id
				},
			}).then(res=>{
				if(res.data.returnCode=='0000'){
					this.$store.commit('userInfo/SET_TOKEN','');
              		this.$store.commit('userInfo/SET_USERINFO',{});
					this.$router.push('/login');
				}else{
					this.$message(res.data.msg);
				}
			})
        }
    }
}
</script>