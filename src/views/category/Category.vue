<template>
  <div>
    <Navbar>
      <template #default> 商品分类 </template>
    </Navbar>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
export default {
  name: "Category",
  components: {
    Navbar,
  },
};
</script>

<style lang="less" scoped>
</style>
