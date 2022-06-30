<template>
  <div class="register">
    <Navbar>
      <template #default> 用户注册 </template>
    </Navbar>
    <div class="register-content">
      <!-- logo展示 -->
      <div class="register-logo">
        <van-image
          width="10rem"
          height="10rem"
          src="https://dreamlove.top/img/favicon.png"
        />
      </div>
      <!-- 注册表单 -->
      <div class="register-form">
        <van-form @submit="onSubmit">
          <!-- 输入项目 -->
          <van-cell-group inset>
              <!-- 用户名  -->
            <van-field
              v-model="name"
              autocomplete
              name="pattern"
              label="用户名"
              placeholder="用户名"
              :rules="[{ pattern:userNameReg,required: true, message: '用户名至少为6个字符' }]"/>
            <!-- 密码 -->
            <van-field
              v-model="password"
              autocomplete
              type="password"
              name="pattern"
              label="密码"
              placeholder="请输入密码"
              :rules="[{pattern:passworReg, required: true,message:'密码至少为6个字符'}]" />
            <!-- 确认密码 -->
             <van-field
              v-model="password_confirmation"
              autocomplete
              type="password"
              name="validator"
              label="确认密码"
              placeholder="请再次输入密码"
              :rules="[{ validator:validatorFnAgain ,required: true }]" />
              
              <van-field
              autocomplete
              v-model="email"
              type="text"
              name="pattern"
              label="电子邮箱"
              placeholder="请输入邮件"
              :rules="[{ pattern:emialReg,required: true, message: '请输入正确的邮件' }]" />
          </van-cell-group>
          <!-- 提交按钮 -->
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive,toRefs} from "vue";
import {reqRegister} from "@/api/user";
export default {
  name: "Register",
  setup(){
    /* 存储用户注册信息 */
    const userInfo = reactive({
        name:"",
        email:"",
        password:"",
        password_confirmation:""
    });
    /* 正则验证规则 */
    const regCheck = {
        //用户名至少为6位
        userNameReg:/.{6,}/,
        //邮箱正则
        emialReg:/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/ig,
        //密码正则
        passworReg:/.{6,}/,
    }
    /* 用户单击提交数据 */
    function onSubmit(){
        // reqRegister(userInfo).then(response=>{

        // })
    }

    /* 验证器验证第二次密码 */
    function validatorFnAgain(){
        if(userInfo.password !=userInfo.password_confirmation){
            return "二次输入的密码不正确!"
        }
    }
    return {
        ...toRefs(userInfo),
        onSubmit,
        ...regCheck,
        validatorFnAgain
    }
  }
};
</script>

<style lang="less" scoped>
.register {
  margin-top: 45px;
  .register-logo{
      margin-top: 15+45px;
  }
  .register-form{
      margin-top: 15px;
  }
}
</style>
