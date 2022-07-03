<template>
  <div id="create-order">
    <Navbar class="nav-bar">
      <template v-slot:default> 订单预览 </template>
    </Navbar>
    <!-- 展示地址部分 -->
    <div class="address-wrap" @click="goTo">
      <div class="name">
        <span>{{ addressInfo.name }}</span>
        <span>{{ addressInfo.phone }}</span>
      </div>
      <div class="address">
        {{ addressInfo.province }} {{ addressInfo.county }}
        {{ addressInfo.city }} {{ addressInfo.address }}
      </div>
      <van-icon class="arrow" name="arrow" />
    </div>
    <div class="good">
      <!-- 商品列表 -->
      <div class="good-item" v-for="item in cartList" :key="item.id">
        <!-- 商品图片 -->
        <div class="good-img">
          <img v-lazy="item.goods.cover_url" :alt="item.goods.title" />
        </div>
        <!-- 商品描述 -->
        <div class="good-desc">
          <div class="good-title">
            <span>{{ item.goods.title }}</span>
            <span>x{{ item.num }}</span>
          </div>
          <div class="good-btn">
            <div class="price">
              <small>¥</small>{{ item.goods.price * item.num }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-submit-bar
      class="submit-all"
      :price="totalPrice * 100"
      button-text="生成订单"
      :disabled="!addressInfo.name ||cartList.length==0"
      @submit="handleCreateOrder"
    >
      商品金额
    </van-submit-bar>

    <!-- <van-popup
      closeable
      :close-on-click-overlay="false"
      v-model:show="showPay"
      position="bottom"
      :style="{ height: '40%' }"
      @close="close"
    >
      <van-grid :border="false" :column-num="2">
                <van-grid-item>
                    支付宝二维码<br>
                    <van-image width="150" height="150" :src="aliyun" />
                </van-grid-item>
                <van-grid-item>
                    微信二维码<br>
                    <van-image width="150" height="150" :src="wechat" />
                </van-grid-item>

            </van-grid> 
    </van-popup> -->
  </div>
</template>

<script>
import { reactive, onMounted, toRefs, computed } from "vue";
import Navbar from "@/components/common/navbar/Navbar";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { reqOrderPreview, reqOrderCreate } from "@/api/order";
import { Toast } from "vant";
export default {
  components: {
    Navbar,
  },
  setup() {
    //路由总管
    const $router = useRouter();
    const orderState = reactive({
      //默认地址信息
      addressInfo: {},
      //商品列表(即购物车选中列表)
      cartList: [],
      //商品总价
      totalPrice: "",
    });
    //生成订单
    async function handleCreateOrder() {
      //1.判断是否有地址信息
      if (orderState.addressInfo.id) {
        Toast.loading({message:"提交中...",duration:0,forbidClick:true});
        // orderState.address.id
        try {
            //1.提交订单
            let createOrderInfo = await reqOrderCreate({ address_id: orderState.addressInfo.id });
            //2.
            Toast.clear();

        } catch (error) {
            
        }
      }
    }
    //没有默认地址,跳转
    function goTo() {
      //如果没有name,说明为空,则跳转
      if (!orderState.addressInfo.name) {
        $router.push("/address");
      }
    }
    /* 初始化操作 */
    function init() {
      Toast.loading({ message: "创建中...", duration: 0 });
      reqOrderPreview()
        .then((res) => {
          //存放商品信息
          orderState.cartList = res.carts;
          //过滤存放选中的地址以获取默认地址
          let address = (orderState.addressInfo = res.address.filter((item) => {
            return item.is_default == 1;
          }));
          //存放选中地址
          if (address.length === 0) {
            orderState.addressInfo = {
              address: "还没有设置默认地址,请选择或填写地址信息",
            };
          } else {
            orderState.addressInfo = address[0];
          }
        })
        .finally(() => {
          Toast.clear();
        });
    }
    //计算总价格
    orderState.totalPrice = computed(() => {
      let sum = 0;
      orderState.cartList.forEach((item) => {
        sum += item.goods.price * item.num;
      });
      return sum;
    });
    //初始化钩子
    onMounted(() => {
      init();
    });
    return {
      ...toRefs(orderState),
      goTo,
      handleCreateOrder,
    };
  },
};
</script>

<style lang="less" scoped>
#create-order {
  background: #f9f9f9;
  .address-wrap {
    text-align: left;
    margin-bottom: 20px;
    background: #fff;
    position: relative;
    margin-top: 44px;
    font-size: 14px;
    padding: 15px;
    color: #222333;
    .name,
    .address {
      margin: 10px 0;
    }
    .arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20px;
    }
    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: -webkit-repeating-linear-gradient(
        135deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background: repeating-linear-gradient(
        -45deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background-size: 80px;
      content: "";
    }
  }
  .good {
    margin-bottom: 120px;
  }
  .good-item {
    padding: 10px;
    background: #fff;
    display: flex;
    .good-img {
      img {
        width: 100px;
        height: auto;
      }
    }
    .good-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 20px;
      .good-title {
        display: flex;
        justify-content: space-between;
      }
      .good-btn {
        display: flex;
        justify-content: space-between;
        .price {
          font-size: 16px;
          color: red;
          line-height: 28px;
        }
        .van-icon-delete {
          font-size: 20px;
          margin-top: 4px;
        }
      }
    }
  }
  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 10px 0;
      font-size: 14px;
      span:nth-child(2) {
        color: red;
        font-size: 18px;
      }
    }
    .pay-btn {
      position: fixed;
      bottom: 7px;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
.submit-all {
  margin-bottom: 50px;
  z-index: 9 !important;
}
</style>
