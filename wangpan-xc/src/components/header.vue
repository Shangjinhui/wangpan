<template>
  <div class="box">
    <div id="head" class="flex" :style="{ background }">
      <div class="flex-son">
        <div class="logo-out">
				   <img class="logo cursor" src="@/assets/img/logo.png" @click="toHome"/>
		  	</div>
      </div>
      <div class="con flex">
        <div class="rel flex">
          <img
            class="icon-message cursor"
            src="@/assets/img/tongzhi.png"
            alt=""
            @click="openMsg"
          />
          <i class="point" v-if="userInfo.noRead != 0"></i>
        </div>

        <el-dropdown trigger="click">
          <div class="el-dropdown-link flex cursor">
            <!-- <img class="avatar" :src="userInfo.avatar" alt=""> -->
            <img class="avatar" :src="userInfo.avatar||avatar" alt="" />
            <p class="username col333">{{ userInfo.nickname }}</p>
            <i class="el-icon-arrow-down"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link
                :to="{ path: '/selfCenter', query: { ind: 0 } }"
                class="flex"
              >
                <img src="@/assets/img/collect.png" alt="" />
                <span>My collection</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link
                :to="{ path: '/selfCenter', query: { ind: 1 } }"
                class="flex"
              >
                <img src="@/assets/img/safe.png" alt="" />
                <span>Personal information</span>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div class="flex" @click="lookAgainAgreement">
                <img src="@/assets/img/agreement.png" alt="" />
                <span>User Agreement</span>
              </div>
            </el-dropdown-item>

            <el-dropdown-item>
              <div class="flex" @click="Exit">
                <img src="@/assets/img/exit.png" alt="" />
                <span>Log out</span>
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- <div class="flex">
            <img class="icon-language" src="@/assets/img/earth.png" alt="">
            <p class="address col333">{{userInfo.country}}</p>
        </div> -->
      </div>
      <agree-ment ref="agree"></agree-ment>
      <message-page ref="msg"></message-page>
    </div>
  </div>
</template>

<script>
import agreeMent from "@/components/agreement.vue";
import messagePage from "@/components/message.vue";
export default {
  components: { agreeMent, messagePage },
  props: {
    background: {
      type: String,
      default: "#fff",
    },
  },
  data() {
    return {
      avatar:require('@/assets/img/avatar.png'),
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo.userInfo;
    },
  },
  mounted() {},
  methods: {
    	toHome(){
			this.$router.push({path:'/index'});
		},
    openMsg() {
      this.$refs.msg.show = true;
    },
    lookAgainAgreement() {
      this.$refs.agree.agreeLook = true;
    },
    Exit() {
      this.$fetch({
        url: "/api/member/signout",
        type: "post",
        data: {
          id: this.userInfo.id,
        },
      }).then((res) => {
        if (res.data.returnCode == "0000") {
          this.$store.commit("userInfo/SET_TOKEN", "");
          this.$store.commit("userInfo/SET_USERINFO", {});
          this.$router.push("/login");
        } else {
          this.$message(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.box{
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
}
.logo-out{
		width:23%;
		max-width:328px;
		background-color:#fff;
    padding-left: 37px;
	}
	.logo{
		width:94px;
		height:34px;
		object-fit: cover;
	}
@media screen and (min-width: 1441px) {
  .el-dropdown-menu {
    .el-dropdown-menu__item {
      line-height: 52px;
      &:nth-of-type(4) {
        border-top: 1px solid #eee;
      }
    }
  }
  #head {
    height: 80px;
    .con {
      padding-right: 74px;
      .icon-message {
        width: 25px;
        height: 25px;
        margin-right: 24px;
      }
      .point {
        width: 6px;
        height: 6px;
        background: #ee5045;
        margin: 4px 4px 0 0;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 20px;
      }
      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-right: 8px;
      }
      .icon-language {
        width: 20px;
        height: 20px;
        margin-left: 27px;
      }
      // .username{min-width:60px;}
      .username {
        font-size: 14px;
        margin-right: 8px;
      }
    }
  }
}
@media screen and (max-width: 1440px) {
  .el-dropdown-menu {
    .el-dropdown-menu__item {
      font-size: 12px;
      line-height: 39px;
      &:nth-of-type(4) {
        border-top: 1px solid #eee;
      }
    }
  }
  #head {
    height: 60px;
    .con {
      padding-right: 55px;
      .icon-message {
        width: 22px;
        height: 22px;
        margin-right: 18px;
      }
      .point {
        width: 6px;
        height: 6px;
        background: #ee5045;
        margin: 4px 4px 0 0;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 20px;
      }
      .avatar {
        width: 27px;
        height: 27px;
        border-radius: 50%;
        margin-right: 6px;
      }
      .icon-language {
        width: 18px;
        height: 18px;
        margin-left: 20px;
      }
      // .username{min-width:60px;}
      .username {
        font-size: 12px;
        margin-right: 6px;
      }
    }
  }
}
// @media screen and (max-width: 1366px){
//     #head{
// 		height:60px;
// 		.con{
// 			padding-right:55px;
// 			.icon-message{
// 				width:22px;
// 				height:22px;
// 				margin-right:22px;
// 			}
// 			.avatar{
// 				width:27px;
// 				height:27px;
// 				border-radius: 50%;
// 				margin-right:6px;
// 			}
// 			.icon-language{
// 				width:18px;
// 				height:18px;
// 				margin-left:19px;
// 			}
// 			// .username{min-width:60px;}
// 			.username,.address{
// 				font-size:12px;
// 			}
// 		}
// 	}
// }
</style>