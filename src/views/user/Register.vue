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
              :rules="[
              {required:true,message:'请输入用户名'},
              { pattern:userNameReg,required: true, message: '用户名至少为6个字符' }
              ]"/>
            <!-- 密码 -->
            <van-field
              v-model="password"
              autocomplete
              type="password"
              name="pattern"
              label="密码"
              placeholder="请输入密码"
              :rules="[
                {required: true,message:'请输入密码'},
                {pattern:passworReg,message:'密码至少为6个字符'}
              ]" />
            <!-- 确认密码 -->
             <van-field
              v-model="password_confirmation"
              autocomplete
              type="password"
              name="validator"
              label="确认密码"
              placeholder="请再次输入密码"
              :rules="[{ validator:validatorFnAgain ,required: true }]" />
              <!-- 邮件 -->
               <van-field
              autocomplete
              v-model="email"
              type="text"
              label="电子邮箱"
              name="pattern"
              placeholder="请输入邮件"
              :rules="[
              { required: true, message: '请填写您的邮箱' },
              { pattern: emailReg, message: '邮箱格式错误'}]" />
          </van-cell-group>
          
          <router-link to="/" class="account-created">已有账号?立即登录</router-link>
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
import {Toast} from "vant";
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
        emailReg:/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
        //密码正则
        passworReg:/.{6,}/,
    }
    /* 用户单击提交数据 */
    function onSubmit(){
      //显示提示
      Toast.loading({
        message:"注册中...",
        forbidClick:true,
      });
      reqRegister(userInfo).then(response=>{
        //关闭提示
        Toast.clear();
        console.log(response);
        //提示成功,失败会在拦截器中捕获的
        Toast.success("注册成功...");
        //跳转到位置

      }).catch(reason=>{
         //关闭提示
        Toast.clear();
      })
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
        validatorFnAgain,
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
  .van-button--primary{
    background-color: #4bae81;
    border-color: #4bae81;
  }
  //已有账号
  .account-created{
    color: #017eff;
    font-size: 14px;
    float: left;
    margin-left: 30px;
    padding: 15px 0;
  }
}
</style>
