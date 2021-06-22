<template>
<div class="mess-out" v-if="show">
    <div class="mess-inner">
        <div class="mess-list" v-if="!showDetail">
            <div class="flex-sp top">
                <p class="title col333 f-pf2">Message list</p>
                <img class="close cursor" src="@/assets/img/close.png" alt="" @click="show=false">
            </div>
            <div class="mes-con f-arialMt">
                <ul>
                    <li class="flex cursor" v-for="(item,index) in msgList" :key="index" @click="toDetail(item.id,item.isRead)">
                        <p class="mes flex-top flex-son col333"><i class="point" :class="[{on:item.isRead==0}]"></i><span class="flex-son">{{item.title}}</span></p>
                        <p class="createTime col999">{{item.createTime}}</p>
                    </li>
                </ul>
            </div>
            <el-pagination
            @current-change="changePage"
            :page-size="limit"
            layout="prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
        
        <div class="mess-detail" v-else>
            <div class="flex-sp top">
                <p class="back col333 cursor" @click="toBack"><i class="el-icon-arrow-left"></i>Return</p>
                <img class="close cursor" src="@/assets/img/close.png" alt="" @click="show=false">
            </div>
            <div class="mes-detail-con">
                <p class="title f-arialB col333">{{detail.title}}</p>
                <p class="time col999">{{detail.createTime}}</p>
                <p class="con col333" v-html="detail.content"></p>
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
            show:false,
            page:1,
            limit:10,
            total:0,
            msgList:[
                
            ],
            showDetail:false,
            detail:{
                
            },
		}
    },
    mounted(){
        //this.getMsg();       
    },
    watch:{
        show(val){
            if(val){
                this.getMsg();
                this.$nextTick(()=>{
                    document.getElementsByClassName('el-pagination__jump')[0].childNodes[0].nodeValue = 'Travel to'
                    document.getElementsByClassName('el-pagination__jump')[0].childNodes[2].nodeValue = 'Page'
                })
            }   
        }
    },
    methods:{
        getMsg(){
            this.$fetch({
				url:'api/member/notice_list',
				data:{
                    pageNo:this.page,
                    limit:this.limit
				},
			}).then(res=>{
                
				if(res.data.returnCode=='0000'){
                    this.msgList = res.data.data.list;
                    this.total = parseInt(res.data.data.count);
				}else{
					this.$message(res.data.msg);
				}
			})
        },
        changePage(page){
            this.page = page;
            this.getMsg();
        },
        toDetail(id,isRead){
            this.showDetail = true;
            this.$fetch({
				url:'api/member/notice_info',
				data:{id},
			}).then(res=>{
				if(res.data.returnCode=='0000'){
                    this.detail = res.data.data.info;
                    if(isRead==0){
                        let userInfo = this.$store.state.userInfo.userInfo;
                        userInfo.noRead = userInfo.noRead==0?0:userInfo.noRead-1;
                        this.$store.commit('userInfo/SET_USERINFO',userInfo);
                    }
				}else{
					this.$message(res.data.msg);
				}
			})
        },
        toBack(){
            this.detail={};
            this.showDetail=false;
            this.getMsg();
        }
    }
}
</script>

<style lang="scss">
.mess-out{
	width:100vw;
	height:100vh;
	background: rgba(0, 0, 0, 0.5);
	position:fixed;
	left:0;
	top:0;
	z-index:9;
	.mess-inner{
		width: 720px;
        // height: 700px;
        height:75vh;
		background: #FFFFFF;
		box-shadow: 0px 2px 12px 0px rgba(0,0,0,0.1);
		border-radius: 4px;
		border: 1px solid #EEEEEE;
		position: absolute;
		left:50%;
		top:50%;
        transform: translate(-50%,-50%);
        z-index:10;
        .mess-list{
            height:100%;
            .top{
                height:70px;
                border-bottom:1px solid #EAEBEF;
                padding:0 20px;
                box-sizing: border-box;
                .title{font-size:18px;padding-left:20px;}
                .close{
                    width:24px;
                    height:24px;
                }
            }
            .mes-con{
                // height:555px;
                height:68%;
                padding:36px 40px 0;
                box-sizing: border-box;
                overflow: auto;
                ul{
                    li{
                        margin-bottom:33px;
                        .point{
                            width: 6px;
                            height: 6px;
                            background: #999;
                            margin:4px 4px 0 0;
                            border-radius: 50%;
                            &.on{background: #EE5045;}
                        }
                        .mes{font-size:14px;}
                        .createTime{font-size:12px;}
                    }
                }
            }
        }
        .mess-detail{
            .top{
                height:70px;
                border-bottom:1px solid #EAEBEF;
                padding:0 20px;
                box-sizing: border-box;
                .back{
                    font-size:14px;
                    padding-left:20px;
                    i{
                        margin-right:8px;
                    }
                }
                .close{
                    width:24px;
                    height:24px;
                }
            }
            .mes-detail-con{
                padding:35px 40px;
                .title{
                    font-size:16px;
                }
                .time{
                    font-size:12px;
                    margin-top: 12px;
                }
                .con{
                    font-size:14px;
                    line-height:22px;
                    margin-top: 20px;
                }
            }
        }
		
	}
}
@media screen and (min-width: 1441px){

}
@media screen and (max-width: 1440px){
    
}

</style>