(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-74a9494f"],{"6fad8":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"main bgf7f8f9"},[e("div",{staticClass:"file-heat bgfff h-con"},[e("div",{staticClass:"pt44 pl68 pr68 pb44 col333"},[e("p",{staticClass:"fsize24 f-pf2 fweight600"},[t._v("网站用户访问总览")]),e("div",{staticClass:"flex-sp"},[e("p",{staticClass:"fsize14 col57"},[t._v("浏览总次数："+t._s(t.total||"0")+"次")]),e("div",{staticClass:"flex"},[e("ul",{staticClass:"flex bor-rad4 bor-c4c7cc fsize14 col606266 cursor f-yahei"},t._l(t.dateList,(function(a,i){return e("li",{key:i,staticClass:"wid70 lh40 center br-c4c7cc",class:[{"colfff bgcf1342 bor-rad4":a.id==t.chooseDate}],on:{click:function(e){return t.changeDate(a.id)}}},[t._v(t._s(a.title))])})),0)])])]),e("el-table",{staticClass:"my-table mb36",staticStyle:{width:"100%"},attrs:{data:t.list,stripe:""}},[e("el-table-column",{attrs:{prop:"nickname",label:"用户名"}}),e("el-table-column",{attrs:{prop:"createTime",label:"访问时间"}})],1),e("el-pagination",{attrs:{"page-size":t.limit,layout:"prev, pager, next, jumper",total:t.total},on:{"current-change":t.changePage}})],1)])},s=[],l={components:{},data:function(){return{dateList:[{id:0,title:"全部"},{id:1,title:"今日"},{id:2,title:"近七天"},{id:3,title:"近三十天"}],chooseDate:0,list:[],page:1,limit:5,total:0}},mounted:function(){this.getData()},methods:{getData:function(){var t=this,a={dateType:this.chooseDate,pageNo:this.page,limit:this.limit};this.$fetch({url:"admin/admin_member/login_log",data:a}).then((function(a){"0000"==a.data.returnCode?(t.list=a.data.data.list,t.total=parseInt(a.data.data.count)):t.$message(a.data.msg)}))},changePage:function(t){this.page=t,this.getData()},changeDate:function(t){this.chooseDate=t,this.getData()}}},c=l,n=e("2877"),o=Object(n["a"])(c,i,s,!1,null,null,null);a["default"]=o.exports}}]);
//# sourceMappingURL=chunk-74a9494f.8f75a4c4.js.map