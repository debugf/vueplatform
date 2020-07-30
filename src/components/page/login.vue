<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">接口测试平台</div>
            <el-form :model="param" :rules="rules" ref="loginForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            placeholder="密码"
                            v-model="param.password"
                            @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                </div>
                <el-link type="primary" @click="doRegister()" style="text-align: center;">用户注册</el-link>
            </el-form>
        </div>
    </div>
</template>

<script>
// import { login } from '../../api/api'
export default {
    name: "login",
    data: function() {
        return {
            param: {
                username: 'liuxiang',
                password: 'liuxiang',
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // var that = this;
                    login(this.param)
                    .then((response)=> {
                        sessionStorage.clear();
                        sessionStorage.setItem('token',response.data.token);
                        localStorage.setItem('token',response.data.token);
                        localStorage.setItem('user_id',response.data.user_id);
                        localStorage.setItem('username',response.data.username);
                        this.$message.success('登录成功');
                        localStorage.setItem('ms_username', this.param.username);
                        this.$router.push('/');
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