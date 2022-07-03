<template>
  <div id="address-edit">
    <Navbar>
      <template #default>{{title}}</template>
    </Navbar>
    <!-- 
      @change-detail="onChangeDetail"
      :search-result="searchResult"
      show-search-result
    -->
    <van-address-edit
      :area-list="areaList"
      :show-delete="showDelete"
      show-set-default
      :address-info="addressInfo"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      
    />
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar";
import {reqAddAddress,reqAddressDetail,reqAddressDelete} from "@/api/address";
//Vant 官方提供了一份默认的中国省市区数据
import { areaList } from '@vant/area-data';
import {Toast} from "vant";
import {onBeforeMount, reactive,toRefs} from "vue";
import {useRouter,useRoute} from "vue-router";
export default {
  name: "AddressEdit",
  components: {
    Navbar,
  },
  setup(){
    //当前路由对象
    const $route = useRoute();
    //路由总管
    const $router = useRouter();
    //当前展示信息
    const state = reactive({
      //顶部栏显示字体
      title:"",
      //是否显示删除地址按钮
      showDelete:false,
      //地址信息初始化
      addressInfo:{},
      //地址id
      addressId:"",
    })
    //#region 
    //区域数据格式可以看这里https://vant-contrib.gitee.io/vant/#/zh-CN/area
    //   province_list: {
    //   110000: '北京市',
    //   120000: '天津市',
    // },
    // city_list: {
    //   110100: '北京市',
    //   120100: '天津市',
    // },
    // county_list: {
    //   110101: '东城区',
    //   110102: '西城区',
    //   // ....
    // },
    //#endregion
    //删除按钮
    function onDelete(){
      Toast.loading({message:"删除中...",duration:0,forbidClick:true});
      reqAddressDelete(state.addressId).then(()=>{
        Toast.clear();
        Toast.success("删除成功");
        // 回到之前页面
         setTimeout(() => {
           $router.go(-1);
        }, 800);
      }).catch(()=>{
        Toast.clear();
      })
    }
    //用户单击保存
    function onSave(content){
      Toast.loading({message:"添加中...",duration:0,forbidClick:true});
      //#region 
      // content对象内容
      // addressDetail: "高大街"    详细地址
      // areaCode: "130435"     地区编码，通过 省市区选择 获取（必填）
      // city: "邯郸市"       	城市
      // country: ""  
      // county: "曲周县"      区县	
      // isDefault: false     是否为默认地址	
      // name: "李白"          姓名
      // postalCode: ""       邮政编码
      // province: "河北省"    省份
      // tel: "13333333333"   手机号
      //#endregion
      //1.整理数据
      let data = {
        name:content.name,
        address:content.addressDetail,
        phone:content.tel,
        province:content.province,
        city:content.city,
        county:content.county,
        is_default:content.isDefault ? 1 : 0,
      };
      //2.发送请求
      reqAddAddress(data).then(res=>{
        Toast.clear();
        Toast.success('添加成功!');
        setTimeout(() => {
           $router.go(-1);
        }, 800);
      }).catch(res=>{
        Toast.clear();
      })
    }
    onBeforeMount(()=>{
      init();
    })
    //获取详细地址信息
    function getDetailAddress(id){
      Toast.loading({message:"载入中...",duration:0,forbidClick:true});
          reqAddressDetail($route.query.id).then((res)=>{
            let _areaCode = getAreaCode(res.county);
            state.addressInfo = {
                name:res.name,
                tel:res.phone,
                province: res.province,
                city:res.city,
                county:res.county,
                areaCode:_areaCode,
                addressDetail:res.address,
                isDefault: !!res.is_default
            };

          }).finally(()=>{
            Toast.clear();
        })
    }
    //获取对应区获取区域代码
    function getAreaCode(county){
      var id = "";
      //通过抛出异常来中断,以此来提高速度
      Object.keys(areaList.county_list).forEach(itemKey=>{
        try {
          if(areaList.county_list[itemKey] === county){
            throw new Error(itemKey);
          }
        } catch (error) {
          id = error.message;
        }
      });

      return id;
    }
    //初始化操作
    function init(){
       //代表是新增地址
      if($route.query.type==0){
        state.title = "新增地址";
      }
      //代表是编辑地址
      else{
        state.title = "编辑地址";
        state.showDelete = true;
        //获取详细地址信息
        if($route.query.id){
            state.addressId = $route.query.id;//保存id
            getDetailAddress($route.query.id);
        }
      }
    }
   
    return {
      areaList,
      onSave,
      ...toRefs(state),
      onDelete,
    }
  }
};
</script>

<style lang="less" scoped>
#address-edit {
  margin-top: 45px;
  overflow: hidden;
}
</style>
