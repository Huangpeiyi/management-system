import Vue from 'vue'
import Router from 'vue-router'

//引入组件
//import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import GoodsList from './views/goods/GoodsList.vue'
import CategoryList from './views/category/CategoryList.vue'
import MemberList from './views/member/MemberList.vue'
import OrderList from './views/order/OrderList.vue'
import Login from './views/Login.vue'


Vue.use(Router)

export default new Router({
  routes: [
    { path: "/", redirect: "/login" },
    {path:"/login",component:Login,meta:"登录页"},
    {
      path: '/admin',
      name: 'Admin',
      meta: "管理后台",
      redirect: "/admin/order-list",
      component:Admin ,
      children:[
        {
          path: "goods-list", 
          name:'goods-list',
          component: GoodsList, 
          meta: "商品管理",
          component: () => import(/* webpackChunkName: "goods-list" */ './views/goods/GoodsList.vue')
        },
        {
          path: "category-list", 
          name:'category-list',
          component: CategoryList, 
          meta: "栏目管理",
          component: () => import(/* webpackChunkName: "category-list" */ './views/category/CategoryList.vue')
        },
        {
          path: "member-list", 
          name:'member-list',
          component: MemberList, 
          meta: "会员列表",
          component: () => import(/* webpackChunkName: "member-list" */ './views/member/MemberList.vue')
        },
        {
          path:'order-list',
          name:'order-list',
          meta: "订单列表",
          component: () => import(/* webpackChunkName: "order-list" */ './views/order/OrderList.vue')
        }
      ]
    }
  ]
})


//  ,
//     {
//       path: '',
//       name: '',
          //route level code-splitting路线级别代码分隔
          //this generates a separate chunk (about.[hash].js) for this route 这将为该路由生成一个单独的块(大约.[hash].js)
          //which is lazy-loaded when the route is visited.当访问路由时，它是惰性加载的。
//       component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//     } 
/* 

访问路由时使用懒加载，
这个文件会越来越庞大，这个文件即使你在访问首页默认页等时候需要被加载，
然而这个文件不进行分割的话，可能有好几兆甚至几十兆
大多数的项目首页可能没啥交互特别复杂的功能，却要强制加载首页并不会用的其他页的资源，
而且首页也是访问量最大的，为了节省资源，为了加快首页访问速度，也需要按需加载才行啊 */