//专门用户存储数据和修改数据的方法
// 1.引入axios
import axios from 'axios';

export default {
  //命名空间
  namespaced: "user",
  //初始化数据
  state: {
    //用户名
    username: localStorage.getItem("username") || "",
    // 身份信息
    identity: localStorage.getItem("identity") || "",
  },
  mutations: {

  },
  //异步修改数据
  actions: {
    login({commit,state}, data){
        return new Promise((resolve,reject)=>{
            axios({
                method:"POST",
                url:`/admin/account/login`,         
                data,
                //处理跨域
                withCredentials:true,
            }).then(res=>{
                const {status,message} = res.data;
                if(status==1){
                    //登录失败
                    this.$Message.error('登录不成功');
                }else{
                    //把接口返回的值更新到store下的数据
                    state.username=message.uname;
                    state.identity=message.realname;

                    //把用户信息存储到本地
                    localStorage.setItem("username",message.uname);
                    localStorage.setItem("identity",message.realname);

                    resolve();
                }
            })
        });
    }
  }
}
