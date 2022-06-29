<template>
    <div>
    <Navbar>
      <template #default>
        商品详情
      </template>
    </Navbar>
  </div>
</template>

<script>
import Navbar from '@/components/common/navbar/Navbar';
import {useRoute} from "vue-router";
import {onMounted,ref} from "vue";
export default {
  name: 'Detail',
  components:{
    Navbar
  },
  setup(){
    //获取当前路由信息
    const $route = useRoute();
    let id = ref();
    onMounted(()=>{
      //保存传递过来的查询id
      id.value = $route.query.id;
    });

    return {
      id,
    }
  }
}
</script>

<style lang="less" scoped>

</style>
