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
        <van-card
          v-for="(item) in showGood"
          :key="item.id"
          :title="item.title"
          :price="item.price"
          :origin-price="Math.floor(item.price*0.8)"
          :num="item.comments_count	"
          :tag="item.comments_count>=0?'流行':'热销'"
          :thumb="item.cover_url"
          :lazy-load="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import { ref, onMounted ,reactive,computed, watch} from "vue";
import { reqCategory,reqCategoryGoods, } from "@/api/category";
export default {
  name: "Category",
  components: {
    Navbar,
  },
  setup() {
    //左分类默认项
    const activeSecond = ref(0); //二级分类列表目前活动项
    const activeName = ref(); //一级分类列表的活动项记录
    const activeTab = ref(0); //nav的选中项记录
    const categoryList = ref([]); //左侧分类列表
    const currentType = ref('sales');//当前商品默认展示排序方式
    const currentCid = ref(0);//当前商品的二级分类id

    //展示的数据项
    const showGood = computed({
      get(){
        return goods[currentType.value].list;
      },
      set(newValue){
        goods[currentType.value].list = newValue;
      }
    })

    //存储请求获取到的数据
    const goods = reactive({
      sales:{page:1,list:[]},
      price:{page:1,list:[]},
      comments_count:{page:1,list:[]},
    })
    /* nva选项被单击回调,结构出排序类别 */
    function onClickTab({ name }) {
      // 原始输出
      // {name: 'price', title: '价格排序', event: PointerEvent, disabled: false}
      console.log("nav选项被单击", name);
      //更改类别
      currentType.value = name;
    } 

    /* 监视左侧二级列表和排序方式的变化 */
    watch([currentType,currentCid],async ()=>{  
        console.log('监视左侧二级列表或排序方式被改变了');
        //清空原来数据
        showGood.value = [];
        //重新发送请求
        let result = await reqCategoryGoods(currentType.value,currentCid.value);
        goods[currentType.value].list = result.goods.data;
    })

    // 左侧列表里面的二级选项被单击
    function getGoods(id) {
      console.log("左侧列表里面的二级选项被单击", id);
      //更新二级分类id记录值
      currentCid.value = id;
    }
    /* 初始化请求数据函数 */
    // async function reqInit(){
      
    // }
    onMounted(async () => {
      let result = await reqCategory();
      //保存存储数据
      categoryList.value = result.categories;
      //保存默认数据
      goods.sales.list = result.goods.data;
    });
    return {
      activeSecond,
      activeName,
      categoryList,
      activeTab,
      onClickTab,
      getGoods,
      showGood
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

