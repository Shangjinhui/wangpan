<template>
<div class="main bgf7f8f9">
    <div class="add-role bgfff h-con">
        <div class="h222 pt44 pl68 bt-eaebef fsize14 col333">
            <p class="f-pf1 cursor" @click="toBack"><i class="el-icon-arrow-left"></i>返回</p>
            <p class="fsize24 f-pf2 mt30 pl40 fweight600">{{id?'编辑角色':'新增角色'}}</p>
            <div class="flex mt28 pl40">
                <p class="col57 mr28 f-pf1">角色名称</p>
                <input class="wid360 h40 fsize14 col333 bor-rad4 bor-c4c7cc pl20 pr20" type="text" v-model="title" placeholder="File name File name File name File name">
            </div>
        </div>
        <div class="pl108 pr68 pt28 pb20 col333 fsize14 bt-eaebef">
            <p>用户组权限</p>
            <!-- 后台菜单层1 -->
            <ul class="mt66">
                <el-checkbox-group v-model="choosed">
                    <li class="mb20" v-for="(item,index) in levelList" :key="index">
                        <div class="flex cursor" @click="open(item.open,index)">
                            <i :class="item.open?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
                            <img src="@/assets/img/directory.png" alt="">
                            <p class="mr20 ml16 fsize14">{{item.title}}</p>
                            <div class="flex-son bt-cd-dash mr20"></div>
                            <el-checkbox :label="item.id" @change="checked=>changeCheck(checked,index)"><br/></el-checkbox>
                        </div>
                        <!-- 后台菜单层2 -->
                        <ul class="pl20" v-if="item.children&&item.open"> 
                            <el-checkbox-group v-model="choosed">
                                <li class="mb10" v-for="(item2,index2) in item.children" :key="index2">
                                    <div class="flex cursor bl-cd pl10">
                                        <i :class="item2.open?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
                                        <img src="@/assets/img/folder.png" alt="">
                                        <p class="mr20 ml16 fsize14">{{item2.title}}</p>
                                        <div class="flex-son bt-cd-dash mr20"></div>
                                        <el-checkbox :label="item2.id"><br/></el-checkbox>
                                    </div>
                                </li>
                            </el-checkbox-group>
                        </ul>
                    </li>
                </el-checkbox-group>
                
            </ul>
            <!-- <el-pagination
            @current-change="changePage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="100">
            </el-pagination> -->
        </div>
        <div class="flex-end pt30 pr68 ">
            <div class="wid64 lh30 center bgcf1342 colfff bor-rad4 cursor" @click="Confirm">确定</div>
        </div>
    </div>
</div>

</template>

<script>
export default {
	components:{},
	data(){
		return {
            id:'',             //角色编辑
            title:'',
            levelList:[
                // {
                //     id:1,
                //     type:'mulu',
                //     title:'Numbering machine',
                //     open:true,
                //     choosed:[],             //下层选中的
                //     children:[
                //         {
                //             id:1,
                //             type:'mulu',
                //             title:'Numbering machine',
                //             open:true,
                //             choosed:[],
                //             children:[
                //                 {
                //                     id:1,
                //                     type:'mulu',
                //                     title:'Numbering machine',
                //                     open:false,
                //                     choosed:[],
                //                 }
                //             ]
                //         }
                //     ]
                // },
                // {
                //     id:1,
                //     type:'mulu',
                //     title:'Numbering machine',
                //     open:false,
                //     choosed:[],             //下层选中的
                //     children:[
                //         {
                //             id:1,
                //             type:'mulu',
                //             title:'Numbering machine',
                //             open:false,
                //             choosed:[],
                //             children:[
                //                 {
                //                     id:1,
                //                     type:'mulu',
                //                     title:'Numbering machine',
                //                     open:false,
                //                     choosed:[],
                //                 }
                //             ]
                //         }
                //     ]
                // }
            ],
            choosed:[],          //第一层选中的
		}
    },
    mounted(){
        let id = this.$route.query.id;
        if(id){
            this.id = id;
            this.getEditData();
        }else{
            this.getRootList();
        }
    },
    methods:{
        getEditData(){
            this.$fetch({
                url:'admin/admin_member/group_info',
                data:{
                    id:this.id,
                }
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    let list = res.data.data.purviewList;
                    this.title = res.data.data.info.title;
                    //全部展开
                    for(let i=0;i<list.length;i++){
                        list[i].open = true;
                        //是否已选中
                        if(list[i].isChecked==1){
                            this.choosed.push(list[i].id)
                            let children = list[i].children;
                            if(children.length>0){
                                for(let j=0;j<children.length;j++){
                                    if(children[j].isChecked==1){
                                        this.choosed.push(children[j].id)
                                    }
                                }
                            }
                        }
                    }
                    this.levelList = list;
				}else{
					this.$message(res.data.msg);
				}
            })
        },
        getRootList(){
            this.$fetch({
                url:'admin/admin_member/purview_list'
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    let list = res.data.data.purviewList;
                    //全部展开
                    for(let i=0;i<list.length;i++){
                        list[i].open = true;
                    }
                    this.levelList = list;
				}else{
					this.$message(res.data.msg);
				}
            })
        },
        open(o,ind){
            this.levelList[ind].open = o?false:true;
        },
        changeCheck(val,ind){
            //console.log(ind,val,this.choosed,'---------')
            //选择一级时判断是否有二级，有的话选中
            let children = this.levelList[ind].children;
            //console.log(children,'----')
            if(children.length>0){
                let choosed = this.choosed;
                if(val){
                    for(let i=0;i<children.length;i++){
                        if(choosed.indexOf(children[i].id)==-1){
                            choosed.push(children[i].id);
                        }
                        
                    }
                    this.choosed = choosed;
                }else{
                    for(let i=0;i<children.length;i++){
                        let index = choosed.indexOf(children[i].id);
                        if(index!=-1){
                            choosed.splice(index,1);
                        }
                    }
                    this.choosed =choosed;
                }
                
            }
        },
        Confirm(){
            if(!this.title){
                this.$message('请输入角色名称！');
                return;
            }
            let ids = this.choosed.join(',')
            //console.log(ids);
            if(this.id){
                //编辑角色
                this.$fetch({
                    url:'admin/admin_member/edit_admin_group',
                    type:'post',
                    data:{
                        id:this.id,
                        title:this.title,
                        purview:ids
                    }
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        this.$message({type:'success',message:'编辑成功'});
                        this.$router.back(-1);
                    }else{
                        this.$message(res.data.msg);
                    }
                })
            }else{
                //新增角色
                this.$fetch({
                    url:'admin/admin_member/add_admin_group',
                    type:'post',
                    data:{
                        title:this.title,
                        purview:ids
                    }
                }).then(res=>{
                    if(res.data.returnCode=='0000'){
                        this.$message({type:'success',message:'添加成功'});
                        this.$router.back(-1);
                    }else{
                        this.$message(res.data.msg);
                    }
                })
            }
            
        },
        toBack(){
            this.$router.back(-1);
        }
    }
}
</script>