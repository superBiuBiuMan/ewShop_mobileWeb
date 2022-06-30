<template>
  <div>
    <Navbar>
      <template #default> 商品分类 </template>
    </Navbar>
    <div class="category-wrapper">
      <!-- 排序分布栏 -->
      <div class="navbar"></div>
      <!-- 左侧分类列表 -->
      <div class="left-list">
        <div class="left-item-content">
          <!-- v-model="activeNames" -->
          <van-collapse v-model="activeName" accordion>
            <!-- title为一级列表的展示名  -->
            <van-collapse-item
              v-for="(firstLevel, index) in categoryList"
              :key="firstLevel.id"
              :title="firstLevel.name"
              :name="firstLevel.name"
            >
              <!-- 二级列表 -->
              <van-sidebar v-model="activeSecond">
                <van-sidebar-item
                  v-for="(secondLevel,index) in firstLevel.children"
                  :key="secondLevel.id"
                  :title="secondLevel.name"
                />
              </van-sidebar>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
      <!-- 书籍展示 -->
      <div class="show-list"></div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import { ref, onMounted } from "vue";
import { reqCategory } from "@/api/category";
export default {
  name: "Category",
  components: {
    Navbar,
  },
  setup() {
    //左分类默认项
    const activeSecond = ref(0);//二级分类列表目前活动项
    const activeName = ref();//一级分类列表的活动项记录

    const categoryList = ref([]);
    onMounted(async () => {
      let result = await reqCategory();
      //保存存储数据
      categoryList.value = result.categories;
    });
    return {
      activeSecond,
      activeName,
      categoryList,
    };
  },
};
</script>

<style lang="less" scoped>
.category-wrapper {
  margin-top: 45px;
  display: flex;
  // 为左侧分类列表的宽度
  @leftItemWidth: 130px;
  //nav的宽度
  @navBarHidth: 40px;
  .navbar {
    background-color: red;
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
    background-color: blue;
    position: absolute;
    right: 0;
    // nav的宽度 + 顶部的商品分类宽度
    top: @navBarHidth+45;
    left: @leftItemWidth;
    height: 100%;
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

