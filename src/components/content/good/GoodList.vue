<template>
  <div>
    <div class="good">
      <GoodListItem
        v-for="item in showData"
        :key="item.id"
        :itemData="item"
        @click="viewDetail(item.id)"
      >
      </GoodListItem>
    </div>
  </div>
</template>

<script>
import GoodListItem from "@/components/content/good/GoodListItem";
import { useRouter } from 'vue-router';
export default {
  name: "GoodList",
  props: {
    showData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodListItem,
  },
  setup(){
    const $router = useRouter();
     /* 跳转到查看详情页 */
    function viewDetail(id) {
      $router.push({ path: "/detail", query: { id } });
    }
    return {
      viewDetail
    }
  }
};
</script>

<style lang="less" scoped>
.good {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  // width: 100%;
  width: 100vw;
  // padding-bottom: 60px;
}
</style>
