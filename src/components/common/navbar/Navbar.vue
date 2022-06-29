<template>
  <div class="navbar-content">
    <div class="bar-left" @click="goBack">
      <slot name="left">
        <img src="@/assets/image/leftArrow.png" />
      </slot>
    </div>
    <div class="bar-center">
      <slot> 图书兄弟 </slot>
    </div>
    <div class="bar-right">
      <slot name="right"> </slot>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Navbar",
  setup() {
    let $router = useRouter();
    function goBack() {
      // 不可以这样子  useRouter().go(-1);
      $router.go(-1); //返回上一个路由
    }
    return {
      goBack,
    };
  },
};
</script>

<style lang="less" scoped>
.navbar-content {
  background-color: #4bae81;
  width: 100vw;
  height: 45px;
  line-height: 45px;
  text-align: center;
  display: flex;
  position: fixed;
  box-shadow: 0 -4px 1px 5px rgba(0,0,0,0.1);
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  .bar-left {
    img {
      width: 45px;
      padding: 10px;
    }
  }
  .bar-left,
  .bar-right {
    width: 60px;
  }
  .bar-center {
    //设置增长系数为1
    flex: 1;
    color: white;
    font-size: --font-size;
  }
}
</style>
