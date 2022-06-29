<template>
  <div class="table-control">
    <div
      v-for="(item, index) in tableControlTitle"
      :key="index"
      @click.prevent="changeActive(index)"
      class="table-control-item"
      :class="{ active: currentIndex == index }" >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "TableControl",
  props: {
    tableControlTitle: {
      type: Array,
      default() {
        //避免空值报错
        return [];
      },
    },
  },
  setup(props, { emit }) {
    //当前active的默认索引
    let currentIndex = ref(0);
    /* 改变当前默认active索引 */
    function changeActive(index) {
      currentIndex.value = index;
      //触发自定义事件
      emit("indexChange", index);
    }
    return {
      currentIndex,
      changeActive,
    };
  },
};
</script>

<style lang="less" scoped>
.table-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  position: sticky;
  top: 45px;
  z-index: 10;
  background-color: var(--color-background);
  margin-bottom: 10px;
  .table-control-item {
    flex-grow: 1;
    span {
      padding: 6px;
    }
    /* 活动时候的样式 */
    &.active {
      color: var(--color-hight-text);
      span {
        border-bottom: 3px solid var(--color-hight-text);
      }
    }
  }
}
</style>
