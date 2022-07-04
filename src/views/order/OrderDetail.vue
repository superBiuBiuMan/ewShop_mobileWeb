<template>
  <div id="order-detail">
    <!-- 顶部  -->
    <Navbar>
      <template #default> 订单详情 </template>
    </Navbar>
    <!-- 显示订单状态,订单编号,下单时间 -->
    <div class="order-info">
      <div class="status-item">
        <label>订单状态：</label>
        <span>{{ orderInfo.statusText }}</span>
      </div>
      <div class="order-item">
        <label>订单编号：</label>
        <span>{{ orderInfo.order_no }}</span>
      </div>
      <div class="time-item">
        <label>下单时间：</label>
        <span>{{ orderInfo.created_at }}</span>
      </div>
      <div class="address-item">
        <label>地址：</label>
        <span>{{ orderInfo.address }}</span>
      </div>
      <van-button
        style="margin-bottom: 10px; font-size: 16px"
        v-if="orderInfo.statusCode == 1"
        @click="showPayFn"
        color="#1baeae"
        block
        >去支付</van-button
      >
      <van-button
        style="margin-bottom: 10px; font-size: 16px"
        v-if="orderInfo.statusCode == 2"
        @click="handleConfirmOrder"
        block
        >确认订单</van-button
      >
    </div>
    <!-- 显示商品金额和配送方式 -->
    <div class="other-info">
      <div class="price-item">
        <label>商品金额：</label>
        <span>¥ {{ totalMoney }}</span>
      </div>
      <div class="send-item">
        <label>配送方式：</label>
        <span>普通快递</span>
      </div>
    </div>
    <!-- 内容展示 -->
    <div class="content">
      <van-card
        style="text-align: left; font-size: 15px"
        v-for="item in list"
        :key="item.id"
        :num="item.num"
        :price="item.price"
        desc="dreamlove"
        :title="item.goods.title"
        :thumb="item.goods.cover_url"
      />
    </div>
    <!-- 支付二维码 -->
    <van-popup
      closeable
      :close-on-click-overlay="false"
      v-model:show="showPay"
      position="bottom"
      :style="{ height: '40%' }"
      @close="closePay"
    >
      <van-grid :border="false" :column-num="2">
        <van-grid-item>
          支付宝二维码<br />
          <!-- <van-image width="150" height="150" :src="aliyun" /> -->
          <van-image width="150" height="150" :src="qr_codeAli" />
        </van-grid-item>
        <van-grid-item>
          <!-- 接口原因~也换为支付宝 -->
          这里也是支付宝~<br />
          <!-- <van-image width="150" height="150" :src="wechat" /> -->
          <van-image width="150" height="150" :src="qr_codeAli" />
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import { onMounted, reactive, computed, toRefs } from "vue";
import { reqOrderDetail, payOrder, payOrderStatus } from "@/api/order";
import { useRoute, useRouter } from "vue-router";
import { Toast } from "vant";
export default {
  name: "OrderDetail",
  components: {
    Navbar,
  },
  setup() {
    clearInterval(timer);
    //当前路由对象
    const $route = useRoute();
    //路由总管
    const $router = useRouter();
    //轮询定时器timer
    var timer = "";
    //当前数据对象
    const orderDetail = reactive({
      //订单信息
      orderInfo: {
        //订单创建时间
        created_at: "",
        //订单编号
        order_no: "",
        //订单状态文本
        statusText: "",
        //订单状态字符
        statusCode: null,
        //地址信息
        address: "",
        //订单id
        orderId: "",
      },
      //内容展示
      list: [],

      //支付二维码(支付宝)这里只用支付宝,因为他们接口原因,
      qr_codeAli: "",
      //控制支付窗口的显示隐藏
      showPay: false,
    });
    //单击去支付
    function showPayFn() {
      //显示支付窗口
      orderDetail.showPay = true;
      //id确实存在
      if (orderDetail.orderInfo.orderId) {
        //订单id
        let id = orderDetail.orderInfo.orderId;
        //请求二维码
        payOrder(id, { type: "aliyun" }).then((res) => {
          //存放二维码
          orderDetail.qr_codeAli = res.qr_code_url;
        });
        //轮询查看支付信息
        timer = setInterval(() => {
          payOrderStatus(id).then((res) => {
            //支付成功,跳转
            if (res == 2) {
              clearInterval(timer);
              //隐藏支付窗口
              orderDetail.showPay = false;
              $router.push({ path: "/orderdetail", query: { id } });
            }
          });
        }, 2000);
      }
    }
    //关闭支付窗口
    function closePay() {
        console.log("你关闭了支付窗口");
      //1.已经自动设置了隐藏支付窗口
      //2.关闭轮询
      clearInterval(timer);
    }
    //确认订单
    function handleConfirmOrder() {
      console.log("单击了确认订单,貌似是确认收货...");
    }
    //初始化操作
    function init() {
      //存储订单id
      orderDetail.orderInfo.orderId = $route.query.id;
      Toast.loading({ message: "查询中...", duration: 0 });
      //一些订单的创建时间
      //status 1下单 2支付 3发货 4收货 5过期
      reqOrderDetail($route.query.id).then((res) => {
        orderDetail.orderInfo.created_at = res.created_at;
        orderDetail.orderInfo.order_no = res.order_no;
        //地址信息
        orderDetail.orderInfo.address = `${res.address.province} ${res.address.city} ${res.address.county} ${res.address.address}`;
        //订单状态
        let statusAll = [
          "",
          "已下单",
          "已支付",
          "等待发货",
          "确认收货",
          "已过期",
        ];
        orderDetail.orderInfo.statusText = statusAll[res.status]; //计算存储状态文本
        orderDetail.orderInfo.statusCode = res.status; //计算存储状态字符;

        //内容展示
        orderDetail.list = res.orderDetails.data || [];
        //清空提示
        Toast.clear();
      });
    }
    //计算总金额
    const totalMoney = computed(() => {
      return orderDetail.list.reduce((prev, currentItem) => {
        return currentItem.num * currentItem.price + prev;
      }, 0);
    });

    onMounted(() => {
      init();
    });

    return {
      ...toRefs(orderDetail),
      totalMoney,
      showPayFn,
      handleConfirmOrder,
      closePay,
    };
  },
};
</script>

<style lang="less" scoped>
#order-detail {
  height: 100vh;
  font-size: 15px;
  background-color: #f7f7f7;
  .order-info,
  .other-info {
    background-color: white;
    padding: 0 20px;
    text-align: left;
    & > div {
      padding: 4px 0;
      label {
        color: #999999;
      }
    }
  }
  .order-info {
    margin-top: 45px;
    padding-top: 20px;
    padding-bottom: 15px;
    .address-item {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 20px;
    }
  }
  .other-info {
    padding-top: 15px;
    padding-bottom: 15px;
    margin-top: 20px;
    // background-color: red;
  }
  .content {
    padding-bottom: 50px;
  }
}
</style>
