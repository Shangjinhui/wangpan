<template>
<div class="main bgf7f8f9">
    <div class="mess-center bgfff h-con">
        <div class="h175 pt44 pl68 pr68 pb18 col333">
            <p class="fsize24 f-pf2 fweight600">消息中心</p>
            <div class="flex-sp mt26">
                <div class="wid94 lh28 center bgcf1342 colfff bor-rad4 cursor f-yahei" @click="createMess">+ 创建消息</div>
                <div class="flex pl15 wid344 h40 bgfff bor-rad4 bor-dcdfe6">
                    <img class="mr5 cursor" src="@/assets/img/search.png" alt="">
                    <input class="flex-son fsize14 col333 pr15" type="text" placeholder="输入消息标题" v-model="search" @keyup.enter="getData">
                    <div class="wid68 lh40 center fsize14 bgcf1342 colfff bor-rad4 cursor f-yahei" @click="getData">查询</div>
                </div>
            </div>
            <p class="fsize14 cursor mt37">查看全部消息</p>
        </div>
        <!-- table -->
        <el-table
        class="my-table mb36"
        :data="list"
        stripe
        style="width: 100%">
        <el-table-column
        prop="title"
        label="消息标题">
        </el-table-column>
        <el-table-column
        prop="groupName"
        label="目标用户">
        </el-table-column>
        <el-table-column
        prop="createTime"
        label="推送时间">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="查看"
        width="220">
        <template slot-scope="scope">
            <div class="flex">
                <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 cursor f-yahei" @click="lookMess(scope.row.id)">查看</div>
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
    <div class="mask" v-if="addMessShow||lookMessShow">
        <!-- 新增 -->
        <div class="mask-inner wid712" v-if="addMessShow">
            <div class="flex-sp h70 bt-eaebef pl40 pr20">
                <p class="fsize18 col333">消息</p>
                <img class="cursor" src="@/assets/img/close.png" alt="" @click="addMessShow=false;">
            </div>
            <div class="pt24 pl40 pr40">
                <div class="mb3vh">
                    <p class="fsize14 col57">消息标题</p>
                    <input class="fsize14 col333 wid632 h40 bor-rad4 bor-c4c7cc pl15 pr15 mt14" type="text" placeholder="" v-model="title">
                </div>
                <div class="mb3vh">
                    <p class="fsize14 col57">目标用户</p>
                    <el-select class="wid388 h40  mt14" v-model="groupId" placeholder="请选择">
                        <el-option
                        v-for="item in groupList"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="mb3vh">
                    <p class="fsize14 col57 mb16">消息内容</p>
                    <!-- 富文本 -->
                    <my-richtext :height="0.3" @catchData="catchData"></my-richtext>
                </div>
            </div>
            <div class="flex-end pl40 pr40 pb40">
                <div class="wid62 lh28 center bgdcdfe6 col606266 fsize14 mr16 bor-c4c7cc bor-rad4 cursor f-yahei" @click="addMessShow=false;">取消</div>
                <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 cursor f-yahei" @click="Confirm">确定</div>
            </div>
        </div>
        <!-- 查看 -->
        <div class="mask-inner wid712" v-if="lookMessShow">
            <div class="flex-sp h70 bt-eaebef pl40 pr20">
                <p class="fsize18 col333">消息</p>
                <img class="cursor" src="@/assets/img/close.png" alt="" @click="lookMessShow=false;">
            </div>
            <div class="p-24-40 h530 overflow-auto">
                <p class='fsize16 col333 mb20 fweight600'>{{detail.title}}</p>
                <p class='fsize14 col333 lh22 mb20' v-html="detail.content"></p>
            </div>
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
            groupList:[],
            groupId:'',
            addMessShow:false,
            lookMessShow:false,
			list:[
                // {
                //     title:'尊享客户',
                //     status:'有效',
                //     createTime:'2020.11.12  15:37:11',
                // },
            ],
            search:'',
            page:1,
            limit:5,
            total:0,
            detail:{},
            title:'',        //新增title
            content:'',      //新增content
		}
    },
    mounted(){
        this.getData();
        this.getGroupList();
    },
    methods:{
        getGroupList(){
            this.$fetch({
                url:'admin/admin_notice/group_list',
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.groupList = res.data.data.list;
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        getData(){
            this.$fetch({
                url:'admin/admin_notice/notice_list',
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
        createMess(){
            this.addMessShow = true;

        },
        lookMess(id){
            this.lookMessShow = true;
            this.$fetch({
                url:'admin/admin_notice/notice_info',
                data:{id}
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.detail = res.data.data.info;
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        Confirm(){
            if(!this.title){
                this.$message('请输入消息标题!');
                return;
            }
            if(!this.groupId){
                this.$message('请选择目标用户!');
                return;
            }
            if(!this.content){
                this.$message('请输入消息内容!');
                return;
            }
            this.$fetch({
                url:'admin/admin_notice/add_notice',
                type:'post',
                data:{
                    groupId:this.groupId,
                    title:this.title,
                    content:this.content
                }
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.$message({type:'success',message:'添加成功'});
                    this.addMessShow = false;
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
        catchData(val){
            //console.log(val,'会掉');
            this.content = val;
        }
    }
}
</script>
