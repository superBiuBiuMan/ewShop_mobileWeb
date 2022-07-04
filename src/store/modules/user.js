
import {reqListCart} from "@/api/shopcart";

const state = {
    //用户token
    Authorization:getToken(),
    //用户购物车数量
    amountCarts:0,
};

const mutations = {
    /* 设置token */
    SET_TOKEN(state,tokenValue){
        state.Authorization = tokenValue;
    },
    /* 设置购物车商品数量 */
    SET_CAR_NUM(state,value){
        //也有可能是负数
        state.amountCarts+=value;
    },
    /* 初始化设置 */
    SET_CAR_NUM_INIT(state,value){
        state.amountCarts = value;
    }
};

const actions = {
    /* 设置token */
    setToken({commit},value){
        commit("SET_TOKEN",value);
    },
    /* 请求设置购物车进而获取商品数量,初始化的时候 */
    setReqCarNum({commit}){
        reqListCart().then(res=>{
            commit("SET_CAR_NUM_INIT",res.data.length);
        })
    },
    /* 设置购物车商品数量 */
    setCarNum({commit},value){
        commit("SET_CAR_NUM",value);
    },
};

const getters = {

};
function getToken(){
    return window.localStorage.getItem('EWSHOPAUTHORIZATION');
}
export default {
    state,
    mutations,
    actions,
    getters,
}