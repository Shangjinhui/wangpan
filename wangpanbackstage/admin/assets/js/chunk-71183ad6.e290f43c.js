(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71183ad6"],{"7f63":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main bgf7f8f9"},[t.open?n("div",{staticClass:"bgfff h-con"},[n("my-richtext",{attrs:{height:.6,content:t.content},on:{catchData:t.catchData}}),n("div",{staticClass:"flex-end mt20"},[n("div",{staticClass:"wid64 lh30 center bgcf1342 colfff fsize14 bor-rad4 cursor f-yahei",on:{click:t.Save}},[t._v("确定")])])],1):t._e()])},c=[],s=n("e06f"),i={components:{myRichtext:s["a"]},data:function(){return{open:!1,content:""}},mounted:function(){this.getXeyi()},methods:{catchData:function(t){this.content=t},getXeyi:function(){var t=this;this.$fetch({url:"admin/admin_member/user_agreement_info"}).then((function(e){"0000"==e.data.returnCode?(t.content=e.data.data.info.content,t.open=!0):t.$message(e.data.msg)}))},Save:function(){var t=this;this.$fetch({url:"admin/admin_member/user_agreement",type:"post",data:{content:this.content}}).then((function(e){"0000"==e.data.returnCode?t.$message({type:"success",message:"保存成功"}):t.$message(e.data.msg)}))}}},o=i,f=(n("aca6"),n("2877")),r=Object(f["a"])(o,a,c,!1,null,"e9598f22",null);e["default"]=r.exports},aca6:function(t,e,n){"use strict";n("fdf7")},fdf7:function(t,e,n){}}]);
//# sourceMappingURL=chunk-71183ad6.e290f43c.js.map