<template>
<div class="login rel">
	<img class="bg-img" src="@/assets/img/background.png" alt="">
	<div class="login-inner pt56">
		<img class="logo auto mb36" src="@/assets/img/logo.png" alt="">
		<div class="wid320 h42 flex bgf7f8f9 pl10 auto mb20 bor-rad4">
			<img class="mr5" src="@/assets/img/email2.png"/>
			<input class="flex-son fsize14 lh18 col333 bgf7f8f9 pr10 f-arialMt" type="text" v-model="email" @keyup.enter="signIn" placeholder="请填写用户名" />
		</div>
		<div class="wid320 h42 flex bgf7f8f9 pl10 auto mb10 bor-rad4">
			<img class="mr5" src="@/assets/img/psw.png"/>
			<input class="flex-son fsize14 lh18 col333 bgf7f8f9 pr10 f-arialMt" type="password" v-model="psw" @keyup.enter="signIn" placeholder="请输入密码" />
		</div>
		<p class="wid320 fsize12 col333 auto mb47">忘记密码？请联系管理员</p>
		<div class="wid320 lh42 center colfff bgcf1342 auto bor-rad4 cursor" @click="signIn">立即登录</div>
	</div>
</div>
</template>

<script>
export default {
	components:{},
	data(){
		return {
			email:'',
			psw:''
		}
	},
	methods:{
		signIn(){
			if(!this.email){
				this.$message('请填写用户名!');
				return;
			}
			if(!this.psw){
				this.$message('请输入密码!');
				return;
			}
			this.$fetch({
				url:'admin/admin_member/signin',
				type:'post',
				data:{
					uname:this.email,
					password:this.psw
				}
			}).then(res=>{
				if(res.data.returnCode=='0000'){
					this.$message({ message: "登录成功", type: "success" });
					this.$store.commit("userInfo/SET_TOKEN", res.data.data.token);
					this.$store.dispatch("userInfo/getUserInfo");

					window.sessionStorage.setItem('firstOn','');
					window.sessionStorage.setItem('twoOn','');
					this.$router.push("/");
				}else{
					this.$message(res.data.msg);
				}
			})
		}
	}
}
</script>