import axios from "axios";
import nprogress from "nprogress";
import {Toast,Notify} from "vant";
import "nprogress/nprogress.css";
const service = axios.create({
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 20000
})

//设置请求拦截器
service.interceptors.request.use((config) => {
    nprogress.start();
    return config;
}, (error) => {

})

//设置响应拦截器
service.interceptors.response.use(
    (response) => {
        nprogress.done();
        //返回数据
        return response.data;
    },
    (error) => {
        nprogress.done();

        Notify(error.response.data.errors[Object.keys(error.response.data.errors)[0]][0])
        throw new Error(error);
    }
)

//暴露创建好后的axios实例
export default service;