<template>
  <div>
    <div class="good">
      <GoodListItem
        v-for="item in showData"
        :key="item.id"
        :itemData="item"
      >
      </GoodListItem>
    </div>
  </div>
</template>

<script>
import GoodListItem from "@/components/content/good/GoodListItem";
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
};
</script>

<style lang="less" scoped>
.good {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  // padding-bottom: 60px;
}
</style>
