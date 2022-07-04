<template>
  <div id="shopcart">
    <Navbar>
      <template #default> 购物车 </template>
    </Navbar>
    <div class="content">
      <!-- cartChecked收集所有的van-checkbox里面的nam属性,也就是选中的商品id 滑动单元格-->
      <van-checkbox-group v-model="cartChecked" @change="groupChange" style="padding-bottom:100px" >
        <!-- 每一个商品都是一个滑动单元格 -->
        <van-swipe-cell v-for="(item,index) in list" :key="item.id" >
          <!-- 自定义内容 -->
          <!-- 选择框 -->
          <div class="good-item">
             <van-checkbox :name="item.id" ></van-checkbox>
             <!-- 商品图片部分 -->
             <div class="good-img"><img :src="item.goods.cover_url" :alt="item.goods.title"></div>
             <div class="good-detail-wrapper">
             <!-- 商品描述部分 -->
             <div class="good-title">
                <span>{{item.goods.title}}</span>
                <span>x{{item.goods.stock}}</span>
             </div>
             <!-- 商品操作部分 -->
             <div class="good-operation">
               <!-- 商品价格 -->
               <div class="price"><small>¥</small>{{item.goods.price}}</div>
               <!-- 商品数量变更 -步进器 name为标识符,可以在 change 事件回调参数中获取-->
               <!-- v-model="value"没有用到 -->
              <van-stepper :min="1" :model-value="item.num" :max="item.goods.stock" :name="item.id+'&'+index" @change="onChange"/>
             </div>
            </div>
          </div>
          <template #right>
            <van-button style="height:100%" @click="deleteGood(item.id,index,item.goods.title)" square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
      <!-- 全选 -->
        <van-submit-bar :price="total" button-text="预览订单" @submit="onSubmit" style="bottom:50px;">
          <van-checkbox v-model="checkedAll" @click="checkAll">全选</van-checkbox>
        </van-submit-bar>
      <div class="empty" v-if="!list.length">
        <img class="empty-cart" src="~assets/image/empty-car.png" alt="空购物车">
        <div class="title">购物车空空如也</div>
        <van-button round color="#1baeae" type="primary" block @click="toShopping">前往选购</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import { ref,reactive,onMounted,toRefs,computed, } from "vue";
import {reqListCart,reqChangeNumCart,reqChangeStateCart,reqRemoveCart} from "@/api/shopcart";
import debounce from "lodash/debounce";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {Toast,Dialog} from "vant";
export default {
  name: "Shopcart",
  components: {
    Navbar,
  },
  setup() {
    const $router = useRouter();
    //获取仓库
    const $store = useStore();
    //商品项信息
    const shopList = reactive({
      list:[],
      //选中列表
      cartChecked:[],
      //是否全选,默认为false
      checkedAll:false,
      //商品总价(vant组件单位为分)
      total:0
    });
    //计算商品总价
    shopList.total = computed(()=>{
      let sum = 0 ;
      //先通过filter过滤出包含在选中列表的商品,然后在进行遍历计算金额
      shopList.list.filter(item=>shopList.cartChecked.includes(item.id)).forEach(item2=>{
        // console.log(item2);
        sum += parseInt(item2.num) * parseFloat(item2.goods.price);
      })
      return sum*100;
    })
    //前往购物
    function toShopping(){
      $router.push("/");
    }
    //左滑删除按钮单击事件
    function deleteGood(id,index,title){
      Dialog.confirm({
          title: '确定删除'+title+"吗?",
        })
        .then(() => {
          Toast.loading({duration:0});
          //1.数据库中删除记录
          reqRemoveCart(id).then(res=>{
          //2.当前数据删除
          shopList.list.splice(index,1); 
          //3.清除提示
          Toast.clear();
          //4.购物车数量-1
          $store.dispatch("setCarNum",-1);
          }); 
        })
        .catch(() => {
          // on cancel
        });
     
    }
    //全选按钮单击事件
    function checkAll(){
      //1.将商品id全部推入cartChecked
      if(shopList.checkedAll){
        //全选
        shopList.cartChecked = shopList.list.map(item=>item.id);
      }else{ 
        //全不选
        shopList.cartChecked = [];
      }
      //2.发送ajax,不过响应式数据的原因,这里可以不用发送了
    }
    //复选框改变,初始化的时候会执行一次这个,因为数据变动了,所以这里可以用于判断全选
    function groupChange(checkList){
      //checkList为数组
      //如果选中
      if(checkList.length == shopList.list.length && shopList.list.length!=0){
        shopList.checkedAll = true;
      }else{
        shopList.checkedAll = false;
      }
      //更改选中列表
      shopList.cartChecked = checkList;
      //发送请求更改选中状态
      reqChangeStateCart({
        cart_ids:checkList
      })
    }
    //提交订单
    function onSubmit(){
      Toast.loading({forbidClick:true});
      $router.push("/createorder");
    }
    //请求购物车信息
    function init(){
      Toast.loading({message:"正在加载...",forbidClick:true,duration:0})
      reqListCart(1).then((res)=>{
        //保存用户购物车信息
        shopList.list = res.data;
        //保存选中项 filter返回过滤后的,map返回指定处理后的数组
        shopList.cartChecked=res.data.filter(item1=>item1.is_checked===1).map(item2=>item2.id);
      }).finally(()=>{
        //关闭提示框
        Toast.clear();
      })
    }
    //购物车数量商品数量被改变,第一个参数更新后的商品数量,第二个参数为一些详细信息
    //这里写一个节流阀
    const onChange = debounce((amount,detail)=>{
        let [id,index]=detail.name.split("&");
        console.log("你单击了改变数量,商品id为",id);
        console.log(index);
        reqChangeNumCart(id,{
          num:amount
        });
        //更改list列表当中的商品数量,以便可以计算总价
        shopList.list[index].num = amount;
        //更改购车列表项目,也就是更改购物车商品总数
        let changAmount = amount-$store.state.user.amountCarts;//计算变化数量
        //原来是10 之后是 12 变化了 12-10 = 2
        //原来是10 之后是 6 变化了   6-10 = -4;
        $store.dispatch("setCarNum",changAmount);
    },200);

    onMounted(()=>{
      init();
    });
    
    return {
      ...toRefs(shopList),
      onSubmit,
      onChange,
      groupChange,
      checkAll,
      deleteGood,
      toShopping
    };
  },
};
</script>

<style lang="less" scoped>
#shopcart {
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
        &>span{
          font-size: 15px;
        }
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
        padding: 0 10px;
        .price{
          float: left;
          font-size: 16px;
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
:deep(.van-icon-success:before) {
  font-size: 14px !important;
}

</style>
