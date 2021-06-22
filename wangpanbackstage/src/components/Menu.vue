<template>
<div class="menu-out bgfff pl28 pr28 pt152 overflow-auto f-yahei">
    <el-menu
    :default-openeds="defaultOpen"
    :unique-opened="true"
    text-color="#333"
    active-text-color="#fff"
    @open="handleOpen"
	@close="handleClose"
    >
        <el-submenu class="mb10" :class="[{open:firstOn==item.path}]" :index="item.path" v-for="(item,index) in menuList" :key="index" v-if="item.show">
            <template slot="title">
                <div @click="Navigator(item.path)">
                    <!-- <i class="pl-15 h-18 mr-10" style="background:url(@/assets/img/lianxiangyun.png)"></i> -->
                    <img class="inline mr8" :src="firstOn==item.path?item.icon:item.icons" alt="">
                    <span class="fsize14 col333" :class="[{fspan:firstOn==item.path}]">{{item.title}}</span>
                </div>
            </template>
            <el-menu-item-group class="my-submenu-group fsize12" v-if="item.children&&item.children.length>0">
                <el-submenu :index="item2.path" v-for="(item2,index2) in item.children" :key="index2" v-if="item2.show">
                    <template slot="title">
                        <span class="fsize12 col7b" :class="[{colcf1342:twoOn==item2.path}]" @click="Navigator(item2.path)">- {{item2.title}}</span>
                    </template>
                </el-submenu>
            </el-menu-item-group>
        </el-submenu>
        
    </el-menu>
</div>
</template>

<script>
export default {
    components:{},
    
	data(){
		return {
            menuList:[
                {
                    showId:'1',
                    title:'仪表盘',
                    icon:require('@/assets/img/yibiaoban.png'),
                    icons:require('@/assets/img/yibiaobans.png'),
                    path:'1',
                    children:[
                        {
                            showId:'2',
                            title:'网站用户访问总览',
                            path:'visitUser'
                        },
                        {
                            showId:'3',
                            title:'文件热度总览',
                            path:'fileHeat'
                        }
                    ]
                },
                {
                    showId:'4',
                    title:'内容设置',
                    icon:require('@/assets/img/neirongshezhi.png'),
                    icons:require('@/assets/img/neirongshezhis.png'),
                    path:'2',
                    children:[
                        {
                            showId:'5',
                            title:'登录页首图',
                            path:'createContent'
                        },
                        {
                            showId:'6',
                            title:'登录页logo',
                            path:'createContent2'
                        },
                        {
                            showId:'7',
                            title:'首页banner',
                            path:'createContent3'
                        },
                        {
                            showId:'8',
                            title:'文件推荐',
                            path:'fileRecommend'
                        },
                        {
                            showId:'9',
                            title:'文件关键词',
                            path:'fileKeyword'
                        },
                        {
                            showId:'10',
                            title:'用户协议',
                            path:'agreement'
                        },
                    ]
                },
                {
                    showId:'11',
                    title:'文件中心',
                    icon:require('@/assets/img/wenjianzhongxin.png'),
                    icons:require('@/assets/img/wenjianzhongxins.png'),
                    path:'fileCenter',
                    children:[
                        
                    ]
                },
                {

                    showId:'12',
                    title:'联想云匹配文件',
                    icon:require('@/assets/img/lianxiangyun.png'),
                    icons:require('@/assets/img/lianxiangyuns.png'),
                    path:'matchingFile',
                    children:[
                        
                    ]
                },
                {
                    showId:'13',
                    title:'网盘用户权限',
                    icon:require('@/assets/img/yonghuquanxian.png'),
                    icons:require('@/assets/img/yonghuquanxians.png'),
                    path:'userRoot',
                    children:[
                        
                    ]
                },
                {
                    showId:'14',
                    title:'网盘用户组权限',
                    icon:require('@/assets/img/yonghuzuquanxian.png'),
                    icons:require('@/assets/img/yonghuzuquanxians.png'),
                    path:'userGroupRoot',
                    children:[
                        
                    ]
                },
                {
                    showId:'19',
                    title:'消息中心',
                    icon:require('@/assets/img/messagecenter.png'),
                    icons:require('@/assets/img/messagecenters.png'),
                    path:'messCenter',
                    children:[
                        
                    ]
                },
                {
                    showId:'15',
                    title:'其他设置',
                    icon:require('@/assets/img/qitashezhi.png'),
                    icons:require('@/assets/img/qitashezhis.png'),
                    path:'8',
                    children:[
                        {
                            showId:'16',
                            title:'修改用户默认密码',
                            path:'changeUserPsw'
                        },
                        {
                            showId:'17',
                            title:'创建后台角色',
                            path:'createBackstageRole'
                        },
                        {
                            showId:'18',
                            title:'创建后台用户',
                            path:'addUser'
                        },
                    ]
                },
            ],
            defaultOpen:[],
            firstOn:'',     //打开的一级path
            twoOn:'',       //选中的二级path
		}
    },
    mounted(){
        this.getMenu();

        //let firstOn = window.sessionStorage.getItem('firstOn')||'1',twoOn = window.sessionStorage.getItem('twoOn')||'1-1';
        this.initMenu();
    },
    methods:{
        initMenu(){
            let path = this.$route.name,list = this.menuList;
            //console.log(path,list)
            for(let i=0;i<list.length;i++){
                if(list[i].path==path){
                    this.defaultOpen = [path];
                    this.firstOn = path;
                    return;
                }
                let children = list[i].children;
                if(children.length>0){
                    for(let j=0;j<children.length;j++){
                        if(children[j].path==path){
                            this.defaultOpen = [list[i].path,path];
                            this.firstOn = list[i].path;
                            this.twoOn = path;
                        }
                    }
                }
            }
            
        },
        getMenu(){
            //获取侧边栏权限判断是否展示
            this.$fetch({
                url:'admin/admin_member/sidebar'
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    let list = [...this.menuList],data = res.data.data.list;
                    for(let i=0;i<data.length;i++){
                        for(let j=0;j<list.length;j++){
                            if(data[i].id == list[j].showId){
                                list[j].title = data[i].title;
                                list[j].show = true;
                                //相同父菜单下子菜单对比
                                let list_next = list[j].children,data_next = data[i].children;
                                if(list_next.length>0&&data_next.length>0){
                                    for(let k=0;k<data_next.length;k++){
                                        for(let f=0;f<list_next.length;f++){
                                            if(data_next[k].id == list_next[f].showId){
                                                list[j].children[f].title = data_next[k].title;
                                                list[j].children[f].show = true;
                                                continue;
                                            }
                                        }
                                    }

                                }
                                continue;
                            }
                        }
                        
                    }
                    //console.log(list,'menu');
                    this.menuList = list;
                }else{
                    this.$message('侧边栏权限获取失败！')
                }
            })
        },
        Navigator(path){
            
            if(path&&isNaN(path)&&path!=this.$route.name) this.$router.push(path);
        },
        handleOpen(index,indexpath){
            //console.log(index,indexpath);
            if(indexpath.length==1){
                this.firstOn = index;
            }else{
                this.firstOn = indexpath[0],
                this.twoOn = index;
            }
            
        },
        handleClose(index,indexpath){
            //console.log(index,indexpath);
            // if(indexpath.length==1){
            //     this.firstOn = '';
            //     this.twoOn = '';
            // }
            
        },
    }
}
</script>