<template>
<div class="box_two">
    <div>
      <img v-if="showImg" class="auto" src="@/assets/img/nodata.png" alt="">
      <p v-if="showText" class="font16 col333 mt20 center">{{desc}}</p>
    </div>
</div>
</template>

<script>
export default {
    components:{},
    props:{
        desc:{
            type:String,
            default:'Sorry for not finding the result you want'
        },
        showImg:{
            type:Boolean,
            default:true
        },
        showText:{
            type:Boolean,
            default:true
        }
    },
	data(){
		return {
			
		}
	},
}
</script>

<style scoped>
  .box_two{
      padding: 100px 0 50px 0;
  }
</style>

