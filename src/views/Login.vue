<template>
  <div class="login-container">
    <h3>登录</h3>
    <Form ref="formData" :model="formData" :rules="ruleCustom" :label-width="80">
      <FormItem label="账号" prop="uname">
        <Input type="text" v-model="formData.uname"></Input>
      </FormItem>
      <FormItem label="密码" prop="upwd">
        <Input type="password" v-model="formData.upwd"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formData')">登录</Button>
        <Button @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不正确"));
      } else {
        callback();
      }
    };
    const validateuname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您的账号"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        uname: "",
        upwd: ""
      },
      ruleCustom: {
        upwd: [{ validator: validatePass, trigger: "blur" }],
        uname: [{ validator: validateuname, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      // this.$refs[name].validate((valid) => {
      //     if (valid) {
      //         this.$Message.success('登录成功');
      //     } else {
      //         this.$Message.error('登录不成功');
      //     }
      // })
      //console.log(name);
      // this.$axios({
      //     method:"POST",
      //     url:`/admin/account/login`,         
      //     data: this.formData,
      //     //处理跨域
      //     withCredentials:true,
      // }).then(res=>{
      //     const {status,message} = res.data;
      //     if(status==1){
      //         //登录失败
      //         this.$Message.error('登录不成功');
      //     }else{
      //         this.$router.back();
      //     }
      // })
      this.$store.dispatch('user/login',this.formData).then(()=>{
        this.$router.back();
      });
     
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.login-container {
  width: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -150px;
  h3 {
    text-align: center;
    margin: 30px 0;
    color: rgb(0, 162, 255);
  }
}
</style>
