<template>
<div class="main bgf7f8f9">
    <div class="add-user bgfff h-con">
        <div class="pt44 pl68 pr68 pb44 col333">
            <p class="fsize24 f-pf2 fweight600">网盘用户权限</p>
            <div class="flex-sp mt26">
                <div class="flex">
                    <div class="wid108 lh28 center bgcf1342 colfff bor-rad4 cursor mr14 f-yahei" @click="showUserInfo=true">+ 新增用户</div>
                    <div class="wid94 lh28 flex-center bgf0f1f5 col57 bor-d5d8de bor-rad4 rel cursor mr14 f-yahei">
                        <img class="mr5" src="@/assets/img/newdirectory.png" alt="">
                        <span>批量录入</span>
                        <input type="file" accept=".xls" ref="xls" class="wid94 h28 abs l0 t0 opacity0">
                    </div>
                    <div class="wid94 lh28 flex-center bgf0f1f5 col57 bor-d5d8de bor-rad4 cursor f-yahei" @click="templateD">↓ 模板下载</div>
                </div>
                
                <div class="wid344 h40 bor-rad4 bor-dcdfe6 flex pl15 pr15">
                    <img class="mr5 cursor" src="@/assets/img/search.png" alt="">
                    <input class="flex-son fsize14 col333" type="text" placeholder="输入用户名或者登陆名搜索搜" v-model="search" @keyup.enter="toSearch">
                </div>
            </div>
            
        </div>
        <!-- 二级table -->
        <!-- 头部 -->
        <div class="flex bgf7f8f9 lh36 fsize14 col333 pl68">
            <p class="flex-son center">用户组名称</p>
            <p class="flex-son center">用户名称</p>
            <!-- <p class="flex-son center">登录名</p> -->
            <p class="flex-son center">所属地区（区域/国家）</p>
            <p class="flex-son center">邮箱</p>
            <p class="wid388 center">操作</p>
        </div>
        <!-- 一级 -->
        <div v-for="(item,index) in nowList" :key="index">
            <div class="flex bgfff lh60 fsize14 col333 pl68 cursor" @click="Open(index)">
                <p class="flex-son pl35 flex"><i class="mr8" :class="item.open?'el-icon-caret-bottom':'el-icon-caret-right'"></i><span class="flex-son">{{item.title}}</span></p>
                <p class="flex-son center"></p>
                <!-- <p class="flex-son center"></p> -->
                <p class="flex-son center"></p>
                <p class="flex-son center"></p>
                <p class="wid388 center"></p>
            </div>
            <!-- 二级 -->
            <div v-if="item.children&&item.open">
                <div class="flex bgfff lh60 fsize14 col333 pl68" v-for="(item2,index2) in item.children" :key="index2">
                    <p class="flex-son center"></p>
                    <p class="flex-son center">{{item2.nickname}}</p>
                    <!-- <p class="flex-son center">Bocweb</p> -->
                    <p class="flex-son center">{{item2.country}} - {{item2.region}}</p>
                    <p class="flex-son center">{{item2.email}}</p>
                    <div class="wid388 flex-center">
                        <div class="wid92 lh30 center bgcf1342 colfff fsize14 bor-rad4 mr16 cursor f-yahei" @click="Resetpsw(item2.id)">重置密码</div>
                        <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 mr16 cursor f-yahei" @click="changeRoot(item2.id,item2.nickname)">权限</div>
                        <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 mr16 cursor f-yahei" @click="changeMes(item2.id)">信息</div>
                        <div class="center fsize14 bor-rad4 cursor mr16 f-yahei" :class="item2.audit==1?'wid64 lh30 bgcf1342 colfff':'wid62 lh28 bor-c4c7cc bgdcdfe6 col606266'" @click="frozenUser(item2.id,item2.audit,index,index2)">{{item2.audit==1?'冻结':'已冻结'}}</div>
                        <div class="wid62 lh28 center bgdcdfe6 col606266 fsize14 bor-c4c7cc bor-rad4 cursor f-yahei" @click="delUser(index,item.id,item2.id)">删除</div>
                    </div>
                </div>
            </div>
            
        </div>
        



        <!-- <el-pagination
        @current-change="changePage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="100">
        </el-pagination> -->
    </div>

    <div class="mask" v-if="showUserInfo">
        <div class="mask-inner wid552 p-24-40">
            <img class="close cursor" src="@/assets/img/close.png" alt="" @click="Cancle">
            <p class="fsize18 col333 mb20 fweight600">{{editId?'编辑用户信息':'新增用户'}}</p>
            <ul>
                <li class="mb3vh">
                    <p class="fsize14 col57">用户名称</p>
                    <input class="fsize14 col333 wid472 h40 bor-rad4 bor-c4c7cc pl15 pr15 mt14" type="text" placeholder="" v-model="username">
                </li>
                <li class="mb3vh">
                    <p class="fsize14 col57">所属用户组</p>
                    <el-select class="wid472 mr10 mt14" v-model="groupValue" placeholder="选择用户组">
                        <el-option
                        v-for="item in list"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </li>
                <li class="mb3vh">
                    <p class="fsize14 col57">用户账号</p>
                    <input class="fsize14 col333 wid472 h40 bor-rad4 bor-c4c7cc pl15 pr15 mt14" type="text" placeholder="" v-model="acount">
                </li>
                <li class="mb3vh">
                    <p class="fsize14 col57">用户邮箱</p>
                    <input class="fsize14 col333 wid472 h40 bor-rad4 bor-c4c7cc pl15 pr15 mt14" type="text" placeholder="" v-model="email">
                </li>
                <li class="mb3vh">
                    <p class="fsize14 col57">用户地区</p>
                    <div class="flex mt14">
                        <el-select class="flex-son" v-model="regionId" placeholder="选择区域" @change="changeRegion">
                            <el-option
                            v-for="item in regionList"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id">
                            </el-option>
                        </el-select>
                        <span>-</span>
                        <el-select class="flex-son" v-model="countryId" placeholder="选择国家">
                            <el-option
                            v-for="item in countryList"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </li>
            </ul>
            <div class="flex-end">
                <div class="wid62 lh28 center bgdcdfe6 col606266 fsize14 mr16 bor-c4c7cc bor-rad4 cursor f-yahei" @click="Cancle">取消</div>
                <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 cursor f-yahei" @click="Confirm">确定</div>
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
            editId:'',      //修改用用信息id
            search:'',
			list:[],        //用户组列表（搜索的时候比较使用）
            nowList:[],    //展示的数据

            countryList:[],     //国家列表
            regionList:[],      //区域列表
            showUserInfo:false,     //修改用户信息
            username:'',
            groupValue:'',
            acount:'',
            email:'',
            countryId:'',
            regionId:'',
		}
    },
    mounted(){
        this.getGroupList();
        this.getAreaList();
        this.initInputXsl();
    },
    methods:{
        changeRegion(){
            this.countryId = '';
            let regionList = this.regionList;
            for(let i=0;i<regionList.length;i++){
                if(regionList[i].id==this.regionId){
                    this.countryList = regionList[i].children;
                }
            }
        },
        getAreaList(){
            this.$fetch({
                url:'admin/admin_user/region_list',
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.regionList = res.data.data.region;
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        getGroupList(){
            this.$fetch({
                url:'admin/admin_user/group_list',
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    let list = res.data.data.list;
                    this.list = list;
                    this.nowList = list;
                    for(let i=0;i<list.length;i++){
                        this.getData(i,list[i].id);
                    }
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        getData(i,id){
            this.$fetch({
                url:'admin/admin_user/account_list',
                data:{id}
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    let list = [...this.list],data = res.data.data.list;
                    list[i].children = data;
                    this.nowList = list;
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        toSearch(){
            if(this.search){
                this.$fetch({
                    url:'admin/admin_user/account_list',
                    data:{
                        search:this.search
                    }
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        let list = [...this.list],data = res.data.data.list,arr=[];
                        for(let i=0;i<data.length;i++){
                            for(let j=0;j<list.length;j++){
                                if(data[i].groupId==list[j].id){
                                    let ids = arr.map(item=>item.id);
                                    if(ids.indexOf(list[j].id)==-1){
                                        arr.push({id:list[j].id,title:list[j].title,children:[data[i]]})
                                    }else{
                                        let ind = ids.indexOf(list[j].id);
                                        arr[ind].children.push(data[i])
                                    }
                                    
                                }
                            }
                        }
                        this.nowList = arr;
                    }else{
                        this.$message(res.data.msg);
                    }
                })
            }else{
                this.getGroupList();
            }
        },
        Open(ind){
            let list = [...this.nowList];
            list[ind].open = list[ind].open?false:true;
            this.nowList = list;
        },
        changeMes(id){
            this.editId = id;
            this.showUserInfo = true;
            this.$fetch({
                url:'admin/admin_user/account_info',
                data:{id}
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.username = res.data.data.info.nickname;
                    this.email = res.data.data.info.email;
                    this.acount = res.data.data.info.accountNumber;
                    this.groupValue = res.data.data.info.groupId;
                    this.regionId = res.data.data.info.regionId;
                    this.changeRegion();
                    this.countryId = res.data.data.info.countryId;
            
                }else{
                    this.$message(res.data.msg);
                }
            })
            
            
        },
        //批量录入
        initInputXsl(){
            const that = this;
            this.$refs['xls'].addEventListener('change',function(e){
				let file = this.files[0];
				let fromData = new FormData();
				fromData.append('file',file)
				that.$fetch({
                    url:'admin/admin_user/import',
                    type:'post',
                    data:fromData
                }).then(res=>{
					if(res.data.returnCode == '0000'){
						that.$message({message:'录入成功',type:'success'});
					}else{
						that.$message(res.data.msg);
					}
				})

				
				
			})
        },
        //模板下载
        templateD(){
            let a = document.createElement("a");
            let event = new MouseEvent("click");
            a.href = window.dl_h_domain+'api/upload/user_demo.xls';
            a.dispatchEvent(event);
        },
        //删除用户
        delUser(index,pid,id){
            this.$confirm('是否删除改用户?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.$fetch({
                    url:'admin/admin_user/del_account',
                    data:{id}
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        this.$message({type:'success',message:'删除成功'});
                        this.getData(index,pid);
                    }else{
                        this.$message(res.data.msg);
                    }
                })
            }).catch(() => {});
            
        },
        Confirm(){
            if(!this.username||!this.email||!this.acount||!this.groupValue||!this.regionId||!this.countryId){
                this.$message('请填写完整信息');
                return;
            }
            if(this.acount.indexOf('@')!=-1){
                this.$message('账号不能存在@特殊字符!');
                return;
            }
            let reg= /^([\s\S]*)+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if(!reg.test(this.email)){
                this.$message('邮箱格式错误!');
                return;
            }
            if(this.editId){
                let data = {
                    id:this.editId,
                    nickname:this.username,
                    email:this.email,
                    groupId:this.groupValue,
                    regionId:this.regionId,
                    countryId:this.countryId,
                    accountNumber:this.acount
                }
                //console.log(data);
                this.$fetch({
                    url:'admin/admin_user/edit_account',
                    type:'post',
                    data
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        this.$message({type:'success',message:'修改成功'});
                        this.editId = '';
                        this.username = '';
                        this.email = '';
                        this.groupValue = '';
                        this.showUserInfo = false;
                        this.getGroupList();
                    }else{
                        this.$message(res.data.msg);
                    }
                })
            }else{
                let data = {
                    nickname:this.username,
                    email:this.email,
                    groupId:this.groupValue,
                    regionId:this.regionId,
                    countryId:this.countryId,
                    accountNumber:this.acount
                }
                //console.log(data);
                this.$fetch({
                    url:'admin/admin_user/add_account',
                    type:'post',
                    data
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        this.$message({type:'success',message:'添加成功'});
                        this.editId = '';
                        this.username = '';
                        this.email = '';
                        this.groupValue = '';
                        this.showUserInfo = false;
                        this.getGroupList();
                    }else{
                        this.$message(res.data.msg);
                    }
                })
            }
            
        },
        Cancle(){
            this.editId = '';
            this.username = '';
            this.email = '';
            this.groupValue = '';
            this.showUserInfo = false;
        },
        Resetpsw(id){
            this.$fetch({
                    url:'admin/admin_user/reset_password',
                    data:{id}
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        this.$message({type:'success',message:'重置密码成功'});
                    }else{
                        this.$message(res.data.msg);
                    }
                })
        },
        changeRoot(id,name){
            this.$router.push({path:'changeUserRoot',query:{id,name}})
        },
        frozenUser(id,audit,index,index2){
             this.$fetch({
                    url:'admin/admin_user/audit_account',
                    data:{id}
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        let nowList = [...this.nowList];
                        nowList[index].children[index2].audit = audit==1?0:1;
                        this.nowList = nowList;
                        this.$message({type:'success',message:audit==1?'冻结成功':'解冻成功'});
                    }else{
                        this.$message(res.data.msg);
                    }
                })
        }
    }
}
</script>