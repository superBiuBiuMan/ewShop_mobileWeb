import {
  createRouter,
  createWebHistory
} from 'vue-router'
//引入路由组件
const Home = ()=>import("@/views/home/Home");
const ShopCart = ()=>import("@/views/shopcart/ShopCart");
const Category = ()=>import("@/views/category/Category");
const User = ()=>import("@/views/user/User");
const Detail = ()=>import("@/views/detail/Detail");
const Register = ()=>import("@/views/user/Register");
const Login = ()=>import("@/views/user/Login");
const AddressManager = ()=>import("@/views/user/Address/AddressManager");
const AddressEdit = ()=>import("@/views/user/Address/AddressEdit");
const CreateOrder = ()=>import("@/views/order/CreateOrder");
const Order = ()=>import("@/views/order/Order");
const OrderDetail = ()=>import("@/views/order/OrderDetail");
const About = ()=>import("@/views/other/About");
// meta为定义window.title的属性所用
const routes = [
  // {
  //   path: "/home",
  //   name: "Home",
  //   component: Home,
  //   meta:{
  //     title:"图书兄弟",
  //     keepAlive: true, // 组件需要缓存
  //   },
  // },
  {
    path: '/',
    name:"Home",
    component:Home,
    meta:{
      title:"梦洁小站-图书兄弟",
      keepAlive: true, // 组件需要缓存
    },
  },
  {
    path: "/shopcart",
    name: "Shopcart",
    component: ShopCart,
    meta:{
      title:"购物车-dreamlove.top"
    }
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
    meta:{
      title:"商品分类-dreamlove.top",
      keepAlive: true, // 组件需要缓存
    }
  },
  {
    path: "/user",
    name: "User",
    component: User,
    meta:{
      title:"个人中心-dreamlove.top",
      keepAlive: true, // 组件需要缓存
    },
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path:"/detail",
    name:"Detail",
    component:Detail,
    meta:{
      title:"详细信息-dreamlove.top"
    }
  },
  {
    path:"/register",
    name:"Register",
    component:Register,
    meta:{
      title:"用户注册-dreamlove.top"
    },
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path:"/login",
    name:"Login",
    component:Login,
    meta:{
      title:"用户登录-dreamlove.top"
    },
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path:"/address",
    name:"Address",
    component:AddressManager,
    meta:{
      title:"地址管理-dreamlove.top"
    }
  },
  {
    path:"/addressedit",
    name:"Addressedit",
    component:AddressEdit,
    meta:{
      title:"地址编辑-dreamlove.top"
    }
  },
  {
    path:"/createorder",
    name:"CreateOrder",
    component:CreateOrder,
    meta:{
      title:"订单预览-dreamlove.top"
    }
  },
  {
    name:"Order",
    path:"/order",
    component:Order,
    meta:{
      title:"订单管理-dreamlove.top"
    }
  },
  {
    name:"Orderdetail",
    path:"/orderdetail",
    component:OrderDetail,
    meta:{
      title:"订单详情-dreamlove.top"
    }
  },
  {
    path:"/about",
    name:"About",
    component:About,
    meta:{
      title:"关于我们-dreamlove.top",
    }
  },

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//导航守卫
router.beforeEach((to,from,next)=>{
  //更改网页title
  document.title = to.meta.title;
  next();
})

export default router