<template>
  <div class="go-top" @click="toTop">
  </div>
</template>

<script>
export default {
  name: 'ToTop',
  setup(props,{emit}){
      function toTop(){
          //触发移动到顶部自定义事件,并设置延迟为400ms
          emit('toTopFn',400);
      }
      return {
          toTop,
      }
  }
}
</script>

<style lang="less" scoped>
.go-top{
    background-image: url("@/assets/image/toTop.png");
    width: 32px;
    height: 32px;
    position: fixed;
    border-radius: 50%;
    right: 0px;
    bottom: 53px;
    z-index: 10;
}
</style>
