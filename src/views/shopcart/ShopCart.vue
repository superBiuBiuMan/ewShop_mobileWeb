<template>
    <div>
    <Navbar>
      <template #default>
        购物车
      </template>
    </Navbar>
  </div>
</template>

<script>
import Navbar from '@/components/common/navbar/Navbar'
export default {
  name: 'Shopcart',
  components:{
    Navbar,
  }
}
</script>

<style lang="less" scoped>

</style>
