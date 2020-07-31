// src\components\page\login.vue
<template>
    <div class="login-wrap">
        <div class="ms-login" v-if="two">
            <div class="ms-title">测试平台</div>
            <el-form :model="loginParam" :rules="rules" ref="loginForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="loginParam.username" placeholder="用户名" prefix-icon="el-icon-user">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="loginParam.password" prefix-icon="el-icon-lock">
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitLoginForm('loginForm')">登录</el-button>
                </div>
                <el-link type="primary" @click="two = false" style="text-align: center;">去注册 ></el-link>
                <el-link type="primary" @click="goFindPwd()" style="text-align:center;float:right">找回密码？</el-link>
            </el-form>
        </div>
        <div class="ms-login" v-else>
            <div class="ms-title">测试平台</div>
            <el-form :model="registerParam" :rules="rules" ref="registerForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="registerParam.username" placeholder="用户名" prefix-icon="el-icon-user">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="registerParam.password" prefix-icon="el-icon-lock">
                    </el-input>
                </el-form-item>
                <el-form-item prop="r_password">
                    <el-input type="password" placeholder="确认密码" v-model="registerParam.r_password" prefix-icon="el-icon-lock">
                    </el-input>
                </el-form-item>
                <el-form-item prop="email">
                    <el-input v-model="registerParam.email" placeholder="邮箱" prefix-icon="el-icon-message">
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitRegisterForm('registerForm')">注册</el-button>
                </div>
                <el-link type="primary" @click="two = true" style="text-align: center;">去登陆 ></el-link>
            </el-form>
        </div>
    </div>
</template>

<script>
import { login, register } from '../../api/api'
export default {
    name: "login",
    data: function() {
        var validatePass = (rule, value, callback) => {            
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerParam.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            two: true,
            loginParam: {},
            registerParam: {},
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
                            { min: 2, max: 32, message: '请输入2-20位字符', trigger: 'blur'}],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' },
                            { min: 6, max: 32, message: '请输入6-32位字符', trigger: 'blur'}],
                r_password: [{ required: true, message: '请输入确认密码', trigger: 'blur' },
                            { validator: validatePass, trigger: 'blur' }],
                email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
                        { type: "email", message: '请输入正确电子邮件地址', trigger: 'blur' }]
            },
        };
    },
    methods: {
        submitLoginForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    login(this.loginParam)
                    .then((response)=> {
                        sessionStorage.clear();
                        sessionStorage.setItem('token', response.data.details.token);
                        localStorage.setItem('token', response.data.details.token);
                        localStorage.setItem('id', response.data.details.id);
                        localStorage.setItem('username',response.data.details.username);
                        this.$message.success('登录成功');
                        this.$router.push('/home');
                    })
                    .catch(error => {
                        this.$message.error('用户名或密码错误');
                    });
                } else {
                    this.$message.error('请输入账号和密码');
                    return false;
                }
            });
        },
        submitRegisterForm(formName){
            this.$refs[formName].validate(valid => {
                if (valid) {
                    register(this.registerParam)
                    .then((response)=> {
                        this.$message.success('注册成功');
                        this.loginParam.username = this.registerParam.username
                        this.loginParam.password = this.registerParam.password
                        this.two = true
                    })
                    .catch((error)=> {
                        var key = Object.keys(error.response.data.details)[0]
                        this.$message.error(error.response.data.details[key][0]);
                    });
                } else {
                    this.$message.error('请根据提示输入必填项');
                    return false;
                }
            });
        },
        goFindPwd(){
            this.$message.error('找个锤子。');
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/101.png);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #2d333f;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.897);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>