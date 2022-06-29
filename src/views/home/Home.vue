<template>
  <div id="home">
    <Navbar>
      <template #default> 图书兄弟 </template>
    </Navbar>
    <!-- 列表 -->
    <TableControlVue
      v-show="false"
      @indexChange="indexChange"
      :tableControlTitle="['畅销', '推荐', '精选']"
    ></TableControlVue>
    <!-- 滚动外壳 -->
    <div class="home-wrapper">
      <!-- 内容区 -->
      <div class="home-content">
        <!-- 轮播图 -->
        <div class="slide">
          <img src="@/assets/image/img.png" />
        </div>
        <!-- banner  -->
        <Banner :bannerData="goods.sales.list"></Banner>
        <!-- 列表 -->
        <TableControlVue
          @indexChange="indexChange"
          :tableControlTitle="['畅销', '推荐', '精选']"
        ></TableControlVue>
        <!-- 书籍展示 -->
        <GoodList :showData="showData"></GoodList>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import Banner from "@/views/home/Child/Banner";
import TableControlVue from "@/components/content/tableControl/TableControl";
import GoodList from "@/components/content/good/GoodList";
import { reqIndex, reqProgram } from "@/api/home";
import {
  reactive,
  ref,
  toRefs,
  computed,
  onMounted,
  watchEffect,
  nextTick,
} from "vue";
/* 第三方插件 */
import BetterScroll from "better-scroll";
export default {
  name: "Home",
  components: {
    Navbar,
    Banner,
    TableControlVue,
    GoodList,
  },
  setup() {
    /* 存储-推荐数据数据 */
    // let bannerData = ref([]);
    /* 存储-畅销,推荐,精选数据 */
    let goods = reactive({
      sales: { page: 1, list: [] },
      recommend: { page: 1, list: [] },
      new: { page: 1, list: [] },
    });
    /* 变量-better-scroll示例对象 */

    /* 变量-记录当前索引 */
    let currentIndex = ref(0);
    /* 计算-当前类型 */
    const currentType = ref("sales");
    /* 存储-索引对应关系 */
    let typeAll = ["sales", "recommend", "new"];
    /* 计算-获取当前展示列表数据 */
    let showData = computed(() => {
      return goods[currentType.value].list;
    });

    let bs = reactive({});
    onMounted(async () => {
      /* 请求-获取畅销书籍*/
      let salesData = await reqIndex();
      goods.sales.list = salesData.goods.data;
      /* 请求-获取推荐书籍*/
      let recommendData = await reqProgram("recommend");
      goods.recommend.list = recommendData.goods.data;
      /* 请求-获取精选书籍 */
      let newData = await reqProgram("new");
      goods.new.list = newData.goods.data;
      // 创建BetterScroll对象
      bs = new BetterScroll(document.querySelector(".home-wrapper"), {
        probeType: 3,
        click: true,
        pullUpLoad: true,
      });
    });
    watchEffect(() => {
      nextTick(() => {
        // 重新计算高度
        bs && bs.refresh();
      });
    });
    /* 自定义事件-TableControl栏目发生改变的时候 */
    function indexChange(newIndex) {
      //更新索引
      currentIndex.value = newIndex;
      currentType.value = typeAll[newIndex]; //更改当前类型

      reqProgram(currentType.value).then((response) => {
        goods[currentType.value].list = response.goods.data;
      });
    }

    return {
      indexChange,
      showData,
      goods,
    };
  },
};
</script>

<style lang="less" scoped>
#home {
  position: relative;
  height: 100vh;
  .home-wrapper {
    position: absolute;
    //隔开底部
    top: 0;
    bottom: 50px;
    //占满宽度  内容居中
    left: 0;
    right: 0;
    overflow: hidden;
    .home-content {
      position: absolute;
    }
    .slide {
      /* 隔开顶部的navbar */
      margin-top: 45px;
      width: 100%;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
