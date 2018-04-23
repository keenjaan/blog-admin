<template>
  <div class="user-login-border">
    <div class="user-login-box">
      <div class="user-login-item">
        <span>账号</span>
        <div class="user-login-account"><el-input v-model="username"></el-input></div>
      </div>
      <div class="user-login-item">
        <span>密码</span>
        <div class="user-login-account"><el-input v-model="password" type="password"></el-input></div>
      </div>
      <div class="user-login-button-group">
        <el-button>注册</el-button>
        <el-button @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api        from '@/api';
  export default {
    data () {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login () {
        this.$core.post(api.login, {
          account: this.username,
          checkPass: this.password
        }).then((data) => {
          if (data.code === 200) {
            window.localStorage.setItem('token', data.token);
            this.$router.push({path: '/admin/article-list'});
          } else {
            this.$notify({
              title: '错误',
              message: '用户名或密码错误！',
              type: 'error'
            });
          }
        });
      }
    }
  };
</script>

<style lang="less">
  @import './style.less';
</style>
