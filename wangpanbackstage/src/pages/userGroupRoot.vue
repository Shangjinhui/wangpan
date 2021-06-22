<template>
<div class="main bgf7f8f9">
    <div class="add-user bgfff h-con">
        <div class="pt44 pl68 pr68 pb44 col333">
            <p class="fsize24 f-pf2 fweight600">网盘用户组权限</p>
            <div class="flex-sp mt26">
                <div class="wid108 lh28 center bgcf1342 colfff bor-rad4 cursor f-yahei" @click="addUserGroup">+ 新增用户组</div>
                <div class="wid344 h40 bor-rad4 bor-dcdfe6 flex pl15 pr15">
                    <img class="mr5 cursor" src="@/assets/img/search.png" alt="">
                    <input class="flex-son fsize14 col333" type="text" placeholder="输入用户组名称搜索" v-model="search" @keyup.enter="getData">
                </div>
            </div>
            
        </div>
        <!-- table -->
        <el-table
        class="my-table mb36"
        :data="list"
        stripe
        style="width: 100%">
        <el-table-column
        prop="title"
        label="用户组名称">
        </el-table-column>
        <el-table-column
        label="状态">
        有效
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
                <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 mr16 cursor f-yahei" @click="changeRoot(scope.row.id,scope.row.title)">权限</div>
                <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 mr16 cursor f-yahei" @click="changeMess(scope.row.id,scope.row.title)">信息</div>
                <div class="wid62 lh28 center bgdcdfe6 col606266 fsize14 bor-c4c7cc bor-rad4 cursor f-yahei" @click="delUser(scope.row.id)">删除</div>
            </div>
        </template>
        </el-table-column>
    </el-table>
    <!-- <el-pagination
    @current-change="changePage"
    :page-size="10"
    layout="prev, pager, next, jumper"
    :total="100">
    </el-pagination> -->
    </div>
    
</div>

</template>

<script>
export default {
	components:{},
	data(){
		return {
            search:'',
			list:[
                // {
                //     title:'尊享客户',
                //     status:'有效',
                //     createTime:'2020.11.12  15:37:11',
                // },
                
            ]
		}
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            this.$fetch({
                url:'admin/admin_user/group_list',
                data:{search:this.search}
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.list = res.data.data.list;
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        addUserGroup(){
            this.$router.push('addUserGroupRoot');
        },
        changeRoot(id,name){
            this.$router.push({path:'changeUserGroupRoot',query:{id,name}});
        },
        changeMess(id,title){
            this.$prompt('用户组名称', '修改用户组信息', {
                inputValue:title,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                this.$fetch({
                    url:'admin/admin_user/edit_group_name',
                    type:'post',
                    data:{
                        id,
                        title:value
                    }
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        this.$message({type:'success',message:'修改成功'});
                        this.getData();
                    }else{
                        this.$message(res.data.msg);
                    }
                })
            }).catch(()=>{})
        },
        delUser(id){
            this.$confirm('是否删除改用户组?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.$fetch({
                    url:'admin/admin_user/del_group',
                    data:{id}
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        this.$message({type:'success',message:'删除成功'});
                        this.getData();
                    }else{
                        this.$message(res.data.msg);
                    }
                })
            }).catch(() => {});
            
        }
    }
}
</script>