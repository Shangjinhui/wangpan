<template>
<div class="mask" v-show="showAddFile">
    <div class="mask-box overflow-auto">
        <div class="f-cb centent">
            <ul class="file_info fl">
                <li class="flex-top li">
                    <p class="label">文件名称</p>
                    <input class="text-box wid360 fsize14 lh40 h40 pl15 pr15 bor-c4c7cc bor-rad4" v-model="file_name" type="text" value="">
                </li>
                <li class="flex-top li">
                    <p class="label">文件描述</p>
                    <textarea class="text-box wid360 h172 fsize14 lh18 pl15 pr15 bor-c4c7cc bor-rad4"  v-model="file_text"></textarea>
                </li>
                <li class="flex-top li">
                    <p class="label">预览图</p>
                    <div class="rel img-box por">
                        <img class="object-cover" :src="preview" alt="">
                        <input type="file" accept="image/*" ref="img" class="upload-input">
                        <p class="tip-fa">预览图片</p>
                        <i v-show="preview_id" class="el-icon-error abs r4 t4 fsize18 cursor opacity5" @click="delete_Img"></i>
                    </div>
                </li>
            </ul>
            <div class="file_list fr">
                <div class="flex head-module">
                    <div class="flex-top">
                        <p class="tit">文件名称</p>
                        <input class="input-box" type="text" v-model="name" value="">
                    </div>
                    <div class="flex-top">
                        <p class="tit">文件类型</p>
                        <template>
                            <el-select class="select-box" v-model="type" placeholder="请选择">
                                <el-option
                                  v-for="item in fileType"
                                  :key="item.type"
                                  :label="item.type"
                                  :value="item.type">
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                    <div class="search" @click="search()">搜索</div>
                </div>
                <!-- table -->
                <el-table
                    class="my-table2"
                    :data="list"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="filename"
                    label="文件完整名称">
                    <template slot-scope="scope">
                        <div class="flex">
                            <el-checkbox-group v-model="checkLists">
                                <el-checkbox :label="scope.row.id" @change="checkBoxs(scope.row.id,scope.row.cheack,scope.row.index)"><br/></el-checkbox>
                            </el-checkbox-group>   
                            <span class="font-over block">{{scope.row.fileName}}</span>
                        </div>
                    </template>
                    </el-table-column>
                    <el-table-column
                    width="100"
                    label="是否分配">
                        <template slot-scope="scope">
                            <div class="center">{{scope.row.dirId==0?'否':'是'}}</div>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                    prop=""
                    width="15"
                    label="">
                        <template slot-scope="scope">
                            <div class="center"></div>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                    prop="createTime"
                    width="160"
                    label="更新时间">
                        <!-- <template slot-scope="scope">
                            <div class="center">2020-12-09 17:01:52</div>
                        </template> -->
                    </el-table-column>
                    <el-table-column
                    prop=""
                    width="5"
                    label="">
                    </el-table-column>
                </el-table>
                <el-pagination
                @current-change="changePage"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="count">
                </el-pagination>
            </div>
        </div>
        <div class="flex-end">
            <div class="colse-btn" @click="colseFile">取消</div>
            <div class="submit-btn" @click="submitFile">确定</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
	components:{},
	data(){
		return {
            showAddFile:false,
            name:'', //搜索文件名称
            file_name:'',//文件名称
            file_text:'', //文件描述
            list:[],
            checkLists:[],
            preview:require('@/assets/img/zhanwei.png'),
            preview_id:'',
            pageNo:1,
            limit:10,
            count:0,
            fileType:[],
            type:'',
		}
    },
    mounted(){
        var that=this;
        that.getList();
        that.$nextTick(function(){
            that.$refs['img'].addEventListener('change',function(e){
                let file = this.files[0];
                let fromData = new FormData();
                fromData.append('uploadFile',file)
                that.$fetch({
                    url:'admin/admin_upload/photo',
                    type:'post',
                    data:fromData
                }).then(res=>{
                    e.target.value = '';
                    if(res.data.returnCode == '200'){
                        that.preview = res.data.data.imgurl;
                        that.preview_id = res.data.data.id;
                        that.$message({message:'上传成功',type:'success'});
                    }else{
                        that.$message(res.data.msg);
                    }
                })
            })
        })
    },
    methods:{
        //搜索
        search:function(){
            var _this=this;
            _this.pageNo=1;
            _this.getList();
        },
        //数据列表
        getList:function(){
            var _this=this;
            let data = {
                pageNo:_this.pageNo,
                limit:_this.limit,
                search:_this.name,
                fileType:_this.type,
            }
            this.$fetch({
                url:'admin/admin_dir/third_list',
                data
            }).then(res=>{
                var list= res.data.data.list;
                _this.fileType=res.data.data.fileType;
                if(res.data.returnCode=='0000'){
                    for(var i in list){
                        list[i].cheack=false;
                        list[i].index=i;
                    }
                    _this.list = list;
                    _this.count = res.data.data.count;
                }else{
                    _this.$message(res.data.msg);
                }
            })
        },
        //分页
        changePage:function(e){
            var _this=this;
            _this.pageNo=e;
            _this.getList();
        },
        //单选
        checkBoxs:function(id,cheack,index){
            var _this=this;
            for(var i in _this.list){
                _this.list[index].cheack=false;
            }
            _this.checkLists=[];
            _this.checkLists.push(id);
            _this.list[index].cheack=!_this.list[index].cheack;
        },
        //删除图片
        delete_Img:function(){
            const that = this;
            let data = {
                id:that.preview_id,
            }
            that.$fetch({
                url:'admin/admin_upload/delete',
                type:'post',
                data
            }).then(res=>{
                if(res.data.returnCode=='200'){
                    that.preview = require('@/assets/img/zhanwei.png');
                    that.preview_id = '';
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        colseFile:function(){
            var _this=this;
            _this.showAddFile=false;
            _this.name='';
            _this.type='';
            _this.file_name='',//文件名称
            _this.file_text='', //文件描述
            _this.checkLists=[];
            _this.preview_id='';
            _this.preview=require('@/assets/img/zhanwei.png');
        },
        submitFile:function(){
            var _this=this;
            if(!_this.file_name){
                _this.$message({
                    message: '请输入文件名称',
                    type: 'warning'
                });
                return
            }
            // if(!_this.file_text){
            //     _this.$message({
            //         message: '请输入文件描述',
            //         type: 'warning'
            //     });
            //     return
            // }
            // if(!_this.preview_id){
            //     _this.$message({
            //         message: '请上传预览图',
            //         type: 'warning'
            //     });
            //     return
            // }
            if(!_this.checkLists.length){
                _this.$message({
                    message: '请选择文件',
                    type: 'warning'
                });
                return
            }
            var file=_this.$parent.file;
            var id=file[file.length-1].id;
            let data = {
                id:id,//  上级id    String  true
                isDir:0,//   是否文件夹，0否，1是 String  true
                name:_this.file_name,//    名称  String  true
                description:_this.file_text||'',// 描述（文件夹不传）   String  true
                preview:_this.preview_id||'',// 预览图（文件夹不传）  String  true
                fileId:_this.checkLists[0],//
            }
            this.$fetch({
                url:'admin/admin_dir/add_dir',
                type:'post',
                data
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    _this.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    _this.colseFile();
                    _this.$parent.getData(id);
                }else{
                    _this.$message(res.data.msg);
                }
            })
        }
    },
}
</script>
<style scope>
    .font-over{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .block{display: block;}
    .por{position: relative;}
    .clear {clear: both;}
    .f-cb {zoom: 1;}
    .f-cb:after {
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
      overflow: hidden;
      content: ".";
    }
    .fl {float: left;display: inline;}
    .fr {float: right;display: inline;}
    .mask{overflow: hidden;}
    .mask-box{
        background-color: #fff;
        width: 81%;
        position: fixed;
        right: 0;
        top: 0;
        height: 100%;
    }
    .mask-box .file_info{
        width: 40%;
        min-height: 90vh;
        background-color: #F9FBFC;
        height: 100%;
        padding: 5vh 4% 0 5%;
    }
    .mask-box .file_info .li{
        margin-bottom: 3vh;
    }
    .mask-box .file_info .label{
        width: 84px;
        font-size: 14px;
        line-height: 40px;
        color: #575757;
    }
    .mask-box .file_info .upload-input{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        opacity: 0;
        height: 100%;
        z-index: 2;
    }
    .mask-box .file_info .el-icon-error{
        z-index: 5;
    }
    .mask-box .file_info  textarea{
        padding-top: 10px;
    }
    .mask-box .file_info .text-box{
        width: 58%;
    }   
    .mask-box .file_info .text-boxs{
        width: 70%;
        line-height: 20px;
    }
    .mask-box .file_info .img-box{
        max-width: 240px;
        width: 14vw;
        overflow: hidden;
        height: 14vw;
        max-height: 240px;
    }
    .mask-box .file_info .img-box .tip-fa{
        width: 100%;
        height: 36px;
        line-height: 36px;
        bottom: 0;
        left: 0;
        position: absolute;
        background-color: rgba(0,0,0,0.5);
        text-align: center;
        color: #fff;
    }
    .mask-box .file_info .img-box .object-cover{
        max-width: 240px;
        width: 14vw;
        height: 14vw;
        display: block;
        max-height: 240px;
    }
    .mask-box .file_info .text-boxs .flex{
        width: 33%
    }
    .my-radio input[type='radio'] + label{
        padding-left: 28px;
    }
    .my-radio input[type='radio'] + label:before{
        background: url(../assets/img/points.png) left center/20px no-repeat;
    }
    .my-radio input[type='radio']:checked + label:after{
        background: url(../assets/img/point.png) left center/20px no-repeat;
    }
    .mask-box .file_info .text-boxs .flex label{
        line-height: 20px;
        height: 20px;
        display: inline-block;
    }
    .mask-box .file_list{
        width: 60%;
        padding-left: 4.3%;
        min-height: 90vh;
        padding-top: 5vh;
    }
    .file_list .head-module{
        margin-bottom: 3vh;
    }
    .file_list .head-module .flex-top .tit{
        max-width: 84px;
        line-height: 42px;
        font-size: 14px;
        color: #575757;
        width: 5.5vw;
    }
    .file_list .head-module .flex-top .input-box{
        width: 12vw;
        font-size: 14px;
        line-height: 40px;
        height:40px;
        border: 1px solid #c4c7cc;
        border-radius: 4px;
        padding: 0 10px;
        max-width: 230px;
    }
    .file_list .head-module .flex-top .select-box{
        width: 12vw;
        font-size: 14px;
        line-height: 40px;
        border-radius: 4px;
        max-width: 230px;
    }

    .file_list .head-module .flex-top:first-child{
        margin-right: 2vw;
    }
    .file_list .head-module .search{
        text-align: center;
        cursor: pointer;
        border-radius: 4px;
        line-height: 42px;
        width: 64px;
        background-color: #cf1342;
        color: #fff;
        font-size: 14px;
        margin-left: 2vw;
    }
    .file_list .my-table2 .center{
        padding: 0 10px 0 0;
        text-align: center;
    }
    .file_list .my-table2 td{
        padding: 1vh 0;
    }
    .file_list .my-table2 td .el-checkbox-group{
        height: 23px;
    }
    .file_list .my-table2 th{
        padding: 0 0 12px 0;
    }
    .file_list .my-table2 td .cell,
    .file_list .my-table2 th .cell{
        padding: 0
    }
    .file_list .my-table2 th .cell{
        font-size: 14px;
        color: #333333;
        font-weight: 600;
        line-height: 20px;
        padding:0 10px 0 0;
    }
    .file_list .my-table2 th.el-table_2_column_6,
    .file_list .my-table2 th.el-table_2_column_8{
        text-align: center
    }
    .file_list .el-table--striped .el-table__body tr.el-table__row--striped td{
        background-color: #fff;
    }
    .file_list  td{
        border-bottom: 0
    }
    .file_list .el-pagination{
        margin-top: 2vh;
    }
    .file_list  .el-table__body-wrapper{
        padding: 1vh 0;
    }
    .mask-box .flex-end{
        width: 100%;
        border-top: 1px solid #EAEBEF;
        padding-top: 3vh;
    }
    .mask-box .flex-end .colse-btn,
    .mask-box .flex-end .submit-btn{
        width: 64px;
        line-height: 30px;
        border-radius: 4px;
        text-align: center;
        cursor: pointer;
    }
    .mask-box .flex-end .colse-btn{
        background-color: #dcdfe6;
        color: #606266;
        margin-right: 16px;
    }
    .mask-box .flex-end .submit-btn{
        background-color: #cf1342;
        color: #fff;
        margin-right: 2vw;
    }


    @media screen and (min-width:1300px){
        .file_list .my-table2 td {
            padding: 1.1vh 0;
        }
        .file_list .el-pagination {
            margin-top: 2vh;
        }
    }
    @media screen and (min-width:1600px){
        .file_list .head-module{
            margin-bottom: 4vh;
        }
        .mask-box .file_list,
        .mask-box .file_info{
            padding-top: 6vh;
        }
        .file_list .el-table__body-wrapper {
            padding: 1.3vh 0;
        }
        .file_list .my-table2 td {
            padding: 1.3vh 0;
        }
        .file_list .el-pagination {
            margin-top: 3vh;
        }
    }
</style>