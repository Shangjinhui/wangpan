<template>
<div class="main bgf7f8f9">
    <div class="bgfff h-con">
        <div class="pt44 pl68 pr68 pb24 col333">
            <p class="fsize24 f-pf2 fweight600">文件中心</p>
            <div class="flex-sp mt26">
                <div class="flex">
                    <div class="wid94 lh28 flex-center bgcf1342 colfff bor-rad4 mr14 cursor">
                        <img class="mr5" src="@/assets/img/refresh.png" alt="">
                        <span>全量更新</span>
                    </div>
                    <div class="wid94 lh28 flex-center bgf0f1f5 col57 bor-d5d8de bor-rad4 mr14 cursor opacity5" @click="addMulu">
                        <img class="mr5" src="@/assets/img/bulkimport.png" alt="">
                        <span>新增目录</span>
                    </div>
                    <div class="wid94 lh28 flex-center bgf0f1f5 col57 bor-d5d8de bor-rad4 cursor">
                        <img class="mr5" src="@/assets/img/newdirectory.png" alt="">
                        <span>批量录入</span>
                    </div>
                </div>
                <div class="flex">
                    <div class="wid98 lh28 flex-center bgf0f1f5 col57 bor-d5d8de bor-rad4 mr14 cursor" @click="addFile">
                        <img class="mr5" src="@/assets/img/addfile.png" alt="">
                        <span>新增文件</span>
                    </div>
                    <div class="wid68 lh28 flex-center bgf0f1f5 col57 bor-d5d8de bor-rad4 cursor" @click="delMulu">
                        <img class="mr5" src="@/assets/img/delete.png" alt="">
                        <span>删除</span>
                    </div>
                </div>
            </div>
            <p class="fsize14 f-pf1 mt30">一级目录 > 二级文档 > 三级文档 > 四级文档 > 五级文档</p>
        </div>
        <!-- table -->
        <el-table
        class="my-table mb36"
        :data="list"
        stripe
        style="width: 100%">
        <el-table-column
        prop="filename"
        label="名称">
        <template slot-scope="scope">
            <div class="flex">
                <el-checkbox label="1"><br/></el-checkbox>
                <img class="mr14 ml12" src="@/assets/img/folder.png" alt="">
                <span>{{scope.row.filename}}</span>
            </div>
        </template>
        </el-table-column>
        <el-table-column
        prop="createTime"
        label="修改时间">
        </el-table-column>
        <el-table-column
        prop="type"
        width="100"
        label="类型">
        </el-table-column>
    </el-table>
    </div>
    <!--  -->
    <add-file ref="addFile"></add-file>
</div>
</template>

<script>
import addFile from '@/components/addFile'
export default {
	components:{addFile},
	data(){
		return {
			list:[
                // {
                //     filename:'尊享客户',
                //     type:'目录',
                //     createTime:'2020.11.12  15:37:11',
                // },
                // {
                //     filename:'尊享客户',
                //     type:'目录',
                //     createTime:'2020.11.12  15:37:11',
                // },
                // {
                //     filename:'尊享客户',
                //     type:'目录',
                //     createTime:'2020.11.12  15:37:11',
                // },
                // {
                //     filename:'尊享客户',
                //     type:'目录',
                //     createTime:'2020.11.12  15:37:11',
                // },
                // {
                //     filename:'尊享客户',
                //     type:'目录',
                //     createTime:'2020.11.12  15:37:11',
                // },
                // {
                //     filename:'尊享客户',
                //     type:'目录',
                //     createTime:'2020.11.12  15:37:11',
                // }
            ],
		}
    },
    methods:{
        addMulu(){
            this.$prompt('目录名称', '新增目录', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                
            })
        },
        delMulu(){
            this.$confirm('该目录下有文件，不能删除！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
        },
        addFile(){
            this.$refs.addFile.showAddFile = true;
        }
    }
}
</script>