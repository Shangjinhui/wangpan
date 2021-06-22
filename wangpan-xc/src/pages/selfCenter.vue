//header和个人中心
<template>
<div>
    <!-- <my-header></my-header> -->
    <self-collect v-if="tabI == 0"></self-collect>
    <self-safe v-if="tabI == 1"></self-safe>
</div>
</template>

<script>
import myHeader from '@/components/header.vue'
import selfCollect from '@/components/selfCollect.vue'
import selfSafe from '@/components/selfSafe.vue'
export default {
	components:{myHeader,selfCollect,selfSafe},
	data(){
        return {
            tabI:0
        }
    },
    mounted(){
        this.tabI = window.location.href.split('ind=')[1]||0;
    },
}
</script>

<style lang="scss">
@media screen and (min-width: 1441px){

}
@media screen and (min-width: 1367px) and (max-width: 1440px){
    
}
@media screen and (max-width: 1366px){
    
}

</style>