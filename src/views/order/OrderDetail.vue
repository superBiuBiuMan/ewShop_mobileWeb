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
        <span>{{orderInfo.status}}</span>
      </div>
      <div class="order-item">
        <label>订单编号：</label>
        <span>{{orderInfo.order_no}}</span>
      </div>
      <div class="time-item">
        <label>下单时间：</label>
        <span>{{orderInfo.created_at}}</span>
      </div>
    <div class="address-item">
        <label>地址：</label>
        <span>{{orderInfo.address}}</span>
      </div>
      <!-- v-if="detail.status == 1"  @click="showPayFn"-->
     <van-button style="margin-bottom: 10px" color="#1baeae" block>去支付</van-button>
      <!-- <van-button v-if="detail.status == 2"  @click="handleConfirmOrder" block >确认订单</van-button> -->
    </div>
     <!-- 显示商品金额和配送方式 -->
      <div class="other-info">
        <div class="price-item">
          <label>商品金额：</label>
          <span>¥ {{totalMoney}}</span>
        </div>
        <div class="send-item">
          <label>配送方式：</label>
          <span>普通快递</span>
        </div>
      </div>
      <!-- 内容展示 -->
      <div class="content">
        <van-card
            style="text-align:left;font-size:15px"
            v-for="item in orderDetails" :key="item.id"
            :num="item.num"
            :price="item.price"
            desc="dreamlove"
            :title="item.goods.title"
            :thumb="item.goods.cover_url"
        />
      </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import {onMounted,reactive,computed,toRefs} from "vue";
import {reqOrderDetail} from "@/api/order";
import { useRoute } from 'vue-router';
import {Toast} from "vant";
export default {
  name: "OrderDetail",
  components: {
    Navbar,
  },
  setup(){
      //当前路由对象
      const $route = useRoute();
      //当前数据对象
      const orderDetail = reactive({
        //订单信息
        orderInfo:{
            //订单创建时间
            created_at:"",
            //订单编号
            order_no:"",
            //订单状态
            status:"",
            //地址信息
            address:"",
        },
        //内容展示
        orderDetails:[],
      });
      //初始化操作
      function init(){
         Toast.loading({ message: "查询中...", duration: 0 });
         //一些订单的创建时间
         //status 1下单 2支付 3发货 4收货 5过期
          reqOrderDetail($route.query.id).then(res=>{

              orderDetail.orderInfo.created_at = res.created_at;
              orderDetail.orderInfo.order_no = res.order_no;
              //地址信息
              orderDetail.orderInfo.address = `${res.address.province} ${res.address.city} ${res.address.county} ${res.address.address}`
              //订单状态
              let statusAll = ['', '已下单', '已支付', '等待发货', '确认收货', '已过期'];
              orderDetail.orderInfo.status = statusAll[res.status];
              //内容展示
              orderDetail.orderDetails = res.orderDetails.data || [];
             //清空提示
             Toast.clear();
          })
      } 
       //计算总金额
      const totalMoney = computed(()=>{
         return orderDetail.orderDetails.reduce((prev,currentItem)=>{
                return (currentItem.num * currentItem.price ) + prev;
         },0)
      });
      onMounted(()=>{
          init();
      });

      return {
          ...toRefs(orderDetail),
          totalMoney
      }
  }
};
</script>

<style lang="less" scoped>
#order-detail {
    height: 100vh;
    font-size: 15px;
    background-color:#f7f7f7;
    .order-info,.other-info{
        background-color: white;
        padding: 0 20px;
        text-align: left;
         &>div{
            padding: 4px 0;
            label{
                color: #999999;
            }
        }
    }
    .order-info{
        margin-top: 45px;
        padding-top: 20px;
        padding-bottom: 15px;
        .address-item{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .other-info{
        padding-top: 15px;
        padding-bottom: 15px;
        margin-top: 20px;
        // background-color: red;
    }
    .content{
        padding-bottom: 50px;
    }
}
</style>
