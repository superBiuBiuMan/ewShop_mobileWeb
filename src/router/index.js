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
      title:"图书兄弟-购物车"
    }
  },
  {
    path: "/category",
    name: "category",
    component: Category,
    meta:{
      title:"图书兄弟-商品分类"
    }
  },
  {
    path: "/user",
    name: "user",
    component: User,
    meta:{
      title:"图书兄弟-个人中心"
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
      title:"图书兄弟-详细信息"
    }
  },
  {
    path:"/register",
    name:"register",
    component:Register,
    meta:{
      title:"图书兄弟-用户注册"
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
      title:"图书兄弟-用户登录"
    },
    beforeEnter: (to, from, next) => {
      next();
    }
  },
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