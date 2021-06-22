<template>
<!-- 登录页首图 -->
<div class="main bgf7f8f9">
    <div class="bgfff h-con">
        <div class="pt44 pl68 pr68 pb38 col333">
            <p class="fsize24 f-pf2 fweight600">首页Banner</p>
            <div class="flex-sp">
                <div class="wid70 lh28 center bgcf1342 colfff bor-rad4 mt26 cursor f-yahei" @click="addData">+ 创建</div>
                <i></i>
            </div>
        </div>
        <el-table
            class="my-table mb36 mh400"
            :data="list"
            stripe
            style="width: 100%">
            <el-table-column
            label="图片">
            <template slot-scope="scope">
                <img class="wid47 h47 object-cover" :src="scope.row.photo" alt="">
            </template>
            </el-table-column>
            <el-table-column
            prop="title"
            label="图片名称">
            </el-table-column>
            <el-table-column
            label="状态">
            <template slot-scope="scope">
                <p :class="scope.row.audit==1?'col333':'col999'">{{scope.row.audit==1?'上架':'下架'}}</p>
            </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="220">
            <template slot-scope="scope">
                <div class="flex">
                    <div class="wid62 lh28 center col606266 fsize14 bor-c4c7cc bor-rad4 mr16 cursor f-yahei" @click="editData(scope.row.id)">编辑</div>
                    <div class="wid62 lh28 center col606266 fsize14 bor-c4c7cc bor-rad4 mr16 cursor f-yahei" @click="delData(scope.row.id)">删除</div>
                    <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 cursor f-yahei" @click="Operation(scope.row)">{{scope.row.audit==1?'下架':'上架'}}</div>
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
    <!-- 弹窗 -->
    <div class="mask" v-if="showMask">
        <div class="mask-inner wid580 p-24-40">
            <ul>
                <li class="flex-top mb28">
                    <p class="wid84 align-right fsize14 lh40 col57 mr28">名称</p>
                    <input class="wid360 fsize14 lh40 pl15 pr15 bor-c4c7cc bor-rad4" type="text" v-model="title">
                </li>
                <li class="flex-top mb10">
                    <p class="wid84 align-right fsize14 lh40 col57 mr28">预览图</p>
                    <div class="rel">
                        <img class="wid240 h240 object-cover" :src="nowImg.imgurl||editImg.imgurl||zhanweiImg" alt="">
                        <input class="wid240 h240 abs l0 t0 opacity0" ref="img" type="file" accept="image/*">
                        <p class="wid240 lh36 center fsize14 colfff bg000 opacity5 abs b0 l0 cursor" v-if="nowImg.imgurl||editImg.imgurl" @click="showPreview=true">预览图片</p>
                        <i class="el-icon-error abs r4 t4 fsize18 cursor" v-if="nowImg.imgurl||editImg.imgurl" @click="delImg(nowImg.id||editImg.id)"></i>
                    </div>
                </li>
            </ul>
            <div class="flex-end">
                <div class="wid62 lh28 center bgdcdfe6 col606266 fsize14 mr16 bor-c4c7cc bor-rad4 cursor f-yahei" @click="Cancle">取消</div>
                <div class="wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 cursor f-yahei" @click="Confirm">确定</div>
            </div>
        </div>
    </div>
    <!-- 图片预览 -->
    <div class="mask" v-if="showPreview" @click="showPreview=false">
        <img class="mask-inner" :src="nowImg.imgurl||editImg.imgurl" alt="">
    </div>
</div>
</template>

<script>
export default {
	components:{},
	data(){
		return {
            showMask:false,
            showPreview:false,
            editId:'',
			list:[
                // {
                //     photo:require('@/assets/img/folder.png'),
                //     title:'新年图',
                //     audit:'0',
                // },
                // {
                //     photo:require('@/assets/img/folder.png'),
                //     title:'新年图',
                //     audit:'0',
                // },
                // {
                //     photo:require('@/assets/img/folder.png'),
                //     title:'新年图',
                //     audit:'0',
                // },
            ],
            page:1,
            limit:5,
            total:0,
            title:'',
            nowImg:{},
            editImg:{},      //记录编辑进来的图片信息，当更换图片并保存的时候删除
            zhanweiImg:require('@/assets/img/zhanwei.png')
		}
    },
    mounted(){
        this.getData();
        
    },
    methods:{
        getData(){
            this.$fetch({
                url:'admin/banner/list',
                pageNo:this.page,
                limit:this.limit
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.list = res.data.data.list;
                    this.total = res.data.data.count;
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        changePage(page){
            this.page = page;
            this.getData();
        },
        addData(){
            this.showMask = true;
            this.$nextTick(()=>{
                this.initInput();
            })
        },
        editData(id){
            this.showMask = true;
            this.editId = id;
            this.$nextTick(()=>{
                this.initInput();
            })
            this.$fetch({
                url:'admin/banner/info',
                data:{id}
            }).then(res=>{
                if(res.data.returnCode == '0000'){
                    this.title = res.data.data.info.title;
                    this.editImg = {id:res.data.data.info.photo.id,imgurl:res.data.data.info.photo.url};
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        delData(id){
            this.$fetch({
                url:'admin/banner/del',
                data:{id}
            }).then(res=>{
                if(res.data.returnCode == '0000'){
                    this.$message({type:'success',message:'删除成功'});
                    this.getData();
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        Operation(item){
            //console.log(item);
            this.$fetch({
                url:'admin/banner/audit',
                data:{id:item.id}
            }).then(res=>{
                if(res.data.returnCode == '0000'){
                    this.$message({type:'success',message:'操作成功'});
                    this.getData();
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        Cancle(){
            if(this.nowImg.id){
                this.delImg(this.nowImg.id);
            }
            this.title = '';
            this.nowImg = {};
            this.editId = '';
            this.editImg = {};
            this.showMask = false;
        },
        Confirm(){
            if(!this.title){
                this.$message('请填写名称');
                return;
            }
            if(!this.nowImg.id&&!this.editImg.id){
                this.$message('请上传图片');
                return;
            }
            if(this.editId){          //编辑
                let data = {
                    id:this.editId,
                    title:this.title,
                    photo:this.nowImg.id
                }
                this.$fetch({
                    url:'admin/banner/edit',
                    type:'post',
                    data
                }).then(res=>{
                    if(res.data.returnCode == '0000'){
                        this.$message({type:'success',message:'编辑成功'});
                        this.title = '';
                        this.nowImg = {};
                        this.editId = '';
                        this.editImg = {};
                        this.showMask = false;
                        this.getData();
                        
                        this.delImg(this.editImg.id);
                    }else{
                        this.$message(res.data.msg);
                    }
                })
            }else{                 //新增
                let data = {
                    title:this.title,
                    photo:this.nowImg.id
                }
                this.$fetch({
                    url:'admin/banner/add',
                    type:'post',
                    data
                }).then(res=>{
                    if(res.data.returnCode == '0000'){
                        this.$message({type:'success',message:'添加成功'});
                        this.title = '';
                        this.nowImg = {};
                        this.editId = '';
                        this.editImg = {};
                        this.showMask = false;
                        this.getData();
                    }else{
                        this.$message(res.data.msg);
                    }
                })
            }
            
        },
        initInput(){
            const that = this;
			this.$refs['img'].addEventListener('change',function(e){
				let file = this.files[0];
				let fromData = new FormData();
				fromData.append('uploadFile',file)
				that.$fetch({
                    url:'admin/admin_upload/photo',
                    type:'post',
                    data:fromData
                }).then(res=>{
					//console.log(res,'图片上传')
					if(res.data.returnCode == '200'){
                        let lastId = that.nowImg.id;
                        //再次上传的时候删除上次的图片
                        if(lastId){
                            that.delImg(lastId)
                        }
                        that.nowImg = res.data.data;
						that.$message({message:'上传成功',type:'success'});
					}else{
						that.$message(res.data.msg);
					}
				})

				
				
			})
        },
        delImg(id){
            if(this.nowImg.id==id){
                this.nowImg = {};
            }
            if(this.editImg.id==id){        //编辑图片不删除
                this.editImg = {};
                return;
            }
            this.$fetch({
                url:'admin/admin_upload/delete',
                type:'post',
                data:{id}
            }).then(res=>{})
        }
    }
}
</script>