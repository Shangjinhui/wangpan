<template>
<div class="my_scroll_wrap">
	<div class="my_scroll_bar"></div>
	<div id="sideTab" class="my_scroll_box">
		<div class="my_scroll_content">
			<!-- <div class="logo-out">
				<img class="logo cursor" src="@/assets/img/logo.png" @click="toHome"/>
			</div> -->
			
			<div class="home-item flex cursor f-arialB on" @click="toHome">
				<img :src="homeIcon[0]" alt="">
				<p>Home</p>
			</div>
			<!-- <el-tree   
				:data="data"
				:load="loadNode"
				lazy
			>
			</el-tree> -->
			<el-tree
				:accordion="true"
				class="on" 
				:data="data"
				@node-click="clickHandle"
			>
			</el-tree>

			<!-- <ul class="my-el-tree">
				<li>
					<div class="one flex-sp">
						<p class="flex-son">asfdadsd</p>
						<i class="el-icon-arrow-right"></i>
					</div>
				
					<ul>
						<li>
							<div class="two flex-sp">
								<p class="flex-son">asfdadsd</p>
								<i class="el-icon-arrow-right"></i>
							</div>
							
							<ul>
								<li>
									<div class="three flex-sp">
										<p class="flex-son">asfdadsd</p>
										<i class="el-icon-arrow-right"></i>
									</div>
								
									<ul>
										<li>
											<div class="four flex-sp">
												<p class="flex-son">asfdadsd</p>
												<i class="el-icon-arrow-right"></i>
											</div>
											
											<ul>
												<li>
													<div class="five flex-sp">
														<p class="flex-son">asfdadsd</p>
														<i class="el-icon-arrow-right"></i>
													</div>
												
													<ul>
														<li>
															<div class="sive flex-sp">
																<p class="flex-son">asfdadsd</p>
																<i class="el-icon-arrow-right"></i>
															</div>
														</li>
													</ul>
												</li>
											</ul>
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</li>
			</ul> -->
		</div>
	</div>
</div>

</template>

<script>
let beforeScrollTop = 0;
export default {
	components:{},
	data(){
		return {
			// homeOn:true,
			homeIcon:[require('@/assets/img/home_s.png'),require('@/assets/img/home.png')],
			defaultOpen:[],
			defaultChoose:[],
			data:[],
			num:0,
		}
	},
	mounted(){
		this.initScrollBar();
		window.onresize = this.initScrollBar;
		this.getList();
	},
	methods:{
		toHome(){
			// this.homeOn = true;
			this.$router.push({path:'/index'});
		},
		//获取第一级目录
		getList(){
			this.$fetch({
				url: 'api/client/dir',
				data: {
					id:0
				},
				loading:false
			}).then(res => {
				if(res.data.returnCode == '0000'){
					let list = res.data.data.dirList;
					for(let i=0;i<list.length;i++){
						list[i].label = list[i].name;
						list[i].crembs = [{name:list[i].name,id:list[i].id}];
						list[i].index = [i];
						list[i].children = [
							{
								label:'',
								crembs:[],
								index:[],
								children:[
									{
										label:'',
										crembs:[],
										index:[],
										children:[
											{
												label:'',
												crembs:[],
												index:[],
												children:[

												],
											}
										],
									}
								],
							}
						];
					}
					this.data = list;
					this.clickHandle()
				}

			})
		},
		clickHandle(data){
			
			//console.log(data)
			if(data){
				// this.homeOn = false;
				var _this=this,id=data.id,length=data.index.length,index=data.index;
				_this.$fetch({
					url:'api/client/dir',
					data: {
						id:data.id
					},
					loading:false
				}).then(res =>{
					if(res.data.returnCode == '0000'){
						var file=data.crembs;
						let lists= _this.data;
						let list = res.data.data.dirList;
						for(let i=0;i<list.length;i++){
							list[i].label = list[i].name;
							list[i].crembs = [...data.crembs,{name:list[i].name,id:list[i].id}];
							list[i].index = [...data.index,i];
							if(list[i].isChildren>0){
								list[i].children = [
									{
										label:'',
										crembs:[],
										index:[],
										children:[],
									}
								];
							}
						}
						if(length==1){
							lists[index[0]].children=list;
						}else if(length==2){
							lists[index[0]].children[index[1]].children=list;
						}else if(length==3){
							lists[index[0]].children[index[1]].children[index[2]].children=list;
						}else if(length==4){
							lists[index[0]].children[index[1]].children[index[2]].children[index[3]].children=list;
						}else if(length==5){
							lists[index[0]].children[index[1]].children[index[2]].children[index[3]].children[index[4]].children=list;
						}else if(length==6){
							lists[index[0]].children[index[1]].children[index[2]].children[index[3]].children[index[4]].children[index[5]].children=list;
						}else{
							lists[index[0]].children[index[1]].children[index[2]].children[index[3]].children[index[4]].children[index[5]].children[index[6]].children=list;
						}
						_this.data=lists;
						_this.num++;
						this.$nextTick(()=>{
							let timer = setTimeout(()=>{
								this.initScrollBar();
								clearTimeout(timer);
							},0);
						});
						// console.log(file)
						window.sessionStorage.setItem('crembt',JSON.stringify(file));
						//console.log(window.sessionStorage.getItem('crembt'))
						let stamp = new Date().getTime();                 //设置时间戳参数，防止同一页面同一参数报错
						_this.$router.push({name:'fileList',query:{id:id,stamp}});
					}
				})
			}
		},
		initScrollBar(){
			//console.log(1111111)
			const wrapper = document.getElementsByClassName('my_scroll_wrap')[0];
		    const box = document.getElementsByClassName('my_scroll_box')[0];
		   	const contentList = document.getElementsByClassName('my_scroll_content')[0];
			const scroll_bar = document.getElementsByClassName('my_scroll_bar')[0];
			//元素可视高度
			let v_height = wrapper.offsetHeight;
			// 元素真实高度
			let r_height = contentList.offsetHeight;
			// 滚动条可滚动高度
			let s_height = r_height - v_height
			//console.log(s_height)
			if(r_height <= v_height){
				// scroll_bar.style.display = 'none';
				return;
			}else{
				// scroll_bar.style.display = 'block';
			}
			box.onscroll = function(e){
				//console.log(e,'e')
				if(r_height <= v_height){
					// scroll_bar.style.display = 'none';
					return;
				} else {
					// 根据比例，求出滚动条可设置的位置
					let place = this.scrollTop /s_height * v_height;
					//console.log(this.scrollTop,s_height,v_height,place,'------')
					// 限制滚动条最大高度
					if(place - 58 < 100) {
						scroll_bar.style.top = '100px';
						return ;
					}
					scroll_bar.style.top = place - 58 + 'px';
					// if(box.scrollTop==0){
					// 	scroll_bar.style.top = 0;
					// }else if(box.scrollTop>beforeScrollTop){
					// 	scroll_bar.style.top = scroll_bar.offsetTop+10+'px';
					// }else{
					// 	scroll_bar.style.top = scroll_bar.offsetTop-10+'px';
					// }
					// beforeScrollTop = box.scrollTop;
				}
			}
		}
	}
}
</script>

<style lang="scss">
.my_scroll_wrap{
	width:23%;
	max-width:328px;
	// height:100vh;
	height:calc(100vh - 90px);
	overflow:hidden;
	position: relative;
	z-index:2;
	padding-top: 20px;
	margin-top: 10px;
	background-color: #F7F8F9;
	&:after{
		content: '';
		width:2px;
		height:526px;
		background-color:#DDD;
		position:absolute;
		right:1px;
		top:0;
		margin-top: 100px;
	}
}
.my_scroll_box{
	height: calc(100vh - 80px);
}
.my_scroll_content{
	width:100%;
	// padding: 50px 3.3vw 20px 3.3vw;
	padding: 10px 0 20px 0;
	box-sizing: border-box;
}
#sideTab{
	width:calc(100% + 16px);
	// height:100vh;
	overflow: auto;
	.logo-out{
		width:23%;
		max-width:328px;
		padding-top: 50px;
		background-color:#fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index:2;
	}
	.logo{
		width:128px;
		height:51px;
		object-fit: cover;
		margin:0 auto;
	}
	.home-item{
		padding: 0 3.3vw 0 3.3vw;
		font-size:16px;
		color:#333;
		margin-bottom: 33px;
		&.on{color:#CF1342;}
		&:hover{background:rgba(207, 19, 66, 0.03);}
	}
	.el-tree{
		font-size:16px;
		font-family: 'ArialMT';
		color:#999;
		line-height:24px;
		background: #F7F8F9;
		/*//去处tree的选中背景色*/
		// .el-tree-node.is-current > .el-tree-node__content {
		// 	background-color: #fff !important;
		// }
		// 去除固定高度
		.el-tree-node__content{
			height: auto;
			min-height:26px;
			position: relative;
			.el-tree-node__label{
				display: block;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
				white-space: normal;
			}
			
		}
		.el-tree-node__content:hover{background:rgba(207, 19, 66, 0.03);}
		
		&>.el-tree-node{
			margin-bottom: 33px;
			&>.el-tree-node__content{
				margin-bottom:12px;
				line-height: 1;
			}
			.el-tree-node__label{
				line-height:1;
				// padding:3px 3.3vw;
				padding:3px calc(2.5vw + 24px);
			}
			.el-tree-node__expand-icon{
				top:0;
				// right:3.3vw;
				right:2.5vw;
			}
			&>.el-tree-node__content>.el-tree-node__label{
				font-size:16px;
				font-family:'Arial-BoldMT, Arial';
				color:#333;
			}
			&>.el-tree-node__children>.el-tree-node>.el-tree-node__content>.el-tree-node__label{
				font-size:16px;
				color:#333;
			}
			&>.el-tree-node__children>.el-tree-node{
				&>.el-tree-node__children>.el-tree-node>.el-tree-node__content>.el-tree-node__label{
					font-size:15px;
					color:#575757;
				}
			}
		}
		&.on .is-current>.el-tree-node__content{
			&>.el-tree-node__label,&>.el-icon-caret-right:before{
				color:#CF1342!important;
			}
		}
	}
	.el-tree-node__label{position: relative;}
	.el-tree-node__expand-icon{
		position:absolute;
		margin-top: 1px;
	}
	.el-tree-node__content{
		flex-flow: row-reverse;
		.el-tree-node__label{
			flex:1;
		}
	}
	.el-tree-node__content .el-icon-caret-right:before{
		content: "\e6e0";
		color:#333;
		font-weight:bold;
	}
	.el-tree{
		.el-tree-node{
			.el-tree-node{
				.el-tree-node{
					.el-tree-node{
						.el-tree-node{
							.el-tree-node__expand-icon{display:none;}
						}
					}
				}
			}
		}
	}
}

// @media screen and (min-width: 1500px){
// 	.my_scroll_content{
// 		padding: 50px 50px 20px 50px;
// 	}
// }



</style>