//引入fetch.js文件
import { fetch } from './fetch'
//定义获取数据的函数getData(),其中url,type,data对应fetch(config)中的config
export function getData({url,type,data,loading}) {
//如果type为空，默认为get方法
    if(type&&(type.toUpperCase() == 'POST')){
      return fetch({
        url: url,
        method: type||'POST',
        data: data||{},
        loading:loading==false?false:true
      })
    }
    return fetch({
      url: url,
      method: type||'GET',
      params: data||{},
      loading:loading==false?false:true
    })
}

