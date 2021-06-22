<template>
<div class="main bgf7f8f9">
    <div class="bgfff h-con">
        <div class="pt44 pl68 pr68 pb38 col333">
            <p class="fsize24 f-pf2 fweight600">文件关键词</p>
            <div class="flex-sp">
                <div class="wid70 lh28 center bgcf1342 colfff bor-rad4 mt26 cursor f-yahei" @click="addKeyword">+ 创建</div>
                <i></i>
            </div>
        </div>
        <el-table
            class="my-table mb36"
            :data="list"
            stripe
            style="width: 100%">
            <el-table-column
            prop="title"
            label="关键词(最多使用三个)">
            </el-table-column>
           
            <el-table-column
            fixed="right"
            label="操作"
            width="220">
            <template slot-scope="scope">
                <div class="flex">
                    <div class="wid62 lh28 center bgdcdfe6 col606266 fsize14 bor-c4c7cc bor-rad4 mr16 cursor f-yahei" @click="delKeyword(scope.row.id)">删除</div>
                    <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 cursor f-yahei" v-if="scope.row.audit==0" @click="Opaction(scope.row.id)">使用</div>
                    <div class="wid64 lh30 center bgb9b9b9 colfff fsize14 bor-rad4 cursor f-yahei" v-else @click="Opaction(scope.row.id)">取消</div>
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
    <!-- <div class="mask" v-if="false">
        <div class="mask-inner wid552 p-24-40">
            <img class="close cursor" src="@/assets/img/close.png" alt="">
            <p class="fsize18 col333 mb28 fweight600">添加关键词</p>
            <input class="wid472 h40 pl15 pr15 fsize14 mb40 bor-rad4 bor-c4c7cc" type="text" placeholder="填写关键词">
            <div class="flex-end">
                <div class="wid62 lh28 center bgdcdfe6 col606266 fsize14 mr16 bor-c4c7cc bor-rad4 cursor">取消</div>
                <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 cursor">确定</div>
            </div>
        </div>
    </div> -->
</div>
</template>

<script>
export default {
	components:{},
	data(){
		return {
			list:[
                // {
                //     keyword:'新年图',
                //     status:'1',
                // },
                // {
                //     keyword:'新年图',
                //     status:'0',
                // },
                // {
                //     keyword:'新年图',
                //     status:'1',
                // },
                // {
                //     keyword:'新年图',
                //     status:'0',
                // },
            ],
            page:1,
            limit:5,
            total:0,
		}
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            this.$fetch({
                url:'admin/keyword/list',
                data:{
                    pageNo:this.page,
                    limit:this.limit
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
        addKeyword(){
            this.$prompt('', '添加关键词', {
                inputPlaceholder:'填写关键词',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                this.$fetch({
                    url:'admin/keyword/add',
                    type:'post',
                    data:{
                        title:value
                    }
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        this.$message({type:'success',message:'添加成功'});
                        this.getData();
                    }else{
                        this.$message(res.data.msg);
                    }
                })
            }).catch(()=>{})
        },
        Opaction(id){
            this.$fetch({
                url:'admin/keyword/audit',
                data:{id}
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.$message({type:'success',message:'操作成功'});
                    this.getData();
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        delKeyword(id){
            this.$fetch({
                url:'admin/keyword/del',
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