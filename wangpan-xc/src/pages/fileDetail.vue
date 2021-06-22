//header和文件详情
<template>
  <div>
    <!-- <my-header></my-header> -->

    <div class="detail-page">
      <div class="detail-top">
        <my-crembs></my-crembs>
      </div>
      <!--  :style="{background:`url('${bg}') top center/100% auto repeat-y`}" -->
      <div class="detail-con">
        <div class="back" @click="toBack">Back</div>

        <div class="flex mt16">
          <!-- <img class="file-img" :src="detail.preview||zhanwei" alt=""> -->
          <img
            class="file-img"
            v-if="detail.preview"
            :src="detail.preview"
            alt=""
          />
          <img class="file-img" v-else :src="detail.type | Zhanwei" alt="" />
          <div class="flex-son lineh1">
            <!-- <p class="desc1 col333 f-arialB" v-if="detail.description">Description</p>
				                <div class="desc2 col333" v-if="detail.description">{{detail.description}}</div> -->
            <p class="title col333">{{ detail.name }}</p>
            <div class="flex maptar">
              <p class="btn col333">
                Format: {{ detail.type && detail.type.toUpperCase() }}
              </p>
              <div class="col999">{{ detail.createTime }}</div>
            </div>
            <p class="desc1 col333 f-arialB" v-if="detail.description">Description</p>
            <div class="desc2 col333" v-if="detail.description">{{detail.description}}</div>
            <!-- <div class="desc2 col333">
              Through the Internet big data foundation and exclusive marketing
              solutions Through the Internet big data foundation
            </div> -->
            <!-- <p class="desc3 col999">{{detail.createTime}}</p>
            <p class="desc4 col999">Update author : 尚金辉</p> -->

            <div class="flex block cursor box_line" @click="lookOnline" @mouseenter="showActive('active',1)" @mouseleave="showActive('active',0)">
              <img src="@/assets/img/look.png" alt="" v-show="active === 0"/>
              <img src="@/assets/img/look1.png" alt="" v-show="active === 1">
              <p class="font18 col333 ml4">Online Preview</p>
            </div>


            <div class="flex block cursor box_line" @click="toCollect" @mouseenter="showActive('Active',1)" @mouseleave="showActive('Active',0)">
              <img
                class="collect-icon"
                :src="isCollect == 1 ? collectIcon[1] : collectIcon[0]"
                v-show="isCollect == 1||Active === 0"
                alt=""
              />
              <img src="@/assets/img/collect1.png" alt="" v-show="isCollect != 1&&Active === 1">
              <p class="font18 col333 ml4" :class="[{'cole02':isCollect == 1}]">
                {{ isCollect == 1 ? "Collected" : "Collect" }}
              </p>
            </div>


            <div class="flex block cursor box_line" @click="toDownload" @mouseenter="showActive('act',1)" @mouseleave="showActive('act',0)">
              <img src="@/assets/img/download.png" alt="" v-show="act === 0"/>
              <img src="@/assets/img/download1.png" alt="" v-show="act === 1">
              <p class="font18 col333 ml4">Download</p>
            </div>
            <!-- <div class="flex">
				                    <p class="btn col333">Format: JPG</p>
				                </div> -->
            <p class="tip flex cole02">
              <img class="mr5" src="@/assets/img/error.png" alt="" />
              For design format of this file, please contact salesteam in your
              region
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myHeader from "@/components/header.vue";
import myCrembs from "@/components/crembs.vue";

// import Axios from 'axios'
export default {
  components: { myHeader, myCrembs },
  data() {
    return {
      bg: require("@/assets/img/detail-bg.png"),
      collectIcon: [
        require("@/assets/img/collect.png"),
        require("@/assets/img/collect1s.png"),
      ],
      id: "",
      detail: {},
      formatList: [],
      previewUrl: "", //预览地址
      isCollect: "0",
      fileType: 0, //文件下载类型
      active: 0,
      Active:0,
      act:0,
      download_url: "", //第三放下载链接
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getCon();
  },
  methods: {
    showActive(type,index){
      this[type] = index
    },

    getCon() {
      this.$fetch({
        url: "api/client/file_info",
        data: { id: this.id },
      }).then((res) => {
        if (res.data.returnCode == "0000") {
          this.detail = res.data.data.info;
          this.formatList = res.data.data.files;
          //this.previewUrl = res.data.data.previewUrl;
          this.isCollect = res.data.data.isCollect;
          this.download_url = res.data.data.downloadUrl;
        } else {
          //this.$message(res.data.msg);
        }
      });
    },
    lookOnline() {
      if (this.detail.purview == 0) {
        this.$message("No permission to view this file");
        return;
      }
      this.$fetch({
          url:'api/client/preview_url',
          data:{id:this.id,isPreview:1}
      }).then(res=>{
          if(res.data.returnCode=='0000'){
            if(!res.data.data.preview){
              this.$message("No file to view");
              return;
            }
            let url = encodeURIComponent(res.data.data.preview),
              location = window.location;
            window.open(
              location.origin +
                location.pathname +
                "#/Transfer?type=" +
                this.detail.type +
                "&url=" +
                url
            );
          }
      })

      
    },
    toCollect() {
      this.$fetch({
        url: "api/client/collect",
        type: "post",
        data: { id: this.id },
      }).then((res) => {
        if (res.data.returnCode == "0000") {
          this.$message({
            type: "success",
            message:
              this.isCollect == 1
                ? "Cancelled successfully"
                : "Collection successful",
          });
          this.isCollect = this.isCollect == 1 ? 0 : 1;
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    toDownload() {
      if (this.detail.purview != 2) {
        this.$message("No permission to download this file");
        return;
      }
      let a = document.createElement("a");
      let event = new MouseEvent("click");
      // a.href = window.dl_q_baseURL+'api/client/download_file?id='+this.id+'&token='+encodeURIComponent(localStorage.tokenpc);
      a.href = this.download_url;
      //console.log(this.download_url,'------')
      a.dispatchEvent(event);
      // Axios({
      //     url:window.dl_q_file_download,
      //     method:'GET',
      //     headers:{
      //         'Authorization':'bearer '+this.accessToken
      //     },
      //     params:{neid:this.thirdId}
      // }).then(res=>{
      //     console.log(res,'第三方文件流')
      // })

      this.Statistics();
    },
    Statistics() {
      this.$fetch({
        url: "api/client/download_statistics",
        type: "post",
        data: { id: this.id },
        loading: false,
      }).then((res) => {});
    },
    toBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss">
.maptar{
  margin: 20px 0;
}
.detail-page {
  background: #f7f8f9;
  padding: 40px;
  padding-bottom: 50px;
  height: calc(100vh - 60px);
  overflow: auto;
  box-sizing: border-box;
  margin-top: 10px;
  .detail-top {
    background: #fff;
    padding-left: 45px;
    box-shadow: 1px 1px 15px 1px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #f0f2f5;
  }
  .detail-con {
    min-height: calc(100% - 52px);
    padding: 2.6vw 45px;
    box-sizing: border-box;
    background: #fff;
    .back {
      font-size: 16px;
      color: #cf1342;
      font-weight: bold;
      margin-bottom: 20px;
      width: 68px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      border: 2px solid #cf1342;
      cursor: pointer;
      &:hover {
        color: #fff;
        background: #cf1342;
      }
    }

    .title {
      font-size: 28px;
      margin-bottom: 14px;
      line-height: 1.3;
      font-family: "Arial-BoldMT", Arial;
      font-weight: normal;
      color: #333333;
    }
    .file-img {
      width: 234px;
      height: 234px;
      object-fit: contain;
      margin-right: 44px;
      background: #f7f8f9;
     box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
    }
    .desc1 {
      font-size: 17px;
      margin-bottom: 11px;
    }
    .desc2 {
      
      margin: 16px 0 44px 0;
      width: 530px;
      height: 50px;
      font-size: 16px;
      font-family: "ArialMT";
      color: #333333;
      line-height: 25px;
    }
    .desc3 {
      font-size: 12px;
      margin-bottom: 34px;
    }
    .box_line{
        width: 424px;
        border-bottom: 1px solid #DDDD;
        padding-bottom: 15px;
        &:hover{
            P{
                color: #cf1342;
            }
        }
    }
    .block {
      margin-bottom: 15px;
      .collect-icon {
        width: 28px;
      }
      p {
        font-size: 14px;
        margin-left: 3px;
      }
    }
    .btn {
      font-size: 12px;
      margin-right: 18px;
    }
    .tip {
      font-size: 12px;
      margin-top: 24px;
    }
  }
}
@media screen and (min-width: 1500px) {
  .detail-page {
    // margin-top: 40px;
    padding: 40px;
    height: calc(100vh - 90px);
    .detail-con {
      min-height: calc(100% - 52px);
      padding: 30px 45px;
     box-shadow: 0px 5px 10px -1px rgba(0, 0, 0, 0.1);
      .file-img {
        width: 340px;
        height: 340px;
        margin-right: 58px;
        background: #f7f8f9;
      }
      .desc1 {
        font-size: 22px;
        margin-bottom: 14px;
      }
      .desc2 {
        font-size: 16px;
        margin-bottom: 58px;
        height: 18px;
      }
      .desc3 {
        font-size: 14px;
        margin-bottom: 49px;
      }
      .block {
        margin-bottom: 20px;
        p {
          font-size: 18px;
          margin-left: 4px;
        }
      }
      .btn {
        font-size: 14px;
        margin-right: 20px;
      }
      .tip {
        font-size: 12px;
        margin-top: 24px;
      }
    }
  }
}
</style>