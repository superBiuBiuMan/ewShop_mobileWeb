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
// meta为定义window.title的属性所用
const routes = [{
    path: "/home",
    name: "home",
    component: Home,
    meta:{
      title:"图书兄弟"
    },
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: ShopCart,
    meta:{
      title:"购物车-dreamlove.top"
    }
  },
  {
    path: "/category",
    name: "category",
    component: Category,
    meta:{
      title:"商品分类-dreamlove.top"
    }
  },
  {
    path: "/user",
    name: "user",
    component: User,
    meta:{
      title:"个人中心-dreamlove.top"
    },
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path:"/detail",
    name:"detail",
    component:Detail,
    meta:{
      title:"详细信息-dreamlove.top"
    }
  },
  {
    path:"/register",
    name:"register",
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
    name:"login",
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
    name:"address",
    component:AddressManager,
    meta:{
      title:"地址管理-dreamlove.top"
    }
  },
  {
    path:"/addressedit",
    name:"addressedit",
    component:AddressEdit,
    meta:{
      title:"地址编辑-dreamlove.top"
    }
  },
  {
    path:"/createorder",
    name:"createorder",
    component:CreateOrder,
    meta:{
      title:"订单预览-dreamlove.top"
    }
  },
  {
    name:"order",
    path:"/order",
    component:Order,
    meta:{
      title:"订单管理-dreamlove.top"
    }
  },
  {
    name:"orderdetail",
    path:"/orderdetail",
    component:OrderDetail,
    meta:{
      title:"订单详情-dreamlove.top"
    }
  },
  // {
  //   path:"/addresse/:edit",
  //   name:"addressedit",
  //   component:AddressEdit,
  //   meta:{
  //     title:"地址编辑-dreamlove.top"
  //   }
  // },
  //重定向
  {
    path: '/',
    name:"default",
    component:Home,
    meta:{
      title:"图书兄弟"
    },
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