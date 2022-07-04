<template>
  <div id="about">
    <!-- 顶部  -->
    <Navbar>
      <template #default> 关于我们 </template>
    </Navbar>
    <article class="page-content">
      <center><h1>为什么写?</h1></center>
      <hr />
      <center><h1>因为</h1></center>
      <hr />
      <center><h1>动感超人</h1></center>
      <hr />
      <img
        src="https://dreamos.oss-cn-beijing.aliyuncs.com/gitblog/(_%60G%60IX)JCESSEF7MPNSYZM.png"
      />
    </article>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
export default {
  name: "About",
  components: {
    Navbar,
  },
};
</script>

<style lang="less" scoped>
#about {
  margin-top: 45px;
  //   margin-bottom: 60px;
  .page-content {
    width: 100%;
    overflow: hidden;
    img {
      width: 100%;
      vertical-align: top;
      height: auto;
    }
  }
}
</style>
