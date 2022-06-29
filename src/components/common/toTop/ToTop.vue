<template>
  <div class="go-top">
  </div>
</template>

<script>
export default {
  name: 'ToTop',
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
