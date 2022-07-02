import { createStore } from 'vuex'
import user from "./modules/user";
const state= {
};
const getters=  {
};
const mutations=  {
};
const actions=  {
};
export default createStore({
  state,
  mutations,
  actions,
  getters,
  //模块化
  modules: {
    user,
  }
})
