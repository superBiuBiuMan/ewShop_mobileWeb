<template>
  <div id="user-order">
    <Navbar>
      <template #default> 我的订单 </template>
    </Navbar>
    <!-- 每次请求一页为10次支付的订单信息 -->
    <!-- v-model:active="active" style="margin-top:45px;"-->
    <van-tabs class="order-tab" @click-tab="onChangeTab">
      <van-tab title="全部"></van-tab>
      <van-tab title="代付款"></van-tab>
      <van-tab title="已支付"></van-tab>
      <van-tab title="发货"></van-tab>
      <van-tab title="交易完成"></van-tab>
      <van-tab title="过期"></van-tab>
    </van-tabs>
    <div class="content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <!-- list列表 -->
        <!-- immediate-check 关闭List初始化后立即触发load事件-->
        <van-list
          :immediate-check="false"
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          @offset="10"
        >
          <!-- 订单列表展示 -->
          <div class="order-item-box" @click="goOrderDetail(item.id)" v-for="(item) in list" :key="item.id" >
            <!-- 头部 -->
            <div class="order-item-header">
              <span style="line-height: 30px; text-align: left">
                订单号：{{item.order_no}}<br />
                创建时间：{{item.created_at}}
              </span>
            </div>
            <!-- 商品图片和价格展示 -->
            <!-- :thumb="sub.goods.cover_url" -->
            <van-card v-for="(detailItem) in item.orderDetails.data" :key="detailItem.id"
              :num="detailItem.num"
              :price="detailItem.goods.price"
              desc="梦洁小站"
              :title="detailItem.goods.title"
              :thumb="detailItem.goods.cover_url"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import { reactive, toRefs, onMounted } from "vue";
import {useRouter} from "vue-router";
import { reqOrderList } from "@/api/order";
import {Toast} from "vant";
export default {
  name: "Order",
  components: {
    Navbar,
  },
  setup() {
    const $router = useRouter();
    //List 组件可以与 PullRefresh 组件结合使用，实现下拉刷新的效果。
    const orderState = reactive({
      //是否正处于加载状态
      loading: false,
      //是否全部加载完成
      finished: false,
      //表示是否正在下拉刷新
      refreshing: false,
      //当前所处的tab索引,用于后期查询订单状态,默认为全部
      status: 0,
      //数据列表
      list:[],
      //当前页
      page:1,
      //总页数
      totalPage:1,
    });

    //上拉加载更多数据 
    function onLoad() {
      // 当组件滚动到底部时，会触发 load 事件并将 loading 设置成 true
      //此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可
      // 若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

      //有下面任意一个条件为真,则不进行加载更多数据
      //排除自身的loading,因为执行到这里,肯定是loading=true了
      if(orderState.refreshing||orderState.finished){
        return;
      }
      console.log("执行加载更多数据");
      //页码可以+1,则+1;
      orderState.page++;
      init();
    }
    //下拉列表刷新 手指下拉然后松开
    function onRefresh() {
      console.log(orderState);
      //有下面任意一个条件为真,则不进行刷新
      //排除自身的refreshing,因为执行到这里,肯定是refreshing=true了
      if(orderState.loading){
        return;
      }
      console.log("执行下拉刷新");
      //提醒
      Toast.loading({message:"刷新中...",forbidClick:true});
      //清空数据
      clearData(orderState);
      //初始化操作
      init();
    }
    //初始化
    function init() {
      //设置为正处于加载状态
      orderState.loading = true;
      orderState.refreshing = true;
      // 根据当前所处的tab来发起请求获取对应的订单状态: 1下单 2支付 3发货 4收货 5过期
      reqOrderList({
        page: orderState.page,
        status: orderState.status,
        include: "orderDetails.goods",
      }).then(res=>{
          //设置为不在加载状态
          orderState.loading = false;
          orderState.refreshing = false;
          //数据连接在一起
          orderState.list = orderState.list.concat(res.data);
          //存储总页数
          orderState.totalPage =  res.meta.pagination.total_pages;
          //如果当前页大于等于总页数,设置完结
          if(orderState.page >=orderState.totalPage){
            orderState.finished = true;
          }
      }).finally(()=>{
        Toast.clear();
      })

    }
    onMounted(() => {
      //初始化
      init();
    });
    //数据清空
    function clearData(obj){
        obj.loading = false;
        obj.finished = false;
        obj.refreshing = false;
        obj.list = [];
        obj.page = 1;
        obj.totalPage = 1;
    }

    //跳转到订单详情
    function goOrderDetail(id){
      $router.push("/orderdetail?id="+id);
    }

    //tab标签被改变,tab索引改变
    //默认传递书写{name: 1, title: '代付款', event: PointerEvent, disabled: false}
    //这里解构赋值下这样子name就是索引了
    function onChangeTab({name}) {
      //存储索引
      orderState.status = name;
      // //数据清空
      clearData(orderState);
      // //初始化数据
      init();
    }
    return {
      ...toRefs(orderState),
      onRefresh,
      onLoad,
      onChangeTab,
      goOrderDetail,
    };
  },
};
</script>

<style lang="less" scoped>
#user-order {
  //   margin-top: 45px;
  //   margin-bottom: 60px;
  // :deep(.van-pull-refresh__head) {
  //   // background-color: red!important;
  //   // top: -18px;
  //   // top: -8px;
  //   // top: -1;
  // }
  :deep(.van-tabs__nav--line.van-tabs__nav--complete) {
    padding-right: 0;
    padding-left: 0;
  }
  :deep(.van-card__content){
    .van-card__desc{
      margin: 15px 0;
      font-size: 15px;
    }
    .van-card__title{
      text-align: left;
      margin-left: 7px;
      font-size: 17px;
    }

  }
  :deep(.van-card__price){
    float: left;
  }
  :deep(.van-card__num){
    margin-left: 20px;
    float: left;
  }
  .order-tab {
    margin-top: 45px;
    position: fixed;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 45px;
  }
  .content {
    height: 100vh;
    overflow: hidden;
    overflow-y: scroll;
    // padding-top: 45+45px;
    padding-top: 70px;
    padding-bottom: 50px;
    //   订单列表展示s
    .order-item-box {
      margin: 20px 10px;
      background-color: #fafafa;
      //头部
      .order-item-header {
        padding: 10px 20px 0 20px;
        display: flex;
        justify-content: space-between;
      }
      .van-card {
        background-color: #ffffff;
        border-radius: 3px;
        margin-top: 10px;
      }
    }
  }
}
</style>
