import {
  createRouter,
  createWebHistory
} from 'vue-router'
//引入仓库
import store from "@/store/index";
import {
  Toast
} from "vant";
//引入路由组件
const Home = () => import("@/views/home/Home");
const ShopCart = () => import("@/views/shopcart/ShopCart");
const Category = () => import("@/views/category/Category");
const User = () => import("@/views/user/User");
const Detail = () => import("@/views/detail/Detail");
const Register = () => import("@/views/user/Register");
const Login = () => import("@/views/user/Login");
const AddressManager = () => import("@/views/user/Address/AddressManager");
const AddressEdit = () => import("@/views/user/Address/AddressEdit");
const CreateOrder = () => import("@/views/order/CreateOrder");
const Order = () => import("@/views/order/Order");
const OrderDetail = () => import("@/views/order/OrderDetail");
const About = () => import("@/views/other/About");
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
    name: "Home",
    component: Home,
    meta: {
      title: "梦洁小站-图书兄弟",
      keepAlive: true, // 组件需要缓存
    },
  },
  {
    path: "/shopcart",
    name: "Shopcart",
    component: ShopCart,
    meta: {
      title: "购物车-dreamlove.top"
    },
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
    meta: {
      title: "商品分类-dreamlove.top",
      keepAlive: true, // 组件需要缓存
    }
  },
  {
    path: "/user",
    name: "User",
    component: User,
    meta: {
      title: "个人中心-dreamlove.top",
    },
  },
  {
    //需要有商品id才可以进入
    //在加入购物车和立即购买需要登录后才可以
    path: "/detail",
    name: "Detail",
    component: Detail,
    meta: {
      title: "详细信息-dreamlove.top"
    },
    beforeEnter: (to, from, next) => {
      if (to.query.id) {
        //id存在
        next();
      } else {
        //id不存在
        next("/");
      }

    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "用户注册-dreamlove.top"
    },
    beforeEnter: (to, from, next) => {
      if (store.state.user.Authorization) {
        //有认证信息，跳转到个人中心
        next("/user");
      } else {
        next();
      }
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "用户登录-dreamlove.top"
    },
    beforeEnter: (to, from, next) => {
      if (store.state.user.Authorization) {
        //有认证信息，跳转到个人中心
        next("/user");
      } else {
        next();
      }
    }
  },
  {
    path: "/address",
    name: "Address",
    component: AddressManager,
    meta: {
      title: "地址管理-dreamlove.top"
    }
  },
  {
    path: "/addressedit",
    name: "Addressedit",
    component: AddressEdit,
    meta: {
      title: "地址编辑-dreamlove.top"
    }
  },
  {
    path: "/createorder",
    name: "CreateOrder",
    component: CreateOrder,
    meta: {
      title: "订单预览-dreamlove.top"
    }
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
    meta: {
      title: "订单管理-dreamlove.top"
    }
  },
  {
    path: "/orderdetail",
    name: "Orderdetail",
    component: OrderDetail,
    meta: {
      title: "订单详情-dreamlove.top"
    }
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "关于我们-dreamlove.top",
    }
  },

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})
//导航守卫
router.beforeEach((to, from, next) => {
  //to是目的地,from是起点,
  //更改网页title
  document.title = to.meta.title;
  let path = to.path;
  if (path === "/" || path === "/category" || path === "/detail" || path === "/register" || path === "/login" || path === "/about") {
    next();
  } else {
    if (store.state.user.Authorization) {
      //有认证信息，放行
      next();
    } else {
      Toast.fail("请登录");
      //没有认证信息,跳转到登录界面
      next("/login");
    }
  }
})

export default router