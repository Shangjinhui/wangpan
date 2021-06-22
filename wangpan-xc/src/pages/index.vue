<!-- //header和首页内容 -->
<template>
<div class="container hei">
    <div class="main wid" :style="{background:`url(${banner}) center/cover no-repeat`}">
        <!-- <img class="wid bg" :src="banner" alt=""> -->
        <!-- <div class="head-tie wid">
            <myHeader background="none"></myHeader>
        </div> -->
        <div v-if="banner" class="abs colfff" :class="[{'on':animation}]">
            <p class="ban-title">Marketing<br/>Content Management</p>
            <div class="input flex">
                <input type="text" placeholder="Please enter" v-model="search" @keyup.enter="toSearch">
                <img class="icon-arrow-right cursor" src="@/assets/img/search.png" @click="toSearch" />
            </div>
            <p class="keyword colfff">
                <span>Key words like:</span>
                <span v-for="(item,index) in keywords" :key="index">{{item.title}}</span>
            </p>
        </div>
    </div>
    <div class="recommend wid flex-son">
        <p class="rec-title col333">Recommended Daily</p>
        <!-- <div class="ul">
            <table width="100%">
                <tr>
                    <td width="12%" v-for="(item,index) in recommend" :key="index">
                        <router-link class="flex-center-column" :to="{path:'/fileDetail',query:{id:item.id}}">
                            <div class="pic">
                                <img :src="item.preview" alt="">
                            </div>
                        </router-link>
                    </td>
                </tr>
                <tr>
                    <td v-for="(item,index) in recommend" :key="index">
                        <router-link class="flex-center-column" :to="{path:'/fileDetail',query:{id:item.id}}">
                            <p class="col333 wid center ellipsis1">{{item.name}}</p>
                        </router-link>
                    </td>
                </tr>
            </table>
        </div> -->
        <ul class="flex flex-wrap mar">
            <li v-for="(item,index) in recommend" :key="index">
                <router-link class="flex-center-column" :to="{path:'/fileDetail',query:{id:item.id}}">
                    <div class="pic">
                        <img src="@/assets/img/map.png" class="map_Image">
                        <!-- <img class="img" v-if="['png','jpg','gif'].indexOf(item.type)!=-1" :src="item.preview||zhanwei" alt="">
                        <img class="img" v-else :src="item.type|Zhanwei" alt=""> -->
                        <img class="img cursor" v-if="item.preview" :src="item.preview" alt="">
                        <img class="img cursor" v-else :src="item.type|Zhanwei" alt="">
                    </div>
                    <p class="col333 wid center ellipsis1">{{item.name}}</p>
                </router-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import myHeader from '../components/header.vue'
export default {
	components:{myHeader},
	data(){
		return {
			banner:'',     //require('@/assets/img/bg.png')
            keywords:[], //[{title:'StandardFont,'},{title:'Super Wings,'},{title:'OA Video,'}]
            search:'',
            recommend:[
                
            ],
            zhanwei:require('@/assets/img/detail.png'),
            animation:false,
		}
    },
    mounted(){
        this.getData();
         
    },
    methods:{
        getData(){
            this.$fetch({
                url:'api/client/index',
            }).then(res=>{
                if(res.data.returnCode){
                    if(res.data.returnCode=='0000'){
                        this.banner = res.data.data.banner;
                        this.keywords = res.data.data.keyword;
                        this.recommend = res.data.data.flagFile;
                        this.getPreview();
                        setTimeout(()=>{
                            this.animation = true;
                        },0)
                    }else{
                        this.$message(res.data.msg);
                    }
                }else{
                    let timer = setTimeout(() => {
                            this.getData();
                            clearTimeout(timer);
                        }, 500);
                }
                
            })
        },
        getPreview(){
            let list = this.recommend;
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
        toSearch(){
            if(this.search){
                this.$router.push({path:'/fileList',query:{search:this.search}});
            }
        }
    }
}
</script>
<style lang="scss">
/*//pc适配1920px、1440px、1366px*/
.container{
    overflow:auto;
    .main{
        height:650px;
        position:relative;
        overflow: hidden;
        .bg{
            height:100%;
            object-fit: cover;
        }
        .head-tie{
            position:fixed;
            left:0;
            top:0;
            z-index:99;
        }
        .abs{
            max-width:510px;
            width: auto;
            padding-right: 5.2%;
            position:absolute;
            right:-600px;
            top:50%;
            transform: translateY(-52%);
            transition:all .3s ease;
            &.on{right:0;}
            .ban-title{
                font-size: 2.2vw;
                color:#fff;
                font-family: 'Arial-BoldMT, Arial';
                margin-bottom:17px;
            }
            .input{
                max-width: 321px;
                width: 100%;
                height:36px;
                background-color:#fff;
                input{
                    width:100%;
                    height:36px;
                    line-height:36px;
                    padding-left:12px;
                    box-sizing: border-box;
                }
                .icon-arrow-right{
                    width:24px;
                    height:24px;
                }
            }
            .keyword{
                font-size:12px;
                line-height:14px;
                margin-top:17px;
                span{margin-right:8px;}
            }
        }
    }
    .recommend{      
        padding-top: 2.7vw;
        background-color:#F7F8F9;      
        box-sizing: border-box;
        .rec-title{
            font-size:18px;
            line-height:21px;
            padding-bottom:20px;
            font-size: 24px;
            font-family: "Arial-BoldMT", Arial;
            font-weight: normal;
        }
        
        ul{
            padding-bottom: 1%;
            
            li{
                border-radius: 4px;
                width:12%;
                padding:5px 0px;
                box-sizing: border-box;
                margin-right: 2.6%;
                background: #fff;
                box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
                margin-bottom: 10px;
                &:nth-of-type(7n+7){margin-right:0;}
                p{
                    width:100%;
                    font-size:14px;
                    line-height:14px;
                    padding-bottom: 10px;
                }
                .pic{
                    width: 70%;
                    height:70%;
                    position: relative;
                    margin-bottom:12px;
                    margin-top: 15px;
                    .map_Image{
                        display: block;
                        width: 100%;
                    }
                    .img{
                        width: 100%;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                        max-width: 100%;
                        max-height: 100%;
                    } 
                }
                &:hover{
                    background:rgb(224,242,251);
                }
            }
        }
    }
}
 @media screen and (min-width: 1500px){
    .container{
        .main{
            .abs{
                .ban-title{
                    font-size:33px;
                }
            }
        }
        .recommend{    
            padding-top: 30px;
        }

         /*overflow:auto;*/
       /* .main{
            height:73vh;
            position:relative;
            overflow: hidden;
            .head-tie{
                position:fixed;
                left:0;
                top:0;
                z-index:99;
            }
            .abs{
                width:500px;
                position:absolute;
                right:-600px;
                // top:415px;
                top:37.4%;
                transition:all .3s ease;
                &.on{
                    right:0;
                }
                .ban-title{
                    font-size:44px;
                    color:#fff;
                    margin-bottom:22px;
                }
                .input{
                    width:414px;
                    height:48px;
                    background-color:#fff;
                    input{
                        width:370px;
                        line-height:48px;
                        padding-left:12px;
                        box-sizing: border-box;
                    }
                    .icon-arrow-right{
                        width:32px;
                        height:32px;
                    }
                }
                .keyword{
                    font-size:14px;
                    color:#D9FBFF;
                    margin-top:22px;
                    span{margin-right:8px;}
                }
            }
        }*/
        /*.recommend{
            padding-top: 40px;
            background-color:#F7F8F9;
            box-sizing: border-box;
            .rec-title{
                font-size:24px;
                line-height:28px;
                padding-bottom:20px;
                padding-left: 2.2%;
            }
            ul{
                padding: 0 5%;
                li{
                    border-radius: 4px;
                    width:10%;
                    padding:5px 0px;
                    box-sizing: border-box;
                    margin-right: 4.9%;
                    &:last-child{
                        margin-right: 0;
                    }
                    p{
                        width:100%;
                        font-size:14px;
                        line-height:14px;
                    }
                    img{
                        width:100%;
                        margin-bottom:16px;
                    }
                    &:hover{
                        background:rgb(224,242,251);
                    }
                }
            }
        }*/
    }
 } 

</style>