
<template>
  <div class="login-page-out">
    <div
      class="login-page wid mwid1200"
      :style="{ background: `url(${loginPhoto}) center/cover no-repeat` }"
    >
      <div class="right">
        <!-- <img class="logo" src="@/assets/img/logo.png"/> -->
        <div class="con">
          <!-- <img class="logo" :src="loginLogo" /> -->
          <div class="logo" :style="{ background: `url(${loginLogo}) center/cover no-repeat` }"></div>
          <p class="logo-tip">Marketing Content Management</p>
          <div class="input flex">
            <img src="@/assets/img/email2.png" />
            <input
              class="flex-son f-arialMt"
              type="text"
              v-model="email"
              @keyup.enter="signIn"
              placeholder="User Name / E-mail"
            />
          </div>
          <div class="input flex">
            <img src="@/assets/img/psw.png" />
            <input
              class="flex-son f-arialMt"
              type="password"
              v-model="psw"
              @keyup.enter="signIn"
              placeholder="Enter your PIN"
            />
          </div>
          <p class="tip flex cole02 f-arialMt">
            <img src="@/assets/img/error.png" alt="" />
            Forget password contact administrator
          </p>
          <div class="login-btn cursor" @click="signIn">Login</div>
        </div>
      </div>
    </div>

    <div class="footer flex-center-column">
      <p class="f-arialB col666">Deli Marketing Content Management System</p>
      <p class="col666">@1988-2020 Deli Group. All Rights Reserved</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loginLogo:'',
      loginPhoto:'',
      email: "",
      psw: "",
    };
  },
  mounted() {
    //this.signIn();
    this.getData();
  },
  methods: {
    //获取登录页首图和logo
    getData(){
      this.$fetch({
        url: "api/member/login_index",
      }).then((res) => {
        if(res.data.returnCode){
          if (res.data.returnCode == "0000") {
              this.loginPhoto = res.data.data.loginPhoto||require('@/assets/img/bg.png');
              this.loginLogo = res.data.data.loginLogo||require('@/assets/img/logo.png');
          } else {
            this.$message(res.data.msg);
          }
        }else{
          let timer = setTimeout(() => {
              this.getData();
              clearTimeout(timer);
            }, 500);
        }
        
      });
    },
    signIn() {
      if (!this.email) {
        this.$message("Please fill in your email address");
        return;
      }
      if (!this.psw) {
        this.$message("Please fill in your password");
        return;
      }
      let data = {
        email: this.email,
        password: this.psw,
      };
      this.$fetch({
        url: "/api/member/signin",
        type: "POST",
        data,
      }).then((res) => {
        //console.log(res);
        if (res.data.returnCode == "0000") {
          this.$message({ message: "Login successful", type: "success" });
          window.localStorage.setItem("loginorigin", "1");
          this.$store.commit("userInfo/SET_TOKEN", res.data.data.token);
          this.$store.dispatch("userInfo/getUserInfo");

          this.$router.push("/");
          // setTimeout(() => {
            
          // }, 800);
        } else {
          this.$message(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss">
@media screen and (min-width: 1441px) {
  .login-page-out {
    height: 100vh;
    position: relative;
    .login-page {
      height: calc(100vh - 124px);
      .right {
        position: absolute;
        right: 4.7%;
        // top: 26.7%;
        top:calc(50% - 245px);
        .con {
          width: 470px;
          height: 493px;
          background: #ffffff;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          padding-top: 80px;
          box-sizing: border-box;
          .logo {
            width: 178px;
            height: 71px;
            object-fit: cover;
            margin: 0 auto 8px;
          }
          .logo-tip {
            text-align: center;
            margin: 0 auto 28px;
          }
          .input {
            width: 320px;
            height: 42px;
            line-height: 42px;
            background: #f7f8f9;
            border-radius: 2px;
            margin: 0 auto 20px;
            padding: 0 10px;
            box-sizing: border-box;
            &:nth-of-type(2) {
              margin: 0 auto 8px;
            }
            input {
              font-size: 16px;
              line-height: 18px;
              background: #f7f8f9;
              padding-left: 8px;
            }
          }
          .tip {
            width: 320px;
            margin: 0 auto;
            font-size: 14px;
          }
          .login-btn {
            width: 320px;
            line-height: 42px;
            background: #cf1342;
            border-radius: 2px;
            font-size: 18px;
            color: #fff;
            text-align: center;
            margin: 50px auto 0;
          }
        }
      }
    }
    .footer {
      font-size: 16px;
      line-height: 24px;
      height: 124px;
      background: #fff;
    }
  }
}
@media screen and (max-width: 1440px) {
  .login-page-out {
    height: 100vh;
    position: relative;
    .login-page {
      height: calc(100vh - 93px);
      .right {
        position: absolute;
        right: 4.7%;
        // top: 26.7%;
        top:calc(50% - 185px);
        .con {
          width: 353px;
          height: 370px;
          background: #ffffff;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          padding-top: 60px;
          box-sizing: border-box;
          .logo {
            width: 134px;
            height: 53px;
            object-fit: cover;
            margin: 0 auto 6px;
          }
          .logo-tip {
            text-align: center;
            margin: 0 auto 21px;
          }
          .input {
            width: 240px;
            height: 31px;
            line-height: 31px;
            background: #f7f8f9;
            border-radius: 2px;
            margin: 0 auto 15px;
            padding: 0 8px;
            box-sizing: border-box;
            &:nth-of-type(2) {
              margin: 0 auto 6px;
            }
            input {
              font-size: 12px;
              line-height: 16px;
              background: #f7f8f9;
              padding-left: 8px;
            }
          }
          .tip {
            width: 250px;
            margin: 0 auto;
            padding-left: 5px;
            font-size: 12px;
          }
          .login-btn {
            width: 240px;
            line-height: 31px;
            background: #cf1342;
            border-radius: 2px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            margin: 38px auto 0;
          }
        }
      }
    }
    .footer {
    font-size: 12px;
    line-height: 18px;
    background: #fff;
    height: 93px;
  }
  }
  
}
</style>