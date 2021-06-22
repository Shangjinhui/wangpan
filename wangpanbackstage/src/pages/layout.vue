<template>
<div class="flex-top">
    <!-- menu -->
	<my-menu></my-menu>
	<div class="flex-son rel">
        <!-- head -->
		<my-header></my-header>
        <!-- main -->
		<!-- <keep-alive>
			<router-view v-if="$route.meta.cache&&routerAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.cache&&routerAlive"></router-view> -->
		<router-view v-if="routerAlive"></router-view>
        
	</div>
</div>
</template>

<script>
import myMenu from '@/components/Menu';
import myHeader from '@/components/Header';
export default {
	components:{myMenu,myHeader},
	data(){
		return {
			routerAlive:true,
		}
	},
	//跳转同一页面，销毁重建
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