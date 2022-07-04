<template>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive :include="includeList">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  
  <nav>
    <router-link to="/" class="tab-bar-item">
      <div><i class="iconfont icon-shouyefill"></i></div>
      <div>首页</div>
    </router-link>

    <router-link to="/category" class="tab-bar-item">
      <div><i class="iconfont icon-yingyong"></i></div>
      <div>分类</div>
    </router-link>

    <router-link to="/shopcart" class="tab-bar-item">
      <div>
        <!-- 添加徽标 -->
        <van-badge :content="$store.state.user.amountCarts" max="99">
          <i class="iconfont icon-gouwuchekong"></i>
        </van-badge>
      </div>
      <div>购物车</div>
    </router-link>

    <router-link to="/user" class="tab-bar-item">
      <div><i class="iconfont icon-wode-wode"></i></div>
      <div>我的</div>
    </router-link>
  </nav>

 
  
</template>

<script>
import { onMounted, toRefs, reactive, watch } from "vue";
import { useStore } from "vuex";
import {useRoute} from "vue-router";
export default {
  name: "App",
  setup() {
    const $store = useStore(); //获取store仓库对象
    const route = useRoute();
    const state = reactive({
      includeList: [],
    });
    onMounted(() => {
      if ($store.state.user.Authorization) {
        //token存在,则获取购物车请求
        $store.dispatch("setReqCarNum");
      }
    });
    //监视路由的改变,如果改变了,添加进入
    watch(() => route,(newVal,oldVal)=>{
      if(newVal.meta.keepAlive && state.includeList.indexOf(newVal.name) === -1){
          state.includeList.push(newVal.name);
      }
    },{deep:true}) // 开启深度监听
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="less">
/* 引入默认样式 ,这样子全部都可以应用到这个样式 */
@import "./assets/css/base.css";
@import "./assets/css/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  // padding: 30px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eeeeee;
  box-shadow: 0 3px 1px 5px rgba(0, 0, 0, 0.1);
  .tab-bar-item {
    // 字体图标
    font-size: var(--font-size-self);
    height: 50px;
    text-align: center;

    div:first-child {
      margin-top: 4px;
      display: inline-block;
      vertical-align: middle;
    }
    div:last-child {
      margin-top: 4px;
    }
  }
  a {
    color: var(--color-text);
    font-size: var(--font-size-self);
    &.router-link-exact-active {
      color: var(--color-hight-text);
    }
  }
}
</style>
