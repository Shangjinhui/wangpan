import axios from 'axios'
import { Loading } from 'element-ui'
import router from '@/router/router';
import store from '@/store/index.js'
//console.log(process.env.NODE_ENV,'process.env.NODE_ENV')
//正式
// const baseURL = process.env.NODE_ENV === 'production' ? 'http://47.241.122.40/deli_netdisc/index.php/' : '/api';
// window.dl_q_baseURL = 'http://47.241.122.40/deli_netdisc/index.php/';
// window.dl_q_domain = 'http://47.241.122.40/';
// const baseURL = process.env.NODE_ENV === 'production' ? 'http://13.70.35.114:8001/index.php/' : '/api';
// window.dl_q_baseURL = 'http://13.70.35.114:8001/index.php/';
// window.dl_q_domain = 'http://13.70.35.114:8001/';
const baseURL = process.env.NODE_ENV === 'production' ? 'http://mcm.deliworld.com/api/index.php/' : '/api';
window.dl_q_baseURL = 'http://mcm.deliworld.com/api/index.php/';
// window.dl_q_domain = 'http://mcm.deliworld.com:8001/';
//测试
// const baseURL = process.env.NODE_ENV === 'production' ? 'http://demo.yunmofo.cn:8085/deli_netdisc/index.php/' : '/api';
// window.dl_q_baseURL = 'http://demo.yunmofo.cn:8085/deli_netdisc/index.php/';
// window.dl_q_domain = 'http://demo.yunmofo.cn:8085/';

// window.dl_q_file_download = 'https://api.zbox.filez.com/v2/api/file/content';

export function fetch(config) {
    //console.log(config,'config')

    return new Promise((resolve, reject) => {
        let Load = null;
        //ie会强制缓存没变化的接口，刷新也不行
        config.url += `?ie_cache=${Math.random()}`;

        if (config.loading) Load = Loading.service({ text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, .3)' })
        const instance = axios.create({
            baseURL: baseURL,
            //定义请求文件类型
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.tokenpc ? localStorage.tokenpc : '',
                'Platform': 2
            },
            timeout: 1200000,
        });
        //console.log(11111)
        //请求成功后执行的函数
        instance(config).then(res => {
            //console.log(res,'success')
            if (config.loading) Load.close();
            if (res.data.returnCode == '0014') {
                router.push('/login');
                store.commit('userInfo/SET_TOKEN', '');
                store.commit('userInfo/SET_USERINFO', {});
            }
            resolve(res);
            //失败后执行的函数
        }).catch(err => {
            console.log(err, 'error')
            if (config.loading) Load.close();
            reject(err);
        })
    });
}