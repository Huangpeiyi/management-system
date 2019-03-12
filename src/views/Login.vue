<template>
<div class="login-container">
    <h3>登录</h3>
<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="账号" prop="username">
            <Input type="text" v-model="formCustom.username"></Input>
        </FormItem>
        <FormItem label="密码" prop="passwd">
            <Input type="password" v-model="formCustom.passwd"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">登录</Button>
            <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</div>
    
</template>
<script>
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不正确'));
                } else {
                    callback();
                }
            }; 
            const validateusername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入您的账号'));
                } else {
                    callback();
                }
            };            
            return {
                formCustom: {
                    passwd: '',
                    username: '',
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    username: [
                        { validator: validateusername, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('登录成功');
                    } else {
                        this.$Message.error('登录不成功');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
<style lang="scss">
*{
    margin:0;
    padding:0;
}
.login-container{
    width:300px;
    position:absolute;
    left:50%;
    top:50%;
    margin-left:-150px;
    margin-top:-150px;
    h3{
        text-align: center;
        margin:30px 0;
        color:rgb(0, 162, 255);
    }
}
</style>
