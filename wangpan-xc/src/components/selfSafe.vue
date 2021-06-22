<template>
<div class="self-safe-page">
    <div class="safe-con">
        <p class="title">Personal information</p>
		<div class="line"></div>
        <div class="flex-top con">
            <div class="userInfo">
                <!-- <img class="avatar" :src="userInfo.avatar||avatar" alt=""> -->
				<div class="upload-avatar">
					<img class="avatar" :src="userInfo.avatar||avatar" alt="">
					<input type="file" accept="image/*" ref="img" class="upload-input">
				</div>
                <p class="username col333">{{userInfo.nickname}}</p>
                <p class="email col333 f-arialMt flex">
                    <img class="icon" src="@/assets/img/email.png" alt="">
                    <span>{{userInfo.email}}</span>
                </p>
                <p class="address col333 f-arialMt flex">
                    <img class="icon" src="@/assets/img/earth.png" alt="">
                    <span>{{userInfo.country}}</span>
                </p>
            </div>
            <div class="change-psw col333 f-arialMt">
                <ul>
                    <li class="flex wid">
                        <p class="label">original password</p>
                        <input class="pwd" type="text" v-model="originPsw" @keyup.enter="Submit" placeholder="Please enter the original password">
                    </li>
                    <li class="flex wid">
                        <p class="label">new password</p>
                        <input class="pwd" type="text" v-model="nowPsw" @keyup.enter="Submit" placeholder="Please enter the new password">
                    </li>
                    <li class="flex rel wid">
                        <p class="label">Confirm password</p>
                        <input class="pwd" type="text" v-model="againPsw" @keyup.enter="Submit" placeholder="Please reconfirm the password">
                        <p class="tip flex cole02" v-if="originPsw&&errorShow">
                            <img src="@/assets/img/error.png" alt="">
                            Original password error
                        </p>
                    </li>
                </ul>
                <div class="submit cursor" @click="Submit">Save</div>
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
			originPsw:'',
			nowPsw:'',
			againPsw:'',
			errorShow:false,
			avatar:require('@/assets/img/avatar.png'),
		}
	},
	computed:{
		userInfo(){
			return this.$store.state.userInfo.userInfo;
		}
	},
	mounted(){
		this.initUpload();
	},
	methods:{
		initUpload(){
			const that = this;
			that.$refs['img'].addEventListener('change',function(e){
                let file = this.files[0];
                let fromData = new FormData();
                fromData.append('uploadFile',file)
                that.$fetch({
                    url:'api/fileupload/photo',
                    type:'post',
                    data:fromData
                }).then(res=>{
                    if(res.data.returnCode == '200'){
						that.userInfo.avatar = res.data.data.imgurl;
						
						that.SaveAvatar(res.data.data.id);
                    }else{
                        that.$message(res.data.msg);
                    }
                })
            })
		},
		SaveAvatar(id){
			this.$fetch({
				url:'api/member/info',
				type:'post',
				data:{avatar:id}
			}).then(res=>{
				if(res.data.returnCode == '0000'){
					this.$message({message:'Replacement successful',type:'success'});
				}else{
					this.$message(res.data.msg);
				}
			})
		},
		Submit(){
			if(!this.originPsw){
				this.$message('Please enter the original password');
				return;
			}
			if(!this.nowPsw){
				this.$message('Please enter the new password');
				return;
			}
			if(!this.againPsw){
				this.$message('Please reconfirm the password');
				return;
			}
			if(this.nowPsw!=this.againPsw){
				this.$message('The password re-entry is inconsistent');
				return;
			}
			let data = {
				oldPassword:this.originPsw,
				newPassword:this.nowPsw
			}
			this.$fetch({
				url:'api/member/edit_password',
				type:'post',
				data
			}).then(res=>{
				if(res.data.returnCode=='0000'){
					//不用重新登录
					this.$message({type:'success',message:'Modification succeeded'});
					this.originPsw = '';
					this.nowPsw = '';
					this.againPsw = '';
				}else{
					this.errorShow = true;
					this.$message(res.data.msg)
				}
			})
		}
	}
}
</script>

<style lang="scss">
@media screen and (min-width: 1441px){
.self-safe-page{
	    background: #F7F8F9;
	    padding:20px;
		height:calc(100vh - 80px);
		overflow: auto;
	    box-sizing: border-box;
		margin-top: 10px;
	    .safe-con{
	        height:100%;
	        background:#fff;
	        padding:42px 66px;
	        box-sizing: border-box;
	        border-radius: 6px;
			position: relative;
	        .title{
	        	font-size:28px;
	        	margin-bottom:20px;
	        }
			.line{
				width: 100%;
				height: 1px;
				background: #F0F2F5;
				position: absolute;
				top: 100px;
				left: 0;
			}
	        .con{
	        	margin-top:80px;
	        }
	        .userInfo{
				width:250px;
				border-right:1px solid #ececec;
				margin:0 124px 0 34px;
				.upload-avatar{
					width:100px;
	                height:100px;
					margin-bottom:16px;
					position: relative;
					.avatar{
						width:100%;
						height:100%;
						object-fit: cover;
					}
					input{
						width:100%;
						height:100%;
						opacity: 0;
						position:absolute;
						left:0;
						top:0;
					}
				}
	            .username{
	            	font-size:18px;
	            	margin-bottom:13px;
	            }
	            .email,.address{
	            	font-size:14px;
	            	margin-bottom:13px;
	            	.icon{
		                width:28px;
		                height:28px;
		                margin-right:6px;
		            }
	            }
	            
	        }
	        .change-psw{
	        	font-size:14px;
	        	ul{
	        		li{
	        			margin-bottom:30px;
	        			.label{
	        				width:130px;
	        			}
	        			.pwd{
				            width: 300px;
				            height: 38px;
				            border-radius: 2px;
				            border: 1px solid #DCDFE6;
				            padding-left:12px;
				            box-sizing: border-box;
				        }
				        .tip{
				        	font-size:12px;
				            position:absolute;
				            left: 130px;
				            top: 46px;
				        }
	        		}
	        	}
	        	
		        .submit{
		            width: 300px;
		            line-height: 38px;
		            background: #CF1342;
		            border-radius: 2px;
		            font-size:14px;
		            color:#fff;
		            text-align: center;
		            margin-top:66px;
		            margin-left:130px;
		        }
	        }
	        
	    }
	}
}
@media screen and (min-width: 1367px) and (max-width: 1440px){
    .self-safe-page{
	    background: #F7F8F9;
	    padding:20px;
		height:calc(100vh - 60px);
		overflow: auto;
	    box-sizing: border-box;
		margin-top: 10px;
	    .safe-con{
	        height:100%;
	        background:#fff;
	        padding:31.5px 4.6vw;
	        box-sizing: border-box;
	        border-radius: 6px;
			position: relative;
	        .title{
	        	font-size:26px;
	        	margin-bottom:20px;
	        }
			.line{
				width: 100%;
				height: 1px;
				background: #F0F2F5;
				position: absolute;
				top: 100px;
				left: 0;
			}
	        .con{
	        	margin-top:61.5px;
	        }
	        .userInfo{
				width:188px;
				border-right:1px solid #ececec;
				margin:0 93px 0 34px;
				.upload-avatar{
					width:75px;
	                height:75px;
					margin-bottom:12px;
					position: relative;
					.avatar{
						width:100%;
						height:100%;
						object-fit: cover;
					}
					input{
						width:100%;
						height:100%;
						opacity: 0;
						position:absolute;
						left:0;
						top:0;
					}
				}
	            .username{
	            	font-size:14px;
	            	margin-bottom:13px;
	            }
	            .email,.address{
	            	font-size:12px;
	            	margin-bottom:15px;
	            	.icon{
		                width:21px;
		                height:21px;
		                margin-right:4.5px;
		            }
	            }
	            
	        }
	        .change-psw{
	        	font-size:12px;
	        	ul{
	        		li{
	        			margin-bottom:23px;
	        			.label{
	        				width:110px;
	        			}
	        			.pwd{
				            width: 225px;
				            height: 28.5px;
				            border-radius: 2px;
				            border: 1px solid #DCDFE6;
				            padding-left:10.5px;
				            box-sizing: border-box;
						}
						input{font-size:12px;}
				        .tip{
				        	font-size:12px;
				            position:absolute;
				            left: 100px;
				            top: 33px;
				        }
	        		}
	        	}
	        	
		        .submit{
		            width: 225px;
		            line-height: 29px;
		            background: #CF1342;
		            border-radius: 2px;
		            font-size:12px;
		            color:#fff;
		            text-align: center;
		            margin-top:33px;
		            margin-left:100px;
		        }
	        }
	        
	    }
	}
}
@media screen and (max-width: 1366px){
    .self-safe-page{
	    background: #F7F8F9;
	    padding:20px;
		height:calc(100vh - 60px);
		overflow: auto;
	    box-sizing: border-box;
		margin-top: 10px;
	    .safe-con{
	        height:100%;
	        background:#fff;
	        padding:18.5px 4.6vw;
	        box-sizing: border-box;
	        border-radius: 6px;
			position: relative;
	        .title{
	        	font-size:24px;
	        	margin-bottom:20px;
	        }
			.line{
				width: 100%;
				height: 1px;
				background: #F0F2F5;
				position: absolute;
				top: 70px;
				left: 0;
			}
	        .con{
	        	margin-top:61.5px;
	        }
	        .userInfo{
	            width:262px;
				margin:0 20px 0 34px;
				.upload-avatar{
					width:75px;
	                height:75px;
					margin-bottom:12px;
					position: relative;
					.avatar{
						width:100%;
						height:100%;
						object-fit: cover;
					}
					input{
						width:100%;
						height:100%;
						opacity: 0;
						position:absolute;
						left:0;
						top:0;
					}
				} 
	            .username{
	            	font-size:14px;
	            	margin-bottom:13px;
	            }
	            .email,.address{
	            	font-size:12px;
	            	margin-bottom:15px;
	            	.icon{
		                width:21px;
		                height:21px;
		                margin-right:4.5px;
		            }
	            }
	            
	        }
	        .change-psw{
	        	font-size:12px;
	        	ul{
	        		li{
	        			margin-bottom:22.5px;
	        			.label{
	        				width:110px;
	        			}
	        			.pwd{
				            width: 225px;
				            height: 28.5px;
				            border-radius: 2px;
				            border: 1px solid #DCDFE6;
				            padding-left:10.5px;
				            box-sizing: border-box;
				        }
				        .tip{
				        	font-size:12px;
				            position:absolute;
				            left: 100px;
				            top: 33px;
				        }
	        		}
	        	}
	        	
		        .submit{
		            width: 225px;
		            line-height: 29px;
		            background: #CF1342;
		            border-radius: 2px;
		            font-size:12px;
		            color:#fff;
		            text-align: center;
		            margin-top:33px;
		            margin-left:100px;
		        }
	        }
	        
	    }
	}
}

</style>