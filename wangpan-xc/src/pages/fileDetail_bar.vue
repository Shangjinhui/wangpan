//header和文件详情
<template>
<div>
    <my-header></my-header>		
				<div class="detail-page">
				    <div class="detail-top">
				        <my-crembs ></my-crembs>
				    </div>
                    <!--  :style="{background:`url('${bg}') top center/100% auto repeat-y`}" -->
				    <div class="detail-con">
                        <div class="back" @click="toBack">Back</div>
				        <p class="title col333">{{detail.name}}</p>
                        <div class="flex">
                            <p class="btn col333">Format: JPG</p>
                            <div class="col999">{{detail.createTime}}</div>
                        </div>
				        <div class="flex mt16">
				            <!-- <img class="file-img" :src="detail.preview||zhanwei" alt=""> -->
                            <img class="file-img" v-if="detail.preview" :src="detail.preview" alt="">
                            <img class="file-img" v-else :src="detail.type|Zhanwei" alt="">
				            <div class="flex-son lineh1">
				                <p class="desc1 col333 f-arialB" v-if="detail.description">Description</p>
				                <div class="desc2 col333" v-if="detail.description">{{detail.description}}</div>
				                <!-- <p class="desc3 col999">{{detail.createTime}}</p> -->
				                <!-- <p class="desc4 col999">Update author : 尚金辉</p> -->
				                <div v-if="previewUrl" class="flex block cursor" @click="lookOnline">
				                    <img src="@/assets/img/look.png" alt="">
				                    <p class="font18 col333 ml4">Online Preview</p>
				                </div>
				                <div class="flex block cursor" @click="toCollect">
				                    <img class="collect-icon" :src="isCollect==1?collectIcon[1]:collectIcon[0]" alt="">
				                    <p class="font18 col333 ml4">{{isCollect==1?'Collected':'Collect'}}</p>
				                </div>
				                <div class="flex block cursor" @click="toDownload">
				                    <img src="@/assets/img/download.png" alt="">
				                    <p class="font18 col333 ml4">Download</p>
				                </div>
				                <!-- <div class="flex">
				                    <p class="btn col333">Format: JPG</p>
				                </div> -->
                                <p class="tip flex cole02">
                                    <img class="mr5" src="@/assets/img/error.png" alt="" />
                                    For design format of this file, please contact salesteam in your region
                                </p>
				            </div>
				        </div>
				    </div>
				</div>
</div>
</template>

<script>
import myHeader from '@/components/header.vue'
import myCrembs from '@/components/crembs.vue'
export default {
	components:{myHeader,myCrembs},
	data(){
		return {
            bg:require('@/assets/img/detail-bg.png'),
            collectIcon:[require('@/assets/img/collect1.png'),require('@/assets/img/collect1s.png')],
            id:'',
            detail:{},
            formatList:[],
            previewUrl:'',     //预览地址
            isCollect:'0',
            fileType:0,     //文件下载类型
		}
    },
    mounted(){
        this.id = this.$route.query.id;
        this.getCon();
    },
    methods:{
        getCon(){
            this.$fetch({
                url:'api/client/file_info',
                data:{id:this.id}
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.detail = res.data.data.info;
                    this.formatList = res.data.data.files;
                    this.previewUrl = res.data.data.previewUrl;
                    this.isCollect = res.data.data.isCollect;
                }else{
                    //this.$message(res.data.msg); 
                }
            })
        },
        lookOnline(){
            if(this.detail.purview==0){
                this.$message('No permission to view this file');
                return;
            }
            // if(!this.previewUrl){
            //     this.$message('No preview');
            //     return;
            // }
            //window.open(this.previewUrl);
            let url = encodeURIComponent(this.previewUrl);
            window.open('/#/Transfer?type='+this.detail.type+'&url='+url);
        },
        toCollect(){

            this.$fetch({
                url:'api/client/collect',
                type:'post',
                data:{id:this.id}
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.$message({type:'success',message:this.isCollect==1?'Cancelled successfully':'Collection successful'});
                    this.isCollect = this.isCollect==1?0:1;
                }else{
                    this.$message(res.data.msg); 
                }
            })
        },
        toDownload(){
            if(this.detail.purview!=2){
                this.$message('No permission to download this file');
                return;
            }
            let a = document.createElement("a");
            let event = new MouseEvent("click");
            a.href = window.dl_q_baseURL+'api/client/download_file?id='+this.id+'&token='+encodeURIComponent(localStorage.tokenpc);
            a.dispatchEvent(event);

            this.Statistics();

            // this.$fetch({
            //     url:'api/client/download_file',
            //     data:{id:this.id}
            // }).then(res=>{
            //     if(res.data.returnCode == '0011'){
            //         this.$message('文件不存在！');
            //         return;
            //     }
            //     const excelUrl = window.URL.createObjectURL(new Blob([res.data]));
            //     console.log(excelUrl,'excelUrl')
            //     let a = document.createElement("a");
            //     let event = new MouseEvent("click");
            //     a.href = excelUrl;
            //     a.download = new Date().getTime()+'.'+this.detail.type;
            //     a.dispatchEvent(event);

            //     this.Statistics();
            // })
        },
        Statistics(){
            this.$fetch({
                url:'api/client/download_statistics',
                type:'post',
                data:{id:this.id},
                loading:false
            }).then(res=>{
                
            })
        },
        toBack(){
           this.$router.back();
        }
    }
}
</script>

<style lang="scss">
.detail-page{
    background: #F7F8F9;
    padding:20px;
    height:calc(100vh - 60px);
    overflow: auto;
    box-sizing: border-box;
    .detail-top{
        background:#fff;
        padding-left:6.4%;
        border-bottom: 1px solid #f0f2f5;
    }
    .detail-con{
        min-height:calc(100% - 52px);
        padding:2.6vw 6.4%;
        box-sizing: border-box;
        background:#fff;
        .back{
            font-size: 16px;
            color:#CF1342;
            font-weight:bold;
            margin-bottom:20px;
            cursor:pointer;
        }
        .title{
            font-size:28px;
            margin-bottom:14px;
            line-height: 1.3;
        }
        .file-img{
            width: 234px;
            height:234px;
            object-fit: contain;
            margin-right:44px;
        }
        .desc1{font-size: 17px;margin-bottom:11px;}
        .desc2{font-size: 12px;margin-bottom:5.1%;height:14px;}
        .desc3{font-size: 12px;margin-bottom:34px;}
        .block{
            margin-bottom:15px;
            .collect-icon{width:28px;}
            p{
                font-size:14px;
                margin-left:3px;
            }
        }
        .btn{
            font-size:12px;
            margin-right:18px;
        }
        .tip{
            font-size:12px;
            margin-top:24px;
        }
    }
}
@media screen and (min-width: 1500px){
.detail-page{
    height:calc(100vh - 80px);
    .detail-con{
        min-height:calc(100% - 52px);
        padding:20px 6.4%;
        .file-img{
            width: 312px;
            height:312px;
            margin-right:58px;
        }
        .desc1{font-size: 22px;margin-bottom:14px;}
        .desc2{font-size: 16px;margin-bottom:58px;height:18px;}
        .desc3{font-size: 14px;margin-bottom:49px;}
        .block{
            margin-bottom:20px;
            p{
                font-size:18px;
                margin-left:4px;
            }
        }
        .btn{
            font-size:14px;
            margin-right:20px;
        }
        .tip{
            font-size:12px;
            margin-top:24px;
        }
    }
}
}


</style>