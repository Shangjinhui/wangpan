<template>
<!-- 暂时没用 -->
<div class="main bgf7f8f9">
    <div class="bgfff h-con">
        <div class="h286 pt44 pl68 bt-eaebef fsize14 col333">
            <p class="f-pf1 cursor"><i class="el-icon-arrow-left"></i>返回</p>
            <p class="fsize24 f-pf2 mt30 pl40 fweight600">新增用户</p>
            <div class="flex flex-wrap">
                <div class="flex mt24 pl40 mr40">
                    <p class="col57 mr28 f-pf1">用户名称</p>
                    <input class="wid360 h40 fsize14 col333 bor-rad4 bor-c4c7cc pl20 pr20" type="text" placeholder="File name File name File name File name">
                </div>
                <div class="flex mt24 pl40 mr40">
                    <p class="col57 mr28 f-pf1">所属用户组</p>
                    <input class="wid360 h40 fsize14 col333 bor-rad4 bor-c4c7cc pl20 pr20" type="text" placeholder="File name File name File name File name">
                </div>
                <div class="flex mt24 pl40 mr40">
                    <p class="col57 mr28 f-pf1">用户邮箱</p>
                    <input class="wid360 h40 fsize14 col333 bor-rad4 bor-c4c7cc pl20 pr20" type="text" placeholder="File name File name File name File name">
                </div>
                <div class="flex mt24 pl40 mr40">
                    <p class="col57 mr28 f-pf1">用户地区</p>
                    <input class="wid360 h40 fsize14 col333 bor-rad4 bor-c4c7cc pl20 pr20" type="text" placeholder="File name File name File name File name">
                </div>
            </div>
            
        </div>

        <div class="pl108 pr68 pt28 pb20 col333 fsize14 bt-eaebef">
            <p>用户权限</p>
            <div class="flex-end mt26">
                <p class="mr48">查看权限</p>
                <p>下载权限</p>
            </div>
            <!-- 层1 -->
            <ul class="mt30">
                <el-checkbox-group v-model="choosed">
                    <li class="mb20 pr10" v-for="(item,index) in levelList" :key="index">
                        <div class="flex cursor" @click="open">
                            <i :class="item.open?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
                            <img src="@/assets/img/directory.png" alt="">
                            <p class="mr20 ml16 fsize14">{{item.title}}</p>
                            <div class="flex-son bt-cd-dash mr20"></div>
                            <el-checkbox class="mr83" label="1"><br/></el-checkbox>
                            <el-checkbox label="1"><br/></el-checkbox>
                        </div>
                        <!-- 层2 -->
                        <ul class="pl20" v-if="item.children&&item.open"> 
                            <el-checkbox-group v-model="choosed">
                                <li class="mb10" v-for="(item2,index2) in item.children" :key="index2">
                                    <div class="flex cursor bl-cd pl10" @click="open">
                                        <i :class="item2.open?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
                                        <img src="@/assets/img/folder.png" alt="">
                                        <p class="mr20 ml16 fsize14">{{item2.title}}</p>
                                        <div class="flex-son bt-cd-dash mr20"></div>
                                        <el-checkbox class="mr83" label="1"><br/></el-checkbox>
                                        <el-checkbox label="1"><br/></el-checkbox>
                                    </div>
                                    <!-- 层3 -->
                                    <ul class="pl20" v-if="item2.children&&item2.open">
                                        <el-checkbox-group v-model="choosed">
                                            <li class="mb10" v-for="(item3,index3) in item2.children" :key="index3">
                                                <div class="flex cursor bl-cd pl10" @click="open">
                                                    <i :class="item3.open?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
                                                    <img src="@/assets/img/folder.png" alt="">
                                                    <p class="mr20 ml16 fsize14">{{item3.title}}</p>
                                                    <div class="flex-son bt-cd-dash mr20"></div>
                                                    <el-checkbox class="mr83" label="1"><br/></el-checkbox>
                                                    <el-checkbox label="1"><br/></el-checkbox>
                                                </div>
                                                <!-- 层4 -->
                                                <ul class="pl20" v-if="item3.children&&item3.open">
                                                    
                                                </ul>
                                            </li>
                                        </el-checkbox-group>
                                    </ul>
                                </li>
                            </el-checkbox-group>
                        </ul>
                    </li>
                </el-checkbox-group>
                
            </ul>
            <el-pagination
            @current-change="changePage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="100">
            </el-pagination>
        </div>
        <div class="flex-end pt30 pr68 ">
            <div class="wid64 lh30 center bgcf1342 colfff bor-rad4 cursor">确定</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
	components:{},
	data(){
		return {
            id:'',
			levelList:[
            ],
            choosed:[1],          //第一层选中的
		}
    },
    mounted(){
        this.id = this.$route.query.id;
    },
    methods:{
        open(){

        },
        changePage(page){

        }
    }
}
</script>