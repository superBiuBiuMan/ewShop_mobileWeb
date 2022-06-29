<template>
  <div class="swiper-show" >
    <van-swipe v-if="swiperData.length" :autoplay="3000" indicator-color="skyblue">
      <van-swipe-item v-for="item in swiperData" :key="item.id">
        <img :src="item.img_url" :alt="item.title" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "SwiperShow",
  props: {
    swiperData: Array,
    default() {
      return [];
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-show {
  margin-top: 45px;
  width: 100vw;
  img {
    width: 100%;
    height: auto;
  }
}
</style>
