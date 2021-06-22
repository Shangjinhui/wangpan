<template>
<div class="main bgf7f8f9">
    <div class="bgfff h-con">
        <div class="pt44 pl68 pr68 col333">
            <p class="fsize24 f-pf2 fweight600">文件推荐</p>
            <div class="flex-sp mt30">
                <p class="fsize14 f-pf1 flex">
                    <span class="cursor" v-for="(item,index) in crembs" :key="index" @click="toCrembs(item,index)">{{item.name}} {{index!=crembs.length-1?'>':''}} </span>
                </p>
                <div class="wid344 h40 bor-rad4 bor-dcdfe6 flex pl15 pr15">
                    <img class="mr5 cursor" src="@/assets/img/search.png" alt="">
                    <input class="flex-son fsize14 col333" type="text" placeholder="输入文件名称搜索" v-model="search" @keyup.enter="getMulu">
                </div>
            </div>
            
        </div>
        <div class="pb32 bt-eaebef">
            <!-- table -->
            <el-table
                class="my-table mt37 mb36 mh300 cursor"
                :data="list"
                stripe
                style="width: 100%"
                @row-click="tableClick">
                <el-table-column
                width="300"
                label="名称">
                <template slot-scope="scope">
                    <div class="flex">
                        <img class="wid47 mr14" :src="scope.row.isDir==0?zhanwei[1]:zhanwei[0]" alt="">
                        <span>{{scope.row.name}}</span>
                    </div>
                </template>
                </el-table-column>
                <el-table-column
                prop="createTime"
                label="修改时间">
                </el-table-column>
                <el-table-column
                label="类型">
                <template slot-scope="scope">
                    {{scope.row.isDir==0?'文件':'目录'}}
                </template>
                </el-table-column>
                <el-table-column
                width="200"
                label="操作">
                <template slot-scope="scope">
                    <div class="flex" v-if="scope.row.isDir==0">
                        <div class="wid70 lh28 center bgdcdfe6 col606266 fsize14 bor-c4c7cc bor-rad4 mr16 cursor f-yahei" v-if="scope.row.flag==1" @click.stop="CancleRecommend(scope.row.id)">取消推荐</div>
                        <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 cursor f-yahei" v-else  @click.stop="CancleRecommend(scope.row.id)">推荐</div>
                    </div>
                    <p v-else>无</p>
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
        <div class="pt20 pl68 pr58">
            <p class="col333 fsize16 fweight600">推荐文件</p>
            <ul class="flex flex-wrap pl60 mt12">
                <li class="mb30 wid75p mr28 ml28" v-for="(item,index) in recommendList" :key="index">
                    <!-- <img class="wid75p h75p object-cover" :src="item.preview" alt=""> -->

                    <img class="wid75p h75p object-cover" v-if="['png','jpg','gif'].indexOf(item.type)!=-1" :src="item.preview||r_zhanwei" alt="">
                    <img class="wid75p h75p object-cover" v-else :src="item.type|Zhanwei" alt="">

                    <p class="fsize14 col333 mt14 wid75p ellipsis1 center">{{item.name}}</p>
                    <div class="wid70 lh28 center bgdcdfe6 col606266 fsize14 bor-c4c7cc bor-rad4 mt20 auto cursor f-yahei" @click="CancleRecommend(item.id)">取消推荐</div>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components:{},
    inject:['routerRefresh'],   //在子组件中获取父或祖先里的方法
	data(){
		return {
            id:'',
            crembs:[],
            search:'',
            page:1,
            limit:5,
            total:0,
            zhanwei:[require('@/assets/img/directory.png'),require('@/assets/img/folder.png')],
			list:[
                // {
                //     preview:require('@/assets/img/folder.png'),
                //     name:'sadasdasd',
                //     createTime:'2020.11.12  16:00',
                //     isDir:'1',      //1文件夹0文件
                // },
                // {
                //     preview:require('@/assets/img/folder.png'),
                //     name:'sadasdasd',
                //     createTime:'2020.11.12  16:00',
                //     isDir:'1',      //1文件夹0文件
                // },
                // {
                //     preview:require('@/assets/img/folder.png'),
                //     name:'sadasdasd',
                //     createTime:'2020.11.12  16:00',
                //     isDir:'1',      //1文件夹0文件
                // }
            ],
            recommendList:[],
            r_zhanwei:require('@/assets/img/picture.png'),
		}
    },
    mounted(){
        this.id = this.$route.query.id||'';
        this.crembs = this.$route.query.crembs?JSON.parse(this.$route.query.crembs):[{name:'一级目录',id:''}];
        //console.log(this.crembs,'crembs')
        this.getMulu();
        this.getRecommend();
        // window.onpopstate = () => {
        //     this.routerRefresh();
        // }
    },
    methods:{
        getMulu(){
            this.$fetch({
                url:'admin/admin_dir/flag_dir_list',
                data:{
                    id:this.id,
                    search:this.search,
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
        getRecommend(){
            this.$fetch({
                url:'admin/admin_dir/flag_list',
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.recommendList = res.data.data.list;
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        CancleRecommend(id){
            this.$fetch({
                url:'admin/admin_dir/flag_dir',
                data:{id}
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.$message({type:'success',message:'操作成功'});
                    this.getMulu();
                    this.getRecommend();
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        tableClick(row){
            //console.log(row)
            if(row.isDir==0) return;
            let crembs = this.crembs,tl = ['一级目录','二级目录','三级目录','四级目录','五级目录','六级目录'];
            crembs.push({name:tl[crembs.length],id:row.id})
            this.$router.push({path:'fileRecommend',query:{id:row.id,crembs:JSON.stringify(crembs)}});
            this.routerRefresh();
        },
        toCrembs(item,index){
            let crembs = this.crembs.slice(0,index+1);
            this.$router.push({path:'fileRecommend',query:{id:item.id,crembs:JSON.stringify(crembs)}});
            this.routerRefresh();
        },
        changePage(page){
            this.page = page;
            this.getMulu();
        }
    }
}
</script>