
// 随机生成uuid 作为唯一识别码
const uuidGenerator = () => {
  var originStr = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      originChar = '0123456789abcdef',
      len = originChar.length;
      return originStr.replace(/x/g, function (match) {
          return originChar.charAt(Math.floor(Math.random() * len));
      });
}

import Vue from 'vue';
const state = {
  ws:null,
  files:[],                                           //批量下载选中的文件
}

const mutations = {
  SET_SOCKET: (state, ws) => {
    state.ws = ws;
  },
  SET_FILES: (state, files) => {
    state.files = files;
  },
}
const actions = {
  // 开启WebSocket连接
  WebSocketTest({commit},callback){
    let portI = 0,port = ['81','20706','21011','25914','54419'];
    const WebSocketTest = () => {
      if ("WebSocket" in window) {
        let load = Vue.prototype.$loading({text:'Bulk downloading…',spinner:'el-icon-loading',background:'rgba(0, 0, 0, .3)'});
        // 打开一个 web socket 81、20706、21011、25914、54419
        var ws = new WebSocket("ws://localhost:"+port[portI]);
        ws.onopen = function () {
          //console.log('已连接',state)
          load.close();
          commit('SET_SOCKET',ws);
          callback();
          //ws.send("发送数据");
        };
  
        ws.onmessage = function (res) {
          //console.log(res,'接收数据')//webscoket登录会返回信息，继而进行下载
          res = JSON.parse(res.data)
          // console.log(res)
          //type  1登录2下载
          if(res.type == 1){
            if(res.info.result == 1){
              let files = state.files,metadata = []; 
              for(let i=0;i<files.length;i++){
                metadata.push({path:files[i].thirdPath,path_type:'ent'})
              }
              let params = {
                type:2,
                sub_type:10,
                id:uuidGenerator(),
                "info" : {
                  "isShowPath" : false,
                  "isShowTrans" : true,
                  "metadata" : metadata
                },                 
              }
              //console.log(params,'下载发送');
              // return;
              state.ws.send(JSON.stringify(params));
            }else{
              Vue.prototype.$message('The connection has expired, please click to retry!');
              //下载完退出登录
              ExitLogin();
            }
          }else if(res.type == 2){
            //下载
            if(res.info.result == 1){
              
            }else{
              Vue.prototype.$message(res.info.error_message||'download error');
            }
          }
          
        };
  
        ws.onclose = function () {
          // 关闭 websocket
          //console.log("连接已关闭...");
          load.close();
          commit('SET_SOCKET',null);
        };
        ws.onerror = function (err) {
         //console.log(err,'连接失败')
         load.close();
         if(portI >= port.length-1){
          Vue.prototype.$message('The WebTool tool is not available. Please download WebTool firstly');
         }else{
          //Vue.prototype.$message(state.port[state.portI]+'端口被占用，正在尝试重新连接...');
          portI++;
          WebSocketTest();
         }
         
         commit('SET_SOCKET',null);
        }
      } else {
          // 浏览器不支持 WebSocket
          alert("Your browser does not support WebSocket!");
      }
    }
    const ExitLogin = () => {
      let params = {
        type: 4,
        id: uuidGenerator(),
      }
      state.ws.send(JSON.stringify(params));
    }
    WebSocketTest();
  },
  SocketLogin({commit}){
    Vue.prototype.$fetch({
      url:'api/client/web_param',
      loading:false,
    }).then(res=>{
      //console.log(res)
      if(res.data.returnCode=='0000'){
        let {accountId,session,userId} = res.data.data;
          let params = {
            type:1,
            id:uuidGenerator(),
            info:{
                // "S" : "SSymbol",
                "X-LENOVO-SESS-ID" : session,
                "host" : "https://console.box.lenovo.com",
                "params" : {
                    "account_id" : accountId
                },
                "user_id" : userId
            }
        }
        //console.log(params,'登录发送')
        state.ws.send(JSON.stringify(params));
      }else{
          Vue.prototype.$message(res.data.msg); 
      }
      
    })
  }
  
  //批量下载(需要WebSocket登录的一些参数)（根据是否有登录返回的参数判断登录是否成功）
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}