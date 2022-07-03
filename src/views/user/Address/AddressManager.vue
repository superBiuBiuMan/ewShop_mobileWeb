<template>
  <div id="address">
    <Navbar>
      <template #default>地址管理</template>
    </Navbar>
     <div v-show="list.length == 0" style="margin-top:200px;text-align: center;font-size:18px">
      还没有地址信息,去添加吧!
    </div>
    <div class="content">
      <van-address-list
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    />
    </div>

  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import { reqAddressList } from "@/api/address";
import {Toast} from "vant";
import { onMounted,reactive,toRefs,} from 'vue';
import {useRouter } from "vue-router";
export default {
  name: "Address",
  components: {
    Navbar,
  },
  setup() {
    const $router = useRouter();
    // list的格式
    /* [    {
        id: '1',
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
      }, 
        {...},
        {...}
      ]
      */
    const addressInfo = reactive({
      //地址列表
      list:[],
    });
    //单击了增加地址
    function onAdd(){
      console.log("单击了增加地址图标");
      $router.push({path:"/addressedit",query:{type:0}});
    }
    //单击编辑图标
    function onEdit(item){
      //传递给id,然后通过调用函数获取地址信息
      $router.push({path:"/addressedit",query:{type:1,id:item.id}});
    }
    //初始化函数
    function init(){
      Toast.loading({message:"载入中...",duration:0,forbidClick:true});
      reqAddressList().then(res=>{
        //购物车为空
        if(res.data.length===0){
          return;
        }
        //购物车不为空的时候
        addressInfo.list = res.data.map(item=>{
          return {
            id: item.id,
            name: item.name,
            tel: item.phone,
            //完整地址
            address: `${item.province} ${item.city} ${item.county} ${item.address}`,
            isDefault: !!item.is_default,
          }
        })
      }).finally(()=>{
        Toast.clear();
      })
    }
    onMounted(()=>{
      init();
    })
    return {
      ...toRefs(addressInfo),
      onEdit,
      onAdd
    }
  },
};
</script>

<style lang="less" scoped>
#address {
  margin-top: 45px;
  .content {
    background: white; 
    ::v-deep .van-radio__icon {
      display: none;
    }
  }
  ::v-deep .van-address-list__bottom{
      bottom: 50px;
      background-color:unset;
    }
}
</style>
