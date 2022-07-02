<template>
  <div id="banner">
    <a
      href="javascript:;"
      v-for="item in bannerData.slice(0, 4)"
      :key="item.id"
      @click.prevent="viewDetail(item.id)"
      class="banner-item"
    >
      <img v-lazy="item.cover_url" :alt="item.description" />
      <div class="title">{{item.title}}</div>
    </a>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Banner",
  props: {
    /* 书籍信息  */
    bannerData: Array,
  },
  setup() {
    //获取路由总管
    const $router = useRouter();
    /* 跳转到查看详情页 */
    function viewDetail(id) {
      $router.push({ path: "/detail", query: { id } });
    }

    return {
      viewDetail,
    };
  },
};
</script>

<style lang="less" scoped>
#banner {
  display: flex;
  width: 100vw;
  text-align: center;
  padding: 15px 0 30px;
  border-bottom: 8px solid #eee;
  background-color: var(--color-background);
  .banner-item {
    flex-grow: 1;
    img {
      width: 70px;
      height: 70px;
    }
    // 设置字体
    .title {
      margin-top: 7px;
      font-size: 12px;
    }
  }
}
</style>
