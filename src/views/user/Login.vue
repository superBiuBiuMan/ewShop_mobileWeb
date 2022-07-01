<template>
  <div class="login">
    <Navbar>
      <template #default> 用户登录 </template>
    </Navbar>
    <div class="login-content">
      <!-- logo展示 -->
      <div class="login-logo">
        <van-image
          width="10rem"
          height="10rem"
          src="https://dreamlove.top/img/favicon.png"
        />
      </div>
      <!-- 登录表单 -->
      <div class="login-form">
        <van-form @submit="onSubmit">
          <!-- 输入项目 -->
          <van-cell-group inset>
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
             
          </van-cell-group>
          
          <router-link to="/register" class="account-create">立即注册</router-link>
          <!-- 提交按钮 -->
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
    
  
  </div>
</template>

<script>
import {reactive,toRefs} from "vue";
import {Toast} from "vant";
import {reqLogin} from "@/api/user";
export default {
  name: "login",
  setup(){
    /* 存储用户登录输入信息 */
    const userInfo = reactive({
        email:"",
        password:"",
    });
    /* 正则验证规则 */
    const regCheck = {
        //邮箱正则
        emailReg:/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
        //密码正则
        passworReg:/.{6,}/,
    }
    /* 用户单击提交数据 */
    function onSubmit(){
      //显示提示
      Toast.loading({
        message:"登录中...",
        forbidClick:true,
      });
      //登录提交
      reqLogin(userInfo).then(response=>{
        //关闭提示
        Toast.clear();
        console.log(response);
        //提示成功,失败会在拦截器中捕获的
        Toast.success("登录成功...");
        //跳转到位置
      }).catch(reason=>{
         //关闭提示
        Toast.clear();
      })
    }

    
    return {
        ...toRefs(userInfo),
        onSubmit,
        ...regCheck,
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  margin-top: 45px;
  .login-logo{
      margin-top: 15+45px;
  }
  .login-form{
      margin-top: 15px;
  }
  .van-button--primary{
    background-color: #4bae81;
    border-color: #4bae81;
  }
  //已有账号
  .account-create{
    color: #017eff;
    font-size: 14px;
    float: left;
    margin-left: 30px;
    padding: 15px 0;
  }
}
</style>
