<template>
<div class="main bgf7f8f9">
    <div class="change-userpsw bgfff h-con">
        <div class="pt44 pl68">
            <p class="fsize24 f-pf2 mb68 fweight600">修改用户默认密码</p>
            <ul class="fsize14 col333">
                <li class="flex mb30">
                    <p class="wid103 align-right mr28">旧密码</p>
                    <input class="wid300 h38 pl15 pr15 bor-dcdfe6" type="text" v-model="oldPsw" @keyup.enter="Confirm">
                </li>
                <li class="flex mb30">
                    <p class="wid103 align-right mr28">新密码</p>
                    <input class="wid300 h38 pl15 pr15 bor-dcdfe6" type="text" v-model="newPsw" @keyup.enter="Confirm">
                    <div class="ml16" v-if="Confirm.length<6">
                        <i class="el-icon-circle-close colcf1342 mr5"></i>
                        <span class="fsize12 col999">密码长度必须大于6位</span>
                    </div>
                </li>
                <li class="flex mb30">
                    <p class="wid103 align-right mr28">确认密码</p>
                    <input class="wid300 h38 pl15 pr15 bor-dcdfe6" type="text" v-model="confirmPsw" @keyup.enter="Confirm">
                </li>
            </ul>
            <div class="flex ml131">
                <div class="wid130 lh36 center fsize14 col606266 bgdcdfe6 bor-c4c7cc bor-rad4 mr33 cursor f-yahei" @click="cancle">取消</div>
                <div class="wid132 lh38 center fsize14 colfff bgcf1342 bor-rad4 cursor f-yahei" @click="Confirm">确定</div>
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
            oldPsw:'',
            newPsw:'',
            confirmPsw:''
		}
    },
    methods:{
        Confirm(){
            if(!this.oldPsw){
                this.$message('请输入旧密码');
                return;
            }
            if(!this.newPsw){
                this.$message('请输入新密码');
                return;
            }
            if(this.newPsw.length<6){
                this.$message('密码长度必须大于6位');
                return;
            }
            if(!this.confirmPsw){
                this.$message('请确认新密码');
                return;
            }
            if(this.newPsw!=this.confirmPsw){
                this.$message('确认密码与新密码不一致！');
                return;
            }
            this.$fetch({
                url:'admin/admin_member/edit_default_password',
                type:'post',
                data:{
                    oldPassword:this.oldPsw,
                    newPassword:this.newPsw
                }
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.$message({type:'success',message:'修改成功'});
                    this.oldPsw = '';
                    this.newPsw = '';
                    this.confirmPsw = '';
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        cancle(){
            this.oldPsw = '';
            this.newPsw = '';
            this.confirmPsw = '';
        }
    }
}
</script>