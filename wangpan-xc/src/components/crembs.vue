<template>
<div class="crumbs-out">
    <p class="crumbs-title" v-if="noTitle==1">{{crembs[0]&&crembs[0].name}}</p>
    <ul class="crumbs flex flex-wrap" :class="noTitle!=1?'on':''" v-if="crembs.length>1">
        <li class="cursor" v-for="(item,index) in crembs" :key="index" @click="changCrembs(item,index)">{{item.name}}<i v-if="index!=crembs.length-1">/</i></li>
        <!-- <li class="cursor">About deli<i>/</i></li>
        <li class="cursor">Conference equipment<i>/</i></li>
        <li class="cursor">Photo paper<i>/</i></li>
        <li class="cursor">whiteboard</li> -->
    </ul>
</div>

</template>

<script>
export default {
    components:{},
    inject:['routerRefresh'],
    props:{
        noTitle:{
            type:String|Number,
            default:0    //1显示标题
        },
    },
	data(){
		return {
			crembs:[],
		}
    },
    mounted(){
        this.crembs = JSON.parse(window.sessionStorage.getItem('crembt')||'[]');
    },
    methods:{
        changCrembs(items,index){
            //console.log(this.crembs,index)
            let crembs = this.crembs.splice(0,index+1);
            //console.log(crembs)
            window.sessionStorage.setItem('crembt',JSON.stringify(crembs));
            let stamp = new Date().getTime();                 //设置时间戳参数，防止同一页面同一参数报错
            this.$router.push({path:'/fileList',query:{id:items.id,stamp}});
            //this.routerRefresh();
        }
    }
}
</script>

<style lang="scss">
.crumbs-out{
    .crumbs-title{
        font-size: 21px;
        font-weight: 500;
        color: #333333;
        line-height: 30px;
    }
    .crumbs{
        font-size:12px;
        // color:#999999;
        padding: 10px 0 0;
        li{
            i{padding:0 5px;}
            &:last-child{color:#333333;}
        }
        &.on{
           padding: 16px 0; 
           line-height: 20px;
        }
    }
}
@media screen and (min-width: 1500px){
    .crumbs-out{
        .crumbs-title{
            font-size: 28px;
            line-height: 40px;
        }
        .crumbs{
            font-size:14px;
            padding:10px 0 0;
            li{
                i{padding:0 7px;}
            }
            &.on{
               padding: 16px 0; 
               line-height: 20px;
            }
        }
    }
}


</style>