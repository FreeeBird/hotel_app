<template>
  <div class="login-container" >
    <mu-card class="login-card" raised>
      <mu-form ref="form" :model="validateForm" label-position="left" label-width="100" class="mu-demo-form">
        <mu-card-title title="HO大酒店" sub-title="用户注册"></mu-card-title>
        <mu-card-text>
          <mu-form-item label="用户名" help-text="" prop="username" :rules="rules.notNull">
            <mu-text-field v-model="validateForm.username"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="密码" prop="password" :rules="rules.password">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="确认密码" prop="password2" :rules="rules.password2">
            <mu-text-field type="password" v-model="validateForm.password2"  prop="password2"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="姓名" help-text="" prop="name" :rules="rules.notNull">
            <mu-text-field v-model="validateForm.name"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="gender" label="性别"  :rules="rules.notNull">
            <mu-radio v-model="validateForm.gender" value="男" label="男"></mu-radio>
            <mu-radio v-model="validateForm.gender" value="女" label="女"></mu-radio>
          </mu-form-item>
          <mu-form-item label="电子邮箱" help-text="" prop="email" :rules="rules.notNull" >
            <mu-text-field v-model="validateForm.email"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="手机号" help-text="" prop="phone" :rules="rules.notNull" >
            <mu-text-field v-model="validateForm.phone"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="地址" help-text="" prop="address" :rules="rules.notNull">
            <mu-text-field v-model="validateForm.address"></mu-text-field>
          </mu-form-item>
          <mu-form-item label="身份证号" help-text="" prop="idcard" :rules="rules.notNull">
            <mu-text-field v-model="validateForm.idcard"></mu-text-field>
          </mu-form-item>
            <mu-button flat @click="navigateTo('/login')">已有账号？立即登录</mu-button>
        </mu-card-text>
        <mu-card-actions>
          <mu-form-item>
            <mu-button color="secondary" @click="submit">注册</mu-button>
            <mu-button @click="clear">重置</mu-button>
          </mu-form-item>
        </mu-card-actions>
      </mu-form>
    </mu-card>
  </div>
</template>

<script>

    import {userRegister} from "@/api/user";

    export default {
        name: "Register",
      data () {
        return {
          validateForm: {
            username: null,
            password: '',
            password2: '',
            name: '',
            gender: '男',
            phone: '',
            email: '',
            address: '',
            idcard: '',
          },
          rules: {
            notNull: [
              { validate: (val) => !!val, message: '请输入信息', trigger: 'blur' },
            ],
            password: [
              { validate: (val) => !!val, message: '请输入密码', trigger: 'blur' },
            ],
            password2: [
              { validate: (val) => !!val, message: '请再次输入密码', trigger: 'blur' },
              { validate: (val) => val === this.validateForm.password ,message: '输入的两次密码不一致' }
            ]
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
            console.log(result)
            if (result == false) {
              this.$toast.warning("请输入必填项！")
              return
            }else {
              this.login()
            }
          });
        },
        clear () {
          this.$refs.form.clear();
          this.validateForm = {
            username: '',
            password: '',
            password2: '',
            name: '',
            gender: '男',
            phone: '',
            email: '',
            address: '',
            idcard: '',
          };
        },
        login() {
          // this.btnLoading = true
          userRegister(this.validateForm).then(res => {
            if (res === 1){
              this.$toast.success("注册成功")
              this.navigateTo('/login')
            }else if (res === 0) {
              this.$toast.message("请检查信息是否填写正确")
            }
          }).catch(err => {
            this.$toast.message("注册失败：" + err.toString())
          })
        },
      }
    }
</script>

<style scoped>
  .login-container{
    width: 100%;
    background-image: linear-gradient(270deg,#8146b4,#6990f6);
    padding: 8px;
  }
  .mu-demo-form {
    width: 100%;
    /*max-width: 460px;*/
  }
  .login-card{
    width: 100%;
    max-width: 80%;
    margin: 50px auto;
  }
</style>
