<template>
<div class="main bgf7f8f9">
    <div class="bgfff h-con">
        <div class="pt44 pl68 fsize14 col333">
            <p class="f-pf1 cursor" @click="toBack"><i class="el-icon-arrow-left"></i>返回</p>
            <p class="fsize24 f-pf2 mt30 pl40 fweight600">修改用户组权限<span class="fsize16 ml5">({{name}})</span></p>
        </div>

        <div class="pl108 pr68 pb20 col333 fsize14 bt-eaebef">
            <div class="flex-end mt26">
                <p class="mr48">查看权限</p>
                <p>下载权限</p>
            </div>
            <!-- 目录6层 -->

            <!-- 层1 -->
            <ul class="mt30">
                    <li class="mb20 pr10" v-for="(item,index) in list" :key="index">
                        <div class="flex cursor" @click="open1(item.lroot,item.children,item.open,item.id,item.isDir,index)">
                            <i v-if="item.isDir==1" :class="item.children?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
                            <img :src="item.isDir==1?wenjianjia:wenjian" alt="">
                            <p class="mr20 ml16 fsize14">{{item.name}}</p>
                            <div class="flex-son bt-cd-dash mr20"></div>
                            <div @click.stop>
                                <el-checkbox class="mr83" :value="item.lroot" @change="checked=>changeCheck(checked,item.lroot,index,1)"><br/></el-checkbox>
                                <el-checkbox :value="item.droot" @change="checked=>changeCheck(checked,item.droot,index,2)"><br/></el-checkbox>
                            </div>
                            
                        </div>
                        <!-- 层2 -->
                        <ul class="pl20" v-if="item.children&&item.open"> 
                                <li class="mb10" v-for="(item2,index2) in item.children" :key="index2">
                                    <div class="flex cursor bl-cd" :class="item2.isDir==1?'pl10':'pl28'" @click="open2(item2.lroot,item2.children,item2.open,item2.id,item2.isDir,index,index2)">
                                        <i v-if="item2.isDir==1" :class="item2.children?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
                                        <img :src="item2.isDir==1?wenjianjia:wenjian" alt="">
                                        <p class="mr20 ml16 fsize14">{{item2.name}}</p>
                                        <div class="flex-son bt-cd-dash mr20"></div>
                                        <div @click.stop>
                                            <el-checkbox class="mr83" :value="item2.lroot" @change="checked=>changeCheck2(checked,item2.lroot,index,index2,1)"><br/></el-checkbox>
                                            <el-checkbox :value="item2.droot" @change="checked=>changeCheck2(checked,item2.droot,index,index2,2)"><br/></el-checkbox>
                                        </div>
                                        
                                    </div>
                                    <!-- 层3 -->
                                    <ul class="pl20" v-if="item2.children&&item2.open">
                                            <li class="mb10" v-for="(item3,index3) in item2.children" :key="index3">
                                                <div class="flex cursor bl-cd" :class="item3.isDir==1?'pl10':'pl28'" @click="open3(item3.lroot,item3.children,item3.open,item3.id,item3.isDir,index,index2,index3)">
                                                    <i v-if="item3.isDir==1" :class="item3.children?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
                                                    <img :src="item3.isDir==1?wenjianjia:wenjian" alt="">
                                                    <p class="mr20 ml16 fsize14">{{item3.name}}</p>
                                                    <div class="flex-son bt-cd-dash mr20"></div>
                                                    <div @click.stop>
                                                        <el-checkbox class="mr83" :value="item3.lroot" @change="checked=>changeCheck3(checked,item3.lroot,index,index2,index3,1)"><br/></el-checkbox>
                                                        <el-checkbox :value="item3.droot" @change="checked=>changeCheck3(checked,item3.droot,index,index2,index3,2)"><br/></el-checkbox>
                                                    </div>
                                                    
                                                </div>
                                                <!-- 层4 -->
                                                <ul class="pl20" v-if="item3.children&&item3.open">
                                                    <li class="mb10" v-for="(item4,index4) in item3.children" :key="index4">
                                                        <div class="flex cursor bl-cd" :class="item4.isDir==1?'pl10':'pl28'" @click="open4(item4.lroot,item4.children,item4.open,item4.id,item4.isDir,index,index2,index3,index4)">
                                                            <i v-if="item4.isDir==1" :class="item4.children?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
                                                            <img :src="item4.isDir==1?wenjianjia:wenjian" alt="">
                                                            <p class="mr20 ml16 fsize14">{{item4.name}}</p>
                                                            <div class="flex-son bt-cd-dash mr20"></div>
                                                            <div @click.stop>
                                                                <el-checkbox class="mr83" :value="item4.lroot" @change="checked=>changeCheck4(checked,item4.lroot,index,index2,index3,index4,1)"><br/></el-checkbox>
                                                                <el-checkbox :value="item4.droot" @change="checked=>changeCheck4(checked,item4.droot,index,index2,index3,index4,2)"><br/></el-checkbox>
                                                            </div>
                                                            
                                                        </div>
                                                        <!-- 层5 -->
                                                        <ul class="pl20" v-if="item4.children&&item4.open">
                                                            <li class="mb10" v-for="(item5,index5) in item4.children" :key="index5">
                                                                <div class="flex cursor bl-cd" :class="item5.isDir==1?'pl10':'pl28'" @click="open5(item5.lroot,item5.children,item5.open,item5.id,item5.isDir,index,index2,index3,index4,index5)">
                                                                    <i v-if="item5.isDir==1" :class="item5.children?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
                                                                    <img :src="item5.isDir==1?wenjianjia:wenjian" alt="">
                                                                    <p class="mr20 ml16 fsize14">{{item5.name}}</p>
                                                                    <div class="flex-son bt-cd-dash mr20"></div>
                                                                    <div @click.stop>
                                                                        <el-checkbox class="mr83" :value="item5.lroot" @change="checked=>changeCheck5(checked,item5.lroot,index,index2,index3,index4,index5,1)"><br/></el-checkbox>
                                                                        <el-checkbox :value="item5.droot" @change="checked=>changeCheck5(checked,item5.droot,index,index2,index3,index4,index5,2)"><br/></el-checkbox>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <!-- 层6 -->
                                                                <ul class="pl20" v-if="item5.children&&item5.open">
                                                                    <li class="mb10" v-for="(item6,index6) in item5.children" :key="index6">
                                                                        <div class="flex cursor bl-cd" :class="item6.isDir==1?'pl10':'pl28'">
                                                                            <i v-if="item6.isDir==1" :class="item6.children?'el-icon-caret-bottom':'el-icon-caret-right'"></i>
                                                                            <img :src="item6.isDir==1?wenjianjia:wenjian" alt="">
                                                                            <p class="mr20 ml16 fsize14">{{item6.name}}</p>
                                                                            <div class="flex-son bt-cd-dash mr20"></div>
                                                                            <div @click.stop>
                                                                                <el-checkbox class="mr83" :value="item6.lroot" @change="checked=>changeCheck6(checked,item6.lroot,index,index2,index3,index4,index5,index6,1)"><br/></el-checkbox>
                                                                                <el-checkbox :value="item6.droot" @change="checked=>changeCheck6(checked,item6.droot,index,index2,index3,index4,index5,index6,2)"><br/></el-checkbox>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                        <!--  -->
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                    </ul>
                                </li>
                        </ul>
                    </li>              
            </ul>
            <!-- <el-pagination
            @current-change="changePage"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="100">
            </el-pagination> -->
        </div>
        <div class="flex-end pt30 pr68 ">
            <div class="wid64 lh30 center bgcf1342 colfff bor-rad4 cursor f-yahei" @click="Confirm">确定</div>
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
            name:'',
			wenjianjia:require('@/assets/img/directory.png'),
            wenjian:require('@/assets/img/folder.png'),
		    list:[
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
		}
    },
     mounted(){
        this.id = this.$route.query.id;
        this.name = this.$route.query.name;
        this.getRootList();
    },
    methods:{
       
        // 一层数据
        getRootList(){
            this.$fetch({
                url:'admin/admin_user/site_purview',
                data:{
                    dirId:0,
                    id:this.id
                }
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    let list = res.data.data.list;
                    for(let i=0;i<list.length;i++){
                        if(list[i].purview==1){
                            list[i].lroot = true;
                        }else if(list[i].purview==2){
                            list[i].lroot = true;
                            list[i].droot = true;
                        }
                    }
                    this.list = res.data.data.list;
                }else{
                    this.$message(res.data.msg);
                }
            })
        },
        //二层数据
         open1(lroot,children,open,id,dir,ind){
            if(dir==1){
                if(open){       //关闭
                    let list = [...this.list];
                    list[ind].open = false;
                    this.list = list;
                }else{      //打开
                    if(children&&children.length>0){
                        let list = [...this.list];
                        list[ind].open = true;
                        this.list = list;
                    }else{
                        this.$fetch({
                            url:'admin/admin_user/site_purview',
                            data:{
                                dirId:id,
                                id:this.id
                            }
                        }).then(res=>{
                            if(res.data.returnCode=='0000'){
                                let list = [...this.list],data = res.data.data.list;
                                list[ind].children = data;
                                if(!lroot){
                                    for(let i=0;i<data.length;i++){
                                        list[ind].children[i].lroot = false;
                                        list[ind].children[i].droot = false;
                                    }
                                }else{
                                    for(let i=0;i<data.length;i++){
                                        if(data[i].purview==1){
                                            list[ind].children[i].lroot = true;
                                        }else if(data[i].purview==2){
                                            list[ind].children[i].lroot = true;
                                            list[ind].children[i].droot = true;
                                        }
                                    }
                                }
                                
                                list[ind].open = true;
                                this.list = list;
                            }else{
                                this.$message(res.data.msg);
                            }
                        })
                    }
                }
                
            }
            
        },
        //三层数据
        open2(lroot,children,open,id,dir,ind,ind2){
            if(dir==1){
                if(open){       //关闭
                    let list = [...this.list];
                    list[ind].children[ind2].open = false;
                    this.list = list;
                }else{      //打开
                    if(children&&children.length>0){
                        let list = [...this.list];
                        list[ind].children[ind2].open = true;
                        this.list = list;
                    }else{
                        this.$fetch({
                            url:'admin/admin_user/site_purview',
                            data:{
                                dirId:id,
                                id:this.id
                            }
                        }).then(res=>{
                            if(res.data.returnCode=='0000'){
                                let list = [...this.list],data = res.data.data.list;
                                list[ind].children[ind2].children = data;

                                if(!lroot){
                                    for(let i=0;i<data.length;i++){
                                        list[ind].children[ind2].children[i].lroot = false;
                                        list[ind].children[ind2].children[i].droot = false;
                                    }
                                }else{
                                    for(let i=0;i<data.length;i++){
                                        if(data[i].purview==1){
                                            list[ind].children[ind2].children[i].lroot = true;
                                        }else if(data[i].purview==2){
                                            list[ind].children[ind2].children[i].lroot = true;
                                            list[ind].children[ind2].children[i].droot = true;
                                        }
                                    }
                                }
                                

                                list[ind].children[ind2].open = true;
                                this.list = list;
                            }else{
                                this.$message(res.data.msg);
                            }
                        })
                    }
                }
                
            }
            
        },
        //四层数据
        open3(lroot,children,open,id,dir,ind,ind2,ind3){
            if(dir==1){
                if(open){       //关闭
                    let list = [...this.list];
                    list[ind].children[ind2].children[ind3].open = false;
                    this.list = list;
                }else{      //打开
                    if(children&&children.length>0){
                        let list = [...this.list];
                        list[ind].children[ind2].children[ind3].open = true;
                        this.list = list;
                    }else{
                        this.$fetch({
                            url:'admin/admin_user/site_purview',
                            data:{
                                dirId:id,
                                id:this.id
                            }
                        }).then(res=>{
                            if(res.data.returnCode=='0000'){
                                let list = [...this.list],data = res.data.data.list;
                                list[ind].children[ind2].children[ind3].children = data;
                                
                                if(!lroot){
                                    for(let i=0;i<data.length;i++){
                                        list[ind].children[ind2].children[ind3].children[i].lroot = false;
                                        list[ind].children[ind2].children[ind3].children[i].droot = false;
                                    }
                                }else{
                                    for(let i=0;i<data.length;i++){
                                        if(data[i].purview==1){
                                            list[ind].children[ind2].children[ind3].children[i].lroot = true;
                                        }else if(data[i].purview==2){
                                            list[ind].children[ind2].children[ind3].children[i].lroot = true;
                                            list[ind].children[ind2].children[ind3].children[i].droot = true;
                                        }
                                    }
                                }
                                

                                list[ind].children[ind2].children[ind3].open = true
                                this.list = list;
                            }else{
                                this.$message(res.data.msg);
                            }
                        })
                    }
                }
                
            }
            
        },
        //五层数据
        open4(lroot,children,open,id,dir,ind,ind2,ind3,ind4){
            if(dir==1){
                if(open){       //关闭
                    let list = [...this.list];
                    list[ind].children[ind2].children[ind3].children[ind4].open = false;
                    this.list = list;
                }else{      //打开
                    if(children&&children.length>0){
                        let list = [...this.list];
                        list[ind].children[ind2].children[ind3].children[ind4].open = true;
                        this.list = list;
                    }else{
                        this.$fetch({
                            url:'admin/admin_user/site_purview',
                            data:{
                                dirId:id,
                                id:this.id
                            }
                        }).then(res=>{
                            if(res.data.returnCode=='0000'){
                                let list = [...this.list],data = res.data.data.list;
                                list[ind].children[ind2].children[ind3].children[ind4].children = data;

                                if(!lroot){
                                    for(let i=0;i<data.length;i++){
                                        list[ind].children[ind2].children[ind3].children[ind4].children[i].lroot = false;
                                        list[ind].children[ind2].children[ind3].children[ind4].children[i].droot = false;
                                    }
                                }else{
                                    for(let i=0;i<data.length;i++){
                                        if(data[i].purview==1){
                                            list[ind].children[ind2].children[ind3].children[ind4].children[i].lroot = true;
                                        }else if(data[i].purview==2){
                                            list[ind].children[ind2].children[ind3].children[ind4].children[i].lroot = true;
                                            list[ind].children[ind2].children[ind3].children[ind4].children[i].droot = true;
                                        }
                                    }
                                }
                                

                                list[ind].children[ind2].children[ind3].children[ind4].open = true;
                                this.list = list;
                            }else{
                                this.$message(res.data.msg);
                            }
                        })
                    }
                }
                
            }
            
        },
        //六层数据
        open5(lroot,children,open,id,dir,ind,ind2,ind3,ind4,ind5){
            if(dir==1){
                if(open){       //关闭
                    let list = [...this.list];
                    list[ind].children[ind2].children[ind3].children[ind4].children[ind5].open = false;
                    this.list = list;
                }else{      //打开
                    if(children&&children.length>0){
                        let list = [...this.list];
                        list[ind].children[ind2].children[ind3].children[ind4].children[ind5].open = true;
                        this.list = list;
                    }else{
                        this.$fetch({
                            url:'admin/admin_user/site_purview',
                            data:{
                                dirId:id,
                                id:this.id
                            }
                        }).then(res=>{
                            if(res.data.returnCode=='0000'){
                                let list = [...this.list],data = res.data.data.list;
                                list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children = data;

                                if(!lroot){
                                    for(let i=0;i<data.length;i++){
                                        list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[i].lroot = false;
                                        list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[i].droot = false;
                                    }
                                }else{
                                    for(let i=0;i<data.length;i++){
                                        if(data[i].purview==1){
                                            list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[i].lroot = true;
                                        }else if(data[i].purview==2){
                                            list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[i].lroot = true;
                                            list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[i].droot = true;
                                        }
                                    }
                                }
                                

                                list[ind].children[ind2].children[ind3].children[ind4].children[ind5].open = true;
                                this.list = list;
                            }else{
                                this.$message(res.data.msg);
                            }
                        })
                    }
                }
                
            }
            
        },
        //一级操作
        changeCheck(o,checked,ind,root){
            let list = [...this.list];
            if(!checked){     //选中
                if(root==2){ //下载权限 (判断查看权限)
                    if(list[ind].lroot){    //已选查看权限
                        list[ind].droot = true;
                    }else{                 //没选查看权限，不能选下载权限
                        list[ind].droot = false;
                    }
                }else{       //查看权限（判断上级查看权限）-----------------------
                    list[ind].lroot = true;
                }
            }else{    //取消
                if(root==1){  //取消查看权限（取消所有子集的查看和下载权限）；----------------------
                    list[ind].lroot = false;
                    if(list[ind].droot){
                        list[ind].droot = false;
                    }
                    //处理二级
                    let chil1 = list[ind].children;
                    if(chil1){
                        for(let i=0;i<chil1.length;i++){
                            list[ind].children[i].lroot = false;
                            list[ind].children[i].droot = false;
                            //处理三级
                            let chil2 = chil1[i].children;
                            if(chil2){
                                for(let j=0;j<chil2.length;j++){
                                    list[ind].children[i].children[j].lroot = false;
                                    list[ind].children[i].children[j].droot = false;
                                    //处理四级
                                    let chil3 = chil2[j].children;
                                    if(chil3){
                                        for(let k=0;k<chil3.length;k++){
                                            list[ind].children[i].children[j].children[k].lroot = false;
                                            list[ind].children[i].children[j].children[k].droot = false;
                                            //处理五级
                                            let chil4 = chil3[k].children;
                                            if(chil4){
                                                for(let m=0;m<chil4.length;m++){
                                                    list[ind].children[i].children[j].children[k].children[m].lroot = false;
                                                    list[ind].children[i].children[j].children[k].children[m].droot = false;
                                                    //处理六级
                                                    let chil5 = chil4[m].children;
                                                    if(chil5){
                                                        for(let n=0;n<chil5.length;n++){
                                                            list[ind].children[i].children[j].children[k].children[m].children[n].lroot = false;
                                                            list[ind].children[i].children[j].children[k].children[m].children[n].droot = false;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                }else{ //取消下载权限
                    list[ind].droot = false;
                }
            }
            this.list = list;
        },
        //二级操作
        changeCheck2(o,checked,ind,ind2,root){  //ind第一层下表
            let list = [...this.list];
            if(!checked){     //选中
                if(root==2){ //下载权限 (判断查看权限)
                    if(list[ind].children[ind2].lroot){    //已选查看权限
                        list[ind].children[ind2].droot = true;
                    }else{                 //没选查看权限，不能选下载权限
                        list[ind].children[ind2].droot = false;
                    }
                }else{       //查看权限（判断上级查看权限）-----------------------
                    if(list[ind].lroot){
                        list[ind].children[ind2].lroot = true;
                    }else{
                        list[ind].children[ind2].lroot = false;
                    }
                    
                }
            }else{    //取消
                if(root==1){  //取消查看权限（取消所有子集的查看和下载权限）；----------------------
                    list[ind].children[ind2].lroot = false;
                    if(list[ind].children[ind2].droot){
                        list[ind].children[ind2].droot = false;
                    }
                    //处理三级
                    let chil2 = list[ind].children[ind2].children;
                    if(chil2){
                        for(let j=0;j<chil2.length;j++){
                            list[ind].children[ind2].children[j].lroot = false;
                            list[ind].children[ind2].children[j].droot = false;
                            //处理四级
                            let chil3 = chil2[j].children;
                            if(chil3){
                                for(let k=0;k<chil3.length;k++){
                                    list[ind].children[ind2].children[j].children[k].lroot = false;
                                    list[ind].children[ind2].children[j].children[k].droot = false;
                                    //处理五级
                                    let chil4 = chil3[k].children;
                                    if(chil4){
                                        for(let m=0;m<chil4.length;m++){
                                            list[ind].children[ind2].children[j].children[k].children[m].lroot = false;
                                            list[ind].children[ind2].children[j].children[k].children[m].droot = false;
                                            //处理六级
                                            let chil5 = chil4[m].children;
                                            if(chil5){
                                                for(let n=0;n<chil5.length;n++){
                                                    list[ind].children[ind2].children[j].children[k].children[m].children[n].lroot = false;
                                                    list[ind].children[ind2].children[j].children[k].children[m].children[n].droot = false;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                }else{ //取消下载权限
                    list[ind].children[ind2].droot = false;
                }
            }
            this.list = list;
        },
        //三级操作
        changeCheck3(o,checked,ind,ind2,ind3,root){  //ind第一层下表
            let list = [...this.list];
            if(!checked){     //选中
                if(root==2){ //下载权限 (判断查看权限)
                    if(list[ind].children[ind2].children[ind3].lroot){    //已选查看权限
                        list[ind].children[ind2].children[ind3].droot = true;
                    }else{                 //没选查看权限，不能选下载权限
                        list[ind].children[ind2].children[ind3].droot = false;
                    }
                }else{       //查看权限（判断上级查看权限）-----------------------
                    if(list[ind].children[ind2].lroot){
                        list[ind].children[ind2].children[ind3].lroot = true;
                    }else{
                        list[ind].children[ind2].children[ind3].lroot = false;
                    }
                    
                }
            }else{    //取消
                if(root==1){  //取消查看权限（取消所有子集的查看和下载权限）；----------------------
                    list[ind].children[ind2].children[ind3].lroot = false;
                    if(list[ind].children[ind2].children[ind3].droot){
                        list[ind].children[ind2].children[ind3].droot = false;
                    }
                     //处理四级
                    let chil3 = list[ind].children[ind2].children[ind3].children;
                    if(chil3){
                        for(let k=0;k<chil3.length;k++){
                            list[ind].children[ind2].children[ind3].children[k].lroot = false;
                            list[ind].children[ind2].children[ind3].children[k].droot = false;
                            //处理五级
                            let chil4 = chil3[k].children;
                            if(chil4){
                                for(let m=0;m<chil4.length;m++){
                                    list[ind].children[ind2].children[ind3].children[k].children[m].lroot = false;
                                    list[ind].children[ind2].children[ind3].children[k].children[m].droot = false;
                                    //处理六级
                                    let chil5 = chil4[m].children;
                                    if(chil5){
                                        for(let n=0;n<chil5.length;n++){
                                            list[ind].children[ind2].children[ind3].children[k].children[m].children[n].lroot = false;
                                            list[ind].children[ind2].children[ind3].children[k].children[m].children[n].droot = false;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                }else{ //取消下载权限
                    list[ind].children[ind2].children[ind3].droot = false;
                }
            }
            this.list = list;
        },
        //四级操作
        changeCheck4(o,checked,ind,ind2,ind3,ind4,root){  //ind第一层下表
            let list = [...this.list];
            if(!checked){     //选中
                if(root==2){ //下载权限 (判断查看权限)
                    if(list[ind].children[ind2].children[ind3].children[ind4].lroot){    //已选查看权限
                        list[ind].children[ind2].children[ind3].children[ind4].droot = true;
                    }else{                 //没选查看权限，不能选下载权限
                        list[ind].children[ind2].children[ind3].children[ind4].droot = false;
                    }
                }else{       //查看权限（判断上级查看权限）-----------------------
                    if(list[ind].children[ind2].children[ind3].lroot){
                        list[ind].children[ind2].children[ind3].children[ind4].lroot = true;
                    }else{
                        list[ind].children[ind2].children[ind3].children[ind4].lroot = false;
                    }
                    
                }
            }else{    //取消
                if(root==1){  //取消查看权限（取消所有子集的查看和下载权限）；----------------------
                    list[ind].children[ind2].children[ind3].children[ind4].lroot = false;
                    if(list[ind].children[ind2].children[ind3].children[ind4].droot){
                        list[ind].children[ind2].children[ind3].children[ind4].droot = false;
                    }
                    //处理五级
                    let chil4 = list[ind].children[ind2].children[ind3].children[ind4].children;
                    if(chil4){
                        for(let m=0;m<chil4.length;m++){
                            list[ind].children[ind2].children[ind3].children[ind4].children[m].lroot = false;
                            list[ind].children[ind2].children[ind3].children[ind4].children[m].droot = false;
                            //处理六级
                            let chil5 = chil4[m].children;
                            if(chil5){
                                for(let n=0;n<chil5.length;n++){
                                    list[ind].children[ind2].children[ind3].children[ind4].children[m].children[n].lroot = false;
                                    list[ind].children[ind2].children[ind3].children[ind4].children[m].children[n].droot = false;
                                }
                            }
                        }
                    }
                    
                }else{ //取消下载权限
                    list[ind].children[ind2].children[ind3].children[ind4].droot = false;
                }
            }
            this.list = list;
        },
        //五级操作
        changeCheck5(o,checked,ind,ind2,ind3,ind4,ind5,root){  //ind第一层下表
            let list = [...this.list];
            if(!checked){     //选中
                if(root==2){ //下载权限 (判断查看权限)
                    if(list[ind].children[ind2].children[ind3].children[ind4].children[ind5].lroot){    //已选查看权限
                        list[ind].children[ind2].children[ind3].children[ind4].children[ind5].droot = true;
                    }else{                 //没选查看权限，不能选下载权限
                        list[ind].children[ind2].children[ind3].children[ind4].children[ind5].droot = false;
                    }
                }else{       //查看权限（判断上级查看权限）-----------------------
                    if(list[ind].children[ind2].children[ind3].children[ind4].lroot){
                        list[ind].children[ind2].children[ind3].children[ind4].children[ind5].lroot = true;
                    }else{
                        list[ind].children[ind2].children[ind3].children[ind4].children[ind5].lroot = false;
                    }
                    
                }
            }else{    //取消
                if(root==1){  //取消查看权限（取消所有子集的查看和下载权限）；----------------------
                    list[ind].children[ind2].children[ind3].children[ind4].children[ind5].lroot = false;
                    if(list[ind].children[ind2].children[ind3].children[ind4].children[ind5].droot){
                        list[ind].children[ind2].children[ind3].children[ind4].children[ind5].droot = false;
                    }
                    //处理六级
                    let chil5 = list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children;
                    if(chil5){
                        for(let n=0;n<chil5.length;n++){
                            list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[n].lroot = false;
                            list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[n].droot = false;
                        }
                    }
                    
                }else{ //取消下载权限
                    list[ind].children[ind2].children[ind3].children[ind4].children[ind5].droot = false;
                }
            }
            this.list = list;
        },
        //六级操作
        changeCheck6(o,checked,ind,ind2,ind3,ind4,ind5,ind6,root){  //ind第一层下表
            let list = [...this.list];
            if(!checked){     //选中
                if(root==2){ //下载权限 (判断查看权限)
                    if(list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[ind6].lroot){    //已选查看权限
                        list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[ind6].droot = true;
                    }else{                 //没选查看权限，不能选下载权限
                        list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[ind6].droot = false;
                    }
                }else{       //查看权限（判断上级查看权限）-----------------------
                    if(list[ind].children[ind2].children[ind3].children[ind4].children[ind5].lroot){
                        list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[ind6].lroot = true;
                    }else{
                        list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[ind6].lroot = false;
                    }
                    
                }
            }else{    //取消
                if(root==1){  //取消查看权限（取消所有子集的查看和下载权限）；----------------------
                    list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[ind6].lroot = false;
                    if(list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[ind6].droot){
                        list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[ind6].droot = false;
                    }
                    
                    
                }else{ //取消下载权限
                    list[ind].children[ind2].children[ind3].children[ind4].children[ind5].children[ind6].droot = false;
                }
            }
            this.list = list;
        },
        // changeCheck(checked,id,root){
        //     let purview = this.purview,arr = this.purview.map(item=>item.id),index = arr.indexOf(id);
        //     console.log(checked,id,root)
        //     if(checked){
        //         if(index==-1){
        //             purview.push({id,status:root});
        //         }else{
        //             //判断是否已选过查看权限
        //             if(purview[index].status==3){
        //                 purview[index].status = '2';
        //             }else{
        //                 purview[index].status = root;
        //             }
                    
        //         }
        //         this.purview = purview;
        //     }else{
        //         if(root==1){
        //             //查看权限取消，判断是否有下载权限，有则赋值为3
        //             if(purview[index].status==2){
        //                 purview[index].status = '3';
        //             }else{
        //                 purview.splice(index,1);
        //             }
                    
        //         }else{//
        //             purview[index].status = '1';
        //         }
                
        //         this.purview = purview;
        //     }

        //     //console.log(this.list,'list')
        //     let list = [...this.list];
        //     this.list = list;
        // },
        toBack(){
            this.$router.back(-1);
        },
        Confirm(){
            //循环6层查找权限
            let list = this.list,purview=[];
            for(let i=0;i<list.length;i++){
                if(list[i].droot){
                    purview.push({id:list[i].id,status:2});
                }else if(list[i].lroot){
                    purview.push({id:list[i].id,status:1});
                }else{
                    purview.push({id:list[i].id,status:0});
                }
                //2
                let chil2 = list[i].children;
                if(chil2){
                    for(let j=0;j<chil2.length;j++){
                        if(chil2[j].droot){
                            purview.push({id:chil2[j].id,status:2});
                        }else if(chil2[j].lroot){
                            purview.push({id:chil2[j].id,status:1});
                        }else{
                            purview.push({id:chil2[j].id,status:0});
                        }
                        //3
                        let chil3 = chil2[j].children;
                        if(chil3){
                            for(let k=0;k<chil3.length;k++){
                                if(chil3[k].droot){
                                    purview.push({id:chil3[k].id,status:2});
                                }else if(chil3[k].lroot){
                                    purview.push({id:chil3[k].id,status:1});
                                }else{
                                    purview.push({id:chil3[k].id,status:0});
                                }
                                //4
                                let chil4 = chil3[k].children;
                                if(chil4){
                                    for(let m=0;m<chil4.length;m++){
                                        if(chil4[m].droot){
                                            purview.push({id:chil4[m].id,status:2});
                                        }else if(chil4[k].lroot){
                                            purview.push({id:chil4[m].id,status:1});
                                        }else{
                                            purview.push({id:chil4[m].id,status:0});
                                        }
                                        //5
                                        let chil5 = chil4[m].children;
                                        if(chil5){
                                            for(let n=0;n<chil5.length;n++){
                                                if(chil5[n].droot){
                                                    purview.push({id:chil5[n].id,status:2});
                                                }else if(chil5[k].lroot){
                                                    purview.push({id:chil5[n].id,status:1});
                                                }else{
                                                    purview.push({id:chil5[n].id,status:0});
                                                }
                                                //6
                                                let chil6 = chil5[n].children;
                                                if(chil6){
                                                    for(let l=0;l<chil6.length;l++){
                                                        if(chil6[l].droot){
                                                            purview.push({id:chil6[l].id,status:2});
                                                        }else if(chil6[k].lroot){
                                                            purview.push({id:chil6[l].id,status:1});
                                                        }else{
                                                            purview.push({id:chil6[l].id,status:0});
                                                        }
                                                        //7
                                                        
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            //console.log(purview,'purview');
            //return;
            let data = {
                id:this.id,
                purview:purview,
            }
            // console.log(data);
            // return;
            this.$fetch({
                url:'admin/admin_user/edit_group',
                type:'post',
                data
            }).then(res=>{
                if(res.data.returnCode=='0000'){
                    this.$message({type:'success',message:'用户组编辑成功'});
                    this.$router.back(-1);
                }else{
                    this.$message(res.data.msg);
                }
            })
        }
    }
}
</script>