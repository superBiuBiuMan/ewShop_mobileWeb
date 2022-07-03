<template>
  <div>
    <!-- 顶部  -->
    <Navbar>
      <template #default> 商品详情 </template>
    </Navbar>
    <!-- 展示部分 -->
    <div class="detail-show">
      <!-- 图片展示 -->
      <div class="pic-content">
        <img v-lazy="goods.cover_url" />
      </div>
      <!-- 用户操作及书籍信息 -->
      <div class="operation">
        <van-card
          style="text-align: left;font-size:17px"
          :desc="goods.description"
          :price="goods.price"
          :num="goods.stock"
          title="商品标题"
        >
          <template #tags>
            <van-tag style="margin-right: 8px" plain type="danger">{{
              goods.price < 10 ? "流行" : "推荐"
            }}</van-tag>
            <van-tag plain type="danger">{{
              goods.stock < 10 ? "热销" : "大众"
            }}</van-tag>
          </template>
          <template #footer>
            <van-button  color="linear-gradient(#fcd51f, #feba23)" @click="addToCart" :disabled="goods.stock==0">加入购物车</van-button>
            <van-button  color="linear-gradient(#fe3e4e, #f72e1d)" @click="shopNow"   :disabled="goods.stock==0">立即购买</van-button>
          </template>
        </van-card>
      </div>
      <!-- 选择器 -->
      <div class="nav-select">
        <!-- 这里应该添加一个滚动跳转的 -->
        <van-tabs v-model:active="active" @click-tab="onClickTab" >
          <van-tab title="概述">
            <div class="book-detail-info" v-html="goods.details"></div>
          </van-tab>
          <van-tab title="热评">
            <!-- 没见过,占位 -->
            <van-skeleton title :row="10" />
          </van-tab>
          <van-tab title="相关图书">
              <GoodList :showData="like_goods"></GoodList>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import GoodList from '@/components/content/good/GoodList'
import { useRoute,useRouter } from "vue-router";
import { onMounted, ref, reactive, toRefs} from "vue";
import { reqGoodDetail } from "@/api/detail";
import {reqAddCart} from "@/api/shopcart";
import {Toast} from "vant";
import { useStore } from 'vuex';
export default {
  name: "Detail",
  components: {
    Navbar,
    GoodList
  },
  setup() {
    //获取当前路由信息
    const $route = useRoute();
    //获取路由总管
    const $router = useRouter();
    //获取存储仓库
    const $store = useStore();
    const id = ref();
    //记录当前选择项
    const active = ref(0);
    let detailInfo = reactive({
      //里面有数据项comments
      goods: {},
      like_goods: [],
    });
    //获取选择器到顶部的距离
    //用户查看了选择项,跳转到位置
    function onClickTab(){
      console.log('单击了选择性');
      window.scrollTo({
        top:document.documentElement.clientHeight-200,
        bahavior:'smooth',
      })
    }
    //添加到购物车
    async function addToCart(){
      //判断是否有商品id
      if(!id.value){
        return;
      }
      //有商品id
      try {
        await reqAddCart({
            goods_id:id.value,
            num:1
        });
        Toast.success("添加购物车成功");
        //购物车数量+1
        $store.dispatch("setCarNum",1);
      } catch (error) {
        // Toast.fail("添加购物车失败,请检查网络是否正常");
      }
    }
    //立即购买
    async function shopNow(){
      await addToCart();
      //其实应该跳转到结算页面的....
      $router.push("/shopcart")
    }
    //记录数据
    onMounted(() => {
      //1.保存传递过来的查询id
      id.value = $route.query.id;
      //2.请求数据
      reqGoodDetail(id.value).then((res) => {
        detailInfo.goods = res.goods;
        detailInfo.like_goods = res.like_goods;
      });
    });

    return {
      id,
      ...toRefs(detailInfo),
      active,
      onClickTab,
      addToCart,
      shopNow
    };
  },
};
</script>

<style lang="less" scoped>
.detail-show {
  width: 100vw;
  margin-top: 45px;
  margin-bottom: 60px;
  // 图片部分
  .pic-content {
    width: 100%;
    img {
      width: 100%;
    }
  }
  //用户操作和书籍信息
  .operation {
    ::v-deep .van-card__price-integer{
      font-size: 20px;
      color: #f8230b;
    }
  }
  //选择器
  .nav-select{
    width: 100vw;
    ::v-deep .van-tabs__wrap {
      padding-bottom: 10px;
    }
    ::v-deep .book-detail-info{
      img{
        // width: 300px!important;
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
