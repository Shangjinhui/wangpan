<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align: left"></div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  name: "Editor",
  props:{
    height:{
      type:Number,
      default:0.3
    },
    content:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      editor: null,
      editorContent: "",
    };
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    //console.log(this.editor,'------')
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.config.onchange = (html) => {
      this.editorContent = html;
      
      this.$emit('catchData',this.editorContent); // 把这个html通过catchData的方法传入父组件
    };
    
    
    
    this.editor.config.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo", // 重复
    ];
    this.editor.create(); // 创建富文本实例
    let h = document.documentElement.clientHeight;
    //console.log(this.height,h)
    document.querySelector('.w-e-text-container').style.height = this.height*h+'px';
    this.editor.txt.html(this.content);
    this.editor.config.customUploadImg = (file,insert) => {
        //console.log(file,insert,'本地图片')
        let fromData = new FormData();
        fromData.append('uploadFile',file[0])
        this.$fetch({
            url:'admin/admin_upload/photo',
            type:'post',
            data:fromData
        }).then(res=>{
            if(res.data.returnCode == '200'){
                let dom = `<img src="${res.data.data.imgurl}" style="max-width:100%" />`
                this.editor.txt.append(dom);
            }else{
                that.$message(res.data.msg);
            }
        })
    }
  },
};
</script>