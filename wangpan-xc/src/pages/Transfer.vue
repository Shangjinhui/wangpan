<template>
<div class="my-transfer">
    <video controls="" autoplay="" name="media" v-if="['mp4','avi','mov','ogg','webm'].indexOf(type)!=-1">
		<source :src="url" type="video/mp4"> </source>
		<source :src="url" type="video/ogg"> </source>
		<source :src="url" type="video/webm"> </source>
		<object width="" height="" type="application/x-shockwave-flash" data="myvideo.swf">
			<param name="movie" value="myvideo.swf" />
			<param name="flashvars" value="autostart=true&amp;file=myvideo.swf" />
		</object>
		当前浏览器不支持 video直接播放，点击这里下载视频： <a :href="url">下载视频</a>
	</video>
    <iframe v-else style="width:100vw;height:100vh;" :src="url" frameborder="0"></iframe>
</div>
</template>

<script>
export default {
	components:{},
	data(){
		return {
            type:'',
			url:''
		}
    },
    mounted(){
        let type = location.href.split('type=')[1].split('&')[0].toLowerCase();
        let url = location.href.split('url=')[1];
        console.log(type,url);
        url = decodeURIComponent(url);
        this.url = url;
        this.type = type;
        //location.href = url;
        //console.log(url);
    }
}
</script>
<style>
    .my-transfer{
        width:100vw;
        height:100vh;
        position:relative;
        background:#000;
    }
    .my-transfer video{
        position:absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
    }
</style>