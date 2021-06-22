<template>
<div class="main bgf7f8f9">
    <div class="add-user bgfff h-con">
        <div class="pt44 pl68 pr68 pb44 col333">
            <p class="fsize24 f-pf2 fweight600">创建后台用户</p>
            <div class="flex-sp mt26">
                <div class="wid94 lh28 center bgcf1342 colfff bor-rad4 cursor f-yahei" @click="addUser">+ 新增用户</div>
                <div class="wid344 h40 bor-rad4 bor-dcdfe6 flex pl15 pr15">
                    <img class="mr5 cursor" src="@/assets/img/search.png" alt="">
                    <input class="flex-son fsize14 col333" type="text" placeholder="输入用户名称搜索" v-model="search" @keyup.enter="toSearch">
                </div>
            </div>
            
        </div>
        <!-- table -->
        <el-table
        class="my-table mb36 mh400"
        :data="list"
        stripe
        style="width: 100%">
        <el-table-column
        prop="uname"
        label="用户名">
        </el-table-column>
        <el-table-column
        prop="groupName"
        label="角色">
        </el-table-column>
        <el-table-column
        prop="nickname"
        label="姓名">
        </el-table-column>
        <el-table-column
        prop="phone"
        label="联系方式">
        </el-table-column>
        <el-table-column
        prop="createTime"
        label="创建时间">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="220">
        <template slot-scope="scope">
            <div class="flex">
                <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 mr16 cursor f-yahei"  @click="editUser(scope.row.id)">编辑</div>
                <div class="wid62 lh28 center bgdcdfe6 col606266 fsize14 bor-c4c7cc bor-rad4 cursor f-yahei" @click="delUser(scope.row.id)">删除</div>
            </div>
        </template>
        </el-table-column>
    </el-table>
    <el-pagination
    @current-change="changePage"
    :page-size="limit"
    layout="prev, pager, next, jumper"
    :total="total">
    </el-pagination>
    <!-- 弹窗 -->
    <div class="mask" v-if="openadd">
        <div class="mask-inner wid552 p-24-40">
            <img class="close cursor" src="@/assets/img/close.png" alt="" @click="openadd=false">
            <p class="fsize18 col333 mb20 fweight600">{{addTitle}}</p>
            <ul>
                <li class="mb3vh">
                    <p class="fsize14 col57"><span class="colcf1342">*</span>用户名称</p>
                    <input class="fsize14 col333 wid388 h40 bor-rad4 bor-c4c7cc pl15 pr15 mt1vh" type="text" placeholder="" v-model="uname">
                </li>
                <li class="mb3vh">
                    <p class="fsize14 col57"><span class="colcf1342">*</span>密码</p>
                    <input class="fsize14 col333 wid388 h40 bor-rad4 bor-c4c7cc pl15 pr15 mt1vh" type="text" placeholder="" v-model="psw">
                </li>
                <li class="mb3vh">
                    <p class="fsize14 col57"><span class="colcf1342">*</span>确认密码</p>
                    <input class="fsize14 col333 wid388 h40 bor-rad4 bor-c4c7cc pl15 pr15 mt1vh" type="text" placeholder="" v-model="confirmPsw">
                </li>
                <li class="mb3vh">
                    <p class="fsize14 col57"><span class="colcf1342">*</span>角色</p>
                    <!-- <input class="fsize14 col333 wid388 h40 bor-rad4 bor-c4c7cc pl15 pr15 mt14" type="text" placeholder=""> -->
                    <!-- 角色是选的 -->
                    <el-select class="wid388 h40  mt2vh" v-model="rolename" placeholder="请选择">
                        <el-option
                        v-for="item in roleList"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </li>
                <li class="mb3vh">
                    <p class="fsize14 col57"><span class="colcf1342">*</span>联系人</p>
                    <input class="fsize14 col333 wid388 h40 bor-rad4 bor-c4c7cc pl15 pr15 mt1vh" type="text" placeholder="" v-model="nickname">
                </li>
                <li class="mb3vh">
                    <p class="fsize14 col57"><span class="colcf1342">*</span>手机号</p>
                    <input class="fsize14 col333 wid388 h40 bor-rad4 bor-c4c7cc pl15 pr15 mt1vh" type="text" placeholder="" v-model="phone">
                </li>
            </ul>
            <div class="flex-end">
                <div class="wid62 lh28 center bgdcdfe6 col606266 fsize14 mr16 bor-c4c7cc bor-rad4 cursor f-yahei" @click="openadd = false">取消</div>
                <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 cursor f-yahei" @click="Confirm">确定</div>
            </div>
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
            openadd:false,
            addTitle:'新增用户',
            editId:'',
            roleList:[],      //角色选择列表
			list:[
                // {
                //     nickname:'尊享客户',
                //     status:'有效',
                //     createTime:'2020.11.12  15:37:11',
                //     groupName:'',
                //     uname:'',
                //     phone:''
                // },

            ],
            search:'',
            page:1,
            limit:5,
            total:0,
            uname:'',
            psw:'',
            confirmPsw:'',
            nickname:'',
            rolename:'',
            phone:'',

		}
    },
    mounted(){
        this.getData();
        this.getRoleList(); //角色选择列表
    },
    methods:{
        getData(){
            this.$fetch({
                url:'admin/admin_member/admin_account_list',
                data:{
                    pageNo:this.page,
                    limit:this.limit,
                    search:this.search
                }
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.list = res.data.data.list;
                    this.total = res.data.data.count;
				}else{
					this.$message(res.data.msg);
				}
            })
        },
        getRoleList(){
            this.$fetch({
                url:'admin/admin_member/admin_group_list',
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.roleList = res.data.data.list;
				}else{
					this.$message(res.data.msg);
				}
            })
        },
        toSearch(){
            this.page = 1;
            this.getData();
        },
        addUser(){
            this.addTitle = '新增用户';
            this.openadd = true;
        },
        editUser(id){
            this.editId = id;
            this.$fetch({
                url:'admin/admin_member/admin_account_info',
                data:{id}
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    let info = res.data.data.info,groupList = res.data.data.groupList;
                    this.uname=info.uname;
                    this.nickname=info.nickname
                    this.phone=info.phone;
                    this.roleList = groupList;
                    for(let i=0;i<groupList.length;i++){
                        if(groupList[i].isChecked==1) this.rolename = groupList[i].id;
                    }
                    this.addTitle = '用户信息编辑';
                    this.openadd = true;
				}else{
					this.$message(res.data.msg);
				}
            })
        },
        delUser(id){
            this.$fetch({
                url:'admin/admin_member/del_admin_account',
                data:{id}
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.$message({type:'success',message:'删除成功'});
                    this.getData();
				}else{
					this.$message(res.data.msg);
				}
            })
        },
        changePage(page){
            this.page = page;
            this.getData();
        },
        Confirm(){
            if(this.psw!=this.confirmPsw){
                this.$message('密码与确认密码不一致!');
                return;
            }
            if(this.addTitle == '用户信息编辑'){
                let data = {
                    id:this.editId,
                    uname:this.uname,
                    password:this.psw,
                    groupId:this.rolename,
                    nickname:this.nickname,
                    phone:this.phone
                }
                this.$fetch({
                    url:'admin/admin_member/edit_admin_account',
                    type:'post',
                    data
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        this.$message({type:'success',message:'编辑成功'});
                        this.openadd = false;
                        //this.page = 1;

                        this.uname='';
                        this.psw='';
                        this.confirmPsw='';
                        this.nickname='';
                        this.rolename='';
                        this.phone='';
                        this.getData();
                    }else{
                        this.$message(res.data.msg);
                    }
                })
            }else{
                let data = {
                    uname:this.uname,
                    password:this.psw,
                    groupId:this.rolename,
                    nickname:this.nickname,
                    phone:this.phone
                }
                //console.log(data,'-----');
                this.$fetch({
                    url:'admin/admin_member/add_admin_account',
                    type:'post',
                    data
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        this.$message({type:'success',message:'添加成功'});
                        this.openadd = false;

                        this.uname='';
                        this.psw='';
                        this.confirmPsw='';
                        this.nickname='';
                        this.rolename='';
                        this.phone='';
                        this.page = 1;
                        this.getData();
                    }else{
                        this.$message(res.data.msg);
                    }
                })
            }
            
        }
    }
}
</script>