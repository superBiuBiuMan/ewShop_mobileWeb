import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
const service = axios.create({
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 20000
})

//设置请求拦截器
service.interceptors.request.use((config)=>{
    nprogress.start();
    return config;
},(error)=>{

})

//设置响应拦截器
service.interceptors.response.use(
    (response)=>{
        nprogress.done();
        
        //返回数据
        return response.data;
    },
    (error)=>{
        nprogress.done();
        //返回错误,这里没有进行处理
        return error;
    }
)

//暴露创建好后的axios实例
export default service;