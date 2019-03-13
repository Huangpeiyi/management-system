
<template>
  <div class="layout">
    <!-- 侧边导航栏 -->
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu :active-name="3-1" theme="dark" width="auto" :open-names="['3']">
        <Submenu :name="`${index +1}`" v-for="(item,index) in menus" :key="`${index +1}`">
          <template slot="title">
            <Icon :type="item.icon"></Icon>{{item.title}}
          </template>
          <MenuItem :name="`${index +1}`-`${subIndex +1}`" v-for="(subItem,subIndex) in item.group" :key="`${subIndex +1}`">
            <router-link :to="subItem.src" class="meauBtn">{{subItem.title}}</router-link>
          </MenuItem>          
        </Submenu>
      </Menu>
    </Sider>   
    <!-- 右侧 -->
    <Layout :style="{marginLeft: '200px'}">
      <!-- 头部 -->
      <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
        <b style="font-size:14px;">{{username}}{{identity}}</b>
        <Button style="float:right;margin-top:16px;" @click="handleLogout">退出登录</Button>
      </Header>

      <Content :style="{padding: '0 16px 16px'}">
        <!-- 面包屑导航 -->
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem v-for="(item,index) in routerInfo" :key="index">
                <router-link :to="{ path: item.src }">{{item.title}}</router-link>
          </BreadcrumbItem>
        </Breadcrumb>

        <!-- 内容区 -->
        <Card>
          <div style="height: 760px">
            <router-view/>
          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>
<script>
import {mapState} from "vuex"
export default {
  data() {
    return {
      // 当前菜单的数据
      menus: [
        {
          icon: "md-cart",
          title: "购物商场",
          group: [
            { src: "/admin/goods-list", title: "商品管理" },
            { src: "/admin/category-list", title: "栏目管理" }
          ]
        },
        {
          icon: "md-contact",
          title: "会员管理",
          group: [{ src: "/admin/member-list", title: "会员列表" }]
        },
        {
          icon: "md-list-box",
          title: "订单管理",
          group: [{ src: "/admin/order-list", title: "订单列表" }]
        }
      ]
    };
  },
  computed:{
      //监听路由变化，生成一个数组用于渲染面包屑导航
      routerInfo(){
          //console.log(this.$route.matched);
          const matched = this.$route.matched;
          //重新生成一个数组
          var newArr = matched.map(v=>{
              return {
                  title:v.meta,
                  src:v.path
              };
          })
          return newArr;
      },
      //头部获取store的值
      ...mapState("user",{
        username:"username",
        // 身份信息
        identity:"identity",
      })
  },
  methods:{
    handleLogout(){
      this.$store.dispatch("user/logout",()=>{
        this.$router.push("/login");
      })
    }
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
a.meauBtn{
    color:#fff;
    display:block;
    width:100%;
    height:100%;
}
</style>