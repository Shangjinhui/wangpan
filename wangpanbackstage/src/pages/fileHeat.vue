<template>
    <div class="main bgf7f8f9">
        <div class="file-heat bgfff h-con">
            <div class="pt44 pl68 pr68 pb44 col333">
                <p class="fsize24 f-pf2 fweight600">文件热度总览</p>
                <div class="flex-sp">
                    <p class="fsize14 col57">下载总次数：{{totalNum||'0'}}次</p>
                    <div class="flex">
                        <el-select class="wid98 mr10 f-yahei" v-model="typeValue" placeholder="请选择" @change="changeType">
                            <el-option
                            v-for="item in typeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <ul class="flex bor-rad4 bor-c4c7cc fsize14 col606266 cursor f-yahei">
                            <li class="wid70 lh40 center br-c4c7cc" :class="[{'colfff bgcf1342 bor-rad4':item.id==chooseDate}]" v-for="(item,index) in dateList" :key="index" @click="changeDate(item.id)">{{item.title}}</li>
                        </ul>
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
                prop="name"
                label="文件名">
                </el-table-column>
                <el-table-column
                prop="num"
                label="下载次数/收藏次数">
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
            typeValue:1,
            typeOptions:[
                {
                    value:1,
                    label:'下载'
                },
                {
                    value:2,
                    label:'收藏'
                }
            ],
            dateList:[
                {
                    id:0,
                    title:'全部'
                },
                {
                    id:1,
                    title:'今日'
                },
                {
                    id:2,
                    title:'近七天'
                },
                {
                    id:3,
                    title:'近三十天'
                }
            ],
            chooseDate:0,
            list:[
                // {
                //     name:'操作手册.png',
                //     num:'1000次',
                // },
                // {
                //     name:'操作手册.png',
                //     num:'1000次',
                // },
                // {
                //     name:'操作手册.png',
                //     num:'1000次',
                // },
            ],
            page:1,
            limit:5,
            total:0,
            totalNum:0,
		}
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            let data = {
                type:this.typeValue,
                dateType:this.chooseDate,
                pageNo:this.page,
                limit:this.limit
            }
            this.$fetch({
                url:'admin/admin_member/download_statistics_list',
                data
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.list = res.data.data.list;
                    this.total = parseInt(res.data.data.count);
                    this.totalNum = res.data.data.totalNum
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        changePage(page){
            this.page = page;
            this.getData();
        },
        changeType(type){
            this.typeValue = type;
            this.getData();
        },
        changeDate(id){
            this.chooseDate = id;
            this.getData();
        }
    }
}
</script>