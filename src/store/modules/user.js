
const state = {
    //用户token
    Authorization:""
};

const mutations = {
    /* 设置token */
    SET_TOKEN(state,tokenValue){
        state.Authorization = tokenValue;
    }
};

const actions = {
    setToken({commit},value){
        commit("SET_TOKEN",value);
    }
};

const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters,
}