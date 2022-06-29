<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
  {{ banner }}
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { reactive, onMounted, ref } from "vue";
// import {reqIndex} from "@/api/home.js";
console.log(reqIndex);
export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  setup() {
    //预先定义一个数据填充占位

    const banner = ref([]);
    // var banner = reactive({});
    //这里好像推荐使用hook!!!!!!!!!!!!!
    // onMounted(() => {
    //   reqIndex()
    //     .then((response) => {
    //       banner.value = response;
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // });

    return {
      banner,
    };
  },
};
</script>
