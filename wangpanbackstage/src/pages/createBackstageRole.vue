<template>
<div class="main bgf7f8f9">
    <div class="create-stage-role bgfff h-con">
        <div class="h175 pt44 pl68 pr68 pb44 col333">
            <p class="fsize24 f-pf2 fweight600">创建后台角色</p>
            <div class="flex-sp mt26">
                <div class="wid94 lh28 center bgcf1342 colfff bor-rad4 cursor f-yahei" @click="addUser">+ 新增角色</div>
                <div class="flex pl15 pr15 wid344 h40 bgfff bor-rad4 bor-dcdfe6">
                    <img class="mr5 cursor" src="@/assets/img/search.png" alt="">
                    <input class="flex-son fsize14 col333" type="text" placeholder="输入角色名称搜索" v-model="search" @keyup.enter="toSearch">
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
        prop="title"
        label="角色名称">
        </el-table-column>
        <el-table-column
        prop="status"
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
                <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 mr16 cursor f-yahei" @click="editUser(scope.row.id)">编辑</div>
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
    
    </div>
    
</div>

</template>

<script>
export default {
	components:{},
	data(){
		return {
			list:[
                // {
                //     title:'尊享客户',
                //     status:'有效',
                //     createTime:'2020.11.12  15:37:11',
                // },
                // {
                //     title:'尊享客户',
                //     status:'有效',
                //     createTime:'2020.11.12  15:37:11',
                // },
                // {
                //     title:'尊享客户',
                //     status:'有效',
                //     createTime:'2020.11.12  15:37:11',
                // },
                // {
                //     title:'尊享客户',
                //     status:'有效',
                //     createTime:'2020.11.12  15:37:11',
                // },
                // {
                //     title:'尊享客户',
                //     status:'有效',
                //     createTime:'2020.11.12  15:37:11',
                // },
                // {
                //     title:'尊享客户',
                //     status:'有效',
                //     createTime:'2020.11.12  15:37:11',
                // }
            ],
            search:'',
            page:1,
            limit:5,
            total:0
		}
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            this.$fetch({
                url:'admin/admin_member/group_list',
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
        toSearch(){
            this.page = 1;
            this.getData();
        },
        addUser(){
            this.$router.push('addRole');
        },
        editUser(id){
            this.$router.push({path:'addRole',query:{id}})
        },
        delUser(id){
            this.$fetch({
                url:'admin/admin_member/del_admin_group',
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
        }
    }
}
</script>