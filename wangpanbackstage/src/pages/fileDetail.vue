<template>
<div class="main bgf7f8f9">
    <div class="bgfff h-con">
        <div class="pt44 pl68 pr68 col333">
            <p class="fsize24 f-pf2 fweight600">文件中心</p>
            <div class="flex-sp mt26">
                <div class="flex">
                    <!-- <div class="wid94 lh28 flex-center bgcf1342 colfff bor-rad4 mr14 cursor f-yahei">
                        <img class="mr5" src="@/assets/img/refresh.png" alt="">
                        <span>全量更新</span>
                    </div>
                    <div class="wid94 lh28 flex-center bgf0f1f5 col57 bor-d5d8de bor-rad4 mr14 cursor f-yahei">
                        <img class="mr5" src="@/assets/img/bulkimport.png" alt="">
                        <span>新增目录</span>
                    </div>
                    <div class="wid94 lh28 flex-center bgf0f1f5 col57 bor-d5d8de bor-rad4 cursor f-yahei">
                        <img class="mr5" src="@/assets/img/newdirectory.png" alt="">
                        <span>批量录入</span>
                    </div> -->
                </div>
                <div class="flex">
                    <div class="wid122 lh28 flex-center bgf0f1f5 col57 bor-d5d8de bor-rad4 mr14 cursor f-yahei" @click="edit_File">
                        <img class="mr5" src="@/assets/img/addfile.png" alt="">
                        <span>文件信息编辑</span>
                    </div>
                    <div class="wid68 lh28 flex-center bgf0f1f5 col57 bor-d5d8de bor-rad4 cursor f-yahei" @click="del_File">
                        <img class="mr5" src="@/assets/img/delete.png" alt="">
                        <span>删除</span>
                    </div>
                </div>
            </div>
            <div class="fsize14 f-pf1 mt30 bread f-cb">
            <p class="fa" v-for="(item,index) in file" :key="index" @click="bread_Mulu(item.name,item.id)">{{item.name}}<span v-if="index!=file.length-1">></span></p>
            </div>
        </div>
        <div class="mt66 pl68 col333 flex-top">
            <img class="wid240 h240 object-cover mr62" :src="(info.preview&&info.preview.url)||zhanwei" alt="">
            <div class="wid670">
                <p class="fsize22 fweight600 mb16">{{info.name}}</p>
                <p class="fsize14 lh24 mh168">{{info.description}}</p>
                <div class="flex">
                    <div v-for="(item,index) in files" :key="index" class="wid84 lh36 fsize14 bgcf1342 colfff bor-rad4 center mr16">{{item.fileType}}</div>
                </div>
            </div>
        </div>
    </div>
    <!-- 弹窗 -->
    <div class="mask" v-show="showAddFile">
        <div class="mask-inner wid580 p-24-40">
            <ul>
                <li class="flex-top">
                    <p class="wid84 align-right fsize14 lh40 col57 mr28">文件名称</p>
                    <input class="wid360 fsize14 h40 lh40 pl15 pr15 bor-c4c7cc bor-rad4" type="text" v-model="file_name" value="">
                </li>
                <li class="flex-top">
                    <p class="wid84 align-right fsize14 lh40 col57 mr28">文件描述</p>
                    <textarea class="wid360 fsize14 lh18 pl15 pr15 bor-c4c7cc bor-rad4" v-model="file_text"></textarea>
                </li>
                <li class="flex-top">
                    <p class="wid84 align-right fsize14 lh40 col57 mr28">预览图</p>
                    <div class="rel por img-boxs">
                        <img class="object-cover" :src="preview||previewZhanwei" alt="">
                        <input type="file" accept="image/*" ref="img" class="upload-input">
                        <p class="tip-fa">预览图片</p>
                        <i class="el-icon-error abs r4 t4 fsize18 cursor" @click="del_Imges" v-show="preview_id"></i>
                    </div>
                </li>
            </ul>
            <div class="flex-end">
                <div @click="colse_File" class="wid62 lh28 center bgdcdfe6 col606266 fsize14 mr16 bor-c4c7cc bor-rad4 cursor">取消</div>
                <div @click="submit_File" class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 cursor">确认</div>
            </div>
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
            id:this.$route.query.id,
            file:JSON.parse(decodeURIComponent(this.$route.query.type)),
            info:{},
            file_name:'',
            file_text:'',
            previewZhanwei:require('@/assets/img/zhanwei.png'),
            preview:'',
            preview_id:'',
            image:'',
            image_id:'',
            files:[],
            zhanwei:require('@/assets/img/picture.png'),
		}
    },
    mounted(){
        var that=this;
        that.get_Info(); 
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
        //详情
        get_Info:function(type){
            var _this=this;
            let data = {
                id:_this.id,
            }
            this.$fetch({
                url:'admin/admin_dir/dir_info',
                data
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    _this.info=res.data.data.info;
                    if(res.data.data.info && res.data.data.info.preview){
                        _this.preview_id=res.data.data.info.preview.id;
                        _this.preview=res.data.data.info.preview.url;
                        _this.image_id=res.data.data.info.preview.id;
                        _this.image=res.data.data.info.preview.url;
                    }
                    _this.files=res.data.data.files;
                    _this.file_name=res.data.data.info.name;
                    _this.file_text=res.data.data.info.description;
                    if(type!='change'){
                        var array={
                            name:res.data.data.files[0].fileName,
                            id:res.data.data.files[0].id,
                        }
                        _this.file.push(array);
                    }
                    
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        //编辑文件状态
        edit_File:function(){
            var _this=this;

            _this.showAddFile=true;
            _this.preview=_this.image;
            _this.preview_id=_this.image_id;
        },
        // 取消编辑
        colse_File:function(e){
            var _this=this;
             _this.showAddFile=false;
            _this.file_name=_this.info.name;//文件名称
            _this.file_text=_this.info.description; //文件描述
            if(e){
                _this.preview_id = "";
                _this.preview_id='';
                _this.preview='';
                _this.image_id='';
                _this.image='';
            }else{
                _this.del_Imges();
            }
            // _this.preview_id='';
            // _this.preview=require('@/assets/img/zhanwei.png');
            
        },
        // 图片置空
        del_Imges:function(){
            const that = this;
            if(that.preview_id!=that.image_id && that.preview_id){
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
            }else{
                that.preview = require('@/assets/img/zhanwei.png');
                that.preview_id = '';
            }
        },
        //提交修改
        submit_File:function(){
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
            let data = {
                id:_this.id,//  上级id    String  true
                isDir:0,//   是否文件夹，0否，1是 String  true
                name:_this.file_name,//    名称  String  true
                description:_this.file_text||'',// 描述（文件夹不传）   String  true
                preview:_this.preview_id||'',// 预览图（文件夹不传）  String  true
                fileId:'',//
            }
            // console.log(data);
            // return;
            this.$fetch({
                url:'admin/admin_dir/edit_dir',
                type:'post',
                data
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    _this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    _this.colse_File(1);
                    _this.get_Info('change');
                }else{
                    _this.$message(res.data.msg);
                }
            })
        },
        //删除文件
        del_File:function(){
            var _this=this;
            _this.$confirm('确定删除当前文件？', '温馨提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                let data = {
                    id:_this.id,
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
                        var time=setTimeout(function(){
                            clearTimeout(time);
                            _this.$router.push({
                                name:'fileCenter',
                            })
                        },1000)
                    }else{
                        _this.$message(res.data.msg);
                    }
                })
            })
        },
        bread_Mulu:function(name,id){
            var _this=this,array=[];
            for(var i in _this.file){
                if(_this.file[i].id==id){
                    array.push(_this.file[i])
                    _this.file=array;
                    _this.checkList=[]; //清空选中的文件
                    _this.$router.push({ 
                        name:'fileCenter',
                        query:{
                            id:id,
                            type:encodeURIComponent(JSON.stringify(_this.file))
                        } 
                    })
                    return
                }else{
                    array.push(_this.file[i])
                }
            }
        }
    }
}
</script>
<style scope>
    .f-cb {
      zoom: 1;
    }
    .f-cb:after {
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
      overflow: hidden;
      content: ".";
    }
    .por{
        position: relative;
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
    .upload-input{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        opacity: 0;
        height: 100%;
        z-index: 2;
    }
    .mask-inner .flex-top{
        margin-bottom: 1.5vw;
    }
    .mask-inner .flex-top textarea{
        padding-top: 10px;
        height: 20vh;
        max-height: 172px;
    }
    .mask-inner .flex-top .img-boxs{
        width: 30vh;
        height: 30vh;
        max-width: 240px;
        max-height: 240px;
    }
    .mask-inner .flex-top .object-cover{
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
    }
    .mask-inner .flex-top .tip-fa{
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
    .mask-inner .flex-top .el-icon-error{
        z-index: 5;
    }
</style>