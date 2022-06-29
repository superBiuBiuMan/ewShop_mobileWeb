<template>
    <div>
    <Navbar>
      <template #default>
        个人中心
      </template>
    </Navbar>
  </div>
</template>

<script>
import Navbar from '@/components/common/navbar/Navbar';
export default {
  name: 'User',
  components:{
    Navbar
  }
}
</script>

<style lang="less" scoped>

</style>
