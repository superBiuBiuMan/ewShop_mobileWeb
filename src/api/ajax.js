import axios from "axios";
import nprogress from "nprogress";
import $store from "@/store/index";
import {
    Toast,
    Notify
} from "vant";
import "nprogress/nprogress.css";
const service = axios.create({
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 20000
})

//设置请求拦截器
service.interceptors.request.use((config) => {
    nprogress.start();
    //添加认证信息
    //注意,vuex刷新下就没有了,除非再次读取
    const token = $store.state.user.Authorization;//获取token
    if (token) {
        config.headers.Authorization = 'Bearer' + token;
    }
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
        //注册出现问题
        if(error.response.data.errors){
            // 获取对象所有的key值
            let AllKey = Object.keys(error.response.data.errors)
            if(AllKey.length){
                let message = error.response.data.errors[AllKey[0]][0];
                //不为空
                Notify({type: 'danger',message:'注册失败'+message});
            }else{
                Notify({type: 'danger',message:"操作失败,请检查网络或者参数是否正常!"});
            }
        }else{
            Notify({type: 'danger',message:"操作失败,请检查网络是否正常!"});
        }
        // if(Object.keys(error.response.data.errors)){
        //     Notify(error.response.data.errors[Object.keys(error.response.data.errors)[0]][0])
        // }
        // if (Object.keys(error.response.data.errors)[0]) {
        //     Notify(error.response.data.errors[Object.keys(error.response.data.errors)[0]][0])
        // }

        return Promise.reject(error);
    }
)

//暴露创建好后的axios实例
export default service;