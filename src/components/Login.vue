<template>
  <div class="login-container" >
    <mu-card class="login-card" raised>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form">
      <mu-card-title title="用户登录" sub-title="HO大酒店"></mu-card-title>
      <mu-card-text>
        <mu-form-item label="用户名" help-text="" prop="username" :rules="usernameRules">
          <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
          <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item >
          <mu-button flat>忘记密码？</mu-button>
          <mu-button flat>立即注册</mu-button>
        </mu-form-item>
      </mu-card-text>
      <mu-card-actions>
        <mu-form-item>
          <mu-button v-loading="btnLoading" color="secondary" @click="submit">登录</mu-button>
          <mu-button @click="clear">重置</mu-button>
        </mu-form-item>
      </mu-card-actions>
      </mu-form>
    </mu-card>
  </div>
</template>

<script>
  import { userLogin,getUserInfoByUsername } from "@/api/user";
  import Cookies from 'js-cookie'

  export default {
        name: "Login",
      data () {
          return {
            usernameRules: [
              { validate: (val) => !!val, message: '必须填写用户名'},
              { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
            ],
            passwordRules: [
              { validate: (val) => !!val, message: '必须填写密码'},
              { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
            ],
            validateForm: {
              username: '',
              password: ''
            },
            userId: null,
            btnLoading: false
          }
      },
      methods: {
          navigateTo(val){
            this.$router.push(val);
          },
        submit () {
          this.$refs.form.validate().then((result) => {
            console.log('form valid: ', result)
          });
          this.login()
          this.btnLoading = false
        },
        clear () {
          this.$refs.form.clear();
          this.validateForm = {
            username: '',
            password: ''
          };
        },
        login() {
          this.btnLoading = true
          userLogin(this.validateForm.username,this.validateForm.password).then(res => {
            if (res === 1){
              Cookies.set('username',this.validateForm.username)
              getUserInfoByUsername(this.validateForm.username).then(res => {
                this.userId = res.userId;
                Cookies.set('user_id',this.userId)
              })
              this.navigateTo('/')
            }else if (res === 0) {
              this.$toast.message("用户名或密码不正确！")
              this.btnLoading = false
            }
          }).catch(err => {
            this.btnLoading = false
            console.log(err)
          })
        },
      }
    }
</script>

<style scoped>
  .login-container{
    height: -webkit-fill-available;
    width: 100%;
    background-image: linear-gradient(270deg,#8146b4,#6990f6);
    padding: 8px;
  }
  .mu-demo-form {
    width: 100%;
    max-width: 460px;
  }
  .login-card{
    width: 100%;
    max-width: 375px;
    margin: 50px auto;
  }
</style>
