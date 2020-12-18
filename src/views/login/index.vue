<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h2 class="title">系统登录</h2>
      </div>
      <el-form-item prop="loginname">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="loginname" v-model="loginForm.loginname" placeholder="Username" name="loginname" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" round type="primary" class="login-button" @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips">
        <span style="padding-right:1rem">账号: admin</span>
        <span> 密码: 000000</span>
      </div>
      <div class="tips">
        <span style="padding-right:1rem">账号: test</span>
        <span style="padding-left: 1.1rem"> 密码: 000000</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate';

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        loginname: '',
        password: '',
      },
      loginRules: {
        loginname: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.login-container .el-form-item {
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  color: #454545;
}
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: url('/images//bg/login.jpg') no-repeat center / 100% 100%;
}
form {
  background: linear-gradient(to bottom, rgba(146, 135, 187, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%);
  opacity: 0.85;
  width: 26rem;
  height: 26rem;
  z-index: 10;
  padding: 1rem;
  border-radius: 2rem;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container >>> .el-form-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
::v-deep .el-input__inner {
  font-weight: bolder;
  background: transparent;
  border-radius: 2rem;
  color: #fff;
  caret-color: #fff;
  border: 0;
}
::v-deep .el-form-item__error {
  font-size: 1rem;
  font-weight: bolder;
}
::v-deep input:-webkit-autofill {
  font-weight: bolder;
  -webkit-text-fill-color: #fff;
  transition: background-color 50000000s ease-in-out 0s;
}
::v-deep .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container .svg-container {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}
.login-container .show-pwd {
  margin-right: 1rem;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
.login-button {
  width: 100%;
  padding: 0.8rem 0;
  font-size: 1rem;
  font-weight: bolder;
}
.tips {
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  margin-top: 1rem;
}
</style>
