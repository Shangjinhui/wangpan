<template>
<div class="main bgf7f8f9">
    <div class="bgfff h-con" v-if="open">
        <!-- 富文本 -->
        <my-richtext @catchData="catchData" :height="0.6" :content="content"></my-richtext>
		<div class="flex-end mt20">
			<!-- <div class="wid62 lh28 center bgdcdfe6 col606266 fsize14 mr16 bor-c4c7cc bor-rad4 cursor">取消</div> -->
			<div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 cursor f-yahei" @click="Save">确定</div>
		</div>
    </div>
</div>
</template>

<script>
import myRichtext from '@/components/richText.vue'
export default {
	components:{myRichtext},
	data(){
		return {
			open:false,
			content:''
		}
	},
	mounted(){
		this.getXeyi();
	},
	methods:{
		catchData(val){
			//console.log(val,'会掉');
			this.content = val;
		},
		getXeyi(){
			this.$fetch({
				url:'admin/admin_member/user_agreement_info',
			}).then(res=>{
				if(res.data.returnCode=='0000'){
					this.content = res.data.data.info.content;
					this.open = true;
				}else{
					this.$message(res.data.msg);
				}
			})
		},
		Save(){
			this.$fetch({
				url:'admin/admin_member/user_agreement',
				type:'post',
				data:{content:this.content}
			}).then(res=>{
				if(res.data.returnCode=='0000'){
					this.$message({type:'success',message:'保存成功'});
				}else{
					this.$message(res.data.msg);
				}
			})
		}
	},
	
}
</script>
<style scoped>
.w-e-text-container{height:60vh!important;}
</style>