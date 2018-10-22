<template>
  <Form :model="formItem" :rules="formItem.rules">
    <FormItem prop="username">
      <Input type="text" v-model="formItem.username" placeholder="账号" size="large">
      <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formItem.password" placeholder="密码" size="large">
      <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <div class="footer">
      <Button type="primary" @click="loginRequest()" class="btn" long>
        登录
      </Button>
    </div>
  </Form>
</template>

<script>
  import api from '../../api'

  export default {
    name: "Login",
    data() {
      return {
        formItem: {
          username: '',
          password: '',
          rules: {
            username: {
              required: true,
              type: 'string',
              pattern: /^[a-zA-Z0-9\-_]{4,20}$/,
              message: '用户名长度为4-20，且只能包含字母，数字，-，_。',
              trigger: 'change'
            },
            password: {
              required: true,
              type: 'string',
              pattern: /^[a-zA-Z0-9\-_.]{8,30}$/,
              message: '密码长度为8-30，且只能包含字母，数字，-，_，.。',
              trigger: 'change'
            },
          }
        }
      }
    },
    methods: {
      loginRequest() {
        api.requestLogin(this.formItem.username, this.formItem.password).then(res => {
          this.$Message.success("登录成功");
          setTimeout(() => {
            this.$router.go(0)
          }, 1000);
        }, res => {
          this.$Message.error("账号或者密码不正确");
        })
      }
    }
  }
</script>

<style scoped>

</style>
