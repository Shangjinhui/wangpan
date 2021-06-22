// sideTab和容器
<template>
<div class="layout mwid1200">
	<my-header></my-header>
	<div class="flex-top ">
		<side-tab></side-tab>
		<div class="flex-son">
			<router-view v-if="routerAlive" :key="$route.fullPath"></router-view>
		</div>
	</div>
    
</div>
</template>

<script>
import sideTab from '@/components/sideTab.vue'
import myHeader from '@/components/header.vue'
export default {
	components:{sideTab,myHeader},
	data(){
		return {
			routerAlive:true,
		}
	},
	provide(){
		return {
			routerRefresh: this.routerRefresh
		}
	},
	methods:{
		routerRefresh(){
			this.routerAlive = false;
			this.$nextTick(()=>{
				this.routerAlive = true;
			});
		},
	}
}
</script>

<style lang="scss">
.layout{
	background-color: #F7F8F9;
}


// @media screen and (min-width: 1441px){
// 	.layout{width:1920px;}
// }
// @media screen and (min-width: 1367px) and (max-width: 1440px){
//     .layout{width:1440px;}
// }
// @media screen and (max-width: 1366px){
//     .layout{width:1366px;}
// }

</style>