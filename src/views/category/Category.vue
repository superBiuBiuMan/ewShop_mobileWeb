<template>
    <div>
    <Navbar>
      <template #default>
        商品分类
      </template>
    </Navbar>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item>1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
</van-swipe>

  </div>
</template>

<script>
import Navbar from '@/components/common/navbar/Navbar'
export default {
  name: 'Category',
  components:{
    Navbar
  }
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
