<template>
  <div>
    <Navbar>
      <template #default> 商品分类 </template>
    </Navbar>
    <div class="category-wrapper">
      <!-- 排序分布栏 -->
      <div class="navbar">
        <van-tabs v-model:active="activeTab" @click-tab="onClickTab">
          <van-tab title="销售排序" name="sales"></van-tab>
          <van-tab title="价格排序" name="price"></van-tab>
          <van-tab title="评论排序" name="comments_count"></van-tab>
        </van-tabs>
      </div>
      <!-- 左侧分类列表 -->
      <div class="left-list">
        <div class="left-item-content">
          <van-sidebar v-model="activeSecond">
            <!-- 当做一个整体 -->
            <van-collapse v-model="activeName" accordion>
              <!-- 循环一级菜单 -->
              <van-collapse-item
                v-for="item in categoryList"
                :key="item.id"
                :title="item.name"
                :name="item.name"
              >
                <!-- 循环二级菜单 -->
                <van-sidebar-item
                  v-for="sub in item.children"
                  :title="sub.name"
                  :key="sub.id"
                  @click="getGoods(sub.id)"
                />
              </van-collapse-item>
            </van-collapse>
          </van-sidebar>
        </div>
      </div>
      <!-- 书籍展示 -->
      <div class="show-list">
        <div class="show-content">
          <van-card
            v-for="item in showGood"
            :key="item.id"
            :title="item.title"
            :price="item.price"
            :origin-price="Math.floor(item.price * 0.8)"
            :num="item.comments_count"
            :tag="item.comments_count > 0 ? '流行' : '热销'"
            :thumb="item.cover_url"
            @click="viewDetail(item.id)"
            :lazy-load="true"
          />
        </div>
      </div>
    </div>
    <ToTop v-show="isShow" @toTopFn="toTopFn"></ToTop>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import {
  ref,
  onMounted,
  reactive,
  computed,
  watch,
  nextTick,
} from "vue";
import { reqCategory, reqCategoryGoods } from "@/api/category";
import {useRouter} from "vue-router";
import ToTop from "@/components/common/toTop/ToTop";
/* 第三方插件 */
import BetterScroll from "better-scroll";
import throttle from "lodash/throttle";
export default {
  name: "Category",
  components: {
    Navbar,
    ToTop,
  },
  setup() {
    //左分类默认项
    const activeSecond = ref(0); //二级分类列表目前活动项
    const activeName = ref(); //一级分类列表的活动项记录
    const activeTab = ref(0); //nav的选中项记录
    const categoryList = ref([]); //左侧分类列表
    const currentType = ref("sales"); //当前商品默认展示排序方式
    const currentCid = ref(0); //当前商品的二级分类id
    let bs = reactive({}); //better-scroll
    let isShow = ref(false); //控制回到顶部的显示/隐藏
    const $router = useRouter(); //获取路由

    //商品被单击,跳转到查看详情页
    function viewDetail(id) {
      $router.push({ path: "/detail", query: { id } });
    }

    //回到顶部
    function toTopFn(delay) {
      bs.scrollTo(0, 0, delay);
    }

    //展示的数据项
    const showGood = computed({
      get() {
        return goods[currentType.value].list;
      },
      set(newValue) {
        goods[currentType.value].list = newValue;
      },
    });

    //存储请求获取到的数据
    const goods = reactive({
      sales: { page: 1, list: [] },
      price: { page: 1, list: [] },
      comments_count: { page: 1, list: [] },
    });

    /* nav选项被单击回调,结构出排序类别 */
    function onClickTab({ name }) {
      // 原始输出
      // {name: 'price', title: '价格排序', event: PointerEvent, disabled: false}
      console.log("nav选项被单击", name);
      //更改类别
      currentType.value = name;
      //1.如果当前类别数据已经有了,就不再次请求数据了
      if (goods[currentType.value].list.length != 0) {
        return;
      }
      showGood.value = [];
      //2.否者的话数据请求
      reqCategoryGoods(currentType.value, currentCid.value).then((response) => {
        goods[currentType.value].list = response.goods.data;
        //重新计算高度
        nextTick(() => {
          bs.refresh();
        });
      });
    }

    /* 监视左侧二级列表和排序方式的变化 */
    // watch([currentType, currentCid], async (oldValue, newValue) => {
    // console.log('监视左侧二级列表或排序方式被改变了');
    //清空原来数据
    // showGood.value = [];
    //重新发送请求
    // if(oldValue[1] == newValue[1]){
    //   return;
    // }
    // let result = await reqCategoryGoods(currentType.value,currentCid.value);
    // goods[currentType.value].list = result.goods.data;
    // });

    // 左侧列表里面的二级选项被单击
    function getGoods(id) {
      console.log("左侧列表里面的二级选项被单击", id);
      //更新二级分类id记录值
      currentCid.value = id;
      //清空所有列表的数据
      Object.keys(goods).forEach((key) => {
        //数据清空
        goods[key].list = [];
        // 页码清零
        goods[key].page = 1;
      });
      showGood.value = [];
      // 重新发送请求
      reqCategoryGoods(currentType.value, currentCid.value).then((response) => {
        goods[currentType.value].list = response.goods.data;
        //重新计算高度
        nextTick(() => {
          bs.refresh();
        });
      });
    }
    onMounted(() => {
      reqCategory().then((result) => {
        //保存存储数据
        categoryList.value = result.categories;
        //保存默认数据
        goods.sales.list = result.goods.data;
      });

      bs = new BetterScroll(".show-list", {
        //允许单击滚动列表的元素
        click: true,
        probeType: 3,
        pullUpLoad: TextTrackCueList,
      });
      //添加滚动事件,使用下节流阀
      bs.on(
        "scroll",
        throttle((position) => {
          //滚动的距离大于了TableControl组件初始化时候到顶部的距离 - TableControl的高度的时候,就显示另外一个
          isShow.value = -position.y > 300;
        }, 100)
      );
      bs.on(
        "pullingUp",
        throttle(() => {
          console.log("到底部了");
          //1.页码+1
          let page = goods[currentType.value].page++;
          //2.发送数据
          reqCategoryGoods(currentType.value, currentCid.value, page).then(
            (response) => {
              //3.添加到原来数据
              goods[currentType.value].list.push(...response.goods.data);
            }
          );
          //4.完成上划动作
          bs.finishPullUp();
          //5.重新计算高度
          nextTick(() => {
            bs.refresh();
          });
        }),
        20
      );
      nextTick(() => {
        bs.refresh();
      });
    });

    return {
      activeSecond,
      activeName,
      categoryList,
      activeTab,
      onClickTab,
      getGoods,
      showGood,
      bs,
      goods,
      toTopFn,
      isShow,
      viewDetail,
    };
  },
};
</script>

<style lang="less" scoped>
.category-wrapper {
  margin-top: 45px;
  display: flex;
  // 为左侧分类列表的宽度
  @leftItemWidth: 110px;
  //nav的宽度
  @navBarHidth: 40px;
  .navbar {
    // background-color: red;
    float: right;
    position: fixed;
    right: 0;
    height: @navBarHidth;
    left: @leftItemWidth;
    z-index: 10;
  }
  // 左侧分类列表
  .left-list {
    position: fixed;
    width: @leftItemWidth;
    left: 0;
    height: 100%;
    overflow: hidden;
    // bottom: 50px;
    // background-color: green;
  }
  // 书籍展示
  .show-list {
    position: absolute;
    right: 0;
    // nav的宽度 + 顶部的商品分类宽度
    top: @navBarHidth+45;
    left: @leftItemWidth;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    bottom: 0;
  }
}
//重新定义侧边导航样式
::v-deep .van-collapse-item__content {
  padding: 0;
  margin: 0;
  width: 100%;
}
::v-deep.van-sidebar {
  width: 100%;
}
</style>

