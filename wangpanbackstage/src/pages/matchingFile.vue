<template>
<div class="main bgf7f8f9">
    <div class="bgfff h-con">
        <div class="pt44 pl68 pr68 pb44 col333">
            <p class="fsize24 f-pf2 fweight600">联想云匹配文件</p>
            <div class="flex mt28">
                <div class="flex mr78">
                    <p class="fsize14 col57 mr28">文件名称</p>
                    <input class="fsize14 col333 wid19vw h40 bor-rad4 bor-c4c7cc pl15" type="text" placeholder="" v-model="search" @keyup.enter="getData">
                </div>
                <div class="flex mr48">
                    <p class="fsize14 col57 mr28">文件格式</p>
                    <el-select class="my-select wid188 h40" v-model="fileType" placeholder="请选择">
                        <el-option
                        v-for="item in fileTypeList"
                        :key="item.type"
                        :label="item.type"
                        :value="item.type">
                        </el-option>
                    </el-select>
                </div>
                <div class="wid64 lh40 center bgcf1342 colfff bor-rad4 cursor mr10 f-yahei" @click="getData">确定</div>
                <div class="wid64 lh40 center bgcf1342 colfff bor-rad4 cursor f-yahei" @click="toExcel">导出</div>
            </div>
            
        </div>
        <!-- table -->
            <el-table
                class="my-table2 mb36 mh300"
                :data="list"
                stripe
                style="width: 100%">
                <el-table-column
                prop="fileName"
                label="文件完整名称">
                <!-- <template slot-scope="scope">
                    <div class="flex">
                        <el-checkbox label="1"><br/></el-checkbox>
                        <span>{{scope.row.fileName}}</span>
                    </div>
                </template> -->
                </el-table-column>
                <el-table-column
                label="是否分配">
                <template slot-scope="scope">
                    {{scope.row.dirId==0?'否':'是'}}
                </template>
                </el-table-column>
                <el-table-column
                width="150"
                prop="createTime"
                label="更新时间">
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
                //     fileName:'文件名称名称.jpg',
                //     dirId:'0',//0未分配
                //     createTime:'2020.11.12  15:37:11',
                // },
            ],
            fileTypeList:[],
            search:'',
            fileType:'',
            page:1,
            limit:15,
            total:0,
		}
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            this.$fetch({
                url:'admin/admin_dir/third_file_list',
                data:{
                    search:this.search,
                    fileType:this.fileType=='all'?'':this.fileType,
                    pageNo:this.page,
                    limit:this.limit
                }
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.list = res.data.data.list;
                    this.total = res.data.data.count;
                    this.fileTypeList = [{type:'all'},...res.data.data.fileType];
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        changePage(page){
            this.page = page;
            this.getData();
        },
        toExcel(){
            // this.$fetch({
            //     url:'admin/admin_dir/out',
            // }).then(res=>{
            //     if(res.data.returnCode=='0000'){
                    
            //     }else{
            //         this.$message(res.data.msg);
            //     }
            // })
            let a = document.createElement("a");
            let event = new MouseEvent("click");
            a.href = window.dl_h_domain+'api/index.php/admin/admin_dir/out';
            // a.download = new Date().getTime()+'.'+type;
            a.dispatchEvent(event);
        }
    }
}
</script>