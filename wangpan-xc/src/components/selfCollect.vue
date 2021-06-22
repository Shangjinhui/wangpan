<template>
<div class="self-collect-page">
    <div class="collect-con">
		<div class="vessel">
        <p class="title">My collection（<span class="clocf1">{{fileList.length}}</span>）</p>
		<div class="flex-end">
			<el-checkbox v-model="checkedAll" @change="chooseAll">Select all</el-checkbox>
			<div class="btn flex-center cursor" @click="CancleColl"><span>Cancel Collection</span></div>
			<div class="btn flex-center cursor" @click="downLoad"><img src="@/assets/img/Batch download.png" alt=""><span>Download</span></div>
		</div>
		</div>
        <div class="collect-con-inner" v-if="fileList.length>0">
			<ul class="con">
                <el-checkbox-group class="flex-top flex-wrap" v-model="chooseList">
                    <li class="flex-center-column" v-for="(item,index) in fileList" :key="index">
						<div class="pic" @click="toDetail(item.id,item.type)">
                             <img src="@/assets/img/map.png" class="map_Image">
						     <img class="img cursor" v-if="item.preview" :src="item.preview" alt="">
                             <img class="img cursor" v-else :src="item.type|Zhanwei" alt="">
						</div>
                        <div class="flex c-btm">
                            <!-- <el-checkbox v-model="item.choosed" :disabled="item.purview!=2"></el-checkbox> -->
                            <el-checkbox :disabled="item.purview!=2" :label="item.id"><br/></el-checkbox>
                            <p class="font14 col333 ellipsis2">{{item.name}}</p>
                        </div>
                    </li>
                </el-checkbox-group>
            </ul>
            
        </div>
        <no-data v-else></no-data>
		<!-- 分页器 -->
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
import noData from '@/components/noData.vue'
export default {
	components:{noData},
	data(){
		return {
			fileList:[
			],
			chooseList:[],
			checkedAll:false,
			page:1,
			limit:10,
            total:0,
		}
	},
	computed:{
	},
	watch:{
        chooseList(val,old){
            this.checkedAll = val.length!=this.fileList.length?false:true;
        }
    },
	mounted(){
		this.getList();
		document.getElementsByClassName('el-pagination__jump')[0].childNodes[0].nodeValue = 'Travel to'
        document.getElementsByClassName('el-pagination__jump')[0].childNodes[2].nodeValue = 'Page'
	},
	methods: {
		chooseAll(){
            //console.log(this.chooseList);
            let list = this.fileList,checkedAll = this.checkedAll,ids = [];
            //console.log(list,'list')
            if(checkedAll){
                for(let i=0;i<list.length;i++){
                    ids.push(list[i].id);
                }
                this.chooseList = ids;
            }else{
                this.chooseList = [];
            }
            
            
        },
		getList(){
			this.$fetch({
				url:'api/client/collect_list',
				data:{
					pageNo:this.page,
					limit:this.limit
				}
			}).then(res=>{
				if(res.data.returnCode=='0000'){
					this.fileList = res.data.data.list;
					this.total = res.data.data.count;
                }else{
                    this.$message(res.data.msg); 
                }
			})
		},
		changePage(page){
			//console.log(page)
			this.page = page;
			this.getList();
		},
		toDetail(id,type){
            this.$router.push({path:'/fileDetail',query:{id}});
            //根据type判断是否为文件夹：是-跳fileLost 否-跳fileDetail
		},
		CancleColl(){
			let ids = this.chooseList;
			if(ids.length==0) return;
			this.$fetch({
                url:'api/client/collect',
                type:'post',
                data:{id:ids.join(',')}
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.$message({type:'success',message:'取消成功'});
                    this.getList();
                }else{
                    this.$message(res.data.msg); 
                }
            })
		},
		downLoad(){
            let ids = this.chooseList;
            if(ids.length==0) return;
            let a = document.createElement("a");
            let event = new MouseEvent("click");
            a.href = window.dl_q_baseURL+'api/client/download_files?id='+ids.join(',')+'&token='+encodeURIComponent(localStorage.tokenpc);
            a.dispatchEvent(event);

            this.Statistics();
             

			 

            // this.$fetch({
            //     url:'api/client/download_files',
			// 	data:{id:ids.join(',')}
            // }).then(res=>{
            //     if(res.data.returnCode == '0011'){
            //         this.$message('文件不存在！');
            //         return;
            //     }
            //     const excelUrl = window.URL.createObjectURL(new Blob([res.data]));
            //     console.log(excelUrl,'excelUrl')
            //     let a = document.createElement("a");
            //     let event = new MouseEvent("click");
			// 	a.href = excelUrl;
			// 	let type;
			// 	if(ids.length>1){
			// 		type = 'zip';
			// 	}else{
			// 		for(let i=0;i<this.fileList.length;i++){
			// 			if(this.fileList[i].id==ids[0]){
			// 				type = this.fileList[i].type;
			// 			}
			// 		}
			// 	}
            //     a.download = new Date().getTime()+'.'+type;
            //     a.dispatchEvent(event);

            //     this.Statistics();
            // })
		
		},
		Statistics(){
            this.$fetch({
                url:'api/client/download_statistics',
                type:'post',
                data:{id:this.chooseList.join(',')}
            }).then(res=>{
                
            })
        }
	},
}
</script>

<style lang="scss">

@media screen and (min-width: 1441px){
	.vessel {
		display: flex;
		justify-content: space-between;
		align-content: center;
	}
.self-collect-page{
	    background: #F7F8F9;
	    padding:20px;
		height:calc(100vh - 90px);
		overflow: auto;
	    box-sizing: border-box;
		margin-top: 10px;

	    .collect-con{
	        background:#F7F8F9;
	        padding:10px 58px 0 100px;
	        box-sizing: border-box;
	        border-radius: 6px;
	        .title{
				color:#000;
	        	font-size:28px;        	
				font-size: 28px;
                font-weight: 500;
                color: #333333;
			}
			.btn{
				width: 148px;
				text-align: center;
				line-height: 28px;
				font-size:14px;
				color:#fff;
				background: #EA1349;
				border-radius: 4px;
				margin-left:16px;
				img{margin-right:7px;}
				&:hover{opacity: .9;}
			}
			.collect-con-inner{min-height:500px;}
	        .con{
	            margin-top:50px;
                li{
					padding-top: .78vw;
                   padding-bottom: .6vw;
                    border-radius: 4px;
                    width:12%;
                    box-sizing: border-box;
					background: #fff;
					margin-right: 2%;
                    margin-bottom: 2%;
					box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
					.pic{
					  width: 68%;
                        position: relative;
                        margin-bottom: 6px;
						 .map_Image{width:100%;}
                        .img{
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            max-width: 100%;
                            max-height: 100%;
                            object-fit: cover;
                        }
					}
                    .c-btm{width:70%;  margin: .17vw 0; display: flex; align-items: flex-start;}
                    p{
                        max-width:100%;
                        font-size:14px;
						line-height:16px;
						height:32px;
						display: flex; 
						align-items: center;
						font-weight: 600;
						display: -webkit-box;
			            text-overflow: ellipsis;
			            overflow: hidden;
			            -webkit-box-orient:vertical;
					    font-weight: 600;
			            -webkit-line-clamp:2;
                    }
        
                    &:hover{
                        background:rgb(224,242,251);
                    }
                }
	        }
	    }
	}
}
@media screen and (max-width: 1440px){
    .self-collect-page{
	    background: #F7F8F9;
	    padding:20px;
		height:calc(100vh - 60px);
		overflow: auto;
	    box-sizing: border-box;
		margin-top: 10px;
	    .collect-con{
	        background:#fff;
	        padding:31.5px 6.4%;
	        box-sizing: border-box;
	        border-radius: 6px;
	        .title{
	        	font-size:14px;
	        	margin-bottom:15px;
			}
			.btn{
				width: 111px;
				text-align: center;
				line-height: 21px;
				font-size:12px;
				color:#fff;
				background: #EA1349;
				border-radius: 4px;
				margin-left:16px;
				img{margin-right:5px;}
				&:hover{opacity: .9;}
			}   
			.collect-con-inner{min-height:500px;}
	        .con{
	            margin-top:30px;
                li{
                    border-radius: 4px;
                    width:12%;
                   padding-top: .78vw;
                   padding-bottom: .6vw;
                   margin-right: 2%;
                    margin-bottom: 2%;
                    box-sizing: border-box;
					box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
						.pic{
					  width: 68%;
                        position: relative;
                        margin-bottom: 6px;
						 .map_Image{width:100%;}
                        .img{
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            max-width: 100%;
                            max-height: 100%;
                            object-fit: cover;
                        }
					}
                    .c-btm{width:70%; margin: .17vw 0; display: flex; align-items: flex-start;}
                    p{
                        max-width:100%;
                        font-size:14px;
						line-height:16px;
						height:32px;
						display: flex; 
						align-items: center;
						display: -webkit-box;
			            text-overflow: ellipsis;
			            overflow: hidden;
			            -webkit-box-orient:vertical;
					    font-weight: 600;
			            -webkit-line-clamp:2;
                    }
                    &:hover{
                        background:rgb(224,242,251);
                    }
                }
	        }
	    }
	}
}

</style>