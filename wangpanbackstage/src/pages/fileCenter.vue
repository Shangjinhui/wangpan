<template>
<div class="main bgf7f8f9">
    <div class="bgfff h-con">
        <div class="pt44 pl68 pr68 pb24 col333">
            <p class="fsize24 f-pf2 fweight600">文件中心</p>
            <div class="flex-sp mt26">
                <div class="flex">
                    <div class="wid94 lh28 flex-center bor-rad4 mr14 cursor f-yahei" :class="updateStatus==0?'bgf0f1f5 col57 bor-d5d8de':'bgcf1342 colfff'" @click="update_File">
                        <img class="mr5" :src="updateStatus==0?updateIcon[0]:updateIcon[1]" alt="">
                        <span>{{updateStatus==0?'更新中':'全量更新'}}</span>
                    </div>
                    <div class="wid94 lh28 flex-center bgf0f1f5 col57 bor-d5d8de bor-rad4 mr14 cursor f-yahei" @click="addMulu">
                        <img class="mr5" src="@/assets/img/bulkimport.png" alt="">
                        <span>新增目录</span>
                    </div>
                    <div class="wid94 lh28 flex-center bgf0f1f5 col57 bor-d5d8de bor-rad4 rel mr14 cursor f-yahei">
                        <img class="mr5" src="@/assets/img/newdirectory.png" alt="">
                       <!--  <el-upload
                            class="upload-demo"
                            :action="url"
                            name="file"
                            :headers=headers
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            multiple> -->
                            <span>批量录入</span>
                        <!-- </el-upload> -->
                        <input type="file" accept=".xls" ref="xls" class="wid94 h28 abs l0 t0 opacity0">
                    </div>
                    <el-checkbox label="全选" v-model="choose_all" @change="ChooseAll"></el-checkbox>
                </div>
                <div class="flex">
                    <div class="wid98 lh28 flex-center bgf0f1f5 col57 bor-d5d8de bor-rad4 mr14 cursor f-yahei" @click="add_Flie" :class="[file.length>1?'':'opacity5']">
                        <img class="mr5" src="@/assets/img/add_file.png" alt="">
                        <span>新增文件</span>
                    </div>
                    <div class="wid68 lh28 flex-center bgf0f1f5 col57 bor-d5d8de bor-rad4 cursor f-yahei" @click="delMulu">
                        <img class="mr5" src="@/assets/img/delete.png" alt="">
                        <span>删除</span>
                    </div>
                </div>
            </div>
            <div class="fsize14 f-pf1 mt30 bread">
                <p class="fa" v-for="(item,index) in file" :key="index" @click="bread_Mulu(item.id,item.name)">{{item.name}}<span v-if="index!=file.length-1">></span></p>
            </div>
        </div>
        <!-- table -->
        <el-table
        class="my-table mb36"
        ref="dragTable"
        :data="list"
        stripe
        row-key="id"
        :row-class-name="handleClass"
        style="width: 100%">
        <el-table-column
        prop="filename"
        label="名称">
            <template slot-scope="scope">
                <div class="flex">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox :label="scope.row.id"><br/></el-checkbox>
                    </el-checkbox-group>
                    <img class="mr14 ml12 cursor" v-show="scope.row.isDir==1" src="@/assets/img/directory.png" @click="enter_Mulu(scope.row.id,scope.row.name)" alt="">
                    <span  v-show="scope.row.isDir==1" @click="enter_Mulu(scope.row.id,scope.row.name)" class="cursor">{{scope.row.name}}</span>
                    <img class="mr14 ml12 cursor" v-show="scope.row.isDir==0" src="@/assets/img/folder.png" alt="">
                    <span v-show="scope.row.isDir==0" class="cursor">{{scope.row.name}}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column
        prop="createTime"
        label="修改时间">
            <template slot-scope="scope">
                <div class="">
                   {{scope.row.createTime}}
                </div>
            </template>
        </el-table-column>
        <el-table-column
        prop="type"
        width="160"
        label="类型">
            <template slot-scope="scope">
                <div class="">
                    <span v-show="scope.row.isDir==0">文件</span>
                    <span v-show="scope.row.isDir==1">目录</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column
        prop="operating"
        width="160"
        label="操作">
        <template slot-scope="scope">
            <div class="">
                <span class="edit_Btn center f-yahei" v-show="scope.row.isDir==1"  @click="edit_Name(scope.row.id,scope.row.name)">修改名称</span>
                <router-link class="edit_Btn center f-yahei" v-show="scope.row.isDir==0" :to="{name:'fileDetail',query:{id:scope.row.id,type:encodeURIComponent(JSON.stringify(file))}}">编辑</router-link>
            </div>
        </template>
        </el-table-column>
    </el-table>
    </div>
    <add-file ref="addFile"></add-file>
</div>
</template>
<script>
import Sortable from 'sortablejs'
import addFile from '@/components/addFile'
export default {
	components:{addFile},
    inject:['routerRefresh'],
	data(){
		return {
            list:[],          //文件列表
            checkList:[],
            file:[              //面包屑
                {
                    name:'一级目录',
                    id:'',
                }
            ],
            id:this.$route.query.id?this.$route.query.id:'',
            timer:null,
            updateStatus:1,         //0更新中1更新完成
            updateIcon:[require('@/assets/img/refresh.png'),require('@/assets/img/refreshs.png')],
            //fileList:[],
            // url:window.baseURL + 'admin/admin_dir/export',
            // headers:{
            //     'Content-Type': 'application/json',
            //     'Authorization':localStorage.token?localStorage.token:null,
            //     'Platform':2
            // }
            choose_all:false,
		}
    },
    
    mounted(){
        var _this=this;
        if(_this.id){
            _this.file=JSON.parse(decodeURIComponent(_this.$route.query.type));
        }
        this.getData(this.id);
        this.initInputXsl();
        this.setSort();

        this.getUpdateStatus();
    },
    destroyed(){
        clearTimeout(this.timer);
    },
    watch:{
        checkList(val){
            this.choose_all = val.length!=this.list.length?false:true;
        }
    },
    methods:{
        ChooseAll(o){
            console.log(o);
            this.checkList = o?this.list.map(item=>item.id):[];
        },
        handleClass({row,rowIndex}){
            if(row.isDir==1){
                return 'table-mulu cursor-move'
            }else{
                return 'table-wenjian'
            }
        },
        //表格排序定义
        setSort(){
            const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
            this.sortable = Sortable.create(el,{
                handle:'.table-mulu',
                filter:'.table-wenjian',
                // setData:function(dataTransfer){
                //     console.log(dataTransfer,'dataTransfer')
                //     //dataTransfer.setData('Text', '')
                // },
                onEnd: evt => {
                    //console.log(evt,'evt');
                    let list = [...this.list],oldList = [...this.list],oi = evt.oldIndex,ni = evt.newIndex;
                    
                    let temp = list[oi];
                    list.splice(oi,1);
                    list.splice(ni,0,temp);
                    // const targetRow = this.list.splice(evt.oldIndex, 1)[0];
                    // this.list.splice(evt.newIndex, 0, targetRow);
                    //console.log(this.sortable,'this.sortable');
                    if(oldList[evt.newIndex].isDir==1){
                        this.list = list;
                        this.ChangeOrder();
                    }else{
                        this.list = [];
                        this.$nextTick(()=>{this.list = oldList;})
                    }
                }
            })
        },
        ChangeOrder(){
            let list = this.list,ids = [];
            for(let i=0;i<list.length;i++){
                if(list[i].isDir==1){
                    ids.push(list[i].id);
                }
            }
            this.$fetch({
                url:'admin/admin_dir/dir_sort',
                data:{id:ids.join(',')}
            }).then(res=>{
                if(res.data.returnCode!=='0000'){
                    this.$message(res.data.msg);
                }
            })
        },
        //监听全量更新状态
        getUpdateStatus(){
            this.$fetch({
                url:'admin/admin_dir/update_status',
                loading:false
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.updateStatus = res.data.data.status;
                    if(res.data.data.status==0){
                        this.timer = setTimeout(()=>{
                            this.getUpdateStatus();
                            clearTimeout(this.timer);
                        },600000)
                    }
                }
            })
        },
        //文件列表
        getData(e){
            let data = {
                id:e,
            }
            this.id=e;
            this.$fetch({
                url:'admin/admin_dir/dir',
                data
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.list = res.data.data.dirList;
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        //修改文件名称
        edit_Name:function(id,name){
            var _this=this;
            _this.$prompt(name, '修改名称', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                let data = {
                    id:id,
                    name:value,
                    description:'',
                    preview:'',
                    type:'',
                    fileId:'',
                }
                _this.$fetch({
                    url:'admin/admin_dir/edit_dir',
                    type:'post',
                    data
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        _this.getData(_this.id);
                    }else{
                        _this.$message(res.data.msg);
                    }
                })
            }).catch(()=>{})
        },
        //进入页面详情
        file_Info:function(){
        },
        //新增目录
        addMulu(){
            var _this=this;
            _this.$prompt('目录名称', '新增目录', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                let data = {
                    id:_this.id, // 上级id    String  true
                    isDir:1, //   是否文件夹，0否，1是 String  true
                    name:value, //    名称  String  true
                    description:'', // 描述（文件夹不传）   String  true
                    preview:'', // 预览图（文件夹不传）  String  true
                    type:'', //    文件格式id（文件夹不传）   String  true
                    fileId:'', //
                }
                _this.$fetch({
                    url:'admin/admin_dir/add_dir',
                    type:'post',
                    data
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        _this.$message({
                           message: '添加成功！',
                           type: 'success'
                        });
                        _this.getData(_this.id);
                    }else{
                        _this.$message(res.data.msg);
                    }
                })
            }).catch(()=>{})
        },
        //删除目录
        delMulu(){
            // console.log(this.checkList);
            // return;
            var _this=this;
            if(!_this.checkList.length){
                _this.$message({
                  message:'请选择文件',
                  type: 'warning'
                });
                return ;
            }
            _this.$confirm('确定删除当前选中文件?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let data = {
                    id:_this.checkList.join(','),
                } 
                _this.$fetch({
                    url:'admin/admin_dir/del_dir',
                    type:'post',
                    data
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        _this.$message({
                           message: '删除成功！',
                           type: 'success'
                        });
                        _this.getData(_this.id);
                    }else{
                        _this.$message(res.data.msg);
                    }
                }) 
            }).catch(() => {
            });
        },
        //批量录入
        initInputXsl(){
            const that = this;
            this.$refs['xls'].addEventListener('change',function(e){
				let file = this.files[0];
				let fromData = new FormData();
				fromData.append('file',file)
				that.$fetch({
                    url:'admin/admin_dir/export',
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
        //进入子文件事件处理
        enter_Mulu:function(id,name){
            var _this=this;
            var array={
                name:name,
                id:id,
            }
            _this.file.push(array); //把选中的文件夹名字和id 存入面包屑
            _this.checkList=[]; //清空选中的文件
            _this.id = id;
            _this.getData(id);
        },
        //点击面包屑进入目录方式
        bread_Mulu:function(id,name){ //塞选面包屑
            var _this=this,array=[];
            for(var i in _this.file){
                if(_this.file[i].id==id){
                    array.push(_this.file[i]);
                    _this.file=array;
                    _this.checkList=[]; //清空选中的文件
                    _this.$router.push({ 
                        name:'fileCenter',
                        query:{
                            id:id,
                            type:encodeURIComponent(JSON.stringify(_this.file))
                        } 
                    })
                    _this.routerRefresh();
                    return;
                }else{
                    array.push(_this.file[i])
                }
            }
        },
        //新增文件
        add_Flie:function(){
            var _this=this;
            _this.$refs.addFile.showAddFile = true;
        },
        // 全量更新
        update_File:function(){
            if(this.updateStatus==0) return;
            var _this=this;
            let data = {}
            _this.$fetch({
                url:'admin/admin_dir/all_update',
                data
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                   _this.updateStatus = 0;
                }else{
                    _this.$message(res.data.msg);
                }
            })
        },
    }
}
</script>
<style scope>
    .cursor{
        cursor: pointer;
    }
    .center,
    th .cell{
        text-align: center;
    }
    th:first-child .cell{
        text-align: left;
    }
    .edit_Btn{
        width: 72px;
        height: 30px;
        line-height: 30px;
        background: #CF1342;
        color: #fff;
        border-radius: 6px;
        display: block;
        /* margin: 0 auto; */
        cursor: pointer;
    }
    .bread .fa{
        display: inline-block;
        float: left;
        margin-right: 5px;
        cursor: pointer;
    }
    .bread .fa span{
        margin-left: 5px;
    }
    .el-table__empty-text{
        line-height: 160px;
    }
</style>