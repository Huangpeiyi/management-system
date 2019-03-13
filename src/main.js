import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

//引入iview框架
import iView from 'iview';
import 'iview/dist/styles/iview.css'; 
Vue.use(iView);

// 1.引入axios
import axios from 'axios';

//给axios每次请求自动加上域名
axios.defaults.baseURL="http://localhost:8899";

// 2.把axios绑定到vue实例的属性$axios
Vue.prototype.$axios = axios;


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
