<!-- //header和文件列表 -->
<template>
    <div>
        <!-- <my-header></my-header> -->
    	<div class="list-page">
            <div class="list-con">
                <div class="border"><my-crembs :noTitle="1"></my-crembs></div>
                <div class="file-module">
                    <div class="find-out f-cb">
                        <div class="input-out fl flex">
                            <el-select v-model="radio" class="type" placeholder="请选择">
                                <el-option
                                v-for="item in radioList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            <div class="input-box flex">
                                <div class="serch-btn"  @click="searchFile"></div>
                                <input class="input" type="text" v-model="searchCon" @keyup.enter="searchFile" placeholder="Please enter">
                                <div class="search-btn cursor" @click="searchFile">search</div>
                            </div>
                        </div>
                        <el-select v-model="fileTime" placeholder="Time range" class="fl fileTime" @change="changeFileTime">
                            <el-option
                            v-for="item in timeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-select v-model="fileType" class="fileType fl" multiple placeholder="File Format" @change="changeFileType">
                            <el-option
                            v-for="item in typeList"
                            :key="item.title"
                            :label="item.title"
                            :value="item.title">
                            </el-option>
                        </el-select>
                        <div class="fr right-box">
                            <el-checkbox v-model="checkedAll" class="fl labels" @change="chooseAll">Select all</el-checkbox>
                            <div class="download flex-center cursor fl" @click="downLoad"><img src="@/assets/img/Batch download.png" alt=""><span>Download</span></div>
                        </div>
                    </div>
                    <div class="con">
                        <ul v-if="fileList.length>0">
                            <el-checkbox-group class="flex-top flex-wrap" v-model="chooseList">
                                <li class="flex-center-column" v-for="(item,index) in fileList" :key="index">
                                    <div class="pic" @click="toDetail(item.id)">
                                        <img src="@/assets/img/map.png" class="map_Image">
                                        <img class="img cursor" v-if="item.preview" :src="item.preview" alt="">
                                        <img class="img cursor" v-else :src="item.type|Zhanwei" alt="">
                                    </div>
                                    
                                    <div class="flex-top-center c-btm">
                                        <!-- <el-checkbox v-model="item.choosed" :disabled="item.purview!=2"></el-checkbox> -->
                                        <el-checkbox :disabled="item.purview!=2" :label="item.id"><br/></el-checkbox>
                                        <p class="font14 col333 ellipsis2">{{item.name}}</p>
                                    </div>
                                </li>
                            </el-checkbox-group>
                        </ul>
                        <div class="no-data-out flex-center" v-else>
                            <no-data :showText="showText" :showImg="showImg"></no-data>
                        </div>
                        
                    </div>       
                    <!-- 分页器 -->
                    <el-pagination
                    @current-change="changePage"
                    :page-size="limit"
                    layout="prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import myHeader from '@/components/header.vue'
import myCrembs from '@/components/crembs.vue'
import noData from '@/components/noData.vue'
export default {
	components:{myHeader,myCrembs,noData},
	data(){
		return {
            id:'',
            fileList:[
            ],
            chooseList:[],
            //文件类型
			typeList: [],
            fileType: '0',
            //时间排序
            timeList: [{
                value: '1',
                label: 'Newest to oldest'
            },{
                value: '2',
                label: 'Oldest to newest'
            }],
            fileTime: '',
            searchCon:'',
            // 搜索范围
            radioList:[{label:'Current Directory',value:0},{label:'All directory',value:1}],
            radio:0,
            page:1,
            limit:21,
            total:0,
            checkedAll:false,
            showImg:false,
            showText:false,
		}
    },
    mounted(){
        
        this.id = this.$route.query.id||0;
        this.searchCon = this.$route.query.search;
        //window.localStorage.setItem('token','');
        this.getList();
        
        document.getElementsByClassName('el-pagination__jump')[0].childNodes[0].nodeValue = 'Travel to'
        document.getElementsByClassName('el-pagination__jump')[0].childNodes[2].nodeValue = 'Page'
    },
    computed:{
        ws(){
            return this.$store.state.until.ws;
        }
    },
    watch:{
        chooseList(val,old){
            this.checkedAll = val.length!=this.fileList.length?false:true;
        },
    },
    methods:{
        getList(){
            let data = {
                id:this.id,
                pageNo:this.page,
                limit:this.limit,
                type:this.fileType.join(','),
                search:this.searchCon,
                timeRange:this.fileTime,
                directoryType:this.radio
            }
            this.$fetch({
                url:'api/client/file_list',
                data,
                loading:true
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.typeList = [{id: '',title: 'Select all'},...res.data.data.typeList];
                    this.total = parseInt(res.data.data.count);
                    this.fileList = res.data.data.list;
                    this.getPreview();
                    if(res.data.data.list.length==0){
                        this.showText = this.searchCon?true:false;
                        this.showImg = this.searchCon?false:true;
                    }
                }else{
                    this.$message(res.data.msg); 
                }
            })
        },
        getPreview(){
            let list = this.fileList;
            for(let i=0;i<list.length;i++){
                this.$fetch({
                    url:'api/client/preview_url',
                    data:{id:list[i].id}
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        list[i].preview = res.data.data.preview;
                    }
                })
            }
        },
        searchFile(){
            //console.log(this.searchCon,'searchCon');
            // if(!this.searchCon) return;
            this.page = 1;
            this.getList();
        },
        changeFileType(e){
            //console.log(e,'-------')
            if(e.indexOf('Select all')!=-1){
                let fileType = [];
                this.typeList.slice(1).forEach(item=>{
                    fileType.push(item.title)
                })
                this.fileType = fileType;
            }
            // console.log(this.fileType,'fileType')
            // console.log(this.typeList,'typeList')
            this.page = 1;
            this.getList();
        },
        changeFileTime(){
            //console.log(this.fileTime,'fileTime')
            this.page = 1;
            this.getList();
        },
        changePage(page){
            this.page = page;
            this.getList();
        },
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
        toDetail(id,type){
            this.$router.push({path:'/fileDetail',query:{id}});
            //根据type判断是否为文件夹：是-跳fileLost 否-跳fileDetail
        },
        downLoad(){
            // let ids = this.chooseList;
            // if(ids.length==0) return;
            // let a = document.createElement("a");
            // let event = new MouseEvent("click");
            // a.href = window.dl_q_baseURL+'api/client/download_files?id='+ids.join(',')+'&token='+encodeURIComponent(localStorage.tokenpc);
            // a.dispatchEvent(event);

            // this.Statistics();

            //现批量下载利用websocket
            // 1. 本机启动WebTool 
            // 2. websocket 连接  ，参考文档中通信端口
            // 3. 调用登录接口  参考文档中协议部分  1登录 
            // 4. 调用下载接口 参考文档中协议部分 3 下载  
            // 下载任务完成后会通过 15 状态通知  推送消息
            
            let list = [],ids = this.chooseList;
            if(ids.length<=0) return;
            list = this.fileList.filter(item=>ids.indexOf(item.id)!=-1)
            this.$store.commit('until/SET_FILES',list);
            if(this.ws&&this.ws.readyState==1){
                //去登录并下载
                //console.log('to login down');
                this.$store.dispatch("until/SocketLogin");
            }else{
                //去连接
                this.$store.dispatch("until/WebSocketTest",()=>{
                    //去登录并下载
                    //console.log('to login down');
                    this.$store.dispatch("until/SocketLogin");
                });
            }
        },
        Statistics(){
            this.$fetch({
                url:'api/client/download_statistics',
                type:'post',
                data:{id:this.chooseList.join(',')},
                loading:false
            }).then(res=>{
                
            })
        }
    }
}
</script>

<style lang="scss">
    .cursor{
        color: #999;
    }

/*// 下拉框多余背景色去处*/
.el-scrollbar__wrap{overflow: auto;}
/*// 下来框在火狐展示不完的问题*/
.el-scrollbar{
    background: #fff;
    overflow: initial;
    .el-select-dropdown__list{
        background: #fff;
    }
}
.el-select-dropdown__item{
    font-size:12px;
}
.list-page{
    background: #F7F8F9;
    padding: 1.35vw;
    height:calc(100vh - 90px);
    overflow: auto;
    box-sizing: border-box;
    margin-top: 10px;
    .list-con{
        background:#F7F8F9;
        min-height:100%;
        border-radius: 6px;
        .border{
            padding: 2.8vw 0px 0 2vw;
            // border-bottom: 1px solid #f0f2f5;
            transition: all 0.35s ease 0s;
        }
        .file-module{
            padding: 0px 1vw 3vh 2vw;
            transition: all 0.35s ease 0s;
            .find-out{
                margin-top: 2.4vw;
                .el-select{
                    width:133px;
                    height:38px;
                    line-height:38px;
                    .el-input__inner{
                        font-size:12px;
                        border:0;
                        height:38px;
                        line-height:38px;
                        color:#000;
                        padding-left:5px;
                    }
                    &.filetype{width: 100px;}
                }
                .input-out{
                    height:40px;
                    transition: all 0.35s ease 0s;
                    padding-left: 8px;
                    margin-right:10px;
                    border-radius: 4px;
                    border: 1px solid #DCDFE6;
                    box-sizing: border-box;
                    .el-select.type{
                        height: 40px;
                        line-height: 40px;
                        width: 10vw;
                        min-width: 130px;
                        margin: 0;
                        max-width: 150px;
                        .el-input--suffix .el-input__inner{
                            padding:0 15px 0 0;
                        }
                        .is-focus .el-input__suffix{
                            top: 0;
                        }
                        .el-input__suffix{
                            top: 0;
                            right: 0;
                            .el-input__icon{
                                width: 15px;
                                line-height: 28px;    
                            }
                        }
                        .el-input__inner{
                            font-size: 14px;
                            background-color: transparent;
                        }
                    }
                    .input-box{
                        padding-left: 10px;
                        line-height: 40px;
                        position: relative;
                        margin-left: 1vw;
                        &:before{
                            content:'';
                            display: block;
                            width: 1px;
                            height: 16px;
                            background-color: #979797;
                            position: absolute;
                            left: 0;
                            top: calc(50% - 8px);
                            opacity: 0.3;
                        }
                        .serch-btn{
                            height: 40px;
                            width: 20px;
                            cursor: pointer;
                            background:url(../assets/img/search2.png) center no-repeat;
                        }
                        .input{
                            width: 10vw;
                            height: 30px;
                            margin-left: 5px;
                            line-height: 30px;
                        }
                        .search-btn{
                            width: 60px;
                            line-height: 40px;
                            background: #CF1342;
                            color:#fff;
                            border-radius: 4px;
                            font-size:14px;
                            text-align: center;
                            &:hover{opacity: .9;}
                        }
                    }
                }
                .el-select.fileType .el-select__tags>span{
                    white-space: nowrap;
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .right-box{
                    padding: 6px 0;
                    .labels{
                        margin-top: 4px;
                    }
                }
                .download{
                    width: 100px;
                    transition: all 0.35s ease 0s;
                    text-align: center;
                    line-height: 28px;
                    font-size:14px;
                    color:#fff;
                    background: #EA1349;
                    border-radius: 4px;
                    margin-left:15px;
                    img{margin-right:5px;width:14px;}
                    &:hover{opacity: .9;}
                }   
            }
            .con{
                min-height:400px; 
                margin-top:30px;
                li{
                    padding-top: .78vw;
                   padding-bottom: .6vw;
                    border-radius: 4px;
                    width:12%;              
                    margin-right:2%;
                    margin-bottom:2%;
                    box-sizing: border-box;
                    background: #fff;
                    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
                    .c-btm{
                        width:70%;
                        margin: 0.17vw 0;
                        display: flex;
                        align-items: flex-start;
                    }
                    p{
                        max-width:100%;
                        font-size:14px;
                        line-height:16px;
                        min-height:32px;
                        color: #333333;
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
                    // img{
                    //     width:83px;
                    //     height:83px;
                    //     object-fit: cover;
                    //     margin-bottom:6px;
                    // }
                    &:hover{
                        background:#F3FBFF;
                    }
                }
                .no-data-out{
                    height:400px;
                }
            }
        }
    }
}
.list-page .list-con .file-module .find-out .el-select{
    width: 120px;
}
.list-page .list-con .file-module .find-out .el-select .el-input__inner{
    font-size: 14px;
}
.list-page .list-con .file-module .find-out .el-select.fileType{
    margin-left: 1vw;
}
.list-page .list-con .file-module .find-out .el-select.fileTime .el-input__inner,
.list-page .list-con .file-module .find-out .el-select.fileType .el-input__inner{
   padding-right: 15px;
   font-size: 14px;
   background: #F7F8F9;
}
.list-page .list-con .file-module .find-out .el-select .el-input__suffix{
    right: 0;
    .el-input__icon{
      width: 15px;  
    }
}
@media screen and (min-width: 1300px){

    .list-page {
        .list-con{ 
            .file-module{
                padding: 0px 2vw 3vh 2vw;
                .find-out{ 
                    .input-out{
                        margin-right: 14px;
                        padding-left: 13px;
                        background: #fff;
                    }
                }
            }
        }
    }



    .list-page .list-con .file-module .find-out .el-select{
        width: 135px;
    }
}
@media screen and (min-width: 1500px){
    .list-page{
        padding:20px;
        height:calc(100vh - 90px);
        .list-con{
            .border{
                padding: 5px 0px 0 60px;
            }
            .file-module{
                padding: 0px 60px 3vh 60px;
                .find-out{
                    margin-top: 36px;
                    .input-out{
                         .input-box{
                             .input{
                                width: 12vw;
                             }
                         }
                    }
                    .download{
                        width: 120px;
                    }
                }
            }
        }
    }
}

/*@media screen and (min-width: 1441px){
    .list-page{
        background: #F7F8F9;
        padding:20px;
        height:calc(100vh - 80px);
        overflow: auto;
        box-sizing: border-box;
        .list-con{
            background:#fff;
            padding:31px 51px;
            box-sizing: border-box;
            border-radius: 6px;
            .border{
                border-bottom: 1px solid #f0f2f5;
            }
    
            .find-out{
                margin-top:38px;
                .el-select{
                    width:145px;
                    height:38px;
                    line-height:38px;
                    // margin-right:40px;
                    .el-input__inner{font-size:14px;border:0;height:38px;line-height:38px;color:#575757;padding-left:5px;}
                    &.filetype{width: 114px;}
                }
                .input-out{
                    width:542px;
                    height:40px;
                    margin-right:19px;
                    border-radius: 4px;
                    border: 1px solid #DCDFE6;
                    padding-left:5px;
                    box-sizing: border-box;
                    .el-select{
                        width:150px;
                        height:38px;
                        line-height:38px;
                        .el-input__inner{border:0;height:38px;line-height:38px;color:#333;}
                    }
                    .input{
                        height: 16px;
                        padding-left:19px;
                        border-left:1px solid #979797;
                        img{margin-right:5px;}
                        input{
                            font-size:14px;
                            line-height:16px;
                        }
                        .search-btn{
                            width: 68px;
                            line-height: 40px;
                            background: #CF1342;
                            color:#fff;
                            border-radius: 4px;
                            font-size:14px;
                            text-align: center;
                            &:hover{opacity: .9;}
                        }
                        
                    }
                }
                .download{
                    width: 120px;
                    text-align: center;
                    line-height: 28px;
                    font-size:14px;
                    color:#fff;
                    background: #EA1349;
                    border-radius: 4px;
                    margin-left:30px;
                    img{margin-right:7px;}
                    &:hover{opacity: .9;}
                }   
                
                // .radio{
                //     font-size:12px;
                //     .radio-item{margin-right:27.3px;}
                //     input{margin-right:5.7px;}
                //     // 修改radio样式
                //     input[type="radio"] {
                //         display: none;
                //     }
                //     input[type='radio'] + label{position: relative;padding-left:27px;}
                //     input[type='radio'] + label:before{
                //         content: "";
                //         display: inline-block;
                //         width: 15px;
                //         height: 15px;
                //         border-radius: 50%;
                //         border: 1px solid #B5B9C1;
                //         box-sizing: border-box;
                //         position: absolute;
                //         left:0;
                //         top:-2px;
                //     }
                //     input[type='radio']:checked + label:before{
                //         border: 2px solid  #CF1342;
                //     }
                //     input[type='radio']:checked + label:after{
                //         content: "";
                //         display: inline-block;
                //         width: 9px;
                //         height: 9px;
                //         border-radius: 50%;
                //         background:#CF1342;
                //         position: absolute;;
                //         left:3px;
                //         top:1px;
                //     }
                // }
            }
    
            // .sort{
            //     height:60px;
            //     margin-top:17px;
            //     .el-select{
            //         width:130px;
            //         margin-right:40px;
            //         .el-input__inner{
            //             border: 0;
            //             font-size: 14px;
            //             color:#575757;
            //             height:20px;
            //             line-height:20px;
            //         }
            //         .el-input__icon{
            //             line-height:20px;
            //         }
            //     }  
            //     .download{
            //         width: 130px;
            //         text-align: center;
            //         line-height: 28px;
            //         font-size:14px;
            //         color:#575757;
            //         background: #F0F1F5;
            //         border-radius: 4px;
            //         border: 1px solid #CDD3DE;
            //         margin-left:40px;
            //         &:hover{opacity: .9;}
            //     }             
            // }
            
            

            .con{
                min-height:400px; 
                margin-top:50px;
                li{
                    border-radius: 4px;
                    width:174px;
                    padding:5px 0px;
                    margin-bottom:54px;
                    box-sizing: border-box;
                    .c-btm{width:100%;}
                    p{
                        max-width:100%;
                        font-size:14px;
                        line-height:16px;
                        // margin-top:5px;
                    }
                    img{
                        width:110px;
                        height:110px;
                        object-fit: cover;
                        margin-bottom:6px;
                    }
                    &:hover{
                        background:rgb(224,242,251);
                    }
                }
            }
            
        }
    }
}*/
</style>