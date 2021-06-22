<template>
<!--用户协议  -->
	 <div class="agreement-out" v-if="(newUser==1&&isNoRemind!=1)||agreeLook">
		 <div class="agreement-inner" :class="[!agreeLook?'':'on']">
			 <div class="flex-sp top">
				 <p class="title col333 f-pf2">User agreement</p>
				 <img class="close cursor" v-if="agreeLook" src="@/assets/img/close.png" alt="" @click="agreeLook=false">
				 <span v-else></span>
			 </div>
			 <div class="agreement-con-hidden">
				 <div class="agreement-con col333 f-arialMt" :class="[!agreeLook?'':'on']" v-html="text"></div>
			 </div>
			 <div class="btm" v-if="!agreeLook">
				 <el-checkbox v-model="agree">I have read and accept all the terms and conditions.</el-checkbox>
				 <el-checkbox v-model="nextNotice" class="col999 on">Remember this setting and don't prompt again</el-checkbox>
				<div class="btn-out flex-end">
					<div class="btn f-pf2 cursor" :class="[{on:!agree}]" @click="beginUse">O K</div>
				</div>
			 </div>
			 
		 </div>
	 </div>
</template>

<script>
export default {
	components:{},
	data(){
		return {
			agreeLook:false,      //从个人列表里点击再次查看协议
			text:'',
			newUser:window.localStorage.getItem('loginorigin'),//是否登录进来  0否  1是
			agree:false,         //选中协议
			nextNotice:false,
		}
	},
	computed:{
		//是否不再弹出用户协议，0否，1是
		isNoRemind(){
			return this.$store.state.userInfo.userInfo.isNoRemind||'1';
		}
	},
	mounted(){
		//
	},
	watch:{
		isNoRemind(val){if(val==0) this.getText();},        //刷新页面触发
		agreeLook(val){if(val) this.getText();}
	},
	methods:{
		getText(){
			this.$fetch({
				url:'api/member/user_agreement',
			}).then(res=>{
				if(res.data.returnCode=='0000'){
					this.text = res.data.data.content;
				}else{
					this.$message(res.data.msg)
				}
			})
		},
		beginUse(){
			if(this.agree){
				if(this.nextNotice){
					//下次不用提醒，掉接口
					this.$fetch({
						url:'api/member/no_remain',
						loading:false
					}).then(res=>{
						if(res.data.returnCode!='0000'){
							this.$message(res.data.msg);
						}
					})
				}
				window.localStorage.setItem('loginorigin','0');
				this.newUser = '0';
			}
		}
	}
}
</script>

<style lang="scss">
.agreement-out{
	width:100vw;
	height:100vh;
	background: rgba(0, 0, 0, 0.5);
	position:fixed;
	left:0;
	top:0;
	z-index:9;
	.agreement-inner{
		width: 720px;
		// height:75vh;
		// min-height: 580px;
		background: #FFFFFF;
		box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.1);
		border-radius: 4px;
		border: 1px solid #EEEEEE;
		position: absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
		&.on{
			height:auto;
		}
		.top{
			line-height:4.7vw;
			border-bottom:1px solid #EAEBEF;
			padding:0 20px;
			box-sizing: border-box;
			.title{font-size:18px;padding-left:20px;}
			.close{
				width:24px;
				height:24px;
			}
		}
		.agreement-con-hidden{
			width:100%;
			margin-top:22px;
			height:64vh;
			max-height: 480px;
			overflow: hidden;
			&.on{
				height: 52vh;
				margin-bottom: 20px;
			}
			.agreement-con{
				// margin-top:22px;
				padding:0 40px;
				// height:66%;
				// height:64vh;
				// max-height: 480px;
				font-size: 14px;
				line-height: 20px;
				text-align: justify;
				overflow: auto;
				width:calc(100% + 16px);
				height:100%;
			}
		}
		
		.btm{
			margin-top:20px;
			padding:0 16px 10px 40px;
			.el-checkbox{
				display: block;
				margin-bottom: 10px;
				&.on{
					margin-bottom:0;
				}
			}
			.btn{
				// float: right;
				width: 96px;
				line-height: 30px;
				background: #CF1342;
				border-radius: 4px;
				font-size: 16px;
				text-align: center;
				color:#fff;
				&.on{opacity: .3;}
			}
		}
	}
}
@media screen and (min-width: 1500px){
	.agreement-out{
		.agreement-inner{
			.top{
				line-height: 70px;
			}
		}
	}
}
@media screen and (max-width: 1440px){
    
}

</style>