<template>
  <div class="shopcart">
    <Navbar>
      <template #default> 购物车 </template>
    </Navbar>
    <div class="content">
      <van-checkbox-group v-model="cartChecked" :max="2">
        <!-- 每一个商品都是一个滑动单元格 -->
        <van-swipe-cell>
          <!-- 自定义内容 -->
          <!-- 选择框 -->
          <div class="good-item">
             <van-checkbox name="a"></van-checkbox>
             <!-- 商品图片部分 -->
             <div class="good-img"><img src="https://dreamos.oss-cn-beijing.aliyuncs.com/gitblog/202207021140585.png" alt=""></div>
             <div class="good-detail-wrapper">
             <!-- 商品描述部分 -->
             <div class="good-title">
                <span>xxx私房菜</span>
                <span>库存x1</span>
             </div>
             <!-- 商品操作部分 -->
             <div class="good-operation">
               <!-- 商品价格 -->
               <div class="price"><small>¥</small>99.88</div>
               <!-- 商品数量变更 -步进器-->
              <van-stepper  v-model="value" min="5" max="8" />
             </div>
            </div>
          </div>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
      <!-- 全选 -->
      <div class="check-all">
        <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" style="bottom:60px">
          <van-checkbox v-model="checked">全选</van-checkbox>
        </van-submit-bar>
      </div>
      <div class="empty" style="display:none">
        <img class="empty-cart" src="~assets/image/empty-car.png" alt="空购物车">
        <div class="title">购物车空空如也</div>
        <van-button round color="#1baeae" type="primary" block >前往选购</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import { ref } from "vue";
export default {
  name: "Shopcart",
  components: {
    Navbar,
  },
  setup() {
    //选中的商品项
    const cartChecked = ref();
    return {
      cartChecked,
    };
  },
};
</script>

<style lang="less" scoped>
.shopcart {
  margin-top: 45px;
  // margin-bottom: 60px;
  .content{
    .good-item{
      display: flex;
      padding: 7px 8px;
      width: 100%;
      //图片样式
      .good-img{
        width: 110px;
        img{
          width: 100%;
          height: auto;
        }
        
      }
    }
    .good-detail-wrapper{
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      padding: 15px 5px;
      &>div{
        width: 100%;
      }
      .good-title{
        &>span:first-child{
          float: left;
        }
         &>span:last-child{
          float: right;
        }
      }
      .good-operation{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price{
          float: left;
          font-size: 18px;
          color: red;
        }
      }
    }
   
  }
  .empty{
    .empty-cart{
      width: 100%;
      height: auto;
    }
  }
}
::v-deep .van-icon-success:before {
  font-size: 14px !important;
}
</style>
